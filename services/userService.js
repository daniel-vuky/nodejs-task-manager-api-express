const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Get User By Email
const getUserByEmail = async (email) => {
    return await userModel.findOne({email});
}

//@desc Create new user
const createNewUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userModel.create({
        "email": email,
        "password": hashedPassword,
        "username": username
    });
}

//@desc compare password
const comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
}

//@desc Sign a token for logged in user
const signTokenWithJwt = async (username, email, userId) => {
    return jwt.sign(
        {
            username: username,
            email: email,
            id: userId
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1h"
        }
    );
}

module.exports = {
    getUserByEmail,
    createNewUser,
    comparePassword,
    signTokenWithJwt
}