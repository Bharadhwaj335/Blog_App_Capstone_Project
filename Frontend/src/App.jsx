import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import RootLayout from "./components/RootLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import UserArticles from "./components/UserArticles";
import AuthorProfile from "./components/AuthorProfile";
import ArticleByID from "./components/ArticleById";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticle from "./components/WriteArticle";
import EditArticle from "./components/EditArticleForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

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
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;




//<ArticleByID />
// <ArticleByID > content </ArticleByID>