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
    Book.findById({_id:req.params.id})
    .then(book => {
        if(!book){
            res.json(`There is no book with id: ${req.params._id}`)
        }
        res.status(200).json(book);
    })
    .catch(err => {
        res.status(404).send(`Failed to find the book. Error: ${err}`);

    });
});

router.post('/api/books', (req, res) => {
    if(!req.body.title && !req.body.author){
        return res.status(400).send('A book should has a title and an author');
    }

    const newBook = new Book({
        title: req.body.title,
        author: req.body.author
    });

    newBook.save()
    .then(book => {
        res.status(201).json(book);

    })
    .catch(err => {
        res.status(500).json('Failed to save a book');
    });
});

router.put('/api/books/:id', (req, res) => {
    const book = books.find(elem => {
        return elem.id === parseInt(req.params.id);
    });

    if (book) {
        const updatedBook = {
            id: parseInt(req.params.id),
            title: req.body.title,
            author: req.body.author
        };
        const targetIndex = books.indexOf(book);
        books.splice(targetIndex, 1, updatedBook);

        const updatedBooks = JSON.stringify(books);

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
    const book = books.find(item => {
        return item.id === parseInt(req.params.id);
    });
    if (book) {
        const targetIndex = books.indexOf(book);
        books.splice(targetIndex, 1);
    }
    const updatedBooks = JSON.stringify(books);

    fs.writeFileSync('books.json', updatedBooks, (err) => {
        if (err) {
            console.log('Erooooooooooooor ', err);
        }
    })

    res.sendStatus(204);
});


module.exports = router;