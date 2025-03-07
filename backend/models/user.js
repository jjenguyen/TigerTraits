const db = require("../app");

//create model to be added as 'user' (mongo) for flexible schema
const User = db.model("User", {
    //uname = university email?
    uname: String,
    //pass = password (non hashed)
    pass: String,
    //string to hold personality type 
    pType: String
});

//export model 'User'
module.exports = User;