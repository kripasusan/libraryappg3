const express = require('express');
const userData = require('../model/userData');

const userRouter = express.Router();
const nav3 = [
    {
        link: '/login', name: 'Login'
    },
    {
        link: '/signup', name: 'Sign Up'
    }
]
function router(nav) {
    userRouter.post('/signup', function (req, res) {
        const item = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        }
        const user = userData(item)
        user.save()
        res.redirect('/home');
    })

    userRouter.post('/login', async (req, res) => {
        try {
            const user = await userData.findByCredentials(req.body.email, req.body.password)
            return res.redirect('/home')
        } catch (err) {
            res.status(400).render("error", {
                nav3,
                title: "Error 400",
                error: "Access Denied",
                message: err
            })
        }
    })
    return userRouter;
}

module.exports = router;