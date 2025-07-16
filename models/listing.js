const mongoose = require('mongoose');  
const Schema = mongoose.Schema;
const Reviews = require('./reviews.js');
const { string } = require('joi');
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
         
    },
    description: {
        type: String,
         
    },
    image: {
        filename: String,
        url: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
         
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reviews",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    category: {
        type: String,
        enum: ["Hotel", "Resort", "Villa", "Castles", "Mountains", "Beachfront", "Tree House", "Farm House"],
        required: true
    },
    eminities: {
        type: [String],
        enum: ["Free wi-fi", "Pool", "Parking", "Pet-Friendly"]
    }

});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
      await  Reviews.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
