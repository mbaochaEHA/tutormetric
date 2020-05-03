const JWT_TOKEN_LIFE = "100d";
const JWT_SECRET = "AS@Aap09745767!~ryn>?']mhiuy78621";
const BCRYPT_SALT_ROUND = 10;

const GRADES = [
  "",
  "Elementary/Primary",
  "Junior Secondary/Middle School",
  "High School",
  "College",
];

const FACEBOOK = {
  clientID: "684474255712590",
  clientSecret: "29348d1e10e44dcabbdb80a9939f4697",
};
const GOOGLE = {
  clientID:
    "823119838318-a9786m67n35h9heff1g7opdt67uq90fp.apps.googleusercontent.com",
  clientSecret: "iMP7TaVQlrDacYKMD6yUsboS",
};
const INSTAGRAM = {
  clientID: "0d517fd22d63445181091e63578caf92",
  clientSecret: "3ea8588c8f7f43ebb4ff89fd5519b1fc",
};

module.exports = {
  FACEBOOK,
  GOOGLE,
  INSTAGRAM,
  JWT_SECRET,
  BCRYPT_SALT_ROUND,
  JWT_TOKEN_LIFE,
  GRADES,
};
