var User = require("../models/user");

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

exports.user_detail_by_auth0id = function (req, res, next) {
  User.find({ auth0_id: req.params.id }).exec(function (err, user) {
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
  body("nickname", "Nickname required").trim().isLength({ min: 1 }).escape(),
  body("auth0_id", "auth0_id required").trim().isLength({ min: 1 }).escape(),
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a user object with escaped and trimmed data.
    var user = new User({
      nickname: req.body.nickname,
      auth0_id: req.body.auth0_id,
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
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        nickname: "Deleted",
      },
    },
    { new: true },
    function (err, theuser) {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(200).json(theuser);
      }
    }
  );
};

// POST request: update user.
exports.user_update = [
  // Validate and sanitize fields.
  body("nickname", "Nickname required").trim().isLength({ min: 1 }).escape(),
  body("campus", "Campus required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Response with errors.
      return res.status(500).json({ message: errors.array() });
    }
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          nickname: req.body.nickname,
          campus: req.body.campus,
        },
      },
      { new: true },
      function (err, theuser) {
        if (err) {
          res.status(500).json({ message: err });
        } else {
          res.status(200).json(theuser);
        }
      }
    );
  },
];
