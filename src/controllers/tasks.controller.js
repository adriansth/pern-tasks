const pool = require('../db');

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task'); 
        console.log(allTasks);
        res.json(allTasks.rows);
    } catch (err) {
        next(err);
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM task WHERE id = $1', [id]);
        if (task.rows.length === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json(task.rows[0]);
    } catch (err) {
        next(err);
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.status(204).send();
        console.log(result);
    } catch (err) {
        next(err);
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        return res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask };