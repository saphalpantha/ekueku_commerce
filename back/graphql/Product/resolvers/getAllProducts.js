const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");

const getAllProducts = async (args, req) => {

    const allProductQuery = `select * from product_item  as pi 
    join product as p on p.id=pi.product_id
    join product_category as pc on pc.id=p.category_id
    join variation as v on v.category_id=pc.id
    join variation_option as vo on vo.variation_id=v.id
    join promotion_category as pro_c on pro_c.category_id=pc.id
    join promotion as prm on prm.id=pro_c.promotion_id;`;

    const db = getDb();
    try {
      const response = await db.query(allProductQuery);
      if (response.rows.length <= 0) {
        throw new ErrorResponse("No Products Found",404);
      }

      return response.rows;
    } catch (err) {
      throw new ErrorResponse("Failed to Fetch Products", 504);
    }
  }

  exports.getAllProducts = getAllProducts