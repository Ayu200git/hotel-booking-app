const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Listing = require('../models/listing');
const { isLoggedIn, hasRole } = require('../middleware');

// Create a booking request
router.post('/:listingId', isLoggedIn, async (req, res) => {
  const { listingId } = req.params;
  const { startDate, endDate } = req.body;
  //prevent existing booking
  const existingBookings = await Booking.find({
    listing: listingId,
    status: 'Confirmed',
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
  });

  if (existingBookings.length > 0) {
    req.flash('error', 'The selected dates are already booked.');
    return res.redirect(`/listings/${listingId}`);
  }

  const booking = new Booking({
    user: req.user._id,
    listing: listingId,
    startDate,
    endDate,
    status: 'Pending',
  });

  await booking.save();
  req.flash('success', 'Booking request submitted!');
  res.redirect(`/listings/${listingId}`);
});

// View current user's booking requests
router.get('/my', isLoggedIn, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('listing');
  res.render('booking/myBooking', { bookings });
});

// View owner’s incoming booking requests
router.get('/manage', isLoggedIn, hasRole("owner", "admin"), async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  const listingIds = listings.map(l => l._id);
  const bookings = await Booking.find({ listing: { $in: listingIds } }).populate('user listing');
  res.render('booking/manageBooking', { bookings });
});

// Approve or Deny a booking
router.post('/:bookingId/decision', isLoggedIn, hasRole("owner", "admin"), async (req, res) => {
  const { bookingId } = req.params;
  const { decision } = req.body; // 'Confirmed' or 'Denied'

  const booking = await Booking.findById(bookingId).populate('listing');
  if(!booking){
    req.flash("error", "Booking not found");
    return res.redirect("/booking/manage");
  }

  if (!booking.listing.owner.equals(req.user._id)) {
    req.flash('error', 'You are not authorized to make decisions on this booking.');
    return res.redirect('/booking/manage');
  }

   if (!['Confirmed', 'Denied'].includes(decision)) {
    req.flash('error', 'Invalid decision.');
    return res.redirect('/booking/manage');
  }

  booking.status = decision;
  await booking.save();

  req.flash('success', `Booking has been ${decision.toLowerCase()}.`);
  res.redirect('/booking/manage');
});

module.exports = router;
