import { NavLink, Outlet } from "react-router";
import { useAuth } from "../store/authStore";
import { pageWrapper, primaryBtn, secondaryBtn } from "../styles/common";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <div className={pageWrapper}>
      <div className="max-w-xl mx-auto bg-[#f5f5f7] rounded-3xl p-8 text-center">
        <img
          src={currentUser?.profileImageUrl}
          className="h-24 w-24 rounded-full object-cover mx-auto border border-[#d2d2d7]"
          alt="profile"
        />

        <p className="mt-4 text-2xl font-semibold text-[#1d1d1f]">Welcome, {currentUser?.firstName}</p>
        <p className="text-sm text-[#6e6e73] mt-1">Create, edit, and manage your blog posts.</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive ? `${primaryBtn} bg-[#004499]!` : primaryBtn
            }
          >
            Read Articles
          </NavLink>

          <NavLink
            to="write-article"
            className={({ isActive }) =>
              isActive ? `${secondaryBtn} bg-[#f0f6ff] border-[#0066cc]` : secondaryBtn
            }
          >
            Write Article
          </NavLink>
        </div>
      </div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
