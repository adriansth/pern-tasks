const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(morgan('dev'));

app.use(taskRoutes);

PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});