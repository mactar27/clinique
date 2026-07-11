CREATE TABLE `appointments` (
	`id` varchar(36) NOT NULL,
	`specialty_slug` text NOT NULL,
	`specialty_label` text NOT NULL,
	`reason` text NOT NULL,
	`practitioner` text NOT NULL,
	`patient_first_name` text NOT NULL,
	`patient_last_name` text NOT NULL,
	`patient_phone` text NOT NULL,
	`patient_email` text,
	`preferred_date` date NOT NULL,
	`preferred_time` text NOT NULL,
	`notes` text,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(36) NOT NULL,
	`appointment_id` varchar(36) NOT NULL,
	`type` varchar(20) NOT NULL,
	`message` text NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'sent',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` varchar(36) NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`date_of_birth` date,
	`patient_code` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `patients_id` PRIMARY KEY(`id`),
	CONSTRAINT `patients_patient_code_unique` UNIQUE(`patient_code`)
);
--> statement-breakpoint
CREATE TABLE `test_results` (
	`id` varchar(36) NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`test_name` text NOT NULL,
	`test_date` date NOT NULL,
	`result_url` text NOT NULL,
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `test_results_id` PRIMARY KEY(`id`)
);
