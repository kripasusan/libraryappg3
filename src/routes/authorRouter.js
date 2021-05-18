const express = require('express');
const authorData = require('../model/authorData');
const authorRouter = express.Router()



function router(nav) {
    // var authors = [
    //     {
    //         name: 'Charles Dickens',
    //         nationality: 'England',
    //         born: '7 February 1812',
    //         description:'Charles John Huffam Dickens FRSA was an English writer and social critic. He created some of the world\'s best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era.',
    //         img: "charles.jpg"
    //     },

    //     {

    //         name: 'Jane Austin',
    //         nationality: 'England',
    //         born:'16 December 1775',
    //         description: 'Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century. Austen\'s plots often explore the dependence of women on marriage in the pursuit of favourable social standing and economic security',
    //         img: "jane.jpg"
    //     },

    //     {
    //         name: 'Louisa May Alcott',
    //         nationality: 'United States of America',
    //         born:'29 November 1832',
    //         description: 'Louisa May Alcott was an American novelist, short story writer and poet best known as the author of the novel Little Women and its sequels Little Men and Jo\'s Boys.',
    //         img: "louisa.jpg"
    //     },

    //     {
    //         name: 'APJ Abdul Kalam & Arun Tiwari',
    //         nationality: 'India',
    //         born: '15 October 1931',
    //         description: 'Avul Pakir Jainulabdeen Abdul Kalam was an Indian aerospace scientist who served as the 11th President of India from 2002 to 2007. He was born and raised in Rameswaram, Tamil Nadu and studied physics and aerospace engineering. Arun Kumar Tiwari is an Indian missile scientist, author, and professor. He has written several books and co-authored 5 books with Dr. APJ Abdul Kalam, including Wings of Fire, the autobiography of Dr. APJ Abdul Kalam, former president of India.',
    //         img: "apj.jpg"
    //     }

    // ]
    authorRouter.get('/', function (req, res) {
        authorData.find().then((authors) => {
            res.render('authors',
                {
                    nav,
                    title: "Authors",
                    authors
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))
    });
    authorRouter.get('/:id', function (req, res) {
        const id = req.params.id;
        authorData.findOne({ _id: id })
            .then(function (author) {
                res.render('author',
                    {
                        nav,
                        title: "Author",
                        author  //author: authors[id]
                    })

            }).catch((err) => res.render("error", {
                nav,
                title: "Error 500",
                error: "Internal Server Error",
                message: err
            }))
    })

    return authorRouter;
}

module.exports = router;