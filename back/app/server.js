const {mongoConnection} = require("./src/config/db.config");
const express = require('express')
const app = express()
const cors = require("cors");
// to solve cors blocking (allow all request)
app.use(cors());
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.set('trust proxy', true)

// to have .env
require('dotenv').config()

// to have all routes
const userRouter = require('./src/routes/user.routes');
const ticketRouter = require('./src/routes/ticket.routes');

// use route
app.use('/api/users', userRouter);
app.use('/api/tickets', ticketRouter);

// start server listenning to 8080
app.listen(process.env.PORT || 8080, () => {
    console.log(`[INFO] Server started (PORT=${process.env.PORT || 8080})`)

    if (process.env.STATUS === 'dev' || process.env.STATUS === 'prod'){
        mongoConnection();
    }
});

module.exports = app;
