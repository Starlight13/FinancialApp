const authUser = (email, password) => {
    return(
        `Select userid from users\n` +
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

const getRoomie = (user) => {
    return(`select roomieid from users where userid = ${user}`)
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
    `and date_part(\'month\', datestamp) = date_part(\'month\', current_date)\n` +
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

const changePass = (user, password) => {
    return(`UPDATE users
    SET password = '${password}'
    WHERE userid = ${user}`)
}

const changeUsername = (user, username) => {
    return(`UPDATE users\n
    SET username = '${username}'\n
    WHERE userid = ${user}`)
}

const getUserInfo = (user) => {
    return(`select userid, username, email from users where userid = ${user}`)
}

const addRoomie = (user, roomie) => {
    return(`Update users\n`+
            `Set roomieid = ${roomie} where userid = ${user};\n`+
            `Update users\n`+
            `Set roomieid = ${user} where userid = ${roomie};`
    )
}


//////////




const deleteRoomie = (user, roomie) => {
    return(`Update users\n`+
            `Set roomieid = NULL where userid = ${user};\n`+
            `Update users\n`+
            `Set roomieid = NULL where userid = ${roomie};`
    )
}

const getUsernameByID = (id) => {
    return(`select username where userid = ${id}`)
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
exports.changePass = changePass;
exports.changeUsername = changeUsername;
exports.getUserInfo = getUserInfo;
