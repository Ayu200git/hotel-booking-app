const Listing = require("./models/listing");
const Reviews = require("./models/reviews.js")
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
      //redirect url save
      req.session.redirectUrl = req.originalUrl;    
      req.flash("error", "You're not Logged in.");
      return res.redirect("/login");
    }
    next();
};



module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
      req.flash("error", "Permission Denied");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

//for server side validation of  listings
module.exports.validateListing = (req, res ,next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  
  } else{
    next();
  }
};

//for server side validation of reviews
module.exports.validateReview = (req, res ,next) => {
  if(!req.body.review){
    throw new ExpressError(400, "review data is required.");
  }
  let {error} = reviewSchema.validate(req.body.review);
  if(error){
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  
  } else{
    next();
  }
  
};

module.exports.isAuthor = async (req, res, next) =>{
    let { id, reviewId } = req.params;
    let reviews = await Reviews.findById(reviewId);
    if(!reviews){
      req.flash("error", "Review not found");
      return res.redirect(`/listings/${id}`);
    }
    if(!reviews.author.equals(res.locals.currUser._id)){
      req.flash("error", "You are not a Authorized person.");
      return res.redirect(`/listings/${id}`);
    }
    next();
};

//for role based authorization
module.exports.hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated() || !roles.includes(req.user.role)) {
      req.flash('error', 'Access denied.');
      return res.redirect('/listings');
    }
    next();
  };
};
