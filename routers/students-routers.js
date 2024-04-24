const studentsRouter = require('express').Router();
const {
    getStudentById,
    getAllStudents,
    postNewStudent,
    patchStudent,
    deleteStudent
  } = require("../controllers/students.controllers");

studentsRouter.get('/', getAllStudents);
studentsRouter.get('/:student_id', getStudentById);
studentsRouter.post('/', postNewStudent);
studentsRouter.patch('/:student_id', patchStudent);
studentsRouter.delete('./:student_id', deleteStudent)


module.exports = studentsRouter;