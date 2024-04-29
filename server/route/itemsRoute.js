const express = require('express');
const {addItem,getitems,updateItem,deleteItem} = require('../controller/itemController');


const router = express.Router();
// CREATE
router.post('/items',addItem)
// READ
router.get('/items',getitems)
// UPDATE
router.put('/items/:id',updateItem)
// DELETE
router.delete('/items/:id',deleteItem)

module.exports = router;
