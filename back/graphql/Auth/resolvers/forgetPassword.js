const { isEmail } = require("validator/validator");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { isUserExists, generateResetToken } = require("../../../utils/validators/authValidator");
const { getDb } = require("../../../lib/db/db");
const { sendForgetPasswordToken } = require("../../../lib/mail-service/nodemailer");

const  forgetPassword =  async ({ userInput }, req) => {
    const userSession = req.session.userSes;
    const sessionEmail = userSession.email;

    if (!sessionEmail) {
      throw new ErrorResponse("Not Authenicated", 404);
    }
    const email = userInput.email;
    const origin = req.headers.origin;
    if (!isEmail(email)) {
      throw new ErrorResponse("Email is not Valid!");
    }
    const isUserExist = await isUserExists(email);
    if (!isUserExist) {
      throw new ErrorResponse("No User Exists for this Email");
    }
    const tokenAcessDate = new Date().toUTCString();
    console.log(tokenAcessDate);
    const tokenId = uuid.v4(4);

    const token = generateResetToken();
    const db = getDb();
    try {
      const resposne = await db.query(
        `INSERT INTO reset_tokens values ('${tokenId}', '${tokenAcessDate}' , '${token}', '${email}')`
      );
    } catch (err) {
      console.log(err);
      throw new ErrorResponse("Something went wrong", 500);
    }
    const reponse = await sendForgetPasswordToken(email, token, origin);
    return {
      message: `Reset Link is sent to ${email} `,
    };
  }

  module.exports = forgetPassword