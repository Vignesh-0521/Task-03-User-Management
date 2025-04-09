const express = require('express');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');   //allows only this origin to access backend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //allows only these methods to access backend
  res.header('Access-Control-Allow-Headers', 'Content-Type');   //allows only this header to access backend
  next();
});

// app.use(express.static('public'));

//middleware
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});