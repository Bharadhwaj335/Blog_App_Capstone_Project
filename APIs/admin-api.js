import exp from "express";
import { register } from "../Services/authService.js";
import { UserTypeModel } from "../Models/user-model.js";
import { ArticleModel } from "../Models/article-model.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

export const adminRoute = exp.Router();


//register admin
adminRoute.post("/users", async (req, res) => {

  let userObj = req.body;

  let newAdmin = await register({ ...userObj, role: "ADMIN" });

  res.status(201).json({ message: "admin created", payload: newAdmin });
});


//get all active articles
adminRoute.get("/articles", verifyToken, async (req, res) => {

  let articles = await ArticleModel
    .find({ isArticleActive: true })
    .populate("author", "firstName email");

  res.status(200).json({ message: "articles", payload: articles });
});


//block user
adminRoute.post("/block-user/:userId", verifyToken, async (req, res) => {

  let uid = req.params.userId;

  let user = await UserModel.findById(uid);

  user.isBlocked = true;
  await user.save();

  res.status(200).json({ message: "user blocked" });
});


//unblock user
adminRoute.post("/unblock-user/:userId", verifyToken, async (req, res) => {

  let uid = req.params.userId;

  let user = await UserModel.findById(uid);

  user.isBlocked = false;
  await user.save();

  res.status(200).json({ message: "user unblocked" });
});
