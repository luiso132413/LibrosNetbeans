let express = require('express');
let router = express.Router();

const book = require('../controllers/book.controller.js');

// Rutas para el controlador Book
router.post('/api/book/create', book.create);
router.get('/api/book/all', book.retrieveAllBooks);
router.get('/api/book/onebyid/:id', book.getBookById);
router.put('/api/book/update/:id', book.updateById);
router.delete('/api/book/delete/:id', book.deleteById);

module.exports = router;
