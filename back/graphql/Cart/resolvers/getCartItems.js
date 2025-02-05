const { getDbComplex } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { shoppingCart } = require("../../../migrations/schema");
const { eq } = require("drizzle-orm");

const getCartItems = async ({ id }) => {
  if (!id) {
    throw new ErrorResponse("No Id Provided !");
  }

  

  const db = getDbComplex();
  try {
    const cartRes = await db.query.shoppingCart.findMany({
      where: eq(id, shoppingCart.id),

      with: {
        shoppingCartItem: {

          with: {
            product: {
              with: {
                productItem: true,
                description: true,
                productImage: true,
                productCategory: {
                  with: {
                    variation:true
                  },

                },
              },
            },
          },
        },
      },
    });
    
    return {
       ...cartRes[0],
        cart_item:cartRes[0].shoppingCartItem.map(item => {
          return {
            id:item.id,
            cart_id:item.cartId,
            product:item.product,
            qty:item.qty
          }
        })
    }

  } catch (err) {
    console.log(err);
    throw new ErrorResponse("Error fetching cart items");
  }
};

exports.getCartItems = getCartItems;
