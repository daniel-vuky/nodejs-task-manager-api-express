const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
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