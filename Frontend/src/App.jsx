import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import RootLayout from "./components/RootLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { loadingClass } from "./styles/common.js";

const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const UserArticles = lazy(() => import("./components/UserArticles"));
const AuthorProfile = lazy(() => import("./components/AuthorProfile"));
const ArticleByID = lazy(() => import("./components/ArticleById"));
const AuthorArticles = lazy(() => import("./components/AuthorArticles"));
const WriteArticle = lazy(() => import("./components/WriteArticle"));
const EditArticle = lazy(() => import("./components/EditArticleForm"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Unauthorized = lazy(() => import("./components/Unauthorized"));

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement:<ErrorBoundary />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "user-profile",
          element: 
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserProfile />
          </ProtectedRoute>,
          children: [
            {
              path: "articles",
              element: <UserArticles />,
            },
          ],
        },
        {
          path: "author-profile",
          element: 
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorProfile />
          </ProtectedRoute>,
          
          children: [
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticle />,
            },
          ],
        },
        {
          path: "article/:id",
          element: <ArticleByID />,
        },
        {
          path: "edit-article/:id",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-article",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },
        {
          path:"unauthorized",
          element:<Unauthorized />
        }
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={<div className={loadingClass}>Loading page...</div>}>
        <RouterProvider router={routerObj} />
      </Suspense>
    </>
  );
}

export default App;




//<ArticleByID />
// <ArticleByID > content </ArticleByID>