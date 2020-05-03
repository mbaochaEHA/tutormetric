const expressGraphQL = require("express-graphql");
const tutorObject = require("./schema");
const { schemaComposer } = require("graphql-compose");
const createType = require("mongoose-schema-to-graphql");

const {
  composeWithMongooseDiscriminators,
} = require("graphql-compose-mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const TutorTC = composeWithMongoose(tutorObject.tutorModel);
TutorTC.removeField("_id");
TutorTC.addFields({
  id: { type: "String" },
});

console.log("............");
console.log(TutorTC);

const TutorType2 = new GraphQLObjectType({
  name: "Tutor",
  description: "This represents a tutor",
  fields: () => ({
    user: { type: GraphQLString },
  }),
});
//export default createType(config);
const TT = {};
//TT.gradeType = {};//TutorTC.get("grades").getInputType();
//TT.gradeType = TutorTC.get("courses").getInputType();
console.log("ok="+TutorTC.getInputType('courses').toString())
//TT.gradeType = TutorTC.get('headLine').getInputType()
//TT.courseType = TutorTC.get("courses").removeField("name").getInputType()
TT.courseType = TutorTC.get("courses").getInputType();
TT.tutorType = TutorTC.getType();
module.exports = TT; //TutorTC.getType();
