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

function erase(id){
    return db.erase(table, id)
}

module.exports = {
    all,
    one,
    erase,
    insert,
    update
}