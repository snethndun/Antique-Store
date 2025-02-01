import mongoose from 'mongoose';

const connectTestDB = async () => {
  if (mongoose.connection.readyState === 0) {
    const mongoUri = 'mongodb://localhost:27017/test_database';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Test Database');
  }
};

const disconnectTestDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB Test Database');
  }
};

export { connectTestDB, disconnectTestDB };
