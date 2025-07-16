const User = require("../models/users.js");
module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try{
          let {username, email, password, role} = req.body;
          const allowedRoles = ["user", "owner", "admin"]; 
          if (!allowedRoles.includes(role)) {
            role = "user"; // fallback
          }
          const newUser = new User({email, username, role});
          const registeredUser = await User.register(newUser, password);
          req.login(registeredUser, (err) => {
            if(err){
                 return next(err);
            }
            req.flash("success", "User Registered Successfully");
            res.redirect("/listings");
          });
           
           
    } catch(err) {
           req.flash("error", err.message);
           res.redirect("/signup");
    }
     
};

module.exports.loginRender = async(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => { 
      req.flash("success", "Welcome to LustyRest");
      let redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
   };

   module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","You are Logged Out!");
        res.redirect("/listings");
    } );
};