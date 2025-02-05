const uuid = require('uuid')
const { getDbComplex } = require("../../../lib/db/db");
const { paymentType, userPaymentMethod } = require("../../../migrations/schema");
const ErrorResponse = require("../../../utils/ErrorResponse");
const { getCartItems } = require("../../Cart/resolvers/getCartItems");

require("dotenv").config();
const paymentTypeId = uuid.v4()

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const checkoutSession = async ({ id }, req) => {
  // const sig = req.headers['stripe-signature'];
    const session = req.session?.userSes;
    if(!session){
        throw new ErrorResponse('Not Authenicated')
    }
  const cart = await getCartItems({ id: id });
  console.log(cart,'the cart***********************************')
  if(cart?.cart_item?.length == 0){
  
      throw new ErrorResponse('Cart is Empty!');
  }


  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart?.cart_item?.map(prod => {
        return{
            price_data:{
                currency:'INR',
                product_data:{
                    name:prod.product.title,
                  
                },
                unit_amount:(Number(prod?.product?.productItem?.price)*100)
            },
            quantity:prod.qty
        }
      }),
      success_url:process.env.SUCCESS_URL,
      cancel_url:process.env.CANCEL_URL
    });


    // const db =  getDbComplex()
    // const res = await db.insert(paymentType).values({
    //   id:paymentTypeId,
    //   value:'card',
    // })


    // await db.insert(userPaymentMethod).values({

    //   id:uuid.v4(),
    //   userId:session.user_id,
    //   paymentTypeId:paymentTypeId,
    //   provider:'stripe',
    //   accountNumber:''
      
    // })
      return{
        
        message:'Payment Confirmation!',
        redirect_url:session.success_url,
        pay_url:session.url
    }

  } catch (err) {
    console.log(err)
    throw new ErrorResponse('Payment Failed !')
  }
  // if(!req.session?.userSes){
  //     throw new ErrorResponse('Not Authenicated');
  // }

  // const userSes = req.session.userSes;

  // const customer = await stripe.customers.create({
  //     email:'saphalpantha@gmail.com',

  // })

  // const customers = await stripe.customers.list();

  // console.log(customers,'cccccccc')

  // console.log(customer)
  // const paymentIntent = await stripe.paymentIntents.create({
  //     amount:1999,
  //     currency:'INR',
  //     payment_method_types:['card']
  // })

  // console.log(paymentIntent.status)

  // const res = await stripe.paymentIntents.confirm('pi_3OxXxYSEf4kgqI3F10eupWOe',{
  //     payment_method:'pm_card_visa'
  // })

  // console.log(res)

  // console.log(paymentIntent)
};

exports.checkoutSession = checkoutSession;
