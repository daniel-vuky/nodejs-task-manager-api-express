const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Please enter user ID"]
    },
    task: {
        type: String,
        required: [true, "Please enter the task"]
    },
    status: {
        status: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("tasks", taskSchema);