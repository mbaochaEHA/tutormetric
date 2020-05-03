const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const CourseType = new GraphQLObjectType({
  name: "Course",
  description: "This represents a Courses",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    categoryId: { type: GraphQLString },
  }),
});

const CourseCategoryType = new GraphQLObjectType({
  name: "CourseCategory",
  description: "This represents a Course Category",
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});

module.exports = { CourseType, CourseCategoryType };
