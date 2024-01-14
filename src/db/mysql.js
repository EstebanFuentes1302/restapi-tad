const mysql = require('mysql');

const dbconfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}

let connection;
function con(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if(err){
            console.log('db error: ', err);
        }else{
            console.log('Database Connection Success')
        }
    })

    connection.on('err', err => {
        console.log('db error: ', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            con();
        }else{
            throw err;
        }
    })
}

con();

function all(table){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    });
}

function one(table, dni){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE DNI = '${dni}'`, (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    });
}
function insert(table, data){
    // console.log(`INSERT INTO ${table} VALUES ${data.dni}, ${data.name}, ${data.user}, ${data.password}, ${data.role}`)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} VALUES ('${data.dni}', '${data.name}', '${data.user}', '${data.password}', ${data.role})`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function update(table, data){
    console.log(`UPDATE ${table} SET Nombre = '${data.name}', User = '${data.user}', Contrasena = '${data.password}', Rol = ${data.role} WHERE DNI = '${data.dni}'`)
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET Nombre = '${data.name}', User = '${data.user}', Contrasena = '${data.password}', Rol = ${data.role} WHERE DNI = '${data.dni}'`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function erase(table, data){
    console.log(`DELETE FROM ${table} WHERE DNI = '${data.id}'`)
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE DNI = '${data.id}'`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

module.exports = {
    all,
    one,
    insert,
    update,
    erase
}