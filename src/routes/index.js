const { Router } = require('express');
const router = Router();


router.get('/test', (req, res) => {
    const data = {
        "name": "Esteban",
        "role": 1,
        "env": process.env.PORT
    }
    res.json(data);
})

module.exports = router;