
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
const { createProduct } = require("./Product/resolvers/createProduct");
const {createCart} = require('./Cart/resolvers/createCart')

const {getCartItems} = require('./Cart/resolvers/getCartItems');
const { removeFromCart } = require("./Cart/resolvers/removeFromCart");
const { addToCart } = require("./Cart/resolvers/addToCart");
const { deleteUser } = require("./Auth/resolvers/deleteUser");
const { deleteProduct } = require("./Product/resolvers/deleteProduct");
const { createReview } = require("./Reviews/resolvers/createReview");
const { fetchReviews } = require("./Reviews/resolvers/fetchReviews");
const { updateReview } = require("./Reviews/resolvers/updateReview");
const { deleteReview } = require("./Reviews/resolvers/deleteReview");
const { checkoutSession } = require("./Checkout/resolvers/checkoutSession");
module.exports = {

   async loginUser (args,req) {
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
  async createProduct(args,req){
    return createProduct(args,req)
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
,

 async createCart(args,req){
  return createCart(args,req)
 },

 async getCartItems(args,req){
  return getCartItems(args,req)
 }
,
 async removeFromCart(args,req){
  return removeFromCart(args,req);
 }

 ,
 async addToCart(args,req){
  return addToCart(args,req)
 },
 async deleteUser(args,req){
  return deleteUser(args,req)
 },

 async deleteProduct(args,req){
  return deleteProduct(args,req)
 },


 async createReview(args,req){
  return createReview(args,req)
 },
 async fetchReviews(args,req){
  return fetchReviews(args,req);
 },

 async updateReview(args,req){
  return updateReview(args,req);
 },

 async deleteReview(args,req){
  return deleteReview(args,req)
 },

 async checkoutSession(args,req){
    return checkoutSession(args,req);
 }
};
