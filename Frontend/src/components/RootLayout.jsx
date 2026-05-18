import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../store/authStore";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const initialized = useAuth((state) => state.initialized);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full">
        {!initialized ? <p className="text-center mt-10">Loading...</p> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
