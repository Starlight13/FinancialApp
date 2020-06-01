
const { Pool } = require('pg');

app.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FinancialAppDB',
    password: 'kNOpKA123', // По умолчанию пароля нет
    port: 5432, // Порт по умолчанию
  });

// Отвечаем миру на GET запросы
router.get('/Home', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT *, to_char(datestamp, \'DD Mon HH24:MI\') as date from userhistory')
    ctx.body = rows;
})
.get('/Roomie', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT *, to_char(datestamp, \'DD Mon HH24:MI\') as date from userhistory where roomie = true')
    ctx.body = rows;
})
.get('/myPay', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT SUM(Price) from userhistory where userid = 1 and roomie = true and date_part(\'month\', datestamp) = date_part(\'month\', current_date)')
    ctx.body = rows;
})
.get('/roomiePay', async (ctx) => {
    const { rows } = await ctx.app.pool.query('SELECT SUM(Price) from userhistory where userid = 3 and roomie = true and date_part(\'month\', datestamp) = date_part(\'month\', current_date)')
    ctx.body = rows;
})
.get('/roomiePie', async (ctx) => {
    const { rows } = await ctx.app.pool.query('select sum(price) from userhistory group by category order by category')
    ctx.body = rows;
})
.get('/myPie', async (ctx) => {
    const { rows } = await ctx.app.pool.query('select sum(price) from userhistory group by category order by category')
    ctx.body = rows;
});