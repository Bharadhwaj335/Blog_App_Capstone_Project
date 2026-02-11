import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../Models/user-model.js";  


//register user
export const register = async (userObj) => {

  //check existing user
  let existing = await UserModel.findOne({ email: userObj.email });

  if (existing) {
    let err = new Error("user already exists");
    err.status = 409;
    throw err;
  }

  //create document
  let userDoc = new UserModel(userObj);

  //hash password
  userDoc.password = await bcrypt.hash(userDoc.password, 10);

  //save
  let created = await userDoc.save();

  let newUser = created.toObject();
  delete newUser.password;

  return newUser;
};


//authenticate user
export const authenticate = async ({ email, password }) => {

  let user = await UserModel.findOne({ email });

  if (!user) {
    let err = new Error("invalid email");
    err.status = 401;
    throw err;
  }

  let match = await bcrypt.compare(password, user.password);

  if (!match) {
    let err = new Error("invalid password");
    err.status = 401;
    throw err;
  }

  if (user.isBlocked) {
    let err = new Error("user blocked");
    err.status = 403;
    throw err;
  }

  let token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  let userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};


//change password
export const changePassword = async (userId, pwdObj) => {

  let user = await UserModel.findById(userId);

  let match = await bcrypt.compare(pwdObj.currentPassword, user.password);

  if (!match) {
    let err = new Error("invalid current password");
    err.status = 400;
    throw err;
  }

  user.password = await bcrypt.hash(pwdObj.newPassword, 10);

  await user.save();
};
