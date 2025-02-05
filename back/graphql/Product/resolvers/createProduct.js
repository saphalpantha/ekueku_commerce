const uuid = require("uuid");
const {
  isCreateProductValid,
} = require("../../../utils/validators/productValidator");
const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const createProduct = async ({ userInput }, req) => {
  //validate all

  // const errors = isCreateProductValid(userInput);

  // console.log(userInput)

  
const productId = uuid.v4(20)
const categoryId = uuid.v4(10)
const productItemId = uuid.v4(20)
const promotionId = uuid.v4(10)


  const db = getDb();

  //   =======================================================================================================================
  //   description
  //   =======================================================================================================================

  const descQuery = userInput.description?.map((i) => {
    const descId = uuid.v4(20);
    return `INSERT INTO description values ('${descId}', '${productId}', '${i.description}')`;
  });

  descQuery.forEach(async (desc) => {
    try {
      const response = await db.query(desc);
      console.log(response, "response_*");
    } catch (err) {
      throw new ErrorResponse("Failed to Insert Descriptions");
    }
  });

  // =======================================================================================================================
  //   image query
  //   =======================================================================================================================

  const productImageQuery = userInput?.product_item?.product_image?.map((i) => {
    // const imageId = uuid.v4(10);
    return `INSERT INTO product_image values ('${uuid.v4(10)}', '${productId}', '${i.product_image}')`;
  });

  productImageQuery.forEach(async (img) => {
    try {
      const response = await db.query(img);
      console.log(response, "image_*");
    } catch (err) {
      throw new ErrorResponse("Failed to Insert Images");
    }
  });

  // =======================================================================================================================
  //   variation querry
  //   =======================================================================================================================

  let variation_optionQuery = [];

  const variationQuery = userInput.productCategory.variation?.map((i) => {
    const variationId = uuid.v4(20);
    const variation_Query_String = `INSERT INTO variation values ('${variationId}', '${categoryId}', '${i.name} ')`;
    variation_optionQuery = i.variation_option?.map((op) => {
      const variation_optionId = uuid.v4(10);
      return `INSERT INTO variation_option values ('${variation_optionId}', '${variationId}', '${op.value}' )`;
    });

    return variation_Query_String;
  });

  variationQuery.map(async (v_query) => {
    try {
      const response = await db.query(v_query);
      console.log(response, "variationquery");
    } catch (err) {
      console.log(err);
      throw new ErrorResponse("Failed to Insert Variation");
    }
  });

  variation_optionQuery?.map(async (i) => {
    try {
      const resposne = await db.query(i);
      console.log(resposne, "variation_option");
    } catch (err) {
      console.log(err);
    }
  });

  // productImageQuery.forEach(async (img) => {
  //   try {
  //     const response = await db.query(img);
  //     console.log(response, "product_image_insert");
  //   } catch (err) {
  //     console.log(err);
  //     // throw new ErrorResponse("Failed to Insert Description");
  //   }
  // });




  const { productCategory } = userInput;
  const productInsertQuery = `INSERT INTO product values ('${productId}', '${categoryId}', '${userInput.title}', '${userInput.product_banner}', '${userInput.featured}')`;
  const productItemInsertQuery = `INSERT INTO product_item values ('${productItemId}', '${productId}', '${userInput.product_item.SKU}', '${userInput.product_item.qty_in_stock}', '${userInput.product_item.price}')`;
  const productCategory_PromotionInsertQuery = `INSERT INTO promotion values ('${promotionId}', '${productCategory.promotion_category.promotion.name}', '${productCategory.promotion_category.promotion.description}', '${productCategory.promotion_category.promotion.discount_rate}', '${productCategory.promotion_category.promotion.start_date}', '${productCategory.promotion_category.promotion.end_date}')`;
  const productCategoryInsertQuery = `INSERT INTO product_category values ('${categoryId}', '${categoryId}', '${productCategory.category_name}')`;

  // console.log(
  //   productInsertQuery,
  //   "\n\n",
  //   productItemInsertQuery,
  //   "\n\n",
  //   productCategoryInsertQuery,
  //   "\n\n",
  //   productCategory_PromotionInsertQuery,
  //   "\n\n",
  //   productCategoryInsertQuery,
  //   "\n\n"
  // );



  try{
    await db.query('BEGIN')
   await db.query(productCategoryInsertQuery);
   await db.query(productInsertQuery); 
   await db.query(productItemInsertQuery);
   await db.query(productCategory_PromotionInsertQuery);
   await db.query('COMMIT')
   console.log('Succesfully Completed') 
  }
  catch(err){
    await db.query('ROLLBACK');
    console.error("Error inserting products data:", err);
    console.log(err)
  }
  
};

exports.createProduct = createProduct;
