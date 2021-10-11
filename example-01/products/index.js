const express = require('express');
const { ProductManager } = require('./ProductManager');

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/products/create', async (req, res) => {
  try {
    const { title = 'No title', description = 'No description', price = 0 } = req.body;
    const product = await ProductManager.create({ title, description, price });

    res.status(201).send(product.id);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/products', async (req, res) => {
  try {
    res.send(await ProductManager.get());
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});