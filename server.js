const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const tutorObject = require("./tutor/schema");
const rootQueryType = require("./rootQuery");
const rootMuationType = require("./rootMutation");
const passport = require("./auth/passportAuth");
const cors = require("cors");
const authMiddleware = require("./middleware/isAuth");
const conf = require("./config");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const app = express();

app.use(cors());
app.use(authMiddleware);
app.use(passport.initialize());

passport.resPoint(app);

mongoose
  .connect("mongodb://localhost:27017/tutormetric", { useNewUrlParser: true })
  .catch((error) => handleError(error));

mongoose.connection.on("error", (err) => {
  logError(err);
});

let tutor = new tutorObject.tutorModel({ user: "mbaocha" });

//tutor.save();

console.log("testing");

const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMuationType,
});

app.use(
  "/graphql",
  expressGraphQL((req) => ({
    schema: schema,
    graphiql: true,
    context: {
      isAuth: req.isAuth,
    },
  }))
);
app.listen(5000, () => console.log("Server Running"));
