const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, payload } = req.body;

  axios.post('http://products-srv:5000/events', { type, payload }).catch(err => console.log(err.message));
  axios.post('http://reviews-srv:5001/events', { type, payload }).catch(err => console.log(err.message));

  res.end();
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});