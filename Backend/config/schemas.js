import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, "First name is too short").max(50, "First name is too long"),
    lastName: z.string().min(2, "Last name is too short").max(50, "Last name is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
  })
});

export const articleSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    category: z.string().min(2, "Category is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    author: z.string().optional() // ObjectId
  })
});

export const commentSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"),
    articleId: z.string().min(1, "Article ID is required"),
    comment: z.string().min(1, "Comment cannot be empty"),
  })
});
