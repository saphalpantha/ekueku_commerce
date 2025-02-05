const { ConsoleLogWriter, eq } = require("drizzle-orm");
const { getDb, getDbComplex } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { product } = require("../../../migrations/schema");

const  getFeaturedProducts = async (args, req)=> {
  

  


    let response;

    const db = getDbComplex()
    try {
      response = await db.query.product.findMany({
        where:eq(product.featured , true),

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
  }

  module.exports = getFeaturedProducts