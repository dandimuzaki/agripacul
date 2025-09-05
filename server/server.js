import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import shippingRoutes from './routes/shippingRoutes.js'
import './cron.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/', orderRoutes);
app.use('/api/', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user/address', addressRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/shipping', shippingRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));