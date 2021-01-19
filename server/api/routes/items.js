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
            res.json(`There is no book with id: ${req.params.id}`)
        }
        res.status(200).json(book);
    })
    .catch(err => {
        res.status(404).send(`Failed to find the book. Error: ${err}`);

    });
});

router.post('/api/books', (req, res) => {
    if(!req.body.title || !req.body.author){
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
    if(!req.body.title || !req.body.author){
        return res.status(400).json('Book should has a title and an author');
    }

    const updatedBook = {
            title: req.body.title,
            author: req.body.author
    };

    Book.findByIdAndUpdate({_id: req.params.id}, updatedBook, {new: true})
    .then(book => {
        if(!book){
           return res.json(`There is no book with id: ${req.params.id}`);
        }
        res.json('Succesfully updated.');
    })
    .catch(err => {
        res.status(500).send(`Failed to update the book. Error: ${err}`);
    });
});

router.delete('/api/books/:id', (req, res) => {
    Book.findByIdAndRemove({_id:req.params.id})
    .then(book => {
        if(!book){
            return res.json(`There is no book with id: ${req.params.id}`);
        }
        res.json('The book is deleted');
    })
    .catch(err => {
        res.status(500).send(`Failed to delete the book. Error: ${err}`);

    });
});


module.exports = router;