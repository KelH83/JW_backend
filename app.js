const cors = require('cors');
const express = require("express");
const app = express();
app.use(express.json());
const apiRouter = require("./routers/api-router");

app.use(cors());

const {
    getStudentById,
    getAllStudents,
    postNewStudent,
    patchStudent,
    deleteStudent
} = require("./controllers/students.controllers");

const {
  customErrors,
  psqlErrors,
  serverErrors,
  invalidEndpoints,
} = require("./controllers/errors.controllers");

//ROUTERS -------------


app.get("/api/students/:student_id", getStudentById);

app.get("/api/students", getAllStudents);

app.patch("/api/students/:student_id", patchStudent);

app.delete("/api/students/:student_id", deleteStudent);

app.post("/api/students", postNewStudent);

app.all("/*", invalidEndpoints);

app.use(psqlErrors);
app.use(customErrors);
app.use(serverErrors);

module.exports = app;