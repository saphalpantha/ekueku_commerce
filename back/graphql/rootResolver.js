
const { getAllProducts } = require("./Product/resolvers/getAllProducts");
const changePassword = require("./Auth/resolvers/changePassword");
const forgetPassword = require("./Auth/resolvers/forgetPassword");
const verifyToken = require("./Auth/resolvers/verifyToken");
const createUser = require("./Auth/resolvers/createUser");
const getFeaturedProducts = require("./Product/resolvers/getFeaturedProducts");
const { getSingleProduct } = require("./Product/resolvers/getSingleProduct");
const fetchAllUsers = require("./User/resolvers/fetchAllUsers");
const fetchSingleUser = require("./User/resolvers/fetchSingleUser");
const loginUser = require('./Auth/resolvers/loginInUser');
const { updateUser } = require("./User/resolvers/updateUser");
module.exports = {

  async loginUser (args,req){
    return loginUser(args,req)
  },
  async createUser(args, req) {
    return createUser(args, req);
  },
  async verifyToken(args, req) {
    return verifyToken(args, req);
  },

  async forgetPassword(args, req) {
    return forgetPassword(args, req);
  },

  async changePassword(args, req) {
    return changePassword(args, req);
  },

  async getAllProducts(args, req) {
    return getAllProducts(args, req);
  },

  async getFeaturedProducts(args,req){
    return getFeaturedProducts(args,req)
  },

  async getSingleProduct(args,req){
    return getSingleProduct(args,req)
  }
,
async fetchAllUsers (args,req){
  return fetchAllUsers(args,req)
}
 ,
  

 async fetchSingleUser(args,req){
  return fetchSingleUser(args,req)
 }

,
 async updateUser(args,req){
  return updateUser(args,req)
 }

};
