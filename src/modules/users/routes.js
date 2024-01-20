const express = require('express');
const router = express.Router();
const response = require('../../network/responses')
const controller = require('./controller');

router.get('/', all);
router.get('/:id', one);
router.post('/', insert);
router.put('/', update)
router.delete('/:id', erase);

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

async function insert(req, res){
    try{
        const items = await controller.insert(req.body);
        response.success(req, res, 'Usuario Agregado Exitosamente', 200)
    }catch(err){
        console.log(err);
        response.error(req, res, err, 500)
    }
}

//test

async function update(req, res){
    try{
        const items = await controller.update(req.body);
        response.success(req, res, 'Usuario Actualizado Correctamente', 200)
    }catch(err){
        console.log(err);
        response.error(req, res, items, 500)
    }
}

async function erase(req, res){
    console.log(req.body)
    try{
        const items = await controller.erase(req.params.id);
        response.success(req, res, 'Usuario eliminado correctamente', 200)
    }catch(err){
        console.log(err);
        response.error(req, res, items, 500)
    }
}


module.exports = router;