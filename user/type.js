const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a User Account",
  fields: () => ({
    email: { type: GraphQLString },
    status:{type:GraphQLString}
  }),
});
const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  description: "This represents a Login Response",
  fields: () => ({
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLString },
  }),
});

module.exports = { UserType, LoginResponseType };
