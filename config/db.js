const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("connected to the mongo, ", connect.connection.host, connect.connection.name);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = connectDB;