const mongoose = require('mongoose');
const tutorObject = require('./schema');
const TutorType = require('./type.js')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
  } = require('graphql')





tutors =()=>{
    return  tutorObject.tutorModel.find();
}

let tutorQuery={};

tutorQuery.tutors={
    type: new GraphQLList(TutorType.tutorType),
    description: 'List of All Tutors',
    resolve: () => tutors()
    
  }


module.exports=tutorQuery;