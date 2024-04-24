const db = require("../db/connection");
const format = require("pg-format");

function selectStudentById(studentId) {
  const queryString = `SELECT students.*
  WHERE students.student_id = $1;`;

  return db.query(queryString, [studentId]).then((student) => {
    if (student.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "student not found" });
    } else {
      return student.rows[0];
    }
  });
}

function selectAllStudents() {
      let queryString = `SELECT students.*`;
      return db.query(queryString).then((allStudents) => {
        return allStudents.rows;
      });
    
  }

  function addNewStudent(newStudent) {
    const studentToAdd = [newStudent.name, newStudent.dateOfBirth, newStudent.email, newStudent.address, newStudent.classes];
    const queryString = format(
      `INSERT INTO students
      (name, dateOfBirth, email, address, classes) 
      VALUES 
      %L
      RETURNING *;`,
      [studentToAdd]
    );
  
    return db.query(queryString).then((returnedStudent) => {
      return returnedStudent.rows;
    });
  }

  function updateStudent(studentId, newUpdate) {
    const name = newUpdate.name;
    const dateOfBirth = newUpdate.dateOfBirth;
    const email = newUpdate.email
    const address = newUpdate.address
    const classes = newUpdate.classes
    const queryString = `
    UPDATE studentss
    SET name = $1
    SET dateOfBirth = $2
    SET email = $3
    SET address = $4
    SET classes = $5
    WHERE student_id = $6
    RETURNING *;`;
  
    return db.query(queryString, [name,dateOfBirth,email,address,classes, studentId]).then((updatedStudent) => {
      return updatedStudent.rows;
    });
  }

  function removeStudent(studentId) {
    const queryString = `DELETE FROM students`;
    const studentSelection = ` WHERE student_id = $1`;
    return db.query(`${queryString} ${studentSelection};`, [studentId]);
  }

  module.exports = {
    selectStudentById,
    selectAllStudents,
    addNewStudent,
    updateStudent,
    removeStudent
  };