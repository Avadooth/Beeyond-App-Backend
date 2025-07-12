import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.send('OK'));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

export default app;