const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }],
    role: {
        type: String,
        enum: ["user", "owner", "admin"],
        default: "user"
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);