# Blog App

Full-stack blog platform with user and author roles, article publishing, comments, authentication, and profile-based dashboards.

## Features

- User registration and login with JWT cookie authentication.
- Author registration and article management.
- User feed for reading active articles and posting comments.
- Protected routes for user and author dashboards.
- Cloudinary image upload support for profile pictures.
- Responsive React UI built with Vite and Tailwind CSS.

## Tech Stack

- Frontend: React, Vite, React Router, Zustand, Axios, React Hook Form, React Hot Toast, Tailwind CSS.
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Cloudinary.

## Project Structure

- `Backend/` - Express API server, MongoDB models, middleware, and auth services.
- `Frontend/` - Vite React application with routed pages and store logic.

## Live Demo

-  [https://blog-app-lyart-eight.vercel.app/](https://blog-app-lyart-eight.vercel.app/)

## Prerequisites

- Node.js 18 or newer.
- MongoDB database.
- Cloudinary account for image uploads.

## Environment Variables

### Backend

Create `Backend/.env` with the following values:

```env
DB_URL=mongodb+srv://<user>:<password>@<cluster>/<database>
PORT=4000
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Notes:

- Set `FRONTEND_URL` to your deployed frontend origin.
- Set `NODE_ENV=production` in production so cookies are set with the correct secure flags.
- `ALLOW_ALL_ORIGINS=true` can be used temporarily for debugging, but it should not be left on in production.

### Frontend

Create `Frontend/.env` if you want to override the backend URL locally:

```env
VITE_API_URL=http://localhost:4000
```

## Local Development

### 1. Install dependencies

From the repository root:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Start the backend

```bash
cd Backend
npm start
```

The API runs on the port defined in `Backend/.env`.

### 3. Start the frontend

```bash
cd Frontend
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Build for Production

### Frontend

```bash
cd Frontend
npm run build
```

### Backend

```bash
cd Backend
npm start
```

## Deployment Notes

- Deploy the backend first and copy its public URL into the frontend config if needed.
- The live frontend is hosted at [https://blog-app-lyart-eight.vercel.app/](https://blog-app-lyart-eight.vercel.app/).
- Make sure the backend CORS settings allow the deployed frontend origin.
- If you use cookie-based auth across domains, the frontend and backend must both be served over HTTPS.
- Clear the browser cache after a frontend redeploy if you previously saw chunk loading errors.

## Common Issues

- `401 Unauthorized` on `/common-api/check-auth`: the user is not logged in or the browser did not send the cookie.
- `Failed to fetch dynamically imported module`: usually caused by a stale frontend build or browser cache; redeploy and hard refresh.
- Article text overflowing a card: make sure the latest frontend styles from `Frontend/src/styles/common.js` are deployed.

## Scripts

### Backend

- `npm start` - start the Express server.

### Frontend

- `npm run dev` - start the Vite development server.
