const bcrypt = require('bcryptjs')


const hashPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password,13)
        return hashedPassword
    }
    catch(err){
        throw new Error('Failed to Hash Password')
    }
}



const comparePass = async(password,hashed) => {
    console.log(password)
    let isMatched = false;
    try{
        isMatched =  await bcrypt.compare(password,hashed);
    }
    catch(err){
        isMatched = false
    }
    console.log(isMatched)
    return isMatched
}


exports.hashPassword = hashPassword

exports.comparePass =comparePass