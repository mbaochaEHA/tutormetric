const mongoose = require("mongoose");
const { GRADES } = require("../config");
const courseObject = require("../course/schema");

const tutorObject = {};

tutorObject.tutorSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      // required:[true,'must be provided'],
      // lowercase:true,
      // trim:true,
      // unique:true
    },
    userId: {
      type: String, //required: true, unique: true
      index: true,
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phoneNumber: { type: String },

    originCountry: { type: String },
    resCountry: { type: String },
    hourlyRate: { type: Number },
    photoId: { type: String }, //this is an auto generated id that i can use to retrieve the page from where its stored in file system

    //this respresent the courses or subjects that you can tutor
    courses2: [
      {
        type: String,
        // name:{type:String,
        //default:async ()=>await courseObject.courseModel.findOne({ _id: this.id }).name
        //}
        // name: { ()=>return "Hello";}, //await courseObject.courseModel.findOne({ _id: this.id }).name,
      },
    ],
    courses: [
      {
        courseId: {
          type: String,
        },
        name: {
          type: String,
        },
        // name: { ()=>return "Hello";}, //await courseObject.courseModel.findOne({ _id: this.id }).name,
      },
    ],
    //  this defines at what level you can train
    grades: [
      {
        type: String,
        //    enum: GRADES,
      },
    ],

    headLine: { type: String, trim: true },
    aboutMe: { type: String, trim: true },
    videoId: { type: String },

    workDetail: {
      currentPosition: { type: String },
      organization: { type: String },
    },

    qualification: {
      highestQualification: {
        type: String,
        //      enum: ["","phd", "masters", "degree", "others"],
      },
      major: {
        type: String,
        trim: true,
      },
      institution: {
        type: String,
        trim: true,
      },
      graduationYear: {
        type: Number,
      },
      documents: [
        {
          doctType: {
            type: String,
            //            enum: ["","certificate", "idcard"],
          },
          docId: { type: String },
        },
      ],
    },

    //extra information about this schema normally set by admin
    meta: {
      approved: {
        type: Boolean,
        default: true,
      },
      approvedBy: {
        type: String, //pass the Id of the approver
      },
      approvedDate: {
        type: Date,
      },
      published: {
        type: Boolean,
      },
      msg: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
tutorObject.tutorSchema.pre("findOneAndUpdate", async function (next) {
  const user = this.getUpdate().courses;

  console.log("pppppppppp " + JSON.stringify(user));
  //console.log(this);
  // let courseM = await courseObject.courseModel.findOne({
  //   _id: mongoose.Types.ObjectId(this.courses.courseId),
  // });
  //console.log("courseM " + courseM.name);
  next();
});
tutorObject.tutorSchema.virtual("id").get(function () {
  return this._id;
});
tutorObject.tutorModel = mongoose.model("Tutor", tutorObject.tutorSchema);

module.exports = tutorObject;
