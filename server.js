const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const app = express();
const port = process.env.SERVER_PORT || 8080;

connectDB();
app.use(express.json());
app.use("/tasks/", require("./routes/task"));
app.use("/users/", require("./routes/task"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server now running on port ${port}`);
})