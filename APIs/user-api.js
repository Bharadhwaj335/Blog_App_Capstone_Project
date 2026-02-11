import exp from "express";
import { register } from "../Services/authService.js";
import { ArticleModel } from "../Models/article-model.js";
import { verifyToken } from "../Middlewares/verifyToken.js";

export const userRoute = exp.Router();


//register user
userRoute.post("/users", async (req, res) => {

  //get user object
  let userObj = req.body;

  //register with USER role
  let newUser = await register({ ...userObj, role: "USER" });

  res.status(201).json({ message: "user created", payload: newUser });
});


//get all active articles
userRoute.get("/articles", verifyToken, async (req, res) => {

  //fetch active articles
  let articles = await ArticleModel
    .find({ isArticleActive: true })
    .populate("author", "firstName email");

  res.status(200).json({ message: "articles", payload: articles });
});


//add comment to article
userRoute.post("/articles/:articleId/comments", verifyToken, async (req, res) => {

  //get article id
  let aid = req.params.articleId;

  //find article
  let article = await ArticleModel.findById(aid);

  //push comment
  article.comments.push({
    user: req.user.userId,
    comment: req.body.comment,
  });

  await article.save();

  res.status(200).json({ message: "comment added", payload: article });
});
