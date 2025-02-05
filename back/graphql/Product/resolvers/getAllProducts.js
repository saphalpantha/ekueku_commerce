const { getDb, getDbComplex } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");





const getAllProducts = async (args, req) => {

  //   const allProductQuery =  `SELECT
  //   p.id AS product_id,
  //   p.title,
  //   p.product_banner,
  //   p.featured
  //   json_build_object(
  //       'id', pc.id,
  //       'category_name', pc.category_name,
  //       'promotion_category', json_build_object(
  //           'promotion_id', prm.id,
  //           'promotion', json_build_object(
  //               'id', prm.id,
  //               'name', prm.name,
  //               'description', prm.description,
  //               'discount_rate', prm.discount_rate,
  //               'start_date', prm.start_date,
  //               'end_date', prm.end_date
  //           )
  //       ),
  //       'variation', json_build_object(
  //           'id', v.id,
  //           'name', v.name,
  //           'variation_option', json_agg(
  //               json_build_object(
  //                   'id', vo.id,
  //                   'value', vo.value
  //               )
  //           )
  //       )
  //   ) AS productCategory,
  //   json_build_object(
  //       'id', pi.id,
  //       'SKU', pi.sku,
  //       'qty_in_stock', pi.qty_in_stock,
  //       'price', pi.price,
  //       'product_image', (
  //           SELECT json_agg(
  //               json_build_object(
  //                   'id', i.id,
  //                   'image', i.image
  //               )
  //           ) FROM product_image i WHERE i.prodid = p.id
  //       )
  //   ) AS product_item,
  //   (
  //       SELECT json_agg(
  //           json_build_object(
  //               'id', d.id,
  //               'description', d.description
  //           )
  //       ) FROM description d WHERE d.prodid = p.id
  //   ) AS description
  // FROM
  //   product AS p
  // LEFT JOIN
  //   product_item AS pi ON p.id = pi.product_id
  // LEFT JOIN
  //   product_category AS pc ON p.category_id = pc.id
  // LEFT JOIN
  //   variation AS v ON pc.id = v.category_id
  // LEFT JOIN
  //   variation_option AS vo ON v.id = vo.variation_id
  // LEFT JOIN
  //   promotion_category AS pro_c ON pc.id = pro_c.category_id
  // LEFT JOIN
  //   promotion AS prm ON pro_c.promotion_id = prm.id
  // GROUP BY
  //   p.id,
  //   pc.id,
  //   prm.id,
  //   v.id,
  //   pi.id;
  // `;


    let response;

    const db = getDbComplex()
    try {
      response = await db.query.product.findMany({
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
      throw new ErrorResponse("Failed to Fetch Products", 504);
    }
  }


  exports.getAllProducts = getAllProducts