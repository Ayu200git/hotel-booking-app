if(process.env.NODE_ENV != "production"){
     require(`dotenv`).config();
}
 
console.log(process.env.SECRET);
const express = require('express');
const app = express();
const mongoose = require('mongoose');  
const path = require('path'); 
const methodOverride = require('method-override'); 
const ejsMate = require('ejs-mate'); 
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const Localstrategy = require("passport-local").Strategy;
const User = require("./models/users.js");
 

const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/users.js");
const wishlistRouter = require("./routes/wishlist.js");
const bookingRouter = require("./routes/booking.js");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

 
const dbUrl = process.env.ATLASDB_URL;
main()
    .then(() => {
         console.log("Connected to MongoDB");
  })
    .catch(err => {
         console.error("Failed to connect to MongoDB", err);
    });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
 
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET 
  },
  touchAfter: 24 * 3600
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }, 
};

 

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
   
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",usersRouter);
app.use("/wishlist", wishlistRouter);
app.use("/booking", bookingRouter);

app.get("/", (req, res) => {
  res.redirect("/listings");
});


app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 