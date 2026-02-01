const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { masterSequelize } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/empresas', companyRoutes);
app.use('/dispositivos', deviceRoutes);
app.use('/notificaciones', notificationRoutes);

// Basic Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Yape/Plin Backend is running' });
});

// Start Server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Basic relationship sync (if needed)
    // For now we just sync models
    await masterSequelize.authenticate();
    console.log('Master DB Connection has been established successfully.');
    
    await masterSequelize.sync({ alter: true });
    console.log('Master DB Models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
