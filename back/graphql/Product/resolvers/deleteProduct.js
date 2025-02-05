const { eq } = require("drizzle-orm");
const { getDbComplex } = require("../../../lib/db/db");
const { variationOption, variation, product, productItem, productCategory } = require("../../../migrations/schema");

const deleteProduct = async ({userInput},req) => {
    
    
    const prodId = userInput?.id
    const userId = req.session?.userSes?.user_id;
    const isClient = req.session?.userSes?.role == "CLIENT"; 
    console.log(isClient, '-' , userId,'isClient')
    if(!userId && !isClient ){
        throw new Error('Not Authenicated')
    }


    const db = getDbComplex();

    try {
        await db.transaction(async (tx) => {

            
            await tx.delete(variationOption)
                .where(join(variationOption, variation).on(eq(variationOption.variationId, variation.id)))
                .execute();


            await tx.delete(variation)
                .where(join(variation, productCategory).on(eq(variation.categoryId, productCategory.id)).and(eq(productCategory.id, product.categoryId)))
                .execute();


            await tx.delete(promotion)
                .where(join(promotion, promotionCategory).on(eq(promotionCategory.promotionId, promotion.id)))
                .execute();


            await tx.delete(promotionCategory)
                .where(join(promotionCategory, productCategory).on(eq(promotionCategory.categoryId, productCategory.id)).and(eq(productCategory.id, product.categoryId)))
                .execute();

            await tx.delete(productCategory)
                .where(join(productCategory, product).on(eq(productCategory.id, product.categoryId)).and(eq(product.id, productId)))
                .execute();

            await tx.delete(productImage)
                .where(eq(productImage.prodid, productId))
                .execute();

            await tx.delete(description)
                .where(eq(description.prodid, productId))
                .execute();

            await tx.delete(productItem)
                .where(eq(productItem.productId, productId))
                .execute();

            await tx.delete(product)
                .where(eq(product.id, productId))
                .execute();
        });

        return {
            message: `Product with ID ${productId} and its related records have been deleted`
        };
    } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product and its related records");
    }
    


}


exports.deleteProduct = deleteProduct


 