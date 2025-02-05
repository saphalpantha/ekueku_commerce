const { buildSchema } = require("graphql");
const userSchema = `


    enum Role{
        CLIENT
        SELLER
        ADMIN
    }

    type Country{
        id:ID!
        country_name:String
    }

    type Address{
        id:ID!
        unit_number:String
        street_number:String
        address_line1:String
        address_line2:String
        city:String
        region:String
        postal_code:String
        country:Country

    }
    type UserAddress{
        user_id:ID!
        isDefault:Boolean
        address:Address
    }


    

    type SiteUser{
        user_id:ID!
        email:String!
        user_password:String!
        phone_no:String!
        address:UserAddress
        user_role:Role
        profile:String!
    }

    input SiteUserInput{
        email:String!
        password:String!
        phone_no:String!
        role:String!
    }

    input LoginInput{
        email:String!
        password:String!
    }

    input ForgetPasswordInput{
        email:String!
    }


    input ChangePasswordInput{
        currentPassword:String!
        newPassword:String!
    }
    type ForgetPasswordMessage{
        message:String
    }

    type User{
        user_id:ID!
        email:String!,
        user_role:Role!   
    }
    

    type AuthRootQuery{
        hello:String
        fetchAllUsers:[SiteUser]!
        fetchSingleUser(id:ID!):SiteUser!
 
    }

    

    input UpdateUser_Country_Input{
        id:ID!
        country_name:String
    }



    input UpdateUser_Addres_Input{
        id:ID!
        unit_number:String
        street_number:String
        address_line1:String
        address_line2:String
        city:String
        region:String
        postal_code:String
        country:UpdateUser_Country_Input
    }

    input UpdateUser_UserAddres_Input{
        user_id:ID!
        isDefault:Boolean
        address:UpdateUser_Addres_Input
    }


    
    input UpdateUser_Input{
        email:String!
        phone_no:String
        address:UpdateUser_UserAddres_Input
        user_role:Role
    }

    
    type UpdateUserMessage{
        message:String!
    }


    input VerifyTokenInput{
        token:String!,
        newPassword:String!,

    }
    type VerifyTokenMessage{
        message:String!
    }

    type AuthRootMutation{
        createUser(userInput:SiteUserInput):SiteUser
        loginUser(userInput:LoginInput):User
        forgetPassword(userInput:ForgetPasswordInput):ForgetPasswordMessage!
        changePassword(userInput:ChangePasswordInput):User
        verifyToken(userInput:VerifyTokenInput):VerifyTokenMessage
        updateUser(userInput:UpdateUser_Input):SiteUser
           
    }`

    
    module.exports = userSchema