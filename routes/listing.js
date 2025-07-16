const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing, hasRole} = require("../middleware.js"); 
const multer = require("multer");  //for image amd file upload in html form and send to backend
const listingController = require("../controllers/listing.js");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });  

 
 
router 
  .route("/")
  .get(wrapAsync(listingController.index))  // Endpoint to get all listings / index route
  .post( 
     isLoggedIn, 
     hasRole("owner", "admin"),                                  // Endpoint to handle the creation of a new listing
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingController.newCreate)
 );

 //for search box
router.get("/search", isLoggedIn, wrapAsync(listingController.search));

// Endpoint to create a new listing
router.get("/new", isLoggedIn, hasRole("owner", "admin"), listingController.new );

//for admin acess route
router.get("/admin", isLoggedIn, hasRole("admin"), (req, res) => {
  res.render("admin/dasboard");
});


router
   .route("/:id")
   .get(wrapAsync(listingController.show))     // Endpoint to get a specific listing by ID show route
   .put(isLoggedIn, isOwner,
        upload.single("listing[image]"),                   // Endpoint to update a specific listing
        validateListing, 
        wrapAsync(listingController.updateList)
    )
    .delete(isLoggedIn, isOwner,                // Endpoint to delete a specific listing
        wrapAsync(listingController.delete)
    );  

// Endpoint to edit a specific listing
router.get("/:id/edit", isLoggedIn, isOwner,
  wrapAsync(listingController.editList));


 
 


module.exports = router;
