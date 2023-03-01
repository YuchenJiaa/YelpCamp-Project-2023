const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
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
}

module.exports.renderLogin = (req, res) => {
    //reference https://www.youtube.com/watch?v=i0q8YCCffoM&t=1s 
    if(req.query.returnTo){
        req.session.returnTo = req.query.returnTo;
    }
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}
//fix req.session.destroy();
module.exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success', "Goodbye!");
        res.redirect('/campgrounds');
    });
  
}