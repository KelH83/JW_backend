const apiRouter = require('express').Router();
const studentsRouter = require('./students-routers');

apiRouter.use('/api/students',studentsRouter)

module.exports = apiRouter;