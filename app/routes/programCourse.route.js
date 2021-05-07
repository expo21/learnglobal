const {
  get_course_by_id,
  check_eligibility,
  check_programs,
} = require("../controllers/programCourses.controller");

module.exports = (app) => {
  //get course by id
  app.get("/v1/course/:id", (req, res) => {
    get_course_by_id(req.params.id)
      .then((result) => {
        if (result) {
          res.send({ status: true, data: result, message: "Result found." });
        } else {
          res.send({ status: false, message: "Something went wrong." });
        }
      })
      .catch((error) => {
        res.send({ status: false, error: error.message });
      });
  });

  //check eligibility
  app.get("/v1/checkEligibility", (req, res) => {
    check_eligibility(req.query)
      .then((result) => {
        if (Array.isArray(result)) {
          res.send({
            status: true,
            message: "Eligible program courses",
            result,
          });
        } else {
          res.send({ status: false, message: result.message, result: [] });
        }
      })
      .catch((err) =>
        res.send({ status: false, message: err.message, result: [] })
      );
  });

  //check eligible program
  app.get("/v1/checkProgram", (req, res) => {
    check_programs(req.query.school)
      .then((result) => {
        res.send({ status: true, result });
      })
      .catch((error) => {
        res.send({ status: false, error });
      });
  });
};
