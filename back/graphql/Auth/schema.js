const { buildSchema } = require("graphql");

const userSchema = buildSchema(`

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
        addressline_1:String
        addressline_2:String
        city:String
        Region:String
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
        user_role:Role
    }

    input ForgetPasswordInput{
        email:String!
    }


    input ChangePasswordInput{
        currentPassword:String!
        newPassword:String!
    }
    type ForgetPasswordMessage{
        messsage:String!
    }

    type User{
        user_id:ID!
        email:String!,
        user_role:Role!   
    }

    type RootQuery{
        hello:String
        fetchAllUsers:[SiteUser]!
        

    }

    type RootMutation{
        createUser(userInput:SiteUserInput):SiteUser
        loginUser(userInput:LoginInput):User
        forgetPassword(userInput:ForgetPasswordInput):ForgetPasswordMessage
        changePassword(userInput:ChangePasswordInput):User
        

    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)


    
    module.exports = userSchema