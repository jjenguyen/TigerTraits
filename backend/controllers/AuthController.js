const User = require("../models/user");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { uname, pass, createdAt } = req.body;
        const existingUser = await User.findOne({ uname });
        if(existingUser) {
            return res.json({ message: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(pass, 8)
        const user = await User.create({ uname, pass : hashedPassword, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });
        res
            .status(201)
            .json({ message: "User signed up successfully", success:true, user });
          next();
        }
        catch (error) {
            console.log(error);
        }
    };