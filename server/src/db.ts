import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
};

export default dbConnection;
