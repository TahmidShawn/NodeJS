const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.error("mongodb connection error");
        process.exit(1);
    }
};

module.exports = connectToDb;
