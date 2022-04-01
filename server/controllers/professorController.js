var Professor = require("../models/professor");
var Comment = require("../models/comment");

var async = require("async");

const { body, validationResult } = require("express-validator");

// GET request: get professor list.
exports.professor_list = function (req, res, next) {
  var name = req.params.name;
  Professor.find({
    $or: [{ first_name: new RegExp(name) }, { last_name: new RegExp(name) }],
  })
    .sort([["first_name", "ascending"]])
    .sort([["last_name", "ascending"]])
    .exec(function (err, professor_list) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json(professor_list);
    });
};

// GET request: get one professor.
exports.professor_detail = function (req, res, next) {
  Professor.findById(req.params.id).exec(function (err, professor) {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(professor);
  });
};

// POST request: create professor.
exports.professor_create = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a professor object with escaped and trimmed data.
    var professor = new Professor({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }
    professor.save(function (err) {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(200).json(professor);
      }
    });
  },
];
