import mongoose from 'mongoose';

export async function mongooseConnect() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        } else {
            const uri = process.env.MONGODB_URI;
            return await mongoose.connect(uri);
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // rethrow the error to handle it elsewhere if needed
    }
}
