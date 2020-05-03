const mongoose = require("mongoose");
const TutorType = require("./type");
const tutorObject = require("./schema");
const courseObject = require("../course/schema");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

saveTutorBasicInfo = async ({
  userId,
  firstName,
  lastName,
  email,
  phoneNumber,
  originCountry,
  resCountry,
  hourlyRate,
  photoId,
}) => {
  let tutor = await tutorObject.tutorModel.findOneAndUpdate(
    { userId },
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      originCountry,
      resCountry,
      hourlyRate,
      photoId,
    },
    { upsert: true, new: true }
  );
  if (!tutor) throw new Error("Error Not saved");

  return tutor;
};

saveTutorMoreInfo = async ({
  userId,
  headLine,
  aboutMe,
  courses,
  grades,
  videoId,
}) => {
  console.log("coyses " + courses);
  let courseList = await courseObject.courseModel.find();

  let courseObjectList = [];

  console.log("oooooooo");
  courses.forEach((element) => {
    courseList.filter((course) => {
      if (course._id == element) {
        // courseObjectList.push({courseId:course._id.toString()})
        courseObjectList.push({ courseId: course._id, name: course.name });
      }
    });
  });
  console.log("aaaaaaaa " + JSON.stringify(courseObjectList));

  let tutor = await tutorObject.tutorModel.findOneAndUpdate(
    { userId },
    { headLine, aboutMe, courses: courseObjectList, grades, videoId },
    { upsert: true, new: true }
  );
  if (!tutor) throw new Error("Error Not saved");
  console.log(tutor);
  return tutor;
};
saveTutorVerification = async ({
  userId,
  currentPosition,
  organization,
  highestQualification,
  institution,
  major,
  graduationYear,
  documents,
}) => {
  let tutor = await tutorObject.tutorModel.findOneAndUpdate(
    { userId },
    {
      currentPosition,
      organization,
      highestQualification,
      institution,
      major,
      graduationYear,
      documents,
    },
    { upsert: true, new: true }
  );
  if (!tutor) throw new Error("Error Not saved");

  return tutor;
};
saveTutor = (args) => {
  let tutor = new tutorObject.tutorModel({ user: args.user });
  return tutor.save();
};

const tutorMutation = {};
tutorMutation.addTutor = {
  type: TutorType.tutorType,
  description: "Add a Tutor",
  args: {
    user: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return saveTutor(args);
  },
};

tutorMutation.saveTutorBasicInfo = {
  type: TutorType.tutorType,
  description: "Save a Tutor. That is upsert by userId",
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
    originCountry: { type: new GraphQLNonNull(GraphQLString) },
    resCountry: { type: new GraphQLNonNull(GraphQLString) },
    rate: { type: new GraphQLNonNull(GraphQLInt) },
    photoId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (parent, args) => {
    return saveTutorBasicInfo(args);
  },
};
tutorMutation.saveTutorMoreInfo = {
  type: TutorType.tutorType,
  description: "Save a Tutor. That is upsert by userId",
  args: {
    userId: { type: GraphQLString },
    headLine: { type: GraphQLString },
    aboutMe: { type: GraphQLString },
    courses: { type: new GraphQLList(GraphQLString) }, //{ type: TutorType.courseType},
    grades: { type: new GraphQLList(GraphQLString) },
    videoId: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return saveTutorMoreInfo(args);
  },
};

tutorMutation.saveTutorVerification = {
  type: TutorType.tutorType,
  description: "Save a Tutor. That is upsert by userId",
  args: {
    userId: { type: GraphQLString },
    currentPosition: { type: GraphQLString },
    organization: { type: GraphQLString },
    highestQualification: { type: GraphQLString },
    institution: { type: GraphQLString },
    major: { type: GraphQLString },
    graduationYear: { type: GraphQLString },
    documents: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return this.saveTutorVerification(args);
  },
};

module.exports = tutorMutation;
