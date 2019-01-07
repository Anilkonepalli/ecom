const express = require('express');
const router = express.Router();
// const ProductController = require('../controller/product');
const Controller = require('../controller/Controller');


//get a list of transactions 
router.get('/get', Controller.get);

router.post('/post', Controller.post);

module.exports = router;