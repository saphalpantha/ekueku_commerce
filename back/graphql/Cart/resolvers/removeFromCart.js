const { eq } = require("drizzle-orm")
const { getDbComplex } = require("../../../lib/db/db")
const {  shoppingCart, shoppingCartItem, ShoppingCartItem } = require("../../../migrations/schema")
const ErrorResponse = require("../../../utils/ErrorResponse")

const removeFromCart = async ({userInput},req) => {
    const {id, prodId} = userInput
    const db = getDbComplex()

    let quantityforProduct;
    try{
         quantityforProduct = await db.query.shoppingCartItem.findMany({
            where:eq(shoppingCartItem.prodid, prodId),
            columns:{
                qty:true
            }
        })

        console.log(quantityforProduct)

        
        if(quantityforProduct.length <= 0){
            throw new ErrorResponse('No Product Found',404);
        }

        if(quantityforProduct[0]?.qty <=  1){
            const deleteResponse =   await db.delete(shoppingCartItem).where(eq(shoppingCartItem.prodid, prodId))
            
            return {
                message:"Item Removed from cart"
            }
        }

        try{
        
            const updateResponse = await db.update(shoppingCartItem).set({

                qty:+quantityforProduct[0].qty-1
            }).where(eq(shoppingCartItem.prodid,prodId))

            console.log(updateResponse)
            return {
                message:"Item Removed from cart"
            }
            
        }
        catch(err){
            console.log(err)
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

exports.removeFromCart = removeFromCart