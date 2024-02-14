const { getDb } = require("../../lib/db/db");
const { hashPassword, comparePass } = require("../../utils/bcrypt");
const {
  isCreateUserValid,
  isLoginUserValid,
  isUserExists,
  changePasswordValidate,
  generateResetToken,
} = require("../../utils/validators/authValidator");

const uuid = require("uuid");
const ErrorResponse = require("../../utils/ErrorResponse");
const { isEmail, isEmpty } = require("validator/validator");
const {
  sendForgetPasswordToken,
} = require("../../lib/mail-service/nodemailer");

module.exports = {
  async createUser({ userInput }, req) {
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
    return {
      user_id: userId,
      email: email,
      user_role: role,
    };
  },
  async fetchAllUsers() {
    const db = getDb();
    const data = await db.query(
      `SELECT user_id,email,phone_no,user_role FROM site_users`
    );
    if (data.rows.length === 0) {
      throw new Error("No User Found", 500);
    }
    return data.rows;
  },

  async fetchSingleUser({ id }) {
    if (isEmpty(id)) {
      throw new ErrorResponse("Not a Valid Id!");
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
  },

  async loginUser({ userInput }, req) {
    const { email, password } = userInput;
    const errorResults = isLoginUserValid(email, password);
    if (errorResults.length != 0) {
      throw new Error(errorResults[0].msg);
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
    return userInput;
  },
  async forgetPassword({ userInput }, req) {
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
  },

  async changePassword({ userInput }, req) {
    const userSession = req.session.userSes;
    const email = userSession.email;
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
  },

  getSingleProduct({ id }, req) {},

  getFeaturedProducts(args, req) {},

  async verifyToken({ userInput: { token, newPassword } }, req) {
    const userSession = req.session.userSes;
    const email = userSession.email;
    if(!email){
      throw new ErrorResponse(`Not Authenticated!`,404)
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
        
        if (storedToken !== token ) {
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
      } catch (err) {
      }
    } catch (err) {
      throw new ErrorResponse("Something went wrong", 404);
    }
  },
};
