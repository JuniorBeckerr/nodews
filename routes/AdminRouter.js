const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController')

router.get('/', auth, (req, res)=>{

    if (req.user.admin){
        res.send('essa pag deve ser visto somente pelo admin')
    }else{
        res.status(401).send('voce nao é admin')
    }
})

module.exports = router;