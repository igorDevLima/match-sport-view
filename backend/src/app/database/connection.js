import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to database!");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1);
  }
};

export default connectToDatabase;
