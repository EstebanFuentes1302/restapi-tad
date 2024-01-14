const db = require('../../db/mysql')

const table = 'usuario'

function all(){
    return db.all(table)
}

function one(id){
    return db.one(table, id)
}

function insert(body){
    return db.insert(table, body)
}

function update(body){
    return db.update(table, body)
}

function erase(body){
    return db.erase(table, body)
}

module.exports = {
    all,
    one,
    erase,
    insert,
    update
}