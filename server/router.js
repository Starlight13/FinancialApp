const Router = require('koa-router');
const pool = require('./queries.js');

const router = new Router();


router.get('/Home', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.userExpense(user);
})
.get('/Roomie', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const roomie = ctx.request.headers.roomie;
    ctx.body = await pool.commonExpense(user, roomie)
})
.get('/myPay', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.compareExpense(user);
})
.get('/roomiePay', async (ctx, next) => {
    const roomie = ctx.request.headers.roomie;
    ctx.body = await pool.compareExpense(roomie);
})
.get('/getPie', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.getSumByCat(user);
})
.get('/addSpend', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const name = ctx.request.headers.name;
    const price = ctx.request.headers.price;
    const category = ctx.request.headers.category;
    const roomiebool = ctx.request.headers.roomiebool;
    const info = ctx.request.headers.info;
    ctx.body = await pool.addSpend(user, name, price, category, roomiebool, info)
})
.get('/getSum',async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.getSum(user);
})
.get('/barData', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.mySumByCat(user);
})
.get('/lineData', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.monthForBar(user);
})
.get('/signIn', async (ctx, next) => {
    const email = ctx.request.headers.email;
    const password = ctx.request.headers.password;
    ctx.body = await pool.authUser(email, password);
})
.get('/signUp', async (ctx, next) => {
    const email = ctx.request.headers.email;
    const password = ctx.request.headers.password
    const username = ctx.request.headers.username;
    ctx.body = await pool.addUser(username, email, password);
})
.get('/changePass', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const password = ctx.request.headers.password;
    ctx.body = await pool.changePass(user, password);
})
.get('/changeUsername', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const username = ctx.request.headers.username;
    ctx.body = await pool.changeUsername(user, username);
})
.get('/getUserInfo', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.getUserInfo(user);
})
.get('/ifRoomie', async (ctx, next) => {
    const user = ctx.request.headers.user;
    ctx.body = await pool.getRoomie(user);
})
.get('/addRoomie', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const roomie = ctx.request.header.roomie;
    ctx.body = await pool.addRoomie(user, roomie);
})
.get('/deleteRoomie', async (ctx, next) => {
    const user = ctx.request.headers.user;
    const roomie = ctx.request.header.roomie;
    ctx.body = await pool.deleteRoomie(user, roomie);
});

exports.routes = router.routes();