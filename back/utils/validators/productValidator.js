const { isEmpty , isInt, isNumeric } = require("validator/validator")

const isCreateProductValid = (userInput) => {
    // const {title,product_item,productCategory} = userInput


    const errorMessage = []

    return errorMessage
}


exports.isCreateProductValid = isCreateProductValid



const updateProductValidate = {
    validateProduct : (userInput) => {
        const errorMessage = []
        const {name} = userInput
        if(isEmpty(name)){
            errorMessage.push({name:'Product Name cannot be empty'})
        }

        return errorMessage
    },

    validateProductItem : (userInput) => {
        const errorMessage = []

        const {sku,qty_in_stock,price} = userInput.product_item

        if(!isNumeric(+qty_in_stock)){
            errorMessage.push({qty_in_stock:"Cannot be String !"})
        }


        if(!isNumeric(+price)){
            errorMessage.push({price:"Enter Valid Price!"})
        }

        return errorMessage
    },

    validatePromotion : (userInput) => {
        const {name,description,discount_rate, start_date,end_date} = userInput.promotion_category.promotion

        const errorMessage = []

        return errorMessage

    }

    


    
}


exports.updateProductValidate = updateProductValidate