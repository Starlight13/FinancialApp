const authUser = (email, password) => {
    return(
        `Select * from users\n` +
        `where email = '${email}'\n` +
        `and password = '${password}'`
        );
}

const userExpense = (user) => { 
    return(`Select *, to_char(datestamp, \'DD Mon HH24:MI\') as date from userhistory\n`+
    `where userid = ${user} order by datestamp desc`)
}

const getSum = (user) => {
    return(`SELECT SUM(Price) from userhistory\n`+
    `where userid = ${user}\n`+
    `and date_part(\'month\', datestamp) = date_part(\'month\', current_date)`)
}

const addUser = (username, email, password) => {
    return(
        `insert into users(username, email, password)\n` +
        `values ('${username}', '${email}', '${password}');`
    );
};

const addRoomie = (user, roomie) => {
    return(`Update users\n`+
            `Set roomieid = ${roomie} where userid = ${user};\n`+
            `Update users\n`+
            `Set roomieid = ${user} where userid = ${roomie};`
    )
}

const deleteRoomie = (user, roomie) => {
    return(`Update users\n`+
            `Set roomieid = NULL where userid = ${user};\n`+
            `Update users\n`+
            `Set roomieid = NULL where userid = ${roomie};`
    )
}

const getRoomie = (user) => {
    return(`select roomieid where userid = ${user}`)
}

const getUsernameByID = (id) => {
    return(`select username where userid = ${id}`)
}

const commonExpense = (user, roomie) => {
    return(`select *, to_char(datestamp, \'DD Mon HH24:MI\') as date from userhistory\n`+
    `where (userid = ${user}  or userid = ${roomie}) and roomie = true order by datestamp desc`)
}

const compareExpense = (user) => {
    return(`SELECT SUM(Price) from userhistory\n`+
    `where userid = ${user} and roomie = true\n`+
    `and date_part(\'month\', datestamp) = date_part(\'month\', current_date)`)
}

const addSpend = (user, name, price, category, roomie, info) => {
    return(`insert into userhistory(userid, name, price, category, roomie, info)
    values (${user}, '${name}', ${price}, '${category}', ${roomie}, '${info}') `)
}

const getSumByCat = (user) => {
    return(`SELECT SUM(Price) from userhistory\n`+
    `where userid = ${user} and roomie = true\n`+
    'group by category order by category ')
}

const mySumByCat = (user) => {
    return(`SELECT SUM(Price) from userhistory\n`+
    `where userid = ${user}\n and date_part(\'month\', datestamp) = date_part(\'month\', current_date)`+
    'group by category order by category ')
}

const monthForBar = (user) => {
    return(`SELECT SUM(Price) from userhistory\n`+
    `where userid = ${user} \n`+
    `group by date_part(\'month\', datestamp)`)
}

exports.authUser = authUser;
exports.userExpense = userExpense;
exports.addSpend = addSpend;
exports.addUser = addUser;
exports.addRoomie = addRoomie;
exports.deleteRoomie = deleteRoomie;
exports.getRoomie = getRoomie;
exports.getUsernameByID = getUsernameByID;
exports.commonExpense = commonExpense;
exports.compareExpense = compareExpense;
exports.getSumByCat = getSumByCat;
exports.getSum = getSum;
exports.mySumByCat = mySumByCat;
exports.monthForBar = monthForBar;
