



const {Client} = require('pg')

let _db;

const connectDb = (cb) => {
    const client = new Client({
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        password:process.env.DB_PASS,
        port:process.env.DB_PORT,
    })   

    _db = client;
    
    client.connect((err) => {
        if(err){
            throw err
            
        }
        console.log('connected');
        cb()
    })
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
