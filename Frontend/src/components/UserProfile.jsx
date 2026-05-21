import { useAuth } from "../store/authStore";
import { NavLink, Outlet } from "react-router";

import {
  pageWrapper,
  primaryBtn,
  secondaryBtn
} from "../styles/common.js";

function UserProfile() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <div className={pageWrapper}>
      <div className="max-w-xl mx-auto bg-white shadow-xl shadow-[#0b66c3]/5 rounded-3xl p-10 text-center border border-[#e1e7ee]">
        <div className="relative inline-block">
          <img
            src={currentUser?.profileImageUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            className="h-28 w-28 rounded-full object-cover mx-auto border-4 border-white shadow-md"
            alt="profile"
          />
          <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm"></div>
        </div>

        <p className="mt-5 text-3xl font-bold text-[#1f2937]">Welcome, {currentUser?.firstName}</p>
        <p className="text-base text-[#6b7280] mt-2">Explore what authors are publishing today.</p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive ? `${primaryBtn} bg-[#08529b] shadow-md px-8 py-3 w-full sm:w-auto` : `${primaryBtn} px-8 py-3 w-full sm:w-auto shadow-sm`
            }
          >
            Read Articles
          </NavLink>

          <NavLink
            to="/edit-profile"
            className={`${secondaryBtn} px-8 py-3 w-full sm:w-auto shadow-sm`}
          >
            Edit Profile
          </NavLink>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default UserProfile;
