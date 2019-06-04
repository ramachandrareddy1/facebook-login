//module.exports = function () {
let app = require('express').Router(),
    passport = require('passport');
app.get('/', function (req, res) {
    console.log('failure index');
    res.render('index.ejs');
});

app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

app.get('/profile', isLoggedIn,function (req, res) {
    console.log('profile Page comming++++++');
    console.log('user +++++',req.user);
    res.render('profile.ejs', {
        user: req.user
    });
});


app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/',
        session: true
       // failureFlash : true
    })
    );


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


//};


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports=app;