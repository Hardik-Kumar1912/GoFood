const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 5000;
const db = require('./connectDb');
const routes = require('./routes/router');

db();

// Use cors middleware for handling CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:5000"], // Allow requests from both frontend ports
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Add all methods you expect
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
