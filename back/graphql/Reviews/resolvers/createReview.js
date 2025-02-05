const { getDbComplex } = require("../../../lib/db/db");
const { userReview } = require("../../../migrations/schema");
const uuid = require('uuid');
const ErrorResponse = require("../../../utils/ErrorResponse");

const createReview = async ({userInput}, req) => {

    const reviewId  = uuid.v4();
    const session = req.session.userSes;
    console.log(session.user_id,'ooooooooooooooooooooooooooooooooooo')
    const user_id = session.user_id;
    const ordered_product_id   = userInput?.ordered_product_id
    console.log(userInput)

    const db = getDbComplex();

    try{
        await db.insert(userReview).values({
            id:reviewId,
            userId:user_id,
            orderedProductId:ordered_product_id,
            ratingValue:userInput.rating_value,
            comment:userInput.comment,
        })
        
        return  {
            message:`Review Created for product ${userInput.ordered_product_id}`
        }
    }
    catch(err){
        console.log(err)
        throw new ErrorResponse('Failed to Post Review',404);
    }
    
}

exports.createReview = createReview