const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to the file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    // res.send({
    //     name:'nipun',
    //     likes: [
    //         'books',
    //         'study'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hey! Welcome to home page'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: 'unable to process your request'
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});