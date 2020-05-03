const mongoose = require("mongoose");
const { CourseType, CourseCategoryType } = require("./type");
const courseObject = require("./schema");
const tutorObject = require("../tutor/schema");
const bcrypt = require("bcrypt");
const config = require("../config");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

updateCourseCategory = async (id, name) => {
  let category = await courseObject.courseCategoryModel.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );
  if (!category) throw new Error("unable to update course category");
  return category;
};

updateCourse = async (id, categoryId, name) => {
  let course = await courseObject.courseModel.findOneAndUpdate(
    { _id: id },
    { categoryId, name },
    { new: true }
  );
  if (!course) throw new Error("unable to update course category");
  return course;
};

deleteCourse = async (id) => {
  const tutor = await tutorObject.tutorModel.findOne({ "courses.id": id });
  console.log(tutor);
  if (tutor) {
    throw new Error(
      "you cant delete course because its already assigned to a tutor"
    );
  }
  let course = await courseObject.courseModel.findOneAndDelete({ _id: id });
  if (!course) throw new Error("unable to update course category");
  return course;
};

addCourseCategory = async (name) => {
  let courseCatM = new courseObject.courseCategoryModel({
    name,
  });
  let category = await courseCatM.save();
  if (!category) throw new Error("unable to create course category");
  return category;
};

addCourseWithCategoryID = async ({ name, categoryId }) => {
  console.log("saveCourseWithCategoryID -------------------");

  let courseM = new courseObject.courseModel({
    categoryId: categoryId,
    name: name,
  });
  console.log("");
  let course = await courseM.save();
  if (!course) throw new Error("Cant create course due to error ");
  console.log("saveCourseWithCategoryID -------------------");

  return course;
};
addCourseWithCategoryName = async ({ name, categoryName }) => {
  console.log("saveCourseWithCategoryName -------------------");

  let courseCategoryList = await courseObject.courseCategoryModel.find();

  let found = false;
  let catId;
  console.log("saveCourseWithCategoryName -------------------");

  for (let i = 0; i < courseCategoryList.length; i++) {
    console.log(
      courseCategoryList[i].name.toLowerCase() +
        " " +
        categoryName.toLowerCase()
    );
    if (
      courseCategoryList[i].name.toLowerCase() === categoryName.toLowerCase()
    ) {
      found = true;
      catId = courseCategoryList[i].id;
      console.log(catId);
      console.log("ok");
      break;
    }
  }

  if (!found) throw new Error("couse category name not found");

  let courseM = new courseObject.courseModel({
    categoryId: catId,
    name: name,
  });

  let course = await courseM.save();
  if (!course) throw new Error("Cant create course due to error ");
  console.log(course);

  return course;
};

const courseMutation = {};
courseMutation.addCourseGivenCategoryName = {
  type: CourseType,
  description: "Add a Course",
  args: {
    name: { type: GraphQLString },
    categoryName: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return addCourseWithCategoryName(args);
  },
};

courseMutation.addCourseGivenCategoryID = {
  type: CourseType,
  description: "Add a Course",
  args: {
    name: { type: GraphQLString },
    categoryId: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return addCourseWithCategoryID(args);
  },
};
courseMutation.addCourseCategory = {
  type: CourseCategoryType,
  description: "Add a Course Category",
  args: {
    name: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return addCourseCategory(args.name);
  },
};

courseMutation.updateCourseCategory = {
  type: CourseCategoryType,
  description: "Update a Course Category",
  args: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return updateCourseCategory(args.id, args.name);
  },
};
courseMutation.updateCourse = {
  type: CourseCategoryType,
  description: "Update a Course ",
  args: {
    id: { type: GraphQLString },
    categoryId: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return updateCourse(args.id, args.categoryId, args.name);
  },
};

courseMutation.deleteCourse = {
  type: CourseType,
  description: "Delete a Course ",
  args: {
    id: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return deleteCourse(args.id);
  },
};

module.exports = courseMutation;
