var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  campus: { type: String, required: true, maxLength: 100 },
  comment: [{ type: Schema.ObjectId, ref: "Comment" }],
});

// Virtual for User full name.
UserSchema.virtual("name").get(function () {
  return this.first_name + ", " + this.last_name;
});

module.exports = mongoose.model("User", UserSchema);
