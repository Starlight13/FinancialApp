const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FinancialAppDB',
    password: 'kNOpKA123', 
    port: 5432, 
});

pool.connect()
    .then(()=> {
        console.log("Connection to DB success!");})
    .catch(e => console.log(e));

module.exports = pool;