const { getDbComplex } = require("../../../lib/db/db");
const { siteUsers } = require("../../../migrations/schema");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { isUserExists } = require("../../../utils/validators/authValidator");

const deleteUser =  async ({id}, req) => {
    const userSession = req.session.userSes;

    if(!userSession){
        throw new ErrorResponse('Not Authenicated');
    }
    
    const userEmail = userSession?.email;
    const db = getDbComplex();

    const isUserExistss = isUserExists(userEmail)
    if(!isUserExistss){
        throw new ErrorResponse('Something Went Wrong. please try again later!')
    }

    return {
        message:`User ${id} Deleted Succesfully `
    }
    


    
}

exports.deleteUser = deleteUser