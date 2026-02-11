import exp from "express";
import { register } from "../Services/authService.js";
import { ArticleModel } from "../Models/article-model.js";
import { verifyToken } from "../Middlewares/verifyToken.js";
import { checkAuthor } from "../Middlewares/checkAuthor.js";

export const authorRoute = exp.Router();


//register author
authorRoute.post("/users", async (req, res) => {

  //get author object
  let userObj = req.body;

  //register with AUTHOR role
  let newAuthor = await register({ ...userObj, role: "AUTHOR" });

  res.status(201).json({ message: "author created", payload: newAuthor });
});


//create article
authorRoute.post("/articles", verifyToken, checkAuthor, async (req, res) => {

  //get article data
  let articleObj = req.body;

  //attach author id from token
  articleObj.author = req.user.userId;

  let article = new ArticleModel(articleObj);
  let savedArticle = await article.save();

  res.status(201).json({ message: "article created", payload: savedArticle });
});


//get author articles
authorRoute.get("/articles", verifyToken, checkAuthor, async (req, res) => {

  //get author id
  let aid = req.user.userId;

  let articles = await ArticleModel.find({ author: aid });

  res.status(200).json({ message: "articles", payload: articles });
});


//update article
authorRoute.put("/articles/:articleId", verifyToken, checkAuthor, async (req, res) => {

  //get article id
  let aid = req.params.articleId;

  let updated = await ArticleModel.findByIdAndUpdate(
    aid,
    req.body,
    { new: true }
  );

  res.status(200).json({ message: "article updated", payload: updated });
});


//soft delete article
authorRoute.delete("/articles/:articleId", verifyToken, checkAuthor, async (req, res) => {

  //get article id
  let aid = req.params.articleId;

  let deleted = await ArticleModel.findByIdAndUpdate(
    aid,
    { isArticleActive: false },
    { new: true }
  );

  res.status(200).json({ message: "article deleted", payload: deleted });
});
