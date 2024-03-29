CREATE TABLE `bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_user_id` integer NOT NULL,
	`desk_id` integer NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`account_user_id`) REFERENCES `account_users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`desk_id`) REFERENCES `desks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `desks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `location_grid_entities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_grid_id` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`location_grid_id`) REFERENCES `location_grids`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `location_grid_entity_desk` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_grid_entity_id` integer NOT NULL,
	`desk_id` integer NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	FOREIGN KEY (`location_grid_entity_id`) REFERENCES `location_grid_entities`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`desk_id`) REFERENCES `desks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `location_grid_entity_wall` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_grid_entity_id` integer NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL,
	FOREIGN KEY (`location_grid_entity_id`) REFERENCES `location_grid_entities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `location_grids` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`location_id` integer NOT NULL,
	`size_x` integer NOT NULL,
	`size_y` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`account_id` integer NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `desks_name_partial_idx` ON `desks` (`name`) WHERE deleted_at IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `locations_name_partial_idx` ON `locations` (`name`) WHERE deleted_at IS NULL;