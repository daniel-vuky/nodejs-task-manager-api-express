const asyncHandler = require("express-async-handler");
const taskRepository = require("../services/taskService");

//@desc Get all tasks
//@route GET /tasks/
//@access private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await taskRepository.getList(req.user.id);
    res.status(200).json(tasks);
});

//@desc Get task by ID
//@route GET /tasks/:id
//@access private
const getTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        res.status(404);
        throw new Error("Missing ID!");
    }
    const task = await taskRepository.getById(taskId, req.user.id);
    if (!task) {
        res.status(404);
        throw new Error("Can not find any task!");
    }
    res.status(200).json(task);
});

//@desc Create a task
//@route POST /tasks/
//@access private
const createTask = asyncHandler(async (req, res) => {
    const {task} = req.body;
    if (!task) {
        res.status(400);
        throw new Error("Task can not be empty!");
    }
    const createdTask = await taskRepository.save(task, req.user.id);
    res.status(201).json(createdTask);
});

//@desc Update a task
//@route PUT /tasks/
//@access private
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const {task, status} = req.body;
    if (!taskId || !task || !status) {
        res.status(400);
        throw new Error("Missing param!");
    }
    const existedTask = await taskRepository.getById(taskId, req.user.id);
    if (existedTask.length === 0) {
        res.status(404);
        throw new Error("Can not find any task!");
    }
    const updatedTask = await taskRepository.update(taskId, task, status);
    res.status(201).json(updatedTask);
});

//@desc Delete a task
//@route DELETE /tasks/
//@access private
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) {
        res.status(400);
        throw new Error("Missing param!");
    }
    const task = await taskRepository.getById(taskId, req.user.id);
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