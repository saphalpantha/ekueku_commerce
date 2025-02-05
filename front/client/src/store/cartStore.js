const { create } = require("zustand");
import { gql, graphql } from 'graphql'

const GET_CART = gql`
  query getCartItems(id:"68541f47-d85e-452f-91ae-01636c08ab0d"){
         id 
         shoppingCartItem{
           product{
             id
           }
         }
       }
`

const fetchCart = async () => {
    try{
        const response = graphql(GET_CART);
        console.log((await response).data)
    }
    catch(err){
        console.log(err)
    }
}

const cartStore = create((set) => ({

    products:[],
    totalPrice:0,
    fetchCart:fetchCart,
    addItemToCart : () => set((state) => ({
        products:[...state.products, {}]
    }))
}))