const taskModel = require("../models/taskModel");

//@desc Get task by task ID
const getById = async (id, userId) => {
    return await taskModel.find({_id: id, user_id: userId});
}

//@desc Get list of tasks
const getList = async (userId) => {
    return await taskModel.find({user_id: userId});
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