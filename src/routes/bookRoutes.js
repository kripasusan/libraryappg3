const express = require("express");
const booksRouter = express.Router(); //creating a separate router for books using express router class
const BookData = require('../model/bookData')
function router(nav) {
    // var books = [
    //     {
    //         title: 'Oliver Twist',
    //         author: 'Charles Dickens',
    //         genre: 'Fiction',
    //         img: "oliver.jpg"
    //     },

    //     {
    //         title: 'Tale of Two Cities',
    //         author: 'Charles Dickens',
    //         genre: 'Fiction',
    //         img: "tale.jpg"
    //     },

    //     {
    //         title: 'Pride and Prejudice',
    //         author: 'Jane Austin',
    //         genre: 'Fiction',
    //         img: "pride.jpg"
    //     },

    //     {
    //         title: 'Little Women',
    //         author: 'Louisa May Alcott',
    //         genre: 'Fiction',
    //         img: "little.jpg"
    //     },

    //     {
    //         title: 'Wings of Fire',
    //         author: 'APJ Abdul Kalam & Arun Tiwari',
    //         genre: 'Autobiography',
    //         img: "wings.jpg"
    //     }

    // ]
    booksRouter.get('/', function (req, res) { // / is used for root page
        BookData.find()
            .then(function (books) {
                res.render("books",
                    {
                        nav,
                        title: 'Library',
                        books
                    });
            });

    });

    //accessing url characters using :
    booksRouter.get('/:indx', function (req, res) {
        const id = req.params.indx;
        BookData.findOne({ _id: id })
            .then(function (book) {
                res.render('book',
                    {
                        nav,
                        title: 'Book',
                        book
                        // book:books[id]  //key:value pair
                    })
            }).catch((err) => res.render("error", {
                nav,
                title: "Error 500",
                error: "Internal Server Error",
                message: err

            }));
    })

    return booksRouter;

}

module.exports = router;