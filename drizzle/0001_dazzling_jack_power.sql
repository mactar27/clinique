CREATE TABLE `staff` (
	`id` varchar(36) NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`role` varchar(50) NOT NULL,
	`specialty` text,
	`phone` text NOT NULL,
	`email` text,
	`status` varchar(20) NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `staff_id` PRIMARY KEY(`id`)
);
