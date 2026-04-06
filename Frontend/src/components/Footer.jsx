import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";

function Footer() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const currentYear = new Date().getFullYear();

  const profilePath =
    user?.role === "AUTHOR" ? "/author-profile" : user?.role === "ADMIN" ? "/admin-profile" : "/user-profile";

  return (
    <footer className="mt-10 border-t border-[#dbe4ed] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-[#4b5563]">Copyright {currentYear} MyBlog</p>
        <div className="flex items-center gap-4 text-sm">
          <NavLink to="/" className="text-[#4b5563] hover:text-[#0b66c3] transition-colors">
            Home
          </NavLink>
          {!isAuthenticated && (
            <NavLink to="/login" className="text-[#4b5563] hover:text-[#0b66c3] transition-colors">
              Login
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to={profilePath} className="text-[#4b5563] hover:text-[#0b66c3] transition-colors">
              Dashboard
            </NavLink>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;