import { useAuth } from "../store/authStore";
import { NavLink, Outlet } from "react-router";

import {
  pageWrapper,
  primaryBtn,
} from "../styles/common.js";

function UserProfile() {
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
        <p className="text-sm text-[#6e6e73] mt-1">Explore what authors are publishing today.</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive ? `${primaryBtn} bg-[#004499]!` : primaryBtn
            }
          >
            Read Articles
          </NavLink>

        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default UserProfile;
