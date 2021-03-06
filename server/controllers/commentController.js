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

        try {
          await comment.save();
        } catch (error) {
          return res.status(500).json({ message: err });
        }

        // Add the comment to professor and update the professor rate.
        if (results.professor.length == 0) {
          return res.status(500).json({ message: "No such professor" });
        }
        var professor = results.professor;
        professor.comment.push(comment._id);
        const commentSize = professor.comment.length;
        if (professor.rate === null) {
          professor.rate = 0;
        }
        professor.rate = (
          (professor.rate * (commentSize - 1) + comment.rate) /
          commentSize
        ).toFixed(1);
        try {
          await Professor.findOneAndUpdate(
            { _id: req.body.professor },
            professor,
            { new: true }
          ).exec();
        } catch (error) {
          return res.status(500).json({ message: err });
        }

        // Add the comment to user.
        if (results.user.length == 0) {
          return res.status(500).json({ message: "No such user" });
        }
        var user = results.user;
        user.comment.push(comment._id);
        try {
          await User.findOneAndUpdate({ _id: req.body.user }, user, {
            new: true,
          }).exec();
        } catch (error) {
          return res.status(500).json({ message: err });
        }

        return res.status(200).json({
          comment: comment,
          professor: professor,
          user: user,
        });
      }
    );
  },
];

// DELETE request: delete comment.
exports.comment_delete = async function (req, res, next) {
  const comment = await Comment.findOne({ _id: req.params.id }).exec();
  if (!comment) {
    return res
      .status(204)
      .json({ message: `Comment ID ${req.params.id} not found` });
  }

  async.parallel(
    {
      professor: function (callback) {
        Professor.findById(comment.professor).exec(callback);
      },
      user: function (callback) {
        User.findById(comment.user).exec(callback);
      },
    },
    async function (err, results) {
      if (err) {
        return res.status(500).json({ message: err });
      }
      // Remove comment from professor.
      var professor = results.professor;
      professor.comment = professor.comment.filter(
        (e) => e.toString() !== comment._id.toString()
      );
      var totalRate = 0;
      const commentSize = professor.comment.length;
      for (const commentId of professor.comment) {
        const thecomment = await Comment.findOne({
          _id: commentId,
        }).exec();
        if (!thecomment) {
          return res
            .status(204)
            .json({ message: `Comment ID ${commentId} not found` });
        }
        totalRate += thecomment.rate;
      }
      if (commentSize === 0) {
        professor.rate = null;
      } else {
        professor.rate = (totalRate / commentSize).toFixed(1);
      }
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
      User.findByIdAndUpdate(comment.user, user, { new: true }, function (err) {
        if (err) {
          res.status(500).json({ message: err });
        }
      });

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
};

// POST request: update comment.
exports.comment_update = [
  // Validate and sanitize fields.
  body("course", "Course required").trim().isLength({ min: 1 }).escape(),
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),
  body("rate", "Invalid rate").isInt({ min: 0, max: 5 }).escape(),
  body("date", "Invalid date")
    .optional({ checkFalsy: true })
    .notEmpty()
    .isISO8601()
    .toDate(),
  body("professor", "Professor required").notEmpty(),
  body("user", "User required").notEmpty(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }

    try {
      await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
          },
        },
        { new: true }
      );
    } catch (err) {
      return res.status(500).json({ message: errors.array() });
    }

    // Change the professor rate.
    const theprofessor = await Professor.findOne({
      _id: req.body.professor,
    }).exec();
    if (!theprofessor) {
      return res.status(204).json({
        message: `Professor ID ${req.body.professor} not found`,
      });
    }
    var totalRate = 0;
    const comments = Object.values(theprofessor.comment);
    const commentSize = comments.length;
    for (const commentId of comments) {
      const thecomment = await Comment.findOne({ _id: commentId }).exec();
      if (!thecomment) {
        return res
          .status(204)
          .json({ message: `Comment ID ${commentId} not found` });
      }
      totalRate += thecomment.rate;
    }
    theprofessor.rate = (totalRate / commentSize).toFixed(1);

    Professor.findByIdAndUpdate(
      req.body.professor,
      theprofessor,
      { new: true },
      function (err) {
        if (err) {
          res.status(500).json({ message: err });
        }
      }
    );

    res.status(200).json({
      message: "Comment successfully updated",
    });
  },
];
