const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.gewcx.mongodb.net/LibraryApp?sretryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { console.log(err); })
const methodOverride = require('method-override');
//heroku stuff
const port = process.env.PORT || 5112;

const nav = [
    {
        link: '/home', name : 'Home'
    },
    
    {
        link: '/books', name: 'Books'
    },
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/admin', name: 'Add Book/Author'
    },
    {
        link: '/logout', name: 'Log Out'
    }
];

const nav2 = [
   

    {
        link: '/login', name: 'Login'
    },
    {
        link: '/signup', name: 'Sign Up'
    }
]


const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const userRouter = require('./src/routes/userRouter')(nav);

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/src/views");

app.use('/books', booksRouter);     //all exclusively declared routers
app.use('/authors', authorRouter);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRouter);
app.use('/authors/authoredit', adminRouter);
app.use('/user', userRouter);
// app.use('/logout', userRouter);

app.get('/', function (req, res) {
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("login",
        {
            nav2,
            title: 'Library'

        });
});

//SIGN UP ROUTER
app.get('/signup', function (req, res) {
    res.render('signup',
        {
            nav2,
            title: "Signup"
        })
})
//LOGIN ROUTER
app.get('/login', (req, res) => {    //using arrow function
    res.render('login',
        {
            nav2,
            title: "Login"
        })
});

app.get('/home', (req, res) => {    //using arrow function
    res.render('index',
        {
            nav,
            title: "Home"
        })
});

app.get('/logout', (req, res) => {    //using arrow function
    res.render('login',
        {
            nav2,
            title: "Login"
        })
});

app.listen(port, () => { console.log("Server Ready at " + port) });