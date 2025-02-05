const {
  isEmail,
  isLength,
  isEmpty,
  isPostalCode,
} = require("validator/validator");
const { getDb } = require("../../lib/db/db");

const isCreateUserValid =  (email, password, role, phone_no) => {
  
  const createUserErrors = [];
  
  if (!isEmail(email) || isEmpty(email)) {
    createUserErrors.push({ email: "Invalid Email!" });
  }

  if (!isLength(password, { min: 8, max: 16 }) || isEmpty(password)) {
    createUserErrors.push({ password: "Invalid Password" });
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
    if(existingUser.rows[0].email){
      return true
    }
    return false
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



const generateResetToken =  () => {
  return crypto.randomUUID()
}

exports.generateResetToken = generateResetToken


const resetTokenValidator =  async (resetToken, currentTime) => {

}

exports.resetTokenValidator= resetTokenValidator





const updateUserValidate = {
  siteUserValidator: (userInput) => {
    const errorMessage = []
    const {email, phone_no} = userInput
    if(!isEmail(email)){
      errorMessage.push({email:'Not a Valid Email'});
    }
    
    return errorMessage
  },

  addressValidator:  (userInput) => {
    const errorMessage = []
    const {unit_number,street_number, address_line1,address_line2, city,region,postal_code} = userInput.address.address

    if(isEmpty(unit_number)){
      errorMessage.push({unit_number:'Unit Number cannoot be empty'});
    }
    
    if(isEmpty(street_number)){
    errorMessage.push({street_number:'Street Number cannoot be empty'});
    }

    if(isEmpty(address_line1)){
      errorMessage.push({address_line1:"Address line 1 is missing"});
    }
    
    if(isEmpty(address_line2)){
      errorMessage.push({address_line2:"Address line 2 is missing"});

    }

    if(isEmpty(city) ){
      errorMessage.push({city:'City Cannot be Empty'});
    }


    if(isEmpty(region)){
      errorMessage.push({region:"Region Cannot be empty"})
    }


    console.log(postal_code)
    if(isEmpty(postal_code) || !isPostalCode(postal_code,'any')){
      errorMessage.push({postal_code:"Not a valid Postal Code"})
    }

    return errorMessage;
  },


  
  

  countryValidator: (userInput) => {
  
    const errorMessage = []
    const {country_name} = userInput.address.address.country;
    console.log(country_name)
    if(isEmpty(country_name)){
      errorMessage.push({country_name:"Please Enter Country Name !"});
    }

     return errorMessage
  }


  
}

exports.updateUserValidate = updateUserValidate