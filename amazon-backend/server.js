import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import path from 'path'; 
import userRouter from './routers/userRouter.js'; 
import productRouter from './routers/productRouter.js'; 
import orderRouter from './routers/orderRouter.js'; 
 
dotenv.config(); 
 
const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
 
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1/amazon'; 
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('MongoDB connection error:', err.message)); 
 
app.use('/api/users', userRouter); 
app.use('/api/products', productRouter); 
app.use('/api/orders', orderRouter); 
 
const __dirname = path.resolve(); 
app.use(express.static(path.join(__dirname, 'public'))); 
 
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
}); 
 
app.use((err, req, res, next) => { 
  res.status(500).send({ message: err.message }); 
}); 
 
const port = process.env.PORT || 5000; 
app.listen(port, '0.0.0.0', () => { 
  console.log('Server serving at http://0.0.0.0:' + port); 
}); 
