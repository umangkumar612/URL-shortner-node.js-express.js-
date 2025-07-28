const express = require('express');
const {connectToMongoDB} = require('./connection');
const path = require('path');
const urlRoute = require('./router/url');
const URL = require('./models/url');
const cookieParser = require('cookie-parser');
const { Timestamp } = require('bson');
const staticRoute = require('./router/staticRouter');
const userRoute = require('./router/user');
const {restrictToUserLoggedinOnly, checkAuth} = require('./middlewares/auth')

const app = express();  
const port = 1001;
 
connectToMongoDB('mongodb://localhost:27017/short-url').then(() =>{
    console.log('mongodb is connected'); 
})
app.set('view engine' , "ejs");
app.set('views' , path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser() );

app.use('/url', restrictToUserLoggedinOnly,urlRoute);
app.use('/user', userRoute);
app.use('/', checkAuth,staticRoute);

// Home route
app.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    res.render('home', { urls: allUrls });
});

// Auth routes
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// Redirection logic
app.get('/url/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        console.log('Updated visit history:', entry.visitHistory);
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Error while updating visit history:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
