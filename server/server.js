// const Koa = require('koa');
// // const serve = require('koa-static');
// const Router = require('koa-router');
// const fs = require('fs');

// // const client = require('./ConnectionToDB.js');



// const app = new Koa();
// const router = new Router()
const port = 8080;

// // x-response-time
// app.use(async function (ctx, next) {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     ctx.set('X-Response-Time', `${ms}ms`);
//   });

// app.use(async function (ctx, next) {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
//   });
  
//   router.get('/', async (ctx, next) => {
//     var readStream = fs.createReadStream('/Users/olgarom/Again/server/myFile.json','utf8');
//     ctx.body = readStream;
//     await next();
//   });

// app.use(router.routes()).use(router.allowedMethods());
// app.listen(port);


const Koa = require('koa');
const {routes} = require('./router');
const Logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');



const app = new Koa();

// Логгер
app.use(Logger());
// Добавим все роуты. Второй middleware отвечает на OPTIONS запросы.
app.use(routes);
// app.use(bodyParser());

// Слушаем порт, запускаем сервер
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

