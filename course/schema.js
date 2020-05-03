const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseObject = {};

courseObject.categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      uniqueCaseInsensitive: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
courseObject.categorySchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

courseObject.categorySchema.virtual("id").get(function () {
  return this._id;
});

courseObject.courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      uniqueCaseInsensitive: true,
      lowercase: true,
    },
    categoryId: { type: String, index: true },
  },
  { timestamps: true }
);
courseObject.courseSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});
courseObject.courseSchema.virtual("id").get(function () {
  return this._id;
});

courseObject.courseModel = mongoose.model("Course", courseObject.courseSchema);
courseObject.courseCategoryModel = mongoose.model(
  "Category",
  courseObject.categorySchema
);

module.exports = courseObject;
