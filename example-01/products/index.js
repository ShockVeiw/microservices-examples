const express = require('express');
const cors = require('cors');

const { ProductManager } = require('./ProductManager');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post('/products/create', async (req, res) => {
  try {
    const { title = 'No title', price = 0 } = req.body;
    const product = await ProductManager.create({ title, reviewsAmount: 0, price });

    res.status(201).send(product.id);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    res.send(await ProductManager.getAll());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await ProductManager.getById(req.params.id);
    if (!product) throw Error('No such product');

    res.send(product);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post('/events', async (req, res) => {
  console.log(`Products microservice: Event '${req.body.type}' received`);

  if (req.body.type === 'ReviewCreated') {
    await ProductManager.incReviewsAmountById(req.body.payload.productId);
  }

  res.end();
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});