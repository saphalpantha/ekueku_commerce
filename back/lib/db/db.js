
const {drizzle} = require('drizzle-orm/node-postgres')
const dotenv = require('dotenv')


dotenv.config()
// const {Client} = require('pg')

// let _db;

// const connectDb = (cb) => {
//     const client = new Client({
//         user:process.env.DB_USER,
//         host:process.env.DB_HOST,
//         database:process.env.DB_NAME,
//         password:process.env.DB_PASS,
//         port:process.env.DB_PORT,
//         multipleStatements:true,
//         nestTables:true,
//     })   

//     _db = client;
    
//     client.connect((err) => {
//         if(err){
//             throw err
            
//         }
//         console.log('connected');
//         cb()
//     })
// }



// const getDb = () => {
//     if(_db){
//         return _db
//     }
//     else{
//         throw new Error('Failed to Connect to Db.')
//     }
// }


// exports.connectDb = connectDb;
// exports.getDb = getDb





const {Client} = require('pg')
const ErrorResponse = require('../../utils/ErrorResponse')




let _db

    
const client = new Client({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT,
    multipleStatements:true,
}) 


// const client = new Client({
//     user:'KIIT',
//     host:'localhost',
//     database:'eku_db',
//     password:'ipad air',
//     port:process.env.DB_PORT,
//     multipleStatements:true,
// }) 


    const connectDb = async (connected) => {

        try{
            
            const db =  await client.connect()
            _db = client;
            console.log('Connected')
            // console.log(db)
            connected()
        }
        catch(err){
            console.log(err)
            console.log('Connection Failed')
            throw new ErrorResponse('Failed to Connect to Db')
        }
        
        
    }


    const getDbComplex = () =>{
        const db = drizzle(client,{schema:require('../../migrations/schema')})
        return db;

    }

    
    const getDb = () => {
    if(_db){
        return _db
    }
    else{

        throw new Error('Failed to Connect to Db.')
    }
}


exports.connectDb = connectDb;
exports.getDb = getDb
exports.getDbComplex = getDbComplex


