const yup = require('yup')

const linkSchema = yup.object({
    userInput:yup.object({
        email:yup.string().required()
    }),
})



const validateLogin = (schema,userInput) => async (req,res,next) =>{
    console.log(schema, userInput, req)
    try{
        await schema.validate({
            email:userInput.email            
          });
          return next();
    }
    catch(err){
        console.log(err)
    }
}

exports.validateLogin = validateLogin

exports.linkSchema = linkSchema