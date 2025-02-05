const { getDbComplex } = require("../../../lib/db/db");
const { userReview } = require("../../../migrations/schema");
const uuid = require('uuid');
const ErrorResponse = require("../../../utils/ErrorResponse");
const { eq } = require("drizzle-orm");

const updateReview = async ({userInput}, req) => {

    const id  = userInput.id;
    
    const session = req.session?.userSes;
    const user_id = session?.user_id;
    const ordered_product_id   = userInput.ordered_product_id
    const rating_value = userInput.rating_value
    const comment = userInput.comment

    const db = getDbComplex();

    try{
        await db.update(userReview).set({
            userId:user_id,
            orderedProductId:ordered_product_id,
            ratingValue:rating_value,
            comment:comment,
        }).where(eq(userReview.id,id))
        
        return  {
            message:`Review Update for product ${userInput.ordered_product_id}`
        }
    }
    catch(err){
        console.log(err)
        throw new ErrorResponse('Failed to Update Review',404);
    }
    
}

exports.updateReview = updateReview