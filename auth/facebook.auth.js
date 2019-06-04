const FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user.model'),
    configAuth = require('../config');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebook.app_id,
        clientSecret: configAuth.facebook.app_secret,
        callbackURL: configAuth.facebook.callback,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        //enableProof: true

    },

        function (token, refreshToken, profile, done) {
            //console.log('token',token);
         // console.log('profileData',JSON.stringify(profile));
            process.nextTick(function () {
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {

                    if (err)
                        return done(err);
                    if (user) {
                        console.log('user found+++++++++');
                        //req.user=user;
                        return done(null, user); // user found, return that user
                    } else {
                        var newUser = new User();

                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.displayName // look at the passport user profile to see how names are returned
                        newUser.facebook.email = (profile.emails &&profile.emails.length && profile.emails[0].value)?profile.emails[0].value:Date.now(); // facebook can return multiple emails so we'll take the first
                        newUser.facebook.imageUrl=(profile.photos &&profile.photos.length && profile.photos[0].value)?profile.photos[0].value:Date.now();
                        console.log('new user+++',JSON.stringify(newUser));
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

};