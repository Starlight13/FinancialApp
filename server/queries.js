const pool = require('./connectDB.js');
const query = require('./queryBuild.js');

async function authUser(email, password){
    return new Promise((resolve, reject) => {
        pool.query(query.authUser(email, password), (err, result) =>{
            if (err) {throw err}
            
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}

async function userExpense(user){
    return new Promise((resolve, reject) => {
        pool.query(query.userExpense(user), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}

async function commonExpense(user, roomie){
    return new Promise((resolve, reject) => {
        pool.query(query.commonExpense(user, roomie), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}

async function compareExpense(user, roomie){
    return new Promise((resolve, reject) => {
        pool.query(query.compareExpense(user, roomie), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}
async function getSumByCat(user){
    return new Promise((resolve, reject) => {
        pool.query(query.getSumByCat(user), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}

async function mySumByCat(user){
    return new Promise((resolve, reject) => {
        pool.query(query.mySumByCat(user), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}

async function getSum(user){
    return new Promise((resolve, reject) => {
        pool.query(query.getSum(user), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}

async function addSpend(user, name, price, category, roomie, info){
    return new Promise((resolve, reject) => {
        pool.query(query.addSpend(user, name, price, category, roomie, info), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}


async function addUser(username, email, password){
    return new Promise((resolve, reject) => {
        pool.query(query.addUser(username, email, password), (err, result) =>{
            if (err) {throw err}
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}

async function addRoomie(user, roomie){
    return new Promise((resolve, reject) => {
        pool.query(query.addRoomie(user, roomie), (err, result) =>{
            if (err) {throw err}
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}

async function deleteRoomie(user, roomie){
    return new Promise((resolve, reject) => {
        pool.query(query.deleteRoomie(user, roomie), (err, result) =>{
            if (err) {throw err}
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}

async function getRoomie(user){
    return new Promise((resolve, reject) => {
        pool.query(query.getRoomie(user), (err, result) =>{
            if (err) {throw err}
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}

async function getUsernameByID(user){
    return new Promise((resolve, reject) => {
        pool.query(query.getUsernameByID(user), (err, result) =>{
            if (err) {throw err}
            resolve({ok: result.rowCount > 0 ? true : false});
        });
    });
}




async function monthForBar(user){
    return new Promise((resolve, reject) => {
        pool.query(query.monthForBar(user), (err, result) =>{
            if (err) {throw err}
            resolve(result.rows);
        });
    });
}




exports.authUser = authUser;
exports.userExpense = userExpense;
exports.addUser = addUser;
exports.addRoomie = addRoomie;
exports.deleteRoomie = deleteRoomie;
exports.getRoomie = getRoomie;
exports.getUsernameByID = getUsernameByID;
exports.commonExpense = commonExpense;
exports.compareExpense = compareExpense;
exports.getSumByCat = getSumByCat;
exports.addSpend = addSpend;
exports.getSum = getSum;
exports.mySumByCat = mySumByCat;
exports.monthForBar = monthForBar;