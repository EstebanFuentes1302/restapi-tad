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
    const query = `SELECT * FROM ${process.env.DB_NAME}.${table}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    });
}

function one(table, id){
    const query = `SELECT * FROM ${process.env.DB_NAME}.${table} WHERE id = '${id}'`;
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    });
}
function insert(table, data){
    const columnsAndValues = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'string') {
            return `${key} = '${value}'`;
        } else {
            return `${key} = ${value}`;
        }
    }).join(', ');
    
    const query = `INSERT INTO ${process.env.DB_NAME}.${table} SET ${columnsAndValues};`;
    console.log(query);
    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function update(table, data){
    const columnsAndValues = Object.entries(data).map(([key, value]) => {
        if (key !== 'id') {
            if (typeof value === 'string') {
                return `${key} = '${value}'`;
            } else {
                return `${key} = ${value}`;
            }
        }
        return null;
    }).filter(item => item !== null).join(', ');

    const query = `UPDATE ${process.env.DB_NAME}.${table} SET ${columnsAndValues} WHERE id = ${data.id}` 

    return new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function erase(table, data){
    console.log(`DELETE FROM ${table} WHERE DNI = '${data.id}'`)
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${process.env.DB_NAME}.${table} WHERE id = '${data.id}'`, (error, result) => {
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