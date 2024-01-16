const asyncHandler = require("express-async-handler");
const taskRepository = require("../repository/taskRepository");

//@desc Get all tasks
//@route GET /tasks/
//@access public
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await taskRepository.getList();
    res.status(200).json(tasks);
});

//@desc Get task by ID
//@route GET /tasks/:id
//@access public
const getTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        res.status(404);
        throw new Error("Missing ID!");
    }
    const task = await taskRepository.getById(taskId);
    if (!task) {
        res.status(404);
        throw new Error("Can not find any task!");
    }
    res.status(200).json(task);
});

//@desc Create a task
//@route POST /tasks/
//@access public
const createTask = asyncHandler(async (req, res) => {
    const {task} = req.body;
    if (!task) {
        res.status(400);
        throw new Error("Task can not be empty!");
    }
    const createdTask = await taskRepository.save(task, 1);
    res.status(201).json(createdTask);
});

//@desc Update a task
//@route PUT /tasks/
//@access public
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const {task, status} = req.body;
    if (!taskId || !task || !status) {
        res.status(400);
        throw new Error("Missing param!");
    }
    const updatedTask = await taskRepository.update(taskId, task, status);
    res.status(201).json(updatedTask);
});

//@desc Delete a task
//@route DELETE /tasks/
//@access public
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        res.status(400);
        throw new Error("Missing param!");
    }
    const task = await taskRepository.getById(taskId);
    if (!task) {
        res.status(404);
        throw new Error("Can not find any task with this ID!");
    }
    await task.deleteOne();
    res.status(201).json({message: `Deleted task ID ${req.params.id}`});
});

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}