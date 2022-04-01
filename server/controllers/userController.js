var User = require("../models/user");
var Comment = require("../models/comment");

var async = require("async");

const { body, validationResult } = require("express-validator");

// GET request: get one user by Id.
exports.user_detail = function (req, res, next) {
  User.findById(req.params.id).exec(function (err, user) {
    if (err) {
      // return next(err);
      return res.status(500).json({ message: err });
    }
    res.status(200).json(user);
  });
};

// POST request: create a user.
exports.user_create = [
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
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      campus: req.body.campus,
    });

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }
    user.save(function (err) {
      if (err) {
        // return next(err);
        res.status(500).json({ message: err });
      } else {
        res.status(200).json(user);
      }
    });
  },
];

// DELETE request: delete user.
exports.user_delete = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.id).exec(callback);
      },
      user_comments: function (callback) {
        Comment.find({ user: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        // return next(err);
        return res.status(500).json({ message: err });
      }
      // Success
      if (results.user_comments.length > 0) {
        // User has comments. Delete the comments first.
        user_comments.forEach((commentId) => {
          Comment.findByIdAndRemove(commentId, function deleteComment(err) {
            if (err) {
              return res.status(500).json({ message: err });
            }
          });
        });
      }
      // Delete user.
      User.findByIdAndRemove(req.params.id, function deleteUser(err) {
        if (err) {
          return res.status(500).json({ message: err });
        }
        res.status(200).json({ message: "User successfully deleted" });
      });
    }
  );
};

// POST request: update user.
exports.user_update = [
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
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    var user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      campus: req.body.campus,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }
    User.findByIdAndUpdate(req.params.id, user, {}, function (err, theuser) {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(200).json(theuser);
      }
    });
  },
];
