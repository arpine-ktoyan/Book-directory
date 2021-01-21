const Book = require('../models/Books');

exports.getAllBooks = (req, res) => {
    Book.find()
        .then(books => {
            if (!books) {
                res.send('There are no books');
            }
            res.json(books);
        })
        .catch(err => {
            res.status(500).json(`Error: ${err}`);
        })
}

exports.getBookById = (req, res) => {
    Book.findById({ _id: req.params.id })
        .then(book => {
            if (!book) {
                res.status(404).json(`There is no book with id: ${req.params.id}`)
            }
            res.status(200).json(book);
        })
        .catch(err => {
            res.status(500).json(`Failed to find the book. Error: ${err}`);

        });
}

exports.createBook = (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json('A book should has a title and an author');
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
}

exports.updateBook = (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json('Book should has a title and an author');
    }

    const updatedBook = {
        title: req.body.title,
        author: req.body.author
    };

    Book.findByIdAndUpdate({ _id: req.params.id }, updatedBook, { new: true })
        .then(book => {
            if (!book) {
                return res.json(`There is no book with id: ${req.params.id}`);
            }
            res.sendStatus(204);
        })
        .catch(err => {
            res.status(500).json(`Failed to update the book. Error: ${err}`);
        });
}

exports.deleteBook = (req, res) => {
    Book.findByIdAndRemove({ _id: req.params.id })
        .then(book => {
            if (!book) {
                return res.status(404).json(`There is no book with id: ${req.params.id}`);
            }
            res.sendStatus(204);
        })
        .catch(err => {
            res.status(500).json(`Failed to delete the book. Error: ${err}`);

        });
}