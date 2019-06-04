const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    { port, dbUrl } = require('./config'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    user = require('./routes/user.routes'),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    session = require('express-session');


mongoose.connect(dbUrl, { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('DB connected sucessfully');
});
require('./auth/facebook.auth')(passport);




app.use(morgan('combined'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboard cat'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());







app.use('/',user);

app.listen(process.env.PORT || port, (err) => {
    if (err) console.log(err);
    else console.log('server running on the port:', 3000)
});


module.exports = app;