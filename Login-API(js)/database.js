const mongoose = require("mongoose");
const config = require("config");
const MONGO_URL = config.get("MONGO_URL");

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log("MongoDb connected successfully")
});

const db = mongoose.connection;

module.exports = db;

