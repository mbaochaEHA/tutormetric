const tutorType = require("./tutor/type");
const tutorSchema = require("./tutor/schema");
const mongoose = require("mongoose");
const tutorMutation = require("./tutor/mutation");
const userMutation = require("./user/mutation");
const courseMutation = require("./course/mutation");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addTutor: tutorMutation.addTutor,
    addUser: userMutation.addUser,
    addCourseByCategoryName: courseMutation.addCourseGivenCategoryName,
    addCourseByCategoryID: courseMutation.addCourseGivenCategoryID,
    addCourseCategory: courseMutation.addCourseCategory,
    updateCourseCategory: courseMutation.updateCourseCategory,
    updateCourse: courseMutation.updateCourse,
    deleteCourse: courseMutation.deleteCourse,
    saveTutorBasicInfo: tutorMutation.saveTutorBasicInfo,
    saveTutorMoreInfo: tutorMutation.saveTutorMoreInfo,
    saveTutorVerification: tutorMutation.saveTutorVerification,
  }),
});

module.exports = RootMutationType;
