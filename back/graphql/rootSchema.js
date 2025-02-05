const { buildSchema } = require("graphql");
const userSchema = require("./Auth/schema");

const productSchema = require('./Product/schema')

const rootSchema = buildSchema(`


enum Role{
    CLIENT
    SELLER
    ADMIN
}

type Country{
    id:ID!
    country_name:String
}

type Address{
    id:ID!
    unit_number:String
    street_number:String
    address_line1:String
    address_line2:String
    city:String
    region:String
    postal_code:String
    country:Country

}
type UserAddress{
    user_id:ID!
    isDefault:Boolean
    address:Address
}




type SiteUser{
    user_id:ID!
    email:String!
    user_password:String!
    phone_no:String!
    address:UserAddress
    user_role:Role
    profile:String!
}

input SiteUserInput{
    email:String!
    password:String!
    phone_no:String!
    role:Role!
}

input LoginInput{
    email:String!
    password:String!
}

input ForgetPasswordInput{
    email:String!
}


input ChangePasswordInput{
    currentPassword:String!
    newPassword:String!
}
type ForgetPasswordMessage{
    message:String
}

type User{
    user_id:ID!
    email:String!,
    user_role:Role!   
}


type AuthRootQuery{
    hello:String
    fetchAllUsers:[SiteUser]!
    fetchSingleUser(id:ID!):SiteUser!

}



input UpdateUser_Country_Input{
    id:ID!
    country_name:String
}



input UpdateUser_Addres_Input{
    id:ID!
    unit_number:String
    street_number:String
    address_line1:String
    address_line2:String
    city:String
    region:String
    postal_code:String
    country:UpdateUser_Country_Input
}

input UpdateUser_UserAddres_Input{
    user_id:ID!
    isDefault:Boolean
    address:UpdateUser_Addres_Input
}



input UpdateUser_Input{
    email:String
    phone_no:String
    address:UpdateUser_UserAddres_Input
    user_role:Role
}


type UpdateUserMessage{
    message:String!
}


input VerifyTokenInput{
    token:String!,
    newPassword:String!,

}
type VerifyTokenMessage{
    message:String!
}

type AuthRootMutation{
    createUser(userInput:SiteUserInput):SiteUser
    loginUser(userInput:LoginInput):User
    forgetPassword(userInput:ForgetPasswordInput):ForgetPasswordMessage!
    changePassword(userInput:ChangePasswordInput):User
    verifyToken(userInput:VerifyTokenInput):VerifyTokenMessage
    updateUser(userInput:UpdateUser_Input):SiteUser
    
}



type ProductVariation{
    id:ID
    variation_option:[ProductVariation_Option]
    category_id:ID
    name:String
}

type ProductVariation_Option{
    id:ID
    variation_id:ID
    value:String
}


input ProductVariation_Input{
    id:ID
    variation_option:[ProductVariation_Option_Input]
    category_id:ID 
    name:String
}

input ProductVariation_Option_Input{
    id:ID
    variation_id:ID
    value:String    
}


type Promotion{
    id:ID
    name:String
    description:String
    discount_rate:String
    start_date:String
    end_date:String
}

input PromotionInput{
    id:ID
    name:String
    description:String
    discount_rate:String
    start_date:String
    end_date:String
}

type PromotionCategory{
    promotion_id:ID
    promotion:Promotion
}

input PromotionCategoryInput{
    promotion_id:ID
    promotion:PromotionInput
}

type ProductCategory{
    id : ID
    variation:[ProductVariation]
    promotion_category:PromotionCategory
    category_name:String
}


input ProductCategoryInput{
    id : ID
    variation:[ProductVariation_Input]
    promotion_category:PromotionCategoryInput
    category_name:String
}


type ProductImage{
    id:ID
    product_image:String
}

input ProductImageInput{
    id:ID
    product_image:String
}

type ProductDescription{
    id:ID
    description:String
}

input ProductDescriptionInput{
    id:ID
    description:String
}


type Product{
    id:ID
    productCategory:ProductCategory
    title:String
    product_item:ProductItem
    description:[ProductDescription]
    featured:Boolean
    product_banner:String
}



input ProductInput{
    id:ID
    productCategory:ProductCategoryInput
    title:String
    product_item:ProductItemInput
    description:[ProductDescriptionInput]
    featured:Boolean
    product_banner:String!
}


type ProductItem{
    id :ID
    SKU:String
    qty_in_stock:String
    product_image:[ProductImage]
    price:String
    
}


input ProductItemInput{
    id :ID
    SKU:String
    qty_in_stock:String
    product_image:[ProductImageInput]
    price:String
    
}

type ProductRootQuery {
    hello:String
    getAllProducts:[Product]
    getSingleProdonuct(id:ID):Product
    getFeaturedProducts:[Product]
}

type ProductRootMutation{
    createProduct(userInput:ProductInput):Product
    
        
}







input RemoveInput{
    id:ID,
    prodId:ID,
}




type RootQuery{
    getAllProducts:[Product]
    getSingleProduct(id:ID):Product
    getFeaturedProducts:[Product]
    hello:String
    getCartItems(id:ID):shoppingCart
    fetchAllUsers:[SiteUser]!

    fetchReviews(id:ID):[Review]

}

type RemoveMessage{
    message:String
}

type CartCreatedMessage{
    message:String
}

input AddToCart{
    id:ID,
    prodId:ID,
    qty:String,
}

type AddedMessage{
    message:String
}

type UserDeletedMsg{
    message:String
}

type ProductDeletedMsg{
    message:String
}


type Review{
    id:ID
    user_id:ID
    ordered_product_id:ID,
    rating_value:String
    comment:String
}


input ReviewInput{
    id:ID
    user_id:ID
    ordered_product_id:ID,
    rating_value:String
    comment:String
}

type ReviewMessage{
    message:String
}



type CheckoutMessage{
    message:String
    pay_url:String
    redirect_url:String
}

type shoppingCartItem{
    id:ID
    cart_id:ID
    product:Product
    qty:String
}

type shoppingCart{
    id:ID,
    cart_item:[shoppingCartItem]
    
}


input shoppingCartItemInp{
    id:ID
    cart_id:ID
    product_item_id:ID
    qty:String
}

input shoppingCartInp{
    id:ID
    user_id:ID
    cart_item:shoppingCartItemInp
}


type PaymentIntent{
    cart:shoppingCart
    
}





type RootMutation{
    createProduct(userInput:ProductInput):Product
    createUser(userInput:SiteUserInput):SiteUser
    loginUser(userInput:LoginInput):User
    forgetPassword(userInput:ForgetPasswordInput):ForgetPasswordMessage!
    changePassword(userInput:ChangePasswordInput):User
    verifyToken(userInput:VerifyTokenInput):VerifyTokenMessage
    updateUser(userInput:UpdateUser_Input):SiteUser
    createCart(userInput:shoppingCartInp):CartCreatedMessage
    removeFromCart(userInput:RemoveInput):RemoveMessage
    addToCart(userInput:AddToCart):AddedMessage,
    deleteUser(id:ID):UserDeletedMsg
    deleteProduct(id:ID):ProductDeletedMsg
    createReview(userInput:ReviewInput):ReviewMessage
    updateReview(userInput:ReviewInput):ReviewMessage
    deleteReview(id:ID):ReviewMessage
    checkoutSession(id:ID):CheckoutMessage
}



schema{
    query:RootQuery,
    mutation:RootMutation
}
`)

module.exports = rootSchema


