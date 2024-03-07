import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { eq } from "drizzle-orm";

import env from "@/lib/env";
import { assertNever, isPresent } from "@/lib/util";
import { db, tables } from "@/lib/database";

declare module "next-auth" {
  interface Session {
    user: {
      accountId: string;
    } & AdapterUser &
      User;
  }
}

export enum Provider {
  GOOGLE = "google",
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      const provider = account?.provider as Provider | undefined;

      if (!isPresent(provider)) {
        throw new Error("no account at signIn callback");
      }

      switch (provider) {
        case Provider.GOOGLE:
          const googleProfile = profile as GoogleProfile;

          try {
            const [existingUser] = await db
              .select()
              .from(tables.users)
              .where(eq(tables.users.email, googleProfile.email))
              .limit(1)
              .execute();

            if (isPresent(existingUser)) {
              await db.update(tables.users).set({
                avatar: googleProfile.picture,
              });
            } else {
              await db.transaction(async (trx) => {
                // create user
                const [user] = await trx
                  .insert(tables.users)
                  .values({
                    email: googleProfile.email,
                    avatar: googleProfile.picture,
                  })
                  .returning();

                // create new account
                const [account] = await trx
                  .insert(tables.accounts)
                  .values({
                    name: user.email,
                  })
                  .returning();

                // associate user with account
                await trx.insert(tables.accountUsers).values({
                  accountId: account.id,
                  userId: user.id,
                });
              });
            }
          } catch (e) {
            console.log(e);

            return false;
          }

          break;
        default:
          assertNever(provider);
      }

      return true;
    },
    async jwt({ token }) {
      if (!isPresent(token.email)) {
        return token;
      }

      const [existingUser] = await db
        .select()
        .from(tables.users)
        .innerJoin(
          tables.accountUsers,
          eq(tables.users.id, tables.accountUsers.userId),
        )
        .innerJoin(
          tables.accounts,
          eq(tables.accountUsers.accountId, tables.accounts.id),
        )
        .where(eq(tables.users.email, token.email))
        .limit(1)
        .execute();

      token.userId = existingUser.users.id;
      token.accountId = existingUser.accounts.id;

      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = `${token.userId}`;
      }

      if (token.accountId) {
        session.user.accountId = `${token.accountId}`;
      }

      return session;
    },
  },
});
