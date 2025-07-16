const express = require("express");
const router = express.Router({mergeParams: true}); 
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews = require('../models/reviews.js');
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

 


//reviews post route
router.post("/",  
  isLoggedIn,           //remove common parts /listing/id/reviews
  validateReview,
  wrapAsync(reviewController.postReview));


//review delete route
router.delete("/:reviewId",
  isLoggedIn,
  isAuthor,
   wrapAsync(reviewController.delReview));


module.exports = router;  
