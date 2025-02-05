const { getDbComplex } = require("../../../lib/db/db");
const { userReview } = require("../../../migrations/schema");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { eq } = require("drizzle-orm");

const fetchReviews = async ({id}, req) => {

    const session = req.session.userSes;
    const user_id = session?.user_id;



    const db = getDbComplex();

    try{
       const response =  await db.query.userReview.findMany({
            where:eq(userReview.orderedProductId,id),
            columns:{
                id:true,
                comment:true,
                userId:true,
                ratingValue:true,
                orderedProductId:true
            }
        })

        console.log(response)

    }
    catch(err){
        console.log(err)
        throw new ErrorResponse('Failed to Post Review',404);
    }
    
}

exports.fetchReviews = fetchReviews