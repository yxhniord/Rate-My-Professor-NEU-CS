var Professor = require("../models/professor");
var Comment = require("../models/comment");

var async = require("async");

const { body, validationResult } = require("express-validator");

// GET request: get professor list by name.
exports.professor_list = function (req, res, next) {
  var name = req.params.name;
  Professor.find({
    $or: [
      { first_name: new RegExp(name, "i") },
      { last_name: new RegExp(name, "i") },
    ],
  })
    .sort({ first_name: 1, last_name: 1 })
    .exec(function (err, professor_list) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json(professor_list);
    });
};

// GET request: get top 5 professors list by rate.
exports.professor_list_byrate = function (req, res, next) {
  Professor.find({})
    .sort({ rate: -1 })
    .limit(5)
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

// DELETE request: delete professor.
exports.professor_delete = function (req, res, next) {
  async.parallel(
    {
      professor_comments: function (callback) {
        Comment.find({ professor: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      // Success
      if (results.professor_comments.length > 0) {
        // Professor has comments. Delete the comments first.
        results.professor_comments.forEach((commentId) => {
          Comment.findByIdAndRemove(commentId, function deleteComment(err) {
            if (err) {
              return res.status(500).json({ message: err });
            }
          });
        });
      }
      // Delete professor.
      Professor.findByIdAndRemove(req.params.id, function deleteProfessor(err) {
        if (err) {
          return res.status(500).json({ message: err });
        }
        res.status(200).json({
          message: "Professor successfully deleted",
        });
      });
    }
  );
};

exports.professor_update = [
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

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }
    Professor.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
        },
      },
      { new: true },
      function (err, theprofessor) {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.status(200).json(theprofessor);
        }
      }
    );
  },
];
