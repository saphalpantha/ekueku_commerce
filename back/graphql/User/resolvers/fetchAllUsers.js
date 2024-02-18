const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");

const  fetchAllUsers = async(args,req) =>  {
  console.log(req)
    const userSession = req.session.userSes;
    const roleIs = userSession?.role;


    
    if (roleIs != "ADMIN") {
      throw new ErrorResponse("Not Authenicated", 500);
    }

    const db = getDb();
    const data = await db.query(
      `SELECT user_id,email,phone_no,user_role FROM site_users`
    );
    if (data.rows.length === 0) {
      throw new Error("No User Found", 500);
    }
    return data.rows;
  }

  module.exports = fetchAllUsers