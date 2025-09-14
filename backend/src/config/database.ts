import mongoose from "mongoose";

const ISSMConnectDb = async (): Promise<void> => {
  try {
    const dbUrl = process.env.MONGODB_URL as string;
    if (!dbUrl) {
      throw new Error("Mongodb url is undefined");
    }

    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
  }
};

export default ISSMConnectDb;
