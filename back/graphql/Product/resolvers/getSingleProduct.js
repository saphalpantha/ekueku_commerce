const { eq } = require("drizzle-orm");
const { getDb, getDbComplex } = require("../../../lib/db/db");
const { product } = require("../../../migrations/schema");
const ErrorResponse = require("../../../utils/ErrorResponse");

const getSingleProduct = async ({ id }, req) => {

let response;

const db = getDbComplex()
try {
  response = await db.query.product.findMany({
    where:eq(product.id , id),
    with:{
      productItem:true,
      description:true,
      productImage:true,
      productCategory:{
        with:{
          promotionCategory:{
            with:{
              promotion:true,
            },
          },

          variation:true
        }
      }
    }
  });

  console.log(response)
  if (response?.length == 0) {
    throw new ErrorResponse("No Products Found");
  }

  return response;
} catch (err) {
  console.log(err)
  if(response?.rows?.length === 0){
    throw new ErrorResponse(err)
  }
  throw new ErrorResponse("Failed to Fetch Products", 504);
}
};

exports.getSingleProduct = getSingleProduct;
