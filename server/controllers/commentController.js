var Comment = require("../models/comment");
var User = require("../models/user");
var Professor = require("../models/professor");

var async = require("async");

const { body, validationResult } = require("express-validator");

// GET request: get comment list by professor id.
exports.comment_list_byProfessorId = function (req, res, next) {
  Comment.find({ professor: req.params.id })
    .sort({ date: -1 })
    .exec(function (err, comment_list) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json(comment_list);
    });
};

// GET request: get comment list by user id.
exports.comment_list_byUserId = function (req, res, next) {
  Comment.find({ user: req.params.id })
    .sort({ date: -1 })
    .exec(function (err, comment_list) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      res.status(200).json(comment_list);
    });
};

// GET request: get one comment.
exports.comment_detail = function (req, res, next) {
  Comment.findById(req.params.id).exec(function (err, comment) {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(comment);
  });
};

// POST request: create comment.
exports.comment_create = [
  // Validate and sanitize fields.
  body("course", "Course required").trim().isLength({ min: 1 }).escape(),
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),
  body("rate", "Invalid rate").isInt({ min: 0, max: 5 }).escape(),
  body("date", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("professor", "Professor required").notEmpty(),
  body("user", "User required").notEmpty(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }

    async.parallel(
      {
        professor: function (callback) {
          Professor.findById(req.body.professor).exec(callback);
        },
        user: function (callback) {
          User.findById(req.body.user).exec(callback);
        },
      },
      async function (err, results) {
        if (err) {
          return res.status(500).json({ message: err });
        }

        // Create a comment object with escaped and trimmed data.
        const comment = new Comment(req.body);

        await comment.save(function (err, thecomment) {
          if (err) {
            return res.status(500).json({ message: err });
          }
        });

        // Add the comment to professor and update the professor rate.
        if (results.professor.length == 0) {
          return res.status(500).json({ message: "No such professor" });
        }
        var professor = results.professor;
        professor.comment.push(comment._id);
        const commentSize = professor.comment.length;
        if (professor.rate == null) {
          professor.rate = 0;
        }
        professor.rate =
          (professor.rate * (commentSize - 1) + comment.rate) / commentSize;
        Professor.findByIdAndUpdate(
          req.body.professor,
          professor,
          { new: true },
          function (err) {
            if (err) {
              res.status(500).json({ message: err });
            }
          }
        );

        // Add the comment to user.
        if (results.user.length == 0) {
          return res.status(500).json({ message: "No such user" });
        }
        var user = results.user;
        user.comment.push(comment._id);
        User.findByIdAndUpdate(
          req.body.user,
          user,
          { new: true },
          function (err) {
            if (err) {
              res.status(500).json({ message: err });
            }
          }
        );

        return res
          .status(200)
          .json({ comment: comment, professor: professor, user: user });
      }
    );
  },
];

// DELETE request: delete comment.
exports.comment_delete = async function (req, res, next) {
  Comment.findById(req.params.id).exec(function (err, comment) {
    if (!comment || err) {
      return res.status(500).json({ message: err });
    }
    console.log(comment);
    async.parallel(
      {
        professor: function (callback) {
          Professor.findById(comment.professor).exec(callback);
        },
        user: function (callback) {
          User.findById(comment.user).exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return res.status(500).json({ message: err });
        }
        // Remove comment from professor.
        var professor = results.professor;
        professor.comment = professor.comment.filter(
          (e) => e.toString() !== comment._id.toString()
        );
        Professor.findByIdAndUpdate(
          comment.professor,
          professor,
          { new: true },
          function (err) {
            if (err) {
              res.status(500).json({ message: err });
            }
          }
        );

        // Remove comment from user.
        var user = results.user;
        user.comment = user.comment.filter(
          (e) => e.toString() !== comment._id.toString()
        );
        User.findByIdAndUpdate(
          comment.user,
          user,
          { new: true },
          function (err) {
            if (err) {
              res.status(500).json({ message: err });
            }
          }
        );

        // Delete comment.
        Comment.findByIdAndRemove(req.params.id, function deleteComment(err) {
          if (err) {
            return res.status(500).json({ message: err });
          }
          res.status(200).json({
            message: "Comment successfully deleted",
            comment: comment,
            professor: professor,
            user: user,
          });
        });
      }
    );
  });
};

// POST request: update comment.
exports.comment_update = [
  // Validate and sanitize fields.
  body("course", "Course required").trim().isLength({ min: 1 }).escape(),
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),
  body("rate", "Invalid rate").isNumeric().escape(),
  body("date", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("professor", "Professor required").notEmpty(),
  body("user", "User required").notEmpty(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }

    Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true },
      function (err, thecomment) {
        if (!thecomment || err) {
          return res.status(500).json({ message: err });
        } else {
          res.status(200).json(thecomment);
        }
      }
    );
  },
];
