// server.js
import express from 'express';
import mongoose from 'mongoose';
import workoutRoutes from './src/routes/workoutroute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);

// Verbind met MongoDB en start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Verbonden met MongoDB');
    
    // Start server ALLEEN als database gelukt is
    app.listen(PORT, () => {
      console.log(`Server draait op http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database verbinding mislukt:', error.message);
  });

// Test route - reageer op GET //
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mijn eerste backend!',
    success: true
  });
});




// Start de server
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
})