const { getDb } = require("../../../lib/db/db");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { hashPassword } = require("../../../utils/bcrypt");
const { isCreateUserValid, isUserExists } = require("../../../utils/validators/authValidator");

const  createUser = async ({ userInput }, req) => {
    const uuid = require('uuid')
    const userSession = req.session.userSes;
    const roleIs = userSession?.role;
    if (roleIs === "CLIENT" || roleIs === "SELLER") {
      throw new ErrorResponse("You Are Logged In.Try again by Signing Out!");
    }

    console.log(userInput)
    const { email, password, role, phone_no } = userInput;
    // validation
    const errorResults = isCreateUserValid(email, password, role, phone_no);
    console.log(errorResults);
    if (errorResults.length != 0) {
      throw new ErrorResponse("Try Again with Correct Input", 404);
    }
    if (await isUserExists(email)) {
      throw new ErrorResponse("User Already Exists", 404);
    }
    const hashedPassword = await hashPassword(password);

    const userId = uuid.v4(4);
    const db = getDb();
    try {
      const results = await db.query(
        `INSERT into site_users values('${userId}','${email}', '${phone_no}', '${hashedPassword}' , '${role}')`
      );
      console.log(results);
    } catch (err) {
      throw new ErrorResponse("Failed to Create User!", 500);
    }
    return  {
      user_id: userId,
      email: email,
      user_role: role,
    };
  }

  module.exports = createUser