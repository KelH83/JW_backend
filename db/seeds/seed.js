// const format = require('pg-format');
// const db = require('../connection');



// const seed = ({ studentData}) => {
//   return db
//     .query(`DROP TABLE IF EXISTS students;`)
//     .then(() => {
//       return db.query(`DROP TABLE IF EXISTS articles;`);
//     })
//     .then(() => {
//       return db.query(`
//       CREATE TABLE students (
//         student_id SERIAL PRIMARY KEY,
//         name VARCHAR NOT NULL,
//         dateOfBirth VARCHAR NOT NULL,
//         email VARCHAR NOT NULL,
//         address VARCHAR NOT NULL,
//         classes VARCHAR[],
//        `);
//     })
    
//     .then(() => {
//       const insertStudentsQueryStr = format(
//         'INSERT INTO students (name, dateOfBirth, email, address,classes, VALUES %L RETURNING *;',
//         formattedStudentsData.map(
//           ({
//             name,
//             dateOfBirth,
//             email,
//             address,
//             classes,
//           }) => [name, dateOfBirth, email, address, classes]
//         )
//       );

//       return db.query(insertStudentsQueryStr);
//     })
// };

// module.exports = seed;

const format = require('pg-format');
const db = require('../connection');

const seed = ({ studentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS students;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE students (
        student_id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        dateOfBirth VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
      );
      `); // Added closing parenthesis for CREATE TABLE statement
    })
    .then(() => {
      const formattedStudentsData = studentData.map(
        ({ name, dateOfBirth, email, address }) => [
          name,
          dateOfBirth,
          email,
          address,
        ]
      );

      const insertStudentsQueryStr = format(
        'INSERT INTO students (name, dateOfBirth, email, address) VALUES %L RETURNING *;',
        formattedStudentsData
      );

      return db.query(insertStudentsQueryStr);
    });
};

module.exports = seed;
