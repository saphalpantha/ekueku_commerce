
module.exports  = `

type Promotion{
    id:ID!
    name:String!
    description:String!
    discount_rate:String!
    start_date:String!
    end_date:String!
}

input PromotionInput{
    id:ID!
    name:String!
    description:String!
    discount_rate:String!
    start_date:String!
    end_date:String!
}

type PromotionCategory{
    promotion_id:ID!
    promotion:Promotion
}

input PromotionCategoryInput{
    promotion_id:ID!
    promotion:PromotionInput
}

type ProductCategory{
    id : ID!
    promotion_cateogry:PromotionCategory
    category_name:String!
}

input ProductCategoryInput{
    id : ID!
    promotion_cateogry:PromotionCategoryInput
    category_name:String!
}


type ProductImage{
    id:ID!
    product_image:String
}

input ProductImageInput{
    id:ID!
    product_image:String
}

type ProductDescription{
    id:ID!
    description:String
}

input ProductDescriptionInput{
    id:ID!
    description:String
}


type Product{
    productCategory:ProductCategory
    title:String!
    product_item:ProductItem
    description:[ProductDescription]!
    product_image:[ProductImage]
}

input ProductInput{
    productCategory:ProductCategoryInput
    title:String!
    product_item:ProductItemInput
    description:[ProductDescriptionInput]!
    product_image:[ProductImageInput]
}


type ProductItem{
    id :ID!
    SKU:String!
    qty_in_stock:String!
    product_image:[ProductImage]!
    price:String!
    
}


input ProductItemInput{
    id :ID!
    SKU:String!
    qty_in_stock:String!
    product_image:[ProductImageInput]!
    price:String!
    
}

type ProductRootQuery {
    hello:String
    getAllProducts:[Product]
    getSingleProduct(id:ID!):Product
    getFeaturedProducts:[Product]

}

type ProductRootMutation{
    createProduct(userInput:ProductInput):Product
        
}

`

