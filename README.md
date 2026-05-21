# Blog App Platform

A full-stack blog platform built with the MERN stack. It features role-based access for authors and users, article publishing, commenting, secure authentication, and profile-based dashboards.

## Live Demo

- [https://blog-app-lyart-eight.vercel.app/](https://blog-app-lyart-eight.vercel.app/)

## Project Structure

The project is divided into two main directories: Backend and Frontend.

### Backend Structure
- `APIs/` - Contains route handlers for different domains (`admin-api.js`, `author-api.js`, `common-api.js`, `user-api.js`).
- `config/` - Configuration files for external services like Cloudinary, Multer, and Zod schemas for validation.
- `Middlewares/` - Custom middleware for JWT verification, error handling, and request validation.
- `Models/` - Mongoose database schemas and models.
- `Services/` - Business logic layers (e.g., `authService.js`).
- `server.js` - The main entry point for the Express application.

### Frontend Structure
- `src/components/` - React components including pages (`Home`, `Login`, `Register`, `ArticleById`) and layout wrappers.
- `src/config/` - Configuration for API base URLs.
- `src/store/` - Zustand store for managing global authentication state (`authStore.js`).
- `src/styles/` - Global Tailwind CSS styles and utility classes (`common.js`, `index.css`).
- `src/App.jsx` - Main application routing setup.
- `vercel.json` - Configuration for deploying the Vite SPA on Vercel.

## Database Schemas

The application uses MongoDB via Mongoose. The primary schemas are defined as follows:

### User Schema (`user-model.js`)
Stores user accounts across all roles.
- `firstName` (String, Required)
- `lastName` (String, Optional)
- `email` (String, Required, Unique)
- `password` (String, Required, Hashed)
- `profileImageUrl` (String, Optional)
- `role` (String, Enum: ["AUTHOR", "USER", "ADMIN"], Required)
- `isActive` (Boolean, Default: true)
- `timestamps` (Boolean: true)

### Article Schema (`article-model.js`)
Stores blog posts published by authors.
- `author` (ObjectId, Ref: "user", Required)
- `title` (String, Required)
- `category` (String, Required)
- `content` (String, Required)
- `comments` (Array of userCommentSchema)
  - `user` (ObjectId, Ref: "user")
  - `comment` (String)
- `isArticleActive` (Boolean, Default: true)
- `timestamps` (Boolean: true)

## Technology Stack

- **Frontend**: React 18, Vite, React Router, Zustand (State Management), Axios, React Hook Form, React Hot Toast, Tailwind CSS.
- **Backend**: Node.js, Express 5, MongoDB, Mongoose, JSON Web Tokens (JWT), bcryptjs, Cloudinary.

## Prerequisites

- Node.js version 18 or newer.
- A MongoDB database (local or Atlas).
- A Cloudinary account for handling profile image uploads.

## Environment Variables

### Backend Configuration
Create a `.env` file in the `Backend` directory with the following variables:

```env
DB_URL=mongodb+srv://<user>:<password>@<cluster>/<database>
PORT=4000
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Note: Ensure `FRONTEND_URL` exactly matches your deployed frontend origin without a trailing slash.

### Frontend Configuration
Create a `.env` file in the `Frontend` directory to point to the backend API:

```env
VITE_API_URL=http://localhost:4000
```

## Local Development Setup

### 1. Install Dependencies
Run the following commands from the repository root:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Start the Backend Server
```bash
cd Backend
npm start
```
The Express server will start on the port defined in your environment variables.

### 3. Start the Frontend Application
```bash
cd Frontend
npm run dev
```
Open the URL provided by Vite in your terminal (typically `http://localhost:5173`).

## Production Deployment

### Backend Deployment (e.g., Render)
1. Set the root directory to `Backend`.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Provide all backend environment variables.
5. Note: The server is configured with `app.set("trust proxy", 1)` to handle secure cookies behind reverse proxies.

### Frontend Deployment (e.g., Vercel)
1. Set the root directory to `Frontend`.
2. Framework Preset: `Vite`
3. Add the `VITE_API_URL` environment variable pointing to the deployed backend URL.
4. The included `vercel.json` file handles all SPA routing automatically.

## Common Troubleshooting

- **401 Unauthorized**: Ensure your frontend and backend URLs are exact matches in your CORS configuration and environment variables. If testing cross-site deployments, ensure HTTPS is enforced.
- **Cross-Origin Cookie Issues**: The backend sets `SameSite=None` and `Secure=true` in production to allow the Vercel frontend to maintain active sessions with the Render backend.
- **Vercel 404 on Refresh**: This is mitigated by the `vercel.json` file which rewrites all traffic to `index.html`. Ensure this file is pushed to your repository root within the Frontend directory.
