const express = require('express');
const router = express.Router();
const response = require('../../network/responses')
const controller = require('./controller')

router.get('/', all);
router.get('/:id', one);

router.put('/', erase)

async function all(req, res){
    const items = await controller.all();
    response.success(req, res, items, 200);
}

async function one(req, res){
    try{
        const items = await controller.one(req.params.id);
        response.success(req, res, items, 200)
    }catch(err){
        console.log(err);
        response.error(req, res, items, 500)
    }
}

async function erase(req, res){
    console.log(req.body)
    try{
        const items = await controller.erase(req.body);
        response.success(req, res, 'Usuario eliminado correctamente', 200)
    }catch(err){
        console.log(err);
        response.error(req, res, items, 500)
    }
}


module.exports = router;