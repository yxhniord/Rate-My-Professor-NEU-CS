var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProfessorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  rate: { type: Number },
  comment: [{ type: Schema.ObjectId, ref: "Comment" }],
});

// Virtual for Professor full name.
ProfessorSchema.virtual("name").get(function () {
  return this.first_name + ", " + this.last_name;
});

module.exports = mongoose.model("Professor", ProfessorSchema);
