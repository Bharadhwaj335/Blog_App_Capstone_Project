import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  headingClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
} from "../styles/common";

const categories = ["Tech", "Design", "Career", "Productivity", "AI", "Wellness"];

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const role = user?.role?.toUpperCase?.();
  const navigate = useNavigate();

  const profilePath =
    role === "AUTHOR" ? "/author-profile" : role === "ADMIN" ? "/admin-profile" : "/user-profile";

  return (
    <main className={pageBackground}>
      <section className={`${pageWrapper} pt-10 sm:pt-14`}>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#0b66c3] font-semibold mb-4">New stories daily</p>
          <h1 className={pageTitleClass}>A better place to read and publish thoughtful blogs.</h1>
          <p className={`${bodyText} max-w-2xl mt-4`}>
            Blog App helps readers discover useful ideas and gives authors a focused space to publish meaningful
            writing without distractions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <NavLink to={profilePath} className={primaryBtn}>
                Go to Dashboard
              </NavLink>
            ) : (
              <>
                <NavLink to="/register" className={primaryBtn}>
                  Start Reading
                </NavLink>
                <NavLink to="/login" className={secondaryBtn}>
                  I have an account
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={`${pageWrapper} pt-0 pb-14`}>
        <div className="rounded-3xl border border-[#dce6f0] bg-white p-6 sm:p-8">
          <h2 className={headingClass}>Popular topics this week</h2>
          <p className={`${bodyText} mt-3`}>Pick a topic and explore the latest perspectives from authors.</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => navigate(isAuthenticated ? profilePath + "/articles" : "/login")}
                className="px-4 py-2 rounded-full border border-[#d4dee8] text-sm font-medium text-[#334155] bg-[#f8fbff] hover:bg-[#eaf4ff] hover:border-[#0066cc] hover:text-[#0066cc] transition-colors cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;