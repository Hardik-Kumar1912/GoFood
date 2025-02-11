require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./connectDb');
const routes = require('./routes/router');

db();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", `http://localhost:${PORT}`], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
