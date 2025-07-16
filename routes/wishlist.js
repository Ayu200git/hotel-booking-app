// routes/wishlist.js
const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/users');
const { isLoggedIn } = require('../middleware'); // assumes you have auth middleware

// Add or remove a listing from wishlist
router.post('/:id', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id);
  const listingId = req.params.id;

  const index = user.wishlist.indexOf(listingId);
  if (index > -1) {
    // Already in wishlist, remove it
    user.wishlist.splice(index, 1);
  } else {
    // Not in wishlist, add it
    user.wishlist.push(listingId);
  }

  await user.save();
  res.redirect('/listings/' + listingId);
});

// View all wishlisted hotels
router.get('/', isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.render('users/wishlist', { wishlist: user.wishlist });
});

module.exports = router;


 