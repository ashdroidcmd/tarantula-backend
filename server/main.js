//  I use EXPRESS, CORS, DOTENV
// Express - is a Node JS Framework
import express from 'express' 

// Cors - "Cross-Origin Resource Sharing" refers to the situations when a frontend running in a browser has JavaScript code that communicates with a backend, and the backend is in a different "origin" than the frontend.
import cors from 'cors'

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
// ENV - Environment Variable
import dotenv from 'dotenv';

// Loads the environment variables from your .env file and makes them available in your app via process.env
dotenv.config();

// This function initializes and returns an instance of an Express application.
const app = express();

// ----------------------------------------------------------------------------------------------------------------
// Middleware - is a function that executes during the request–response cycle in an Express app
// I use CORS and EXPRESS
// CORS (Cross-Origin Resource Sharing) allows your backend (e.g., http://localhost:3000) to accept requests from your frontend (e.g., http://localhost:5173).
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// express.json - Enables Express to automatically parse incoming JSON payloads from POST, PUT, or PATCH requests.
app.use(express.json());

// ----------------------------------------------------------------------------------------------------------------
// Routes define how the application responds to specific URLs (endpoints),
// I use authRoutes for register/login and testRoutes for tarantula
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', testRoutes);


// ----------------------------------------------------------------------------------------------------------------
// 404 handler - if error, it sends a response of status 404 (the web server could not locate the requested resource, typically a webpage)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// ----------------------------------------------------------------------------------------------------------------
// Server 
// app.listen to server port - 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
