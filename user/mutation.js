const mongoose = require("mongoose");
const { UserType } = require("./type");
const userObject = require("./schema");
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

addUser = async (args) => {
  let password = await bcrypt.hash(args.password, config.BCRYPT_SALT_ROUND);
  let userM = new userObject.userModel({
    email: args.email,
    password: password,
  });

  let user = await userM.save();
  if (!user) throw new Error("Cant create user due to error ");
  console.log(user);

  return user;
};

changePassword = async ({ email, password, newPassword }) => {
  let user = await userObject.userModel.findOne({
    email: email,
  });
  if (!user) throw new Error("unknown user");

  let match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid password");

  let response = await userObject.userModel.findByIdAndUpdate(user._id, {
    password: newPassword,
  });

  if (!response) throw new Error("User password not change. unknown error");

  return response;
};

const userMutation = {};
userMutation.addUser = {
  type: UserType,
  description: "Add a User",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return addUser(args);
  },
};

userMutation.changePassword = {
  type: UserType,
  description: "Change user password",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  resolve: (parent, args) => {
    return this.changePassword(args);
  },
};

module.exports = userMutation;
