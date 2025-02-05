import { pgTable, foreignKey, pgEnum, text, boolean, varchar, unique, timestamp, integer, primaryKey } from "drizzle-orm/pg-core"
  import { relations, sql } from "drizzle-orm"

export const role = pgEnum("role", ['CLIENT', 'SELLER', 'ADMIN'])


export const userAddress = pgTable("user_address", {
	id: text("id").references(() => siteUsers.email),
	addrId: text("addr_id").references(() => address.id),
	isDefault: boolean("is_default"),
});

export const productCategory = pgTable("product_category", {
	id: text("id").primaryKey().notNull(),
	parentCategoryId: text("parent_category_id"),
	categoryName: text("category_name"),
},
(table) => {
	return {
		productCategoryParentCategoryIdFkey: foreignKey({
			columns: [table.parentCategoryId],
			foreignColumns: [table.id],
			name: "product_category_parent_category_id_fkey"
		}),
		productCategoryParentCategoryIdFkey1: foreignKey({
			columns: [table.parentCategoryId],
			foreignColumns: [table.id],
			name: "product_category_parent_category_id_fkey1"
		}),
	}
});

export const test = pgTable("test", {
	firstname: varchar("firstname", { length: 200 }),
});

export const product = pgTable("product", {
	id: text("id").primaryKey().notNull(),
	categoryId: text("category_id").references(() => productCategory.id).references(() => productCategory.id).references(() => productCategory.id).references(() => productCategory.id),
	title: text("title"),
	productBanner: text("product_banner"),
	featured: boolean("featured"),
});

export const promotionCategory = pgTable("promotion_category", {
	categoryId: text("category_id").references(() => productCategory.id).references(() => productCategory.id),
	promotionId: text("promotion_id").references(() => promotion.id).references(() => promotion.id),
},
(table) => {
	return {
		promotionCategoryPromotionIdKey: unique("promotion_category_promotion_id_key").on(table.promotionId),
	}
});

export const userReview = pgTable("user_review", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").references(() => siteUsers.userId),
	orderedProductId: text("ordered_product_id"),
	ratingValue: text("rating_value"),
	comment: text("comment"),
});

export const userPaymentMethod = pgTable("user_payment_method", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id"),
	paymentTypeId: text("payment_type_id").references(() => paymentType.id),
	provider: text("provider"),
	accountNumber: text("account_number"),
	expiryDate: text("expiry_date"),
	isDefault: text("is_default"),
});

export const address = pgTable("address", {
	id: text("id").primaryKey().notNull(),
	unitNumber: text("unit_number"),
	streetNumber: text("street_number"),
	addressLine1: text("address_line1"),
	addressLine2: text("address_line2"),
	city: text("city"),
	region: text("region"),
	postalCode: text("postal_code"),
	countryId: text("country_id").references(() => country.id),
});

export const paymentType = pgTable("payment_type", {
	id: text("id").primaryKey().notNull(),
	value: text("value"),
});

export const description = pgTable("description", {
	id: text("id"),
	prodid: text("prodid"),
	description: text("description"),
});

export const shippingMethod = pgTable("shipping_method", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	price: text("price"),
});

export const shopOrder = pgTable("shop_order", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").references(() => siteUsers.userId),
	orderDate: text("order_date"),
	paymentMethodId: text("payment_method_id").references(() => userPaymentMethod.id),
	shippingAddress: text("shipping_address").references(() => address.id),
	shippingMethod: text("shipping_method").references(() => shippingMethod.id),
	orderTotal: text("order_total"),
	orderStatus: text("order_status").references(() => orderStatus.id),
});

export const orderStatus = pgTable("order_status", {
	id: text("id").primaryKey().notNull(),
	status: text("status"),
});

export const orderLine = pgTable("order_line", {
	id: text("id").primaryKey().notNull(),
	productItemId: text("product_item_id").references(() => productItem.id),
	orderId: text("order_id").references(() => shopOrder.id),
	qty: text("qty"),
	price: text("price"),
});

export const country = pgTable("country", {
	id: text("id").primaryKey().notNull(),
	countryName: text("country_name"),
});

export const resetTokens = pgTable("reset_tokens", {
	tokenId: text("token_id").primaryKey().notNull(),
	createdDate: timestamp("created_date", { withTimezone: true, mode: 'string' }),
	token: text("token"),
	email: text("email"),
});

export const promotion = pgTable("promotion", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
	discountRate: text("discount_rate"),
	startDate: text("start_date"),
	endDate: text("end_date"),
});

export const variationOption = pgTable("variation_option", {
	id: text("id").primaryKey().notNull(),
	variationId: text("variation_id").references(() => variation.id).references(() => variation.id),
	value: text("value"),
});

export const variation = pgTable("variation", {
	id: text("id").primaryKey().notNull(),
	categoryId: text("category_id"),
	name: text("name"),
});

export const productImage = pgTable("product_image", {
	id: text("id"),
	prodid: text("prodid"),
	image: text("image"),
},
(table) => {
	return {
		productImageIdKey: unique("product_image_id_key").on(table.id),
	}
});

export const shoppingCart = pgTable("shopping_cart", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId).references(() => siteUsers.userId),
},
(table) => {
	return {
		shoppingCartIdKey: unique("shopping_cart_id_key").on(table.id),
		shoppingCartUserIdKey: unique("shopping_cart_user_id_key").on(table.userId),
	}
});

export const shoppingCartItem = pgTable("shopping_cart_item", {
	id: text("id").primaryKey().notNull(),
	cartId: text("cart_id").references(() => shoppingCart.id).references(() => shoppingCart.id).references(() => shoppingCart.id).references(() => shoppingCart.id),
	qty: integer("qty"),
	prodid: text("prodid").references(() => product.id).references(() => product.id),
});

export const productItem = pgTable("product_item", {
	id: text("id").primaryKey().notNull(),
	productId: text("product_id").references(() => product.id).references(() => product.id),
	sku: text("sku"),
	qtyInStock: integer("qty_in_stock"),
	price: text("price"),
});

export const siteUsers = pgTable("site_users", {
	userId: text("user_id").notNull(),
	email: varchar("email", { length: 200 }).notNull(),
	phoneNo: varchar("phone_no", { length: 200 }),
	userPassword: varchar("user_password", { length: 500 }),
	userRole: role("user_role"),
},
(table) => {
	return {
		siteUsersPkey: primaryKey({ columns: [table.userId, table.email], name: "site_users_pkey"}),
		uniqueUserId: unique("unique_user_id").on(table.userId),
		siteUsersEmailKey: unique("site_users_email_key").on(table.email),
	}
});



export const userAddressRelation = relations(userAddress, ({one,many}) => ({
	address:one(address)

}))

export const siteUsersRelation = relations(siteUsers, ({one,many}) => ({
	userAddress:one(userAddress,{
		fields:[siteUsers.userId],
		references:[userAddress.id]
	}),
	shoppingCart:one(shoppingCart, {
		fields:[siteUsers.userId],
		references:[shoppingCart.userId],
	}),
	user_reviews:one(userReview,{
		fields:[siteUsers.userId],
		references:[userReview.userId]
	})

}))
export const AddressRelation = relations(address, ({one,many}) => ({
	country:one(country,{
		fields:[address.id],
		references:[country.id],	
	}),	

}))


export const Product = relations(product, ({one,many}) => ({
	productItem:one(productItem, {
		fields:[product.id],
		references:[productItem.productId],
	}),
	productCategory:one(productCategory,{
		fields:[product.categoryId],
		references:[productCategory.id],
	}),
	description:many(description),
	productImage:many(productImage),


}))



export const ProductItem = relations(productItem, ({one,many}) => ({
	product:one(product,{
		fields:[productItem.productId],
		references:[product.id],
	}),
}))



export const ProductCategory = relations(productCategory, ({one,many}) => ({
		productCategory:one(productCategory,{
		 fields:[productCategory.id],
		 references:[productCategory.parentCategoryId],
		}),
		variation:many(variation),
		promotionCategory:one(promotionCategory, {
			fields:[productCategory.id],
			references:[promotionCategory.categoryId]
		})
	
}))


export const Variation = relations(variation, ({one,many}) => ({
	productCategory:one(productCategory,{
		fields:[variation.categoryId],
		references:[productCategory.id],
	}),
	variationOption:many(variationOption),

}))


export const VariationOption = relations(variationOption, ({one,many}) => ({
	 variation:many(variation)
}))




export const ShoppingCartReferences = relations(shoppingCart, ({one,many}) => ({
	siteUsers:one(siteUsers, {
		fields:[shoppingCart.userId],
		references:[siteUsers.userId],
	}),
	shoppingCartItem:many(shoppingCartItem)
}))





export const ShoppingCartItem = relations(shoppingCartItem, ({one,many}) => ({
	shoppingCart:one(shoppingCart, {
		fields:[shoppingCartItem.cartId],
		references:[shoppingCart.id],
	}),
	product:one(product, {
		fields:[shoppingCartItem.prodid],
		references:[product.id]
	})

}))


export const productDescriptionRelation = relations(description, ({one,many}) => ({
	product:one(product,{
		fields:[description.prodid],
		references:[product.id]
	})
}))





export const productImageRelation  = relations(productImage, ({one,many}) => ({
	product:one(product,{
		fields:[productImage.prodid],
		references:[product.id]
	})
}))



export const promotionCategoryR = relations(promotionCategory, ({one,many}) =>({
	promotion:one(promotion, {
		fields:[promotionCategory.promotionId],
		references:[promotion.id]
	}),
	productCategory:one(productCategory, {
		fields:[promotionCategory.categoryId],
		references:[productCategory.id]
	})
}))




export const promotionR = relations(promotion, ({one,many}) => ({
	promotionCategory:one(promotionCategory, {
		fields:[promotion.id],
		references:[promotionCategory.promotionId]
	})
}))



export const user_payment_method = relations(userPaymentMethod,({one,many}) => ({
	siteUsers:one(siteUsers, {
		fields:[userPaymentMethod.userId],
		references:[siteUsers.userId]
	}),
	paymentType:one(paymentType,{
		fields:[userPaymentMethod.paymentTypeId],
		references:[paymentType.id],
	}),
	shopOrder:one(shopOrder,{
		fields:[userPaymentMethod.id],
		references:[shopOrder.paymentMethodId]
	})

}))




export const shop_order_reln =  relations(shopOrder, ({one,many})  => ({

	orderLine:one(orderLine, {
		fields:[shopOrder.id],
		references:[orderLine.orderId],
	}),

	
}
))


