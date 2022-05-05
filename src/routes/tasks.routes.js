const { Router } = require('express');
const pool = require('../db');
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller');

const router = Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', updateTask);

module.exports = router;