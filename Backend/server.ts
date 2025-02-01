import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import customerRoutes from './routes/customer';
import userRoutes from './routes/user';
import { Server, WebSocket } from 'ws'; // Correct import for WebSocket and Server

const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};
  
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Define your routes and controllers here
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your Node.js backend!');
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const wss = new Server({ server });

  wss.on('connection', (ws: WebSocket) => { // Type ws as WebSocket
    console.log('New WebSocket connection established.');

    ws.on('message', (message: string) => {  // Type message as string
      console.log(`Received: ${message}`);
      ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed.');
    });
  });
}

export default app; // Export for testing
