const express = require('express');
const router = express.Router();
const Book = require('../models/Books');


router.get('/', (req, res) => {
    res.redirect('/api/books');
});

router.get('/api/books', (req, res) => {
    Book.find()
    .then(books => {
        if(!books){
            res.send('There are no books');
        }
        res.json(books);
    })
    .catch(err => {
        res.status(500).json(`Error: ${err}`);
    })
});

router.get('/api/books/:id', (req, res) => {
    let book = books.find((elem) => {
        return elem.id === parseInt(req.params.id);
    });
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('There is no such ID!');
    }
});

router.post('/api/books', (req, res) => {
    let bookIds = books.map(item => item.id);

    let newBookId = bookIds.length > 0 ? bookIds.length + 1 : 1;

    let newBook = {
        id: newBookId,
        title: req.body.title,
        author: req.body.author
    }
    books.push(newBook);

    let updatedBooks = JSON.stringify(books);

    fs.writeFileSync('books.json', updatedBooks, (err) => {
        if (err) {
            console.log('Erooooooooooooor ', err);
        }
    });

    res.status(201).json(newBook);
});

router.put('/api/books/:id', (req, res) => {
    let book = books.find(elem => {
        return elem.id === parseInt(req.params.id);
    });

    if (book) {
        let updatedBook = {
            id: parseInt(req.params.id),
            title: req.body.title,
            author: req.body.author
        };
        let targetIndex = books.indexOf(book);
        books.splice(targetIndex, 1, updatedBook);

        let updatedBooks = JSON.stringify(books);

        fs.writeFileSync('books.json', updatedBooks, (err) => {
            if (err) {
                console.log('Erooooooooooooor ', err);
            }
        })

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/api/books/:id', (req, res) => {
    let book = books.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if (book) {
        let targetIndex = books.indexOf(book);
        books.splice(targetIndex, 1);
    }
    let updatedBooks = JSON.stringify(books);

    fs.writeFileSync('books.json', updatedBooks, (err) => {
        if (err) {
            console.log('Erooooooooooooor ', err);
        }
    })

    res.sendStatus(204);
});


module.exports = router;