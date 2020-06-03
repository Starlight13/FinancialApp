
const port = 8080;



const Koa = require('koa');
const {routes} = require('./router');
const Logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');



const app = new Koa();

app.use(Logger());
app.use(routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

