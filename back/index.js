const express = require('express')
const http = require('http');
const { connectDb, getDb } = require('./lib/db/db');
const errorHandle = require('./middleware/errorHandle');
const { graphqlHTTP } = require('express-graphql');
const userSchema = require('./graphql/Auth/schema');
const session = require('express-session')
const rootSchema = require('./graphql/rootSchema');
const rootResolver = require('./graphql/rootResolver')
const dotenv = require('dotenv').config()
const app = express();
const server =  http.createServer(app);



app.use(session({
    secret:'xyz',
    resave:false,
    saveUninitialized:true,
}))


app.use('/users', async (req,res,next) => {
    const db = getDb()
    const data = await db.query('SELECT * FROM site_users');
    console.log(data.rows)
    res.status(200).json({msg:data.rows})
})



app.use('/graphql', graphqlHTTP((req,res) => (
    {
        schema:rootSchema,
        rootValue:rootResolver,
        graphiql:true
    }
)))





app.use(errorHandle)




connectDb(() => {
    server.listen(5000, () => {
        console.log(`Server is Listing on PORT 5000 `);
    } )
})



process.on('unhandledRejection', (err,promise) =>{
    console.log(`Logged Error : ${err} `);
    server.close(() => process.exit(1))

});














