import { Schema, model } from "mongoose";


//comment schema
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  comment: String,
});


//article schema
const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "author required"],
    },
    title: {
      type: String,
      required: [true, "title required"],
    },
    category: {
      type: String,
      required: [true, "category required"],
    },
    content: {
      type: String,
      required: [true, "content required"],
    },
    comments: [commentSchema],
    isArticleActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

export const ArticleModel = model("article", articleSchema);
