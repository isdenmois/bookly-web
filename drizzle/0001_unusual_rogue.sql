CREATE TABLE `settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`settings` blob,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
