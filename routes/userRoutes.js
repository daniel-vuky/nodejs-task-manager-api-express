const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
    login,
    register,
    current,
} = require("../controller/userController");

const router = express.Router();

router.get("/login", login);
router.post("/register", register);
router.get("/current", validateToken, current);

module.exports = router;