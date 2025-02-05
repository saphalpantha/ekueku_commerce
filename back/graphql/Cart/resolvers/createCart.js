const uuid = require("uuid");
const { getDb } = require("../../../lib/db/db");


const createCart = async ({ userInput }, req) => {
  const cartId = uuid.v4(20);
  const userId = req.session?.userSes?.user_id;
  const db = getDb();
  if(!userId){
    throw new Error('Not Authenicated')
  }
  try {
        await db.query("BEGIN");
        await db.query(`INSERT INTO shopping_cart VALUES ($1, $2)`, [
          cartId,
          userId,
        ]);

      await db.query("COMMIT");

      console.log("Cart Created");
      return {
         
      }
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Error inserting data:", err);
  } finally {
    await db.end();
  }
};

exports.createCart = createCart;
