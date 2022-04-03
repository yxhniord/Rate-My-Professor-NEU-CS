var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  course: { type: String, required: true, maxLength: 100 },
  campus: { type: String, required: true, maxLength: 100 },
  rate: { type: Number, required: true, min: 0, max: 5 },
  date: { type: Date, required: true, default: Date.now },
  content: { type: String },
  user: { type: Schema.ObjectId, ref: "User", required: true },
  professor: { type: Schema.ObjectId, ref: "Professor", required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
