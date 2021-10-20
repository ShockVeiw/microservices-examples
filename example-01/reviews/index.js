const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const axios = require('axios');

const { ReviewManager } = require('./ReviewManager');

const app = new Koa();
const router = new Router();
const PORT = 5001;

router.post('/products/:productId/reviews/create', async ctx => {
  try {
    const { author = 'Anonymous', content } = ctx.request.body;
    const { productId } = ctx.params;

    if (!content) throw Error('Field `content` is required');

    const review = await ReviewManager.create({ author, content, productId });

    axios
      .post('http://event-bus-srv:5002/events', { type: 'ReviewCreated', payload: { ...review } })
      .catch(err => console.log(err.message));

    ctx.status = 201;
    ctx.body = review.id;
  } catch (e) {
    ctx.status = 400;
    ctx.body = { error: e.message };
  }
});

router.get('/products/:productId/reviews', async ctx => {
  try {
    ctx.body = await ReviewManager.getAllByProductId(ctx.params.productId);
  } catch (e) {
    ctx.status = 400;
    ctx.body = { error: e.message };
  }
});

router.post('/events', async ctx => {
  console.log(`Reviews microservice: Event '${ctx.request.body.type}' received`);
  ctx.status = 200;
});

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT);

console.log(`listening port: ${PORT}`);