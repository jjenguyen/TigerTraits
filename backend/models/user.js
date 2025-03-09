const db = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//create model to be added as 'user' (mongo) for flexible schema
//freecodecamp link from Prof Murrel (link is #dev-backend) 
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: [true, "A valid UM System email is required."],
        unique: true,
    },
    pass: {
        type: String,
        required: [true, "Your password is required."],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.pre("save", async function() {
    this.pass = await bcrypt.hash(this.pass, 12);
});

//export model 'User'
module.exports = mongoose.model("User", userSchema);