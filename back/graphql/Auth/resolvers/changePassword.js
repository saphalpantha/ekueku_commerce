const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { comparePass, hashPassword } = require("../../../utils/bcrypt");
const { changePasswordValidate } = require("../../../utils/validators/authValidator");

const  changePassword = async ({ userInput }, req) => {
    const userSession = req.session.userSes;
    const email = userSession.email;

    if (!email) {
      throw new ErrorResponse("Not Authenicated!", 404);
    }
    const currentPassword = userInput.currentPassword;
    const newPassword = userInput.newPassword;
    const errorResults = changePasswordValidate(currentPassword, newPassword);
    if (errorResults.length != 0) {
      return errorResults[0].msg;
    }
    if (!userSession) {
      throw new ErrorResponse("Internal Server Error", 500);
    }

    let isPassValid = false;
    const db = getDb();
    try {
      const user = await db.query(
        `SELECT user_password FROM site_users where email='${email}'`
      );
      const hashedPassword = user.rows[0].user_password;
      isPassValid = await comparePass(currentPassword, hashedPassword);
      console.log(isPassValid);
    } catch (err) {
      console.log(err);
      throw new ErrorResponse(`Email doesn't match`, 404);
    }
    if (!isPassValid) {
      throw new ErrorResponse(`Password Doesn't match`, 404);
    }
    const hashed = await hashPassword(newPassword);
    try {
      const response = await db.query(
        `UPDATE site_users SET user_password='${hashed}' where email='${email}'`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    return {
      user_id: "faoids",
    };
  }


  module.exports = changePassword