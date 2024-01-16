const taskModel = require("../models/taskModel");

//@desc Get task by task ID
const getById = async (id) => {
    return await taskModel.findById(id);
}

//@desc Get list of tasks
const getList = async () => {
    return await taskModel.find();
}

//@desc create a task
const save = async (task, userId) => {
    return await taskModel.create({
        user_id: userId,
        task: task,
        status: 1
    });
}

//@desc update a task
const update = async (id, task, status) => {
    return await taskModel.findByIdAndUpdate(
        id,
        {
            task: task,
            status: status
        },
        {
            new: true
        }
    );
}

module.exports = {
    getById,
    getList,
    save,
    update
}