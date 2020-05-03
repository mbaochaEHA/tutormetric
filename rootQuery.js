
const tutorQ = require('./tutor/query')
const userQ = require('./user/query')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      tutors: tutorQ.tutors,
      login:userQ.login
   
      
    })
  })
  module.exports = RootQueryType;