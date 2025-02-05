const { getDb } = require("../../../lib/db/db");
const { updateProductValidate } = require("../../../utils/validators/productValidator");

const updateProduct = async ({userInput}) => {
    
    const productId = userInput.id
    const db = getDb()

    let exisitingProduct;
    const exisitingProductQuery = `select * from product p full join product_item pi on p.id=product_id full join product_category pc on pc.id=p.category_id full join promotion_category pro_cat on pro_cat.category_id=pc.id full join promotion prom on prom.id=pro_cat.promotion_id full join variation v on v.category_id=pc.id full join variation_option vo on vo.variation_id=v.id where p.id='${productId}'`

    


    try{

        const response = await db.query(exisitingProductQuery);
        // console.log(response)
        
        if(response.rows.length == 0){
            exisitingProduct = {}
            throw new Error('No User Found')
        }
        else{
            existingUser = response.rows[0]
        }
    }
    catch(err){
        console.log(err)
    }





    const userInp = Object.assign(exisitingProduct, userInput)

    // validate all

    
    const productErrors = updateProductValidate.validateProduct(userInp)

    const productItemErrors = updateProductValidate.validateProductItem(userInp)

    const promotionError = updateProductValidate.validatePromotion(userInp)

    

    console.log(productErrors, productItemErrors, promotionError)


    
    if(productErrors.length > 0){
        throw new ErrorResponse(productErrors)
    }


    if(productItemErrors.length > 0){
        throw new ErrorResponse(productItemErrors)
    }

    if(promotionError.length > 0) {
        throw new ErrorResponse(promotionError)
    }


    









    
















}


exports.updateProduct = updateProduct