const { getDb } = require("../../lib/db/db")

const isCartExists = async (id) => {
    const db = getDb()
    const response = await db.query(`SELECT * FROM shopping_cart where id='${id}'`);
    console.log(response)
    if(response.rows[0]){
        return true
    }
    return false
}

exports.isCartExists = isCartExists