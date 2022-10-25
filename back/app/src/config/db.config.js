const mongoose = require('mongoose')

// connection to mongoDB (find URI in .env)
exports.mongoConnection = () => {
    mongoose.connect(process.env.MONGO_DB_URI_DEVELOP, {useNewUrlParser: true, useUnifiedTopology: true})
    mongoose.Promise = global.Promise;

    mongoose.connection.on('open', console.log.bind(console, `[INFO] Connected to mongoDB (DB_NAME=${process.env.MONGO_DB_NAME})`));
    mongoose.connection.on('error', console.error.bind(console, '[ERROR] Connection to mongoDB failed'));
}
