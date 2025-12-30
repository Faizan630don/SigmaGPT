import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Set up connection event listeners
        mongoose.connection.on('connected', () => console.log('✅ Database Connected'));
        mongoose.connection.on('error', (err) => console.error('❌ Database Connection Error:', err));
        mongoose.connection.on('disconnected', () => console.log('⚠️ Database Disconnected'));

        // Connect to MongoDB
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/SigmaGPT`, {
            // Remove deprecated options and add proper connection options
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        console.error('❌ Database Connection Failed:', error.message);
        // Don't throw - let server start but log the error
        // In production, you might want to throw here to prevent server from starting
        throw error; // Uncomment this line if you want server to stop if DB fails
    }
}
export default connectDB;