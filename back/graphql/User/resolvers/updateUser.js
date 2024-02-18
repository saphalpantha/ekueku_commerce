const { getDb } = require("../../../lib/db/db")

const updateUser =  async ({userInput},req) => {

    const db = getDb()
    
    let existingUser;


    const exisitingUserQuery = `select * from site_users as su full join user_address as ua on ua.id=su.user_id full join address as a on a.id=ua.addr_id full join country as c on c.id=a.country_id where email='saphalpantha1234@gmail.com'`
    try{

        const response = await db.query(exisitingUserQuery);
        // console.log(response)
        
        if(response.rows.length == 0){
            existingUser = {}
            throw new Error('No User Found')
        }
        else{

            existingUser = response.rows[0]
        }
    }
    catch(err){
        console.log(err)
    }

    


    const userInp = Object.assign(existingUser, userInput)



    const updateSiteUserQuery = `UPDATE site_users set email='${userInp.email}', phone_no='${userInp.phone_no}' profile='${userInp.profile}' where user_id='${userInp.user_id}'`
    const updateUserAddrQuery = `UPDATE user_address set is_default='${userInp.address.isDefault}' where id='${userInp.user_id}'`
    const updateAddressQuery = `UPDATE address set unit_number='${userInp.address.address.unit_number}', street_number='${userInp.address.address.street_number}', address_line1='${userInp.address.address.address_line1}', address_line2='${userInp.address.address.address_line2}', city='${userInp.address.address.city}', region='${userInp.address.address.region}', postal_code='${userInp.address.address.postal_code}'`
    const updateCountryQuery  = `UPDATE country set country_name='${userInp.address.address.country.country_name}'`
   



    // try{

    //     const resposne = await db.query(updateQuery)
    //     console.log(resposne)
    // }
    // catch(err){
    //     console.log(err)
    // }

    console.log(userInp,'the assign')

    return{
        ...userInput
    }
}

exports.updateUser = updateUser