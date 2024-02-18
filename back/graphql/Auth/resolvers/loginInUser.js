const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { comparePass } = require("../../../utils/bcrypt");
const { isLoginUserValid, isUserExists } = require("../../../utils/validators/authValidator");



const loginUser = async ({ userInput }, req) =>  {
    
    const { email, password } = userInput;
    const errorResults = isLoginUserValid(email, password);
    if (errorResults.length != 0) {
      throw new ErrorResponse(errorResults[0].msg),404;
    }
    const isUserExist = await isUserExists(email);
    if (!isUserExist) {
      throw new ErrorResponse(`User doesn't exits!`, 500);
    }
    const db = getDb();
    const user = await db.query(
      `SELECT user_password FROM site_users where email='${email}'`
    );
    const hashedPass = user.rows[0].user_password;
    const isMatched = await comparePass(password, hashedPass);

    if (!isMatched) {
      throw new ErrorResponse("Invalid Credentials");
    }

    req.session.userSes = {
      isLoggedIn: true,
      email: email,
      role: "CLIENT",
    };
    // jwt sign in / and verify
    return {
        
       userInput
        
    };
  }



module.exports = loginUser