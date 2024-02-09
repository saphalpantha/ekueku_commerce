
const { getDb } = require("../../lib/db/db");
const { hashPassword, comparePass } = require("../../utils/bcrypt");
const { isCreateUserValid, isLoginUserValid, isUserExists, changePasswordValidate } = require("../../utils/validators/authValidator");

const uuid = require('uuid');
const ErrorResponse = require("../../utils/ErrorResponse");
const { isEmail } = require("validator/validator");

module.exports = {
    async createUser({userInput},req){
        const {email,password,role,phone_no} = userInput
        // validation
        console.log(userInput)
        const errorResults = isCreateUserValid(email,password,role,phone_no);
        console.log(errorResults)
        if(errorResults.length != 0){
            throw new ErrorResponse('Try Again with Correct Input',404)
        }

        if(await isUserExists(email)){
            throw new ErrorResponse('User Already Exists',404)
        }
        const hashedPassword =  await hashPassword(password);
    
        const userId = uuid.v4(4)
        const db = getDb();
        try{   
            const results = await db.query(`INSERT into site_users values('${userId}','${email}', '${phone_no}', '${hashedPassword}' , '${role}')`)
            console.log(results)
        }
        catch(err){ 
            throw new ErrorResponse('Failed to Create User!',500)
        }
            return {
            user_id:userId,
            email:email,
            user_role:role,   
        }
    }
    ,
    async fetchAllUsers(){
        const db = getDb();
       const data =  await db.query(`SELECT user_id,email,phone_no,user_role FROM site_users`);
       if(data.rows.length === 0){
        throw new Error('No User Found', 500);
       }
       return data.rows
    },

    async fetchSingleUser({id}){
        const db = getDb();
        // use join to get all the user dtaits // join with site_users, cart,address, country.
       const data =  await db.query(`SELECT * FROM site_users`);
       if(data.rows.length === 0){
        throw new ErrorResponse('No User Found',500);
       }
       return data.rows
    },
    
    async loginUser({userInput}, req){
        
       const {email,password} = userInput
       const errorResults = isLoginUserValid(email,password)  
       if(errorResults.length != 0 ){
        throw new Error(errorResults[0].msg)
       }
       console.log(email)
       const isUserExist = await isUserExists(email);
       if(!isUserExist){
        throw new ErrorResponse(`User doesn't exits!`,500)
       }
       const db = getDb()
       const user = await db.query(`SELECT user_password FROM site_users where email='${email}'`);
       const hashedPass = user.rows[0].user_password
       const isMatched = await comparePass(password,hashedPass)
    

       if(!isMatched){
        throw new ErrorResponse('Invalid Credentials')
       }
       

       
    
       req.session.userSes = {
        isLoggedIn:true,
        email:email,
        role:"CLIENT",
       }
       // jwt sign in / and verify
       return userInput


       
    }
,
    async forgetPassword({userInput},req){
        const email = userInput.email
        if(!isEmail(email)){
            throw new ErrorResponse('Email is not Valid!');
        }

        const isUserExist = await isUserExists(email);
        if(!isUserExist){
            throw new ErrorResponse('No User Exists for this Email');
        }
        

        // nodemailer
        

    }

,
    async changePassword({userInput},req){

        const userSession = req.session.userSes; 
        const email = userSession.email 
        const currentPassword = userInput.currentPassword  
        const newPassword = userInput.newPassword
        const errorResults = changePasswordValidate(currentPassword,newPassword)
        if(errorResults.length != 0){
            return errorResults[0].msg
        }
        if(!userSession){
            throw new ErrorResponse('Internal Server Error',500);
        }
        
        let isPassValid = false
        const db = getDb()
        try{
            const user = await db.query(`SELECT user_password FROM site_users where email='${email}'`);
            const hashedPassword = user.rows[0].user_password
            isPassValid = await comparePass( currentPassword,hashedPassword);
            console.log(isPassValid)
        }
        catch(err){
            console.log(err)
            throw new ErrorResponse(`Email doesn't match`,404);
        }
        if(!isPassValid){
            throw new ErrorResponse(`Password Doesn't match`,404)
        }
        const hashed = await hashPassword(newPassword);
        try{
            
            const response =  await db.query(`UPDATE site_users SET user_password='${hashed}' where email='${email}'`)
            console.log(response)
        }
        catch(err){
            console.log(err)
        }

        return {
            user_id:"faoids"
        }
          
    }

    ,
    getSingleProduct({id},req){
        // return single product
        
    }

    ,

    getFeaturedProducts(args,req){
        // return featured products
    }



    
}