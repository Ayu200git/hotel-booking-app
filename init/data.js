 const sampleListings = [
  {
    title: "Cozy Cottage in Manali",
    description:
      "A charming cottage in the serene hills of Manali. Perfect for a peaceful getaway surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Manali",
    country: "India",
    category: "Farm House",     // Changed from "Cottage"
    geometry: {
      type: "Point",
      coordinates: [77.1689, 32.2396],
    },
  },
  {
    title: "Modern Apartment in Mumbai",
    description:
      "Stay in the heart of Mumbai with all modern amenities. Close to major attractions and business hubs.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Mumbai",
    country: "India",
    category: "Hotel",       // Changed from "Apartment"
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760],
    },
  },
  {
    title: "Hilltop Cabin in Ooty",
    description:
      "A cozy cabin nestled in the hills of Ooty. Enjoy cool weather and scenic views all around.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Ooty",
    country: "India",
    category: "Farm House",     // Changed from "Cabin"
    geometry: {
      type: "Point",
      coordinates: [76.6950, 11.4064],
    },
  },
  {
    title: "Heritage Villa in Jaipur",
    description:
      "Experience the royal heritage of Rajasthan in this beautifully restored villa in Jaipur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Jaipur",
    country: "India",
    category: "Villa",
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124],
    },
  },
  {
    title: "Treehouse Stay in Coorg",
    description:
      "Experience the lush greenery of Coorg from this unique treehouse stay, surrounded by coffee plantations.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Coorg",
    country: "India",
    category: "Tree House",
    geometry: {
      type: "Point",
      coordinates: [75.8069, 12.3375],
    },
  },
  {
    title: "Beachfront Apartment in Goa",
    description:
      "Relax in this beautiful beachfront apartment in Goa with stunning sea views and easy beach access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Goa",
    country: "India",
    category: "Beachfront",
    geometry: {
      type: "Point",
      coordinates: [74.1240, 15.2993],
    },
  },
  {
    title: "Lakeside Cabin in Udaipur",
    description:
      "Enjoy peaceful lakeside views from this rustic cabin in the City of Lakes, Udaipur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Udaipur",
    country: "India",
    category: "Farm House",   // Changed from "Cabin"
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854],
    },
  },
  {
    title: "Luxury Penthouse in Bengaluru",
    description:
      "A luxurious penthouse apartment located in the tech hub city, offering panoramic city views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Bengaluru",
    country: "India",
    category: "Hotel",       // Changed from "Penthouse"
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716],
    },
  },
  {
    title: "Ski Resort Stay in Gulmarg",
    description:
      "Enjoy winter sports and breathtaking views at this cozy ski resort accommodation in Gulmarg.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Gulmarg",
    country: "India",
    category: "Resort",
    geometry: {
      type: "Point",
      coordinates: [74.3809, 34.0486],
    },
  },
  {
    title: "Heritage House in Kolkata",
    description:
      "Stay in this classic heritage house in Kolkata, rich with culture and history.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Kolkata",
    country: "India",
    category: "Farm House",   // Changed from "House"
    geometry: {
      type: "Point",
      coordinates: [88.3639, 22.5726],
    },
  },
  {
    title: "Private Island Retreat in Andaman",
    description:
      "Escape to a private island in the Andaman Islands for a peaceful and exclusive experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "Andaman Islands",
    country: "India",
    category: "Villa",      // Changed from "Island"
    geometry: {
      type: "Point",
      coordinates: [92.6586, 11.7401],
    },
  },
  {
    title: "Cottage in Munnar",
    description:
      "A cozy cottage surrounded by tea plantations in the scenic hills of Munnar.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Munnar",
    country: "India",
    category: "Farm House",  // Changed from "Cottage"
    geometry: {
      type: "Point",
      coordinates: [77.0592, 10.0892],
    },
  },
  {
    title: "Brownstone Style Home in Chennai",
    description:
      "A stylish brownstone-inspired home located in the bustling city of Chennai.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Chennai",
    country: "India",
    category: "Villa",   // Changed from "Brownstone"
    geometry: {
      type: "Point",
      coordinates: [80.2707, 13.0827],
    },
  },
  {
    title: "Beachfront Bungalow in Kovalam",
    description:
      "Enjoy the serene beaches of Kovalam from this lovely beachfront bungalow.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Kovalam",
    country: "India",
    category: "Beachfront",
    geometry: {
      type: "Point",
      coordinates: [77.2245, 8.4089],
    },
  },
  {
    title: "Mountain Cabin in Dharamshala",
    description:
      "A cozy mountain cabin in Dharamshala with beautiful views of the Himalayas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2300,
    location: "Dharamshala",
    country: "India",
    category: "Farm House",   // Changed from "Cabin"
    geometry: {
      type: "Point",
      coordinates: [76.3220, 32.2190],
    },
  },
  {
    title: "Art Deco Apartment in Pune",
    description:
      "Experience modern living in this stylish Art Deco apartment in Pune.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Pune",
    country: "India",
    category: "Hotel",   // Changed from "Apartment"
    geometry: {
      type: "Point",
      coordinates: [73.8567, 18.5204],
    },
  },
  {
    title: "Luxury Villa in Hyderabad",
    description:
      "A luxurious villa with modern amenities and spacious living in Hyderabad.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Hyderabad",
    country: "India",
    category: "Villa",
    geometry: {
      type: "Point",
      coordinates: [78.4867, 17.3850],
    },
  },
  {
    title: "Historic Fort Stay in Jaisalmer",
    description:
      "Live like a king in this historic fort accommodation located in the desert city of Jaisalmer.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Jaisalmer",
    country: "India",
    category: "Castles",   // Changed from "Fort"
    geometry: {
      type: "Point",
      coordinates: [70.9145, 26.9124],
    },
  },
  {
    title: "Desert Camp in Rajasthan",
    description:
      "Experience desert life with this luxurious camp in Rajasthan's Thar Desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Jodhpur",
    country: "India",
    category: "Resort",   // Changed from "Camp"
    geometry: {
      type: "Point",
      coordinates: [73.0169, 26.2389],
    },
  },
  {
    title: "Rustic Log Cabin in Rishikesh",
    description:
      "Unwind by the river in this rustic log cabin surrounded by the Himalayan foothills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Rishikesh",
    country: "India",
    category: "Farm House",    // Changed from "Cabin"
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869],
    },
  }
];

module.exports = sampleListings;