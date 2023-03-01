const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const {checkReturnTo}=require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;
/*
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

// router.get('/login', (req, res) => {
//     if(req.query.returnTo){
//         req.session.returnTo = req.query.returnTo;
//     }
//     res.render('users/login');
// })

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})
// router.post(checkReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),User.login)



// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Goodbye!");
//     res.redirect('/campgrounds');
// })
//Since version 0.6.0 (which was released only a few days ago by the time of writing this), req.logout is asynchronous. This is part of a larger change that averts session fixation attacks.
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/campgrounds');
    });
  });

module.exports = router;
*/