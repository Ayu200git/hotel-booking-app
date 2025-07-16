const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required()
});

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("").optional(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    available: Joi.boolean().optional(),
    category: Joi.string().valid("Hotel", "Resort", "Villa", "Castles", "Mountains", "Beachfront", "Tree House", "Farm House").required()
  }).required()
});
