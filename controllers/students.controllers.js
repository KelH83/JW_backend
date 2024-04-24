const {
    selectStudentById,
    selectAllStudents,
    addNewStudent,
    updateStudent,
  } = require("../models/students.models");

  function getStudentById(req, res, next) {
    const studentId = req.params.student_id;
    selectStudentById(studentId)
      .then((student) => {
        res.status(200).send({ student });
      })
      .catch((err) => {
        next(err);
      });
  }
  

  function getAllStudents(req, res, next) {
    selectAllStudents()
      .then((students) => {
        res.status(200).send({ students });
      })
      .catch((err) => {
        next(err);
      });
  }

  function postNewStudent(req, res, next) {
    const newStudent = req.body;
    addNewStudent(newStudent)
      .then((student) => {
        res.status(200).send({ student });
      })
      .catch((err) => {
        next(err);
      });
  }

  function patchStudent(req, res, next) {
    const studentId = req.params.student_id;
    const newUpdate = req.body;
    const promises = [
      updateStudent(studentId, newUpdate),
      selectStudentById(studentId),
    ];
    Promise.all(promises)
      .then((promiseResolutions) => {
        res.status(200).send({ updatedStudent: promiseResolutions[0] });
      })
      .catch((err) => {
        next(err);
      });
  }

  function deleteStudent(req, res, next) {
    const studentId = req.params.student_id;
    const promises = [selectStudentById(studentId), removeComment(studentId)];
  
    Promise.all(promises)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        next(err);
      });
  }

  module.exports = {
    getStudentById,
    getAllStudents,
    postNewStudent,
    patchStudent,
    deleteStudent
  };