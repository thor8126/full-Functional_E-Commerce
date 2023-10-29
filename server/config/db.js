import mongoose from "mongoose";
import "dotenv/config";


const url = process.env.MongoDb_URL;
export const connectDB = async () => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`Connected to MongoDB Database ${data.connection.host}`);
      });
  } catch (error) {
    console.log(error.message);
  }
};
