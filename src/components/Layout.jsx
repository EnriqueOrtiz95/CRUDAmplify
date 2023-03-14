import { Outlet, Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Layout = ({ signOut, user }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-[22%] flex flex-col flex-wrap items-center justify-center gap-10 bg-cyan-700 p-4">
        {pathname === "/" && (
          <h1 className="text-white text-2xl">
            Welcome{" "}
            <span className="text-orange-600">
              {user.attributes.email.split("@")[0].substring(0, 5)}
            </span>
          </h1>
        )}

        <Link
          to={"/create"}
          className={`${
            pathname === "/"
              ? "bg-white px-4 py-1 rounded-full hover:bg-stone-400 hover:text-stone-300 text-2xl"
              : "hidden"
          }`}
        >
          Crear Producto
        </Link>
        <Link
          onClick={signOut}
          className={`${
            pathname === "/"
              ? "bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-800 hover:text-stone-300 text-2xl"
              : "hidden"
          }`}
        >
          Sign out
        </Link>
        <Link
          to={"/"}
          className={`${
            pathname !== "/"
              ? "bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-800 hover:text-stone-300 text-2xl"
              : "hidden"
          }`}
        >
          Back
        </Link>
      </div>
      <div className="w-full lg:w-[78%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
