const express = require('express');
const router = express.Router();
const controller = require('../controller/books.controller');

router.get('/', async (req, res) => {
    res.redirect('/api/books');
});
router.get('/api/books', controller.getAllBooks);
router.get('/api/books/:id', controller.getBookById);
router.post('/api/books', controller.createBook);
router.put('/api/books/:id', controller.updateBook);
router.delete('/api/books/:id', controller.deleteBook);

module.exports = router;