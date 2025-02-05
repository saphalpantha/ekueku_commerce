-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('CLIENT', 'SELLER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion_category" (
	"category_id" text,
	"promotion_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" text PRIMARY KEY NOT NULL,
	"unit_number" text,
	"street_number" text,
	"address_line1" text,
	"address_line2" text,
	"city" text,
	"region" text,
	"postal_code" text,
	"country_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"firstname" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_category" (
	"id" text PRIMARY KEY NOT NULL,
	"parent_category_id" text,
	"category_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_address" (
	"id" text,
	"addr_id" text,
	"is_default" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"category_id" text,
	"title" text,
	"product_banner" text,
	"featured" boolean,
	"descid" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "country" (
	"id" text PRIMARY KEY NOT NULL,
	"country_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reset_tokens" (
	"token_id" text PRIMARY KEY NOT NULL,
	"created_date" timestamp with time zone,
	"token" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promotion" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"discount_rate" text,
	"start_date" text,
	"end_date" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_cart_item" (
	"id" text PRIMARY KEY NOT NULL,
	"cart_id" text,
	"product_item_id" text,
	"qty" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_item" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text,
	"sku" text,
	"qty_in_stock" integer,
	"price" text,
	"imageid" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_image" (
	"id" text,
	"prodid" text,
	"image" text,
	CONSTRAINT "product_image_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_cart" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation" (
	"id" text PRIMARY KEY NOT NULL,
	"category_id" text,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation_option" (
	"id" text PRIMARY KEY NOT NULL,
	"variation_id" text,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "description" (
	"id" text,
	"prodid" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_users" (
	"user_id" text NOT NULL,
	"email" varchar(200) NOT NULL,
	"phone_no" varchar(200),
	"user_password" varchar(500),
	"user_role" "role",
	CONSTRAINT "site_users_pkey" PRIMARY KEY("user_id","email"),
	CONSTRAINT "unique_user_id" UNIQUE("user_id"),
	CONSTRAINT "site_users_email_key" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_category" ADD CONSTRAINT "promotion_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_category" ADD CONSTRAINT "promotion_category_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_category" ADD CONSTRAINT "promotion_category_promotion_id_fkey1" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotion"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promotion_category" ADD CONSTRAINT "promotion_category_category_id_fkey1" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "fk_addr_country" FOREIGN KEY ("country_id") REFERENCES "public"."country"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_id_fkey1" FOREIGN KEY ("parent_category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_address" ADD CONSTRAINT "fk_usr_id" FOREIGN KEY ("id") REFERENCES "public"."site_users"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_address" ADD CONSTRAINT "fk_usr_addr" FOREIGN KEY ("addr_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey1" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey2" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey3" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_descid_fkey" FOREIGN KEY ("descid") REFERENCES "public"."product_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_cart_id_fkey1" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_product_item_id_fkey1" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_cart_id_fkey2" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_product_item_id_fkey2" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_cart_id_fkey3" FOREIGN KEY ("cart_id") REFERENCES "public"."shopping_cart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "shopping_cart_item_product_item_id_fkey3" FOREIGN KEY ("product_item_id") REFERENCES "public"."product_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey1" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_item" ADD CONSTRAINT "product_item_imageid_fkey" FOREIGN KEY ("imageid") REFERENCES "public"."product_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey2" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey3" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey4" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey5" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey6" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_fkey7" FOREIGN KEY ("user_id") REFERENCES "public"."site_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variation_option" ADD CONSTRAINT "variation_option_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "public"."variation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variation_option" ADD CONSTRAINT "variation_option_variation_id_fkey1" FOREIGN KEY ("variation_id") REFERENCES "public"."variation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/