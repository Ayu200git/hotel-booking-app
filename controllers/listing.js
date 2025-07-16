const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const Booking = require("../models/booking");

const categories = ["Hotel", "Resort", "Villa", "Castles", "Mountains", "Beachfront", "Tree House", "Farm House"];

module.exports.index = async (req, res) => {
  const { category } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }

  const allListings = await Listing.find(filter);
  const categories = ["Hotel", "Resort", "Villa", "Castles", "Mountains", "Beachfront", "Tree House", "Farm House"];


  res.render('listings/index.ejs', { allListings, categories, selectedCategory: category || "" });
};

module.exports.new =  (req, res) => {
  const categories = ["Hotel", "Resort", "Villa", "Castles", "Mountains", "Beachfront", "Tree House", "Farm House"];
  res.render("listings/new.ejs", { categories, listing: {} });
};

module.exports.show = async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id)
     .populate({ 
        path: "reviews", 
        populate: {
       path: "author",
      },
  }) 
  .populate("owner");
  if (!listing){
     req.flash("failure", "Hotel not Exist in list");
     res.redirect("/listings");
  }
  const confirmedBookings = await Booking.find({
    listing: id,
    status: "confirmed"
  });
  // Get current user's booking for this listing (if logged in)
  let existingUserBooking = null;
  if (req.user) {
    existingUserBooking = await Booking.findOne({
      listing: id,
      user: req.user._id,
    });
  }
  res.render("listings/show.ejs", { listing, currUser: req.user, confirmedBookings, existingUserBooking });  
};

module.exports.newCreate = async (req, res, next) => { 
  let response = await geocodingClient
     .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
   
    
  if(!req.body.listing){
      throw new ExpressError(404, "Invalid Data Enterd"); 
    }
      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = {url, filename};
      newListing.geometry = response.body.features[0].geometry;
      let savedListing = await newListing.save();
       
      req.flash("succes"," Successfully Added your Hotel");
      res.redirect("/listings");
  };

module.exports.editList = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing){
       req.flash("failure", "Hotel not Exist in list");
       res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    orurl = originalUrl.replace("/upload", "/upload/h_300,w_200");
    res.render("listings/edit.ejs", { listing, orurl, categories });
  };

module.exports.updateList = async (req, res) => {
    let { id } = req.params;
    const {listing} = req.body;
    let updated = await Listing.findById(id);
    let list = await Listing.findByIdAndUpdate(id, listing);
    if( typeof req.file !== "undefined"){
         let url = req.file.path;
         let filename = req.file.filename;
         list.image = { url, filename };
         await list.save();
    }     
    req.flash("success", "updated succesfully. ");
    res.redirect(`/listings/${id}`);
  };

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Deleted Successfuly");
    res.redirect("/listings");
  };
  

//for search box
module.exports.search = async (req, res) => {
  const q = req.query.q || "";
  const regex = new RegExp(q, "i");
  const allListings = await Listing.find({
    $or: [{ title: regex }, { location: regex }]
  });
   res.render('listings/index.ejs', {
      allListings,
      q,
      selectedCategory: ""
  });

};



   