const { getDb } = require("../../lib/db/db");
const { hashPassword } = require("../../utils/bcrypt");
const { isCreateUserValid, isUserExists } = require("../../utils/validators/authValidator");

async function  createUser({userInput},req){

    const {email,password,role,phone_no} = userInput

    console.log(userInput,'ui')
    // validation

    const errorResults = isCreateUserValid(email,password,role,phone_no);
    if(errorResults.length == 0){
        throw new Error('fiaojd');
    }

    
    
    const hashedPassword =  await hashPassword(password);

    const userId = uuid.v4(4)
    const db = getDb();
    try{

        const results = await  db.query(`INSERT into site_users values('${userId}','${email}', '${phone_no}', '${hashedPassword}' , '${role}')`)
    }
    catch(err){
        throw new Error('Failed to Create User!')
    }
            return {
        user_id:userId,
        email:email,
        user_role:role,   
    }


    
}
exports.createUser = createUser