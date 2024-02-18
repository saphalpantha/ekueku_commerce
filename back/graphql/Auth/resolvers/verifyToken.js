const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { hashPassword } = require("../../../utils/bcrypt");

const  verifyToken =  async ({ userInput: { token, newPassword } }, req) => {
    
    const userSession = req.session.userSes;
    const email = userSession.email;
    if (!email) {
      throw new ErrorResponse(`Not Authenticated!`, 404);
    }
    try {
      const db = getDb();
      let response;
      try {
        response = await db.query(
          `SELECT * FROM reset_tokens where email='${email}'`
        );

        // check whether the token is expire is not
        // const isDateExpire = new Date(response.rows[0].created_date) < new Date().toUTCString()
        // if(!isDateExpire){
        //   const t1 = new Date(response.rows[0].created_date).getTime()
        //   const t2 = new Date().getTime()
        //   console.log(t1,t2)
        //   const diff_in_h = Math.abs(Math.round((t2-t1)/3600));
        //   const diff_in_m = Math.abs(Math.round((t2-t1)/60))
        //   console.log(diff_in_h, diff_in_m)
        //   if(diff_in_h && diff_in_m > 2 ){
        //     throw new ErrorResponse('Token is Expired !');
        //   }

        // }
        const storedToken = response.rows[0].token;
        if (!storedToken) {
          throw new ErrorResponse(`No User Found for this ${email} `, 504);
        }

        if (storedToken !== token) {
          throw new ErrorResponse("Not a Valid Token", 504);
        } else {
          const hashedPassword = await hashPassword(newPassword);
          if (!hashedPassword) {
            throw new ErrorResponse("Something went Wrong!");
          }
          const responseData = await db.query(
            `UPDATE site_users set user_password='${hashedPassword}' where email='${email}'`
          );
          return {
            message: "Password Reset Succesfull",
          };
        }
      } catch (err) {}
    } catch (err) {
      throw new ErrorResponse("Something went wrong", 404);
    }
  }

  module.exports = verifyToken