const {
  isEmail,
  isLength,
  isEmpty,
} = require("validator/validator");
const { getDb } = require("../../lib/db/db");

const isCreateUserValid =  (email, password, role, phone_no) => {
  console.log(role)
  const createUserErrors = [];

  if (!isEmail(email) || isEmpty(email)) {
    createUserErrors.push({ email: "Invalid Email!" });
  }

  if (!isLength(password, { min: 8, max: 16 }) || isEmpty(password)) {
    createUserErrors.push({ password: "Invalid Password" });
  }
  if(role != "CLIENT"){
    createUserErrors.push({role:'Role Must Provide'})
  }
 
  return createUserErrors;
};

exports.isCreateUserValid = isCreateUserValid;

const isLoginUserValid = (email, password) => {
  const loginUserError = [];
  if (!isEmail(email) || !isLength(password, { min: 5, max: 16 })) {
    loginUserError.push({ msg: "Email or Password is not Valid" });
  }
  return loginUserError;
};

exports.isLoginUserValid = isLoginUserValid;

const isUserExists = async (email) => {
  const db = getDb();
  try {
    const existingUser = await db.query(
      `SELECT email from site_users where email='${email}'`
    )
    console.log(existingUser,'exitsitngUser')
    return true
  } catch (err) {
    return false
  }
};

exports.isUserExists = isUserExists;


const changePasswordValidate = (password,newPassword) => {
  const changePasswordError = []
  if(!isLength(password,{min:5,max:16}) && !isLength(newPassword,{min:5,max:16})){
    changePasswordError.push({msg:'Password Length Doesnt Match'});
  }


  return changePasswordError
  
}

exports.changePasswordValidate = changePasswordValidate