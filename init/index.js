const mongoose = require('mongoose');   
const initData = require('./data.js');  // data.js exports array of listings
const Listing = require('../models/listing.js'); 

const MONGO_URI = "mongodb://127.0.0.1:27017/lustyrest";

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");
}

const seedDB = async () => {
  await Listing.deleteMany({});
  const dataWithOwner = initData.map((obj) => ({ ...obj, owner: "686d3f16ef2ba4d90bbb40f8" }));
  await Listing.insertMany(dataWithOwner);
  console.log("Database initialized with sample data");
  mongoose.connection.close();
};

main()
  .then(() => seedDB())
  .catch(err => {
    console.error("Error:", err);
    mongoose.connection.close();
  });
