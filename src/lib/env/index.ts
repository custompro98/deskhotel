import { z } from "zod";

const env = z
  .object({
    DATABASE_AUTH_TOKEN: z.string(),
    DATABASE_URL: z.string(),
    // GOOGLE_CLIENT_ID: z.string(),
    // GOOGLE_CLIENT_SECRET: z.string(),
    // NEXTAUTH_SECRET: z.string(),
    // NEXT_PUBLIC_HOSTNAME: z.string(),
  })
  .safeParse(process.env);

if (!env.success) {
  throw new Error(
    `Failed to load required environment variables: ${env.error.message}`,
  );
}

export default env.data;
