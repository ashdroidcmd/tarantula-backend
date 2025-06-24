const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
const testRoutes = require('./routes/testRoutes');
app.use('/', testRoutes);

// Server - 
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
