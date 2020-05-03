const mongoose = require("mongoose");
const userObject = require("./schema");
const { UserType, LoginResponseType } = require("./type.js");
const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jsonwebtoken");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

login2: async (email, password) => {
  try {
    let foundUser = await userObject.userModel
      .findOne({ email, password })
      .exec();
    if (!foundUser) {
      return "login failed";
    } else {
      return "login passed";
    }
  } catch (err) {
    err.stack();
    return err;
  }
};

logIn = async (email, password) => {
  let foundUser;

  try {
    foundUser = await userObject.userModel.findOne({ email }).exec();
    if (!foundUser) {
      throw new Error("login failed");
    }

    if (foundUser.status === "disabled") throw new Error("Account disabled");
  } catch (err) {
    throw new Error(err);
  }
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    throw new Error("Invalid login credential");
  }

  const token = jwt.sign({ email: foundUser.email }, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_LIFE,
  });
  return { token, tokenExpiration: config.JWT_TOKEN_LIFE };
};

let userQuery = {};

userQuery.login = {
  type: LoginResponseType,
  description: "Authenticated Token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: (parents, args, req) => {
    console.log("context " + req.sex + "  " + req.secret);
    console.log("check auth " + req.isAuth + "  ");

    return logIn(args.email, args.password);
  },
};

module.exports = userQuery;
