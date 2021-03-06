var express = require("express");
var router = express.Router();
var professor_controller = require("../controllers/professorController");
const { checkJWT } = require("../checkJWT");

/* GET professor listing. */
router.get("/", function (req, res, next) {
  res.send("professor");
});

// GET request: get professor list by name.
router.get("/name/:name", professor_controller.professor_list);

// GET request: get top 5 professors list by rate.
router.get("/list", professor_controller.professor_list_byrate);

// GET request: get one professor.
router.get("/id/:id", professor_controller.professor_detail);

// POST request: create professor.
router.post("/create", checkJWT, professor_controller.professor_create);

// DELETE request: delete professor.
router.delete("/delete/:id", checkJWT, professor_controller.professor_delete);

// POST request: update professor.
router.post("/update/:id", checkJWT, professor_controller.professor_update);

module.exports = router;
