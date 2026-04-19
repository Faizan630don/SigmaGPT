import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageController.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooks.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to database
try {
    await connectDB();


} catch (error) {
    console.error('❌ Failed to connect to database. Server shutting down.');
    console.error('Please check your MongoDB connection string in .env file');
    process.exit(1);
}
//Stripe webhooks
app.post('/api/webhook', express.raw({ type: 'application/json' }), stripeWebhooks);

//Middleware
app.use(cors())
app.use(express.json())

//Routes

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

// Serve Frontend
app.use(express.static(path.join(__dirname, '../Chatgpt/dist')));

// Catch-all to serve index.html for React Router
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../Chatgpt/dist/index.html'));
});


// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));