const express = require("express");
const {
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask
} = require("../controller/taskController");

const router = express.Router();

router.route("/").get(getTasks);
router.route("/").post(createTask);
router.route("/:id").get(getTask);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);

module.exports = router;