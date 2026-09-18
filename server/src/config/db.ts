import mongoose from 'mongoose';

const DEFAULT_LOCAL_MONGO_URI = 'mongodb://127.0.0.1:27017/buzzinga';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOCAL_MONGO_URI || DEFAULT_LOCAL_MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
