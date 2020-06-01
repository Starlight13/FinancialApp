const Router = require('koa-router');
const pool = require('./queries.js');

const router = new Router();

const user = 1;
const roomie = 3;

router.get('/Home', async (ctx, next) => {
    ctx.body = await pool.userExpense(user);
})
.get('/Roomie', async (ctx, next) => {
    ctx.body = await pool.commonExpense(user, roomie);
})
.get('/myPay', async (ctx, next) => {
    ctx.body = await pool.compareExpense(user);
})
.get('/roomiePay', async (ctx, next) => {
    ctx.body = await pool.compareExpense(roomie);
})
.get('/roomiePie', async (ctx, next) => {
    ctx.body = await pool.getSumByCat(roomie);
})
.get('/myPie', async (ctx, next) => {
    ctx.body = await pool.getSumByCat(user);
})
.get('/addSpend', async (ctx, next) => {
    const name = ctx.request.headers.name;
    const price = ctx.request.headers.price;
    const category = ctx.request.headers.category;
    const roomiebool = ctx.request.headers.roomiebool;
    const info = ctx.request.headers.info;
    ctx.body = await pool.addSpend(user, name, price, category, roomiebool, info)
})
.get('/getSum',async (ctx, next) => {
    ctx.body = await pool.getSum(user);
})
.get('/barData', async (ctx, next) => {
    ctx.body = await pool.mySumByCat(user);
})
.get('/lineData', async (ctx, next) => {
    ctx.body = await pool.monthForBar(user);
});
exports.routes = router.routes();