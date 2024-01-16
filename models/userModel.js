const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: [true, "This email already existed"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    },
    username: {
        type: String,
        required: [true, "Please enter the username"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("users", userSchema);