const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    database: "gimnasio_maxtech",
    user: "root",
    password: "",
    debug: true
});

module.exports = {

    getMembers: function(client, memberName, limit) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select id, name, birthdate, gender, email, howDidYouKnow, address `;
                    sqlString += `city, phone, expDate, lastVisit, totalVisits, owed, package, client `;
                    sqlString += `from members where name LIKE '%${memberName}%'`;
                    sqlString += `and client = '${client}' ORDER BY id desc LIMIT ${limit}`;
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    getPaymentsByTimeFrame: function(client, start, end, method) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from payments where date >= '${start}' and date <= `;
                    sqlString += `'${end}' and paymentMethod LIKE '%${method}%' and client = '${client}'`;
                    console.log("ESTE ES EL QUERRY", sqlString);
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    getMemberById: function(client, id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from members where id = '${id}' and client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },


    getVisitsByDate: function(client, date) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from visits where date LIKE '${date}%' AND client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    getSerialNumber: function(client) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select serialNumber from readers where client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },
    
    login: function(data) {
        return new Promise((resolve, reject) => {
            console.log(data) 
            if(data) {
                resolve(data);
            }    
            else {   
                reject(new Error('faild to authenticate.'));
            }
        });
    },

    updateMemberById: function(client, id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `UPDATE members set totalVisits = totalVisits+1, lastVisit = NOW()`;
                    sqlString += ` where id = '${id}' and client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, message) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    updateMember: function(client, id, data) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `UPDATE members SET name = '${data.name}', birthDate = '${data.birthDate}',`
                    sqlString += ` gender = '${data.gender}', email = '${data.email}',`;
                    sqlString += ` address = '${data.address}', phone = '${data.phone}',`;
                    sqlString += ` howDidYouKnow = '${data.howDidYouKnow}', city = '${data.city}',`;
                    sqlString += ` expDate = '${data.expDate}', fingerprint = '${data.fingerprint}'`;
                    sqlString += ` WHERE id = '${id}' AND client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, message) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    getVisitsByMemberId: function(client, id, limit) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from visits where memberId = '${id}' AND client = '${client}'`;
                    sqlString += `LIMIT ${limit}`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    getPrices: function(client) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from prices where client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    getPaymentsByMemberId: function(client, id, limit) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select * from payments where idMember = '${id}' AND client = '${client}'`;
                    console.log(sqlString)
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    insertVisitById: function(client, id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `INSERT into visits (date, memberId, client) values`;
                    sqlString += ` (NOW(), '${id}', '${client}')`;
                    console.log(sqlString)
                connection.query(sqlString, (error, message) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    insertMember: function(client, data) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `INSERT into members (name, birthDate, gender, email, howDidYouKnow,`;
                    sqlString += ` address, city, phone, expDate, lastVisit, fingerprint, client)`;
                    sqlString += ` values ('${data.name}', '${data.birthDate}', '${data.gender}',`;
                    sqlString += ` '${data.email}', '${data.howDidYouKnow}', '${data.address}',`;
                    sqlString += ` '${data.city}', '${data.phone}', '${data.expDate}',`;
                    sqlString += ` '${data.lastVisit}', '${data.fingerprint}', '${client}')`;
                connection.query(sqlString, (error, message) => {
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    insertProduct: function(client) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `INSERT into prices (client) VALUES ('${client}')`;
                connection.query(sqlString, (error, message) => {
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    deleteProduct: function(client, id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `DELETE from prices where id = '${id}' AND client = '${client}'`;
                connection.query(sqlString, (error, message) => {
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    insertPayment: function(client, data) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `INSERT into payments (idMember, name, concept, totalToPay, payed, date,`;
                    sqlString += ` comments, paymentMethod, client) values ('${data.idMember}',`;
                    sqlString += ` '${data.name}', '${data.concept}', '${data.totalToPay}',`;
                    sqlString += ` '${data.payed}', '${data.date}', '${data.comments}', '${data.paymentMethod}',`;
                    sqlString += ` '${client}')`
                connection.query(sqlString, (error, message) => {
                    if(error) {          
                        reject(error);
                        return;
                    }
                });

                let insStr = data.updatePackage ? `package = '${data.package}'` : '';

                sqlString = `UPDATE members set owed = owed + ${data.owed}, expDate = '${data.expDate}'`;
                sqlString += ` ${insStr} WHERE id = '${data.idMember}' AND client = '${client}'`;
                connection.query(sqlString, (error, message) => {
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(message);
                    }
                });
                connection.release();
            });
        });
    },

    getExpDate: function(client) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select expDate as Value from clients where username = '${client}'`;
                connection.query(sqlString, (error, rows) => {        
                    if(error) {         
                        reject(error);
                    }
                    else {
                        resolve(rows[0]);
                    }
                });
                connection.release();
            });
        });
    },

    now: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                connection.query("select now() as value", (error, rows) => {        
                    if(error) {         
                        reject(error);
                    }
                    else {
                        resolve(rows[0]);
                    }
                });
                connection.release();
            });
        });
    },

    getAllFingerPrints: function(client) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                let sqlString = `select id, fingerprint from members where fingerprint is not null`;
                    sqlString += ` and client = '${client}'`;
                    console.log(sqlString);
                connection.query(sqlString, (error, rows) => {        
                    if(error) {          
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },

    authClient: function(user, pass) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                connection.query(`select username from clients where username = 
                                  '${user}' and password = '${pass}'`, (error, rows) => {
                    if(error) {         
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
                connection.release();
            });
        });
    },
    
    
};
