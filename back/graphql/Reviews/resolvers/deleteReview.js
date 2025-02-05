const { eq } = require("drizzle-orm");
const { getDbComplex } = require("../../../lib/db/db");
const { userReview } = require("../../../migrations/schema");
const ErrorResponse = require("../../../utils/ErrorResponse");

const deleteReview =  async ({id},req) => {
    const session = req.session?.userSes;

    const db = getDbComplex();

    try{
        await db.delete(userReview).where(eq(userReview.id, id));

        return {
            message:`Product Review deleted!`
        }
    }
    catch(err){
        console.log(err)
        throw new ErrorResponse('Failed to delete Review!')
    }
}

exports.deleteReview = deleteReview