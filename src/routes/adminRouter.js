const express = require('express');
const adminRouter = express.Router()
const BookData = require('../model/bookData');
const AuthorData = require('../model/authorData');
const multer = require('multer')

const storage = multer.diskStorage({
    //destination for files
    destination: function (req, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});


//module.exports = authorData
function router(nav) {

    adminRouter.get('/', (req, res) => {
        res.render('admin',
            {
                nav,
                title: "Library"
            })
    })


    adminRouter.post('/addBook', upload.single('image'), async (req, res) => {

        var item = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            image: req.file.filename,

        }
        var Book = BookData(item);
        Book.save();
        res.redirect('/books');
    })

    adminRouter.post('/addauthor', upload.single('image'), async (req, res) => {
        var item = {
            name: req.body.name,
            nationality: req.body.nationality,
            born: req.body.born,
            description: req.body.description,
            image: req.file.filename,

        }
        var Author = AuthorData(item);
        Author.save();
        res.redirect('/authors');
    })


    adminRouter.get('/:id/bookeditor', (req, res) => {
        const id = req.params.id;
        BookData.findOne({ _id: id })
            .then(function (book) {
                res.render('bookeditor', {
                    nav,
                    title: 'Update Book',
                    book
                });
            });
    });
    adminRouter.post("/:id/bookdelete", function (req, res) {
        const id = req.params.id;
        BookData.deleteOne({ _id: id })
            .then(function (book) {

                res.redirect('/books');
            });
    })
    adminRouter.post('/:id/updateBook', upload.single('image'), async (req, res) => {
        const id = req.params.id;
        var item = {

            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            description: req.body.description,
            image: req.file.filename,

        };
        BookData.findByIdAndUpdate({ _id: id }, item, function (req, res) {

        });
        res.redirect('/books');

    });



    adminRouter.get('/:id/authoreditor', (req, res) => {
        const id = req.params.id;
        AuthorData.findOne({ _id: id })
            .then(function (author) {
                res.render('authoreditor', {
                    nav,
                    title: 'Update Author',
                    author
                });
            });
    });
    adminRouter.post("/:id/authordelete", function (req, res) {
        const id = req.params.id;
        AuthorData.deleteOne({ _id: id })
            .then(function (author) {

                res.redirect('/authors');
            });
    })
    adminRouter.post('/:id/updateAuthor', upload.single('image'), async (req, res) => {
        const id = req.params.id;
        var item = {

            nationality: req.body.nationality,
            name: req.body.name,
            image: req.file.filename,
            born: req.body.born,
            description: req.body.description

        };
        AuthorData.findByIdAndUpdate({ _id: id }, item, function (req, res) {

        });
        res.redirect('/authors');

    });


    return adminRouter;
}

module.exports = router;


