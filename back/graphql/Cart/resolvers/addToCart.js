const { eq, sql } = require("drizzle-orm")
const { getDbComplex } = require("../../../lib/db/db")
const {  shoppingCart, shoppingCartItem, ShoppingCartItem } = require("../../../migrations/schema")
const ErrorResponse = require("../../../utils/ErrorResponse")


const uuid = require('uuid')
const addToCart = async ({userInput},req) => {
    const {id, prodId,qty} = userInput
    const db = getDbComplex()
    
    let productInCart 

    let isProductExistsinCart;

    try{
        productInCart = await db.select().from(shoppingCartItem).where(eq(prodId,shoppingCartItem?.prodid))
        productInCart = await db.query.shoppingCartItem.findMany({
            where:eq(shoppingCartItem.prodid, prodId),
                
        })

        isProductExistsinCart  = productInCart.length > 0
        console.log(isProductExistsinCart)

        if(isProductExistsinCart){
            try{
                const updateResponse = await db.update(shoppingCartItem).set({
    
                    qty:qty?(+productInCart[0]?.qty + qty ) : (+productInCart[0]?.qty + 1 )
                }).where(eq(shoppingCartItem.prodid,prodId))
    
                return {
                    message:"Item Added to cart"
                }
                
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            try{
                const insertRes = await db.insert(shoppingCartItem).values({
                    id:uuid.v4(),
                    cartId:id,
                    prodid:prodId,
                    qty:1,
                    
                })
                return {
                    message:`Product ${prodId} is added to cart`
                }
            }
            catch(err){
                console.log(err)
            }
        }

       
    }
    catch(err){
        console.log(err)
    }

    // try{
    //     const response = db.update(shoppingCartItem).set({
    //         qty:shoppingCartItem.qty-1,
    //     }).where(eq(shoppingCart.id, id))
    //     console.log(response)
    // }
    // catch(err){
    //     console.log(err);
    
    // }
}

exports.addToCart = addToCart