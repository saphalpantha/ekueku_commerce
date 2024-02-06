const { user } = require("pg/lib/defaults");
const { getDb } = require("../../lib/db/db")

module.exports = {
    createUser({userInput},req){
        console.log(userInput)
        return userInput
    }

    ,

    async fetchAllUsers(){
        const db = getDb();
       const data =  await db.query(`SELECT user_id,email,phone_no,user_role FROM site_users `);
       console.log(data.rows)
       return data.rows
    },
    

    async loginUser({userInput}, req){
        console.log(userInput)
        return{
            ...userInput,
            user_id:'1',
        }
    }
,
    async forgetPassword({userInput},req){
        const email = userInput.email
        // send resetpassword token to email address
    }

,
    async changePassword({userInput},req){
          const currentPassword = userInput.currentPassword  
          const newPassword = userInput.newPassword
    }




    
}