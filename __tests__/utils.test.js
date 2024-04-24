  const request = require("supertest");
  const app = require("../app.js");
  const seed = require("../db/seeds/seed.js");
  const data = require("../db/data/test-data/index.js");
  const db = require("../db/connection.js");

  
  beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    db.end();
  });

  describe("GET /api/students", () => {
    test("Should return an array with all of the students", () => {
      return request(app)
        .get("/api/students")
        .expect(200)
        .then((response) => {
          const data = response.body.allStudents;
          expect(data.length).toBe(5);
          data.forEach((student) => {
            expect(student.hasOwnProperty("student_id")).toBe(true);
            expect(student.hasOwnProperty("name")).toBe(true);
            expect(student.hasOwnProperty("dateOfBirth")).toBe(true);
            expect(student.hasOwnProperty("email")).toBe(true);
            expect(student.hasOwnProperty("address")).toBe(true);
          });
        });
    });
  });