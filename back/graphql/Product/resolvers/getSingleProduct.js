const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");

const  getSingleProduct = async ({ id }, req) => {
    const singleProductQuery = `select * from product_item  as pi 
    join product as p on p.id=pi.product_id
    join product_category as pc on pc.id=p.category_id
    join variation as v on v.category_id=pc.id
    join variation_option as vo on vo.variation_id=v.id
    join promotion_category as pro_c on pro_c.category_id=pc.id
    join promotion as prm on prm.id=pro_c.promotion_id where id='${id}'`;

    const db = getDb();
    try {
      const response = await db.query(singleProductQuery);
      if (response.rows.length <= 0) {
        throw new ErrorResponse("No Products Found",404);
      }

      return response.rows[0];
    } catch (err) {
      throw new ErrorResponse("Failed to Fetch Product", 504);
    }
  }


  exports.getSingleProduct = getSingleProduct