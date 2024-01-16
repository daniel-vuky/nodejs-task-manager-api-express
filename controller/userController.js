const asyncHandler = require("express-async-handler");
const userService = require("../services/userService");

//@desc Login
//@route GET /users/login
//@access public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Missing fields!");
    }
    const userExisted = await userService.getUserByEmail(email); 
    if (!userExisted) {
        res.status(401);
        throw new Error("Can not find any user with this email!");
    }
    const passwordMatched = await userService.comparePassword(password, userExisted.password);
    if (!passwordMatched) {
        res.status(401);
        throw new Error("Email or Password is not correct!");
    }
    const accessToken = await userService.signTokenWithJwt(
        userExisted.username,
        userExisted.email,
        userExisted.id
    );
    res.status(200).json({accessToken});
});

//@desc Register a user
//@route POST /users/register
//@access public
const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Missing fields!");
    }
    const existedUser = await userService.getUserByEmail(email);
    if (existedUser) {
        res.status(400);
        throw new Error("User already existed!");
    }
    const createdUser = await userService.createNewUser(username, email, password);
    if (createdUser) {
        res.status(201).json(createdUser);
    } else {
        res.status(404);
        throw new Error("Can not create user!");
    }
});

//@desc Get current user
//@route GET /users/current
//@access private
const current = asyncHandler(async (req, res) => {
    res.status(201).json(req.user);
});

module.exports = {
    login,
    register,
    current
}