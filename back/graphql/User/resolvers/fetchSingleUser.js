const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");

const fetchSingleUser = async ({ id }) => {
  const userSession = req.session.userSes;
  const email = userSession.email;

  if (!email) {
    throw new ErrorResponse("Not Authenicated", 404);
  }
  if (isEmpty(id)) {
    throw new ErrorResponse("Not a Valid Id!", 404);
  }
  const db = getDb();
  const data = await db.query(`SELECT 
       *
   FROM 
       product_item pi
   JOIN 
       product p ON pi.product_id = p.id
   JOIN 
       product_category pc ON p.category_id = pc.id
       `);
  if (data.rows.length === 0) {
    throw new ErrorResponse("No User Found", 500);
  }
  return data.rows[0];
};

module.exports = fetchSingleUser;
