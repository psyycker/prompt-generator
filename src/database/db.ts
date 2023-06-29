import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27018/promptgen';

let isConnected = false;
let cachedConnection: typeof mongoose | null = null;

const connectToDatabase = async (): Promise<typeof mongoose> => {
    if (isConnected) {
        return cachedConnection as typeof mongoose;
    }

    try {
        const dbConnection = await mongoose.connect(MONGODB_URI);

        isConnected = dbConnection.connections[0].readyState === 1;
        cachedConnection = dbConnection;

        console.log('Connected to MongoDB');
        return dbConnection;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
};

export default connectToDatabase;
