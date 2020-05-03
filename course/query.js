const mongoose = require("mongoose");
const ç = require("./schema");
const courseType = require("./type.js");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

courses = () => {
  let courseCategory = [];
  courseCategory = courseObject.courseCategory.find();

  let courseList = courseObject.courseModel.find();
};

let courseQuery = {};

courseQuery.courses = {
  type: new GraphQLList(courseType),
  description: "List of All Tutors",
  resolve: () => courses(),
};

module.exports = tutorQuery;
