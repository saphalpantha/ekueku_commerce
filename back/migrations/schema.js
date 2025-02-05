"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionR = exports.promotionCategoryR = exports.productImageRelation = exports.productDescriptionRelation = exports.ShoppingCartItem = exports.ShoppingCartReferences = exports.VariationOption = exports.Variation = exports.ProductCategory = exports.ProductItem = exports.Product = exports.AddressRelation = exports.siteUsersRelation = exports.userAddressRelation = exports.siteUsers = exports.shoppingCartItem = exports.shoppingCart = exports.productImage = exports.variation = exports.variationOption = exports.productItem = exports.promotion = exports.resetTokens = exports.country = exports.description = exports.userReview = exports.promotionCategory = exports.product = exports.test = exports.address = exports.productCategory = exports.userAddress = exports.role = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.role = (0, pg_core_1.pgEnum)("role", ['CLIENT', 'SELLER', 'ADMIN']);
exports.userAddress = (0, pg_core_1.pgTable)("user_address", {
    id: (0, pg_core_1.text)("id").references(function () { return exports.siteUsers.email; }),
    addrId: (0, pg_core_1.text)("addr_id").references(function () { return exports.address.id; }),
    isDefault: (0, pg_core_1.boolean)("is_default"),
});
exports.productCategory = (0, pg_core_1.pgTable)("product_category", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    parentCategoryId: (0, pg_core_1.text)("parent_category_id"),
    categoryName: (0, pg_core_1.text)("category_name"),
}, function (table) {
    return {
        productCategoryParentCategoryIdFkey: (0, pg_core_1.foreignKey)({
            columns: [table.parentCategoryId],
            foreignColumns: [table.id],
            name: "product_category_parent_category_id_fkey"
        }),
        productCategoryParentCategoryIdFkey1: (0, pg_core_1.foreignKey)({
            columns: [table.parentCategoryId],
            foreignColumns: [table.id],
            name: "product_category_parent_category_id_fkey1"
        }),
    };
});
exports.address = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    unitNumber: (0, pg_core_1.text)("unit_number"),
    streetNumber: (0, pg_core_1.text)("street_number"),
    addressLine1: (0, pg_core_1.text)("address_line1"),
    addressLine2: (0, pg_core_1.text)("address_line2"),
    city: (0, pg_core_1.text)("city"),
    region: (0, pg_core_1.text)("region"),
    postalCode: (0, pg_core_1.text)("postal_code"),
    countryId: (0, pg_core_1.text)("country_id").references(function () { return exports.country.id; }),
});
exports.test = (0, pg_core_1.pgTable)("test", {
    firstname: (0, pg_core_1.varchar)("firstname", { length: 200 }),
});
exports.product = (0, pg_core_1.pgTable)("product", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    categoryId: (0, pg_core_1.text)("category_id").references(function () { return exports.productCategory.id; }).references(function () { return exports.productCategory.id; }).references(function () { return exports.productCategory.id; }).references(function () { return exports.productCategory.id; }),
    title: (0, pg_core_1.text)("title"),
    productBanner: (0, pg_core_1.text)("product_banner"),
    featured: (0, pg_core_1.boolean)("featured"),
});
exports.promotionCategory = (0, pg_core_1.pgTable)("promotion_category", {
    categoryId: (0, pg_core_1.text)("category_id").references(function () { return exports.productCategory.id; }).references(function () { return exports.productCategory.id; }),
    promotionId: (0, pg_core_1.text)("promotion_id").references(function () { return exports.promotion.id; }).references(function () { return exports.promotion.id; }),
}, function (table) {
    return {
        promotionCategoryPromotionIdKey: (0, pg_core_1.unique)("promotion_category_promotion_id_key").on(table.promotionId),
    };
});
exports.userReview = (0, pg_core_1.pgTable)("user_review", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    userId: (0, pg_core_1.text)("user_id").references(function () { return exports.siteUsers.userId; }),
    orderedProductId: (0, pg_core_1.text)("ordered_product_id"),
    ratingValue: (0, pg_core_1.text)("rating_value"),
    comment: (0, pg_core_1.text)("comment"),
});
exports.description = (0, pg_core_1.pgTable)("description", {
    id: (0, pg_core_1.text)("id"),
    prodid: (0, pg_core_1.text)("prodid"),
    description: (0, pg_core_1.text)("description"),
});
exports.country = (0, pg_core_1.pgTable)("country", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    countryName: (0, pg_core_1.text)("country_name"),
});
exports.resetTokens = (0, pg_core_1.pgTable)("reset_tokens", {
    tokenId: (0, pg_core_1.text)("token_id").primaryKey().notNull(),
    createdDate: (0, pg_core_1.timestamp)("created_date", { withTimezone: true, mode: 'string' }),
    token: (0, pg_core_1.text)("token"),
    email: (0, pg_core_1.text)("email"),
});
exports.promotion = (0, pg_core_1.pgTable)("promotion", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name"),
    description: (0, pg_core_1.text)("description"),
    discountRate: (0, pg_core_1.text)("discount_rate"),
    startDate: (0, pg_core_1.text)("start_date"),
    endDate: (0, pg_core_1.text)("end_date"),
});
exports.productItem = (0, pg_core_1.pgTable)("product_item", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    productId: (0, pg_core_1.text)("product_id").references(function () { return exports.product.id; }).references(function () { return exports.product.id; }),
    sku: (0, pg_core_1.text)("sku"),
    qtyInStock: (0, pg_core_1.integer)("qty_in_stock"),
    price: (0, pg_core_1.text)("price"),
});
exports.variationOption = (0, pg_core_1.pgTable)("variation_option", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    variationId: (0, pg_core_1.text)("variation_id").references(function () { return exports.variation.id; }).references(function () { return exports.variation.id; }),
    value: (0, pg_core_1.text)("value"),
});
exports.variation = (0, pg_core_1.pgTable)("variation", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    categoryId: (0, pg_core_1.text)("category_id"),
    name: (0, pg_core_1.text)("name"),
});
exports.productImage = (0, pg_core_1.pgTable)("product_image", {
    id: (0, pg_core_1.text)("id"),
    prodid: (0, pg_core_1.text)("prodid"),
    image: (0, pg_core_1.text)("image"),
}, function (table) {
    return {
        productImageIdKey: (0, pg_core_1.unique)("product_image_id_key").on(table.id),
    };
});
exports.shoppingCart = (0, pg_core_1.pgTable)("shopping_cart", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    userId: (0, pg_core_1.text)("user_id").references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }).references(function () { return exports.siteUsers.userId; }),
}, function (table) {
    return {
        shoppingCartIdKey: (0, pg_core_1.unique)("shopping_cart_id_key").on(table.id),
        shoppingCartUserIdKey: (0, pg_core_1.unique)("shopping_cart_user_id_key").on(table.userId),
    };
});
exports.shoppingCartItem = (0, pg_core_1.pgTable)("shopping_cart_item", {
    id: (0, pg_core_1.text)("id").primaryKey().notNull(),
    cartId: (0, pg_core_1.text)("cart_id").references(function () { return exports.shoppingCart.id; }).references(function () { return exports.shoppingCart.id; }).references(function () { return exports.shoppingCart.id; }).references(function () { return exports.shoppingCart.id; }),
    qty: (0, pg_core_1.integer)("qty"),
    prodid: (0, pg_core_1.text)("prodid").references(function () { return exports.product.id; }).references(function () { return exports.product.id; }),
});
exports.siteUsers = (0, pg_core_1.pgTable)("site_users", {
    userId: (0, pg_core_1.text)("user_id").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 200 }).notNull(),
    phoneNo: (0, pg_core_1.varchar)("phone_no", { length: 200 }),
    userPassword: (0, pg_core_1.varchar)("user_password", { length: 500 }),
    userRole: (0, exports.role)("user_role"),
}, function (table) {
    return {
        siteUsersPkey: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.email], name: "site_users_pkey" }),
        uniqueUserId: (0, pg_core_1.unique)("unique_user_id").on(table.userId),
        siteUsersEmailKey: (0, pg_core_1.unique)("site_users_email_key").on(table.email),
    };
});
exports.userAddressRelation = (0, drizzle_orm_1.relations)(exports.userAddress, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        address: one(exports.address)
    });
});
exports.siteUsersRelation = (0, drizzle_orm_1.relations)(exports.siteUsers, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        userAddress: one(exports.userAddress, {
            fields: [exports.siteUsers.userId],
            references: [exports.userAddress.id]
        }),
        shoppingCart: one(exports.shoppingCart, {
            fields: [exports.siteUsers.userId],
            references: [exports.shoppingCart.userId],
        }),
        user_reviews: one(exports.userReview, {
            fields: [exports.siteUsers.userId],
            references: [exports.userReview.userId]
        })
    });
});
exports.AddressRelation = (0, drizzle_orm_1.relations)(exports.address, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        country: one(exports.country, {
            fields: [exports.address.id],
            references: [exports.country.id],
        }),
    });
});
exports.Product = (0, drizzle_orm_1.relations)(exports.product, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        productItem: one(exports.productItem, {
            fields: [exports.product.id],
            references: [exports.productItem.productId],
        }),
        productCategory: one(exports.productCategory, {
            fields: [exports.product.categoryId],
            references: [exports.productCategory.id],
        }),
        description: many(exports.description),
        productImage: many(exports.productImage),
    });
});
exports.ProductItem = (0, drizzle_orm_1.relations)(exports.productItem, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        product: one(exports.product, {
            fields: [exports.productItem.productId],
            references: [exports.product.id],
        }),
    });
});
exports.ProductCategory = (0, drizzle_orm_1.relations)(exports.productCategory, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        productCategory: one(exports.productCategory, {
            fields: [exports.productCategory.id],
            references: [exports.productCategory.parentCategoryId],
        }),
        variation: many(exports.variation),
        promotionCategory: one(exports.promotionCategory, {
            fields: [exports.productCategory.id],
            references: [exports.promotionCategory.categoryId]
        })
    });
});
exports.Variation = (0, drizzle_orm_1.relations)(exports.variation, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        productCategory: one(exports.productCategory, {
            fields: [exports.variation.categoryId],
            references: [exports.productCategory.id],
        }),
        variationOption: many(exports.variationOption),
    });
});
exports.VariationOption = (0, drizzle_orm_1.relations)(exports.variationOption, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        variation: many(exports.variation)
    });
});
exports.ShoppingCartReferences = (0, drizzle_orm_1.relations)(exports.shoppingCart, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        siteUsers: one(exports.siteUsers, {
            fields: [exports.shoppingCart.userId],
            references: [exports.siteUsers.userId],
        }),
        shoppingCartItem: many(exports.shoppingCartItem)
    });
});
exports.ShoppingCartItem = (0, drizzle_orm_1.relations)(exports.shoppingCartItem, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        shoppingCart: one(exports.shoppingCart, {
            fields: [exports.shoppingCartItem.cartId],
            references: [exports.shoppingCart.id],
        }),
        product: one(exports.product, {
            fields: [exports.shoppingCartItem.prodid],
            references: [exports.product.id]
        })
    });
});
exports.productDescriptionRelation = (0, drizzle_orm_1.relations)(exports.description, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        product: one(exports.product, {
            fields: [exports.description.prodid],
            references: [exports.product.id]
        })
    });
});
exports.productImageRelation = (0, drizzle_orm_1.relations)(exports.productImage, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        product: one(exports.product, {
            fields: [exports.productImage.prodid],
            references: [exports.product.id]
        })
    });
});
exports.promotionCategoryR = (0, drizzle_orm_1.relations)(exports.promotionCategory, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        promotion: one(exports.promotion, {
            fields: [exports.promotionCategory.promotionId],
            references: [exports.promotion.id]
        }),
        productCategory: one(exports.productCategory, {
            fields: [exports.promotionCategory.categoryId],
            references: [exports.productCategory.id]
        })
    });
});
exports.promotionR = (0, drizzle_orm_1.relations)(exports.promotion, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        promotionCategory: one(exports.promotionCategory, {
            fields: [exports.promotion.id],
            references: [exports.promotionCategory.promotionId]
        })
    });
});
