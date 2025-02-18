import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log("db connected");
    } catch (error) {
        console.log("MongoDB connection error !", error);
        process.exit(1);
    }
};

export default connectDb;
