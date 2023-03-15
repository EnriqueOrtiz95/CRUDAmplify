import { Outlet, Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-[20%] flex flex-col flex-wrap items-center justify-evenly gap-10 bg-blue-light2 p-4">
        {/* {pathname === "/" && (
          <h1 className="text-white text-2xl">
            Welcome{" "}
            <span className="text-orange-600">
              {user.attributes.email.split("@")[0].substring(0, 5)}
            </span>
          </h1>
        )} */}

      <div className='flex justify-center items-center w-[80px] h-[80px] borderLogo'>
          <h2 className='logo text-2xl'>JAEL</h2>
        </div>

        <Link
          to={"/create"}
          className={`${
            pathname === "/"
              ? "bg-primary text-white px-4 py-1 rounded-full hover:bg-sky-700 text-2xl"
              : "hidden"
          }`}
        >
          Nuevo Producto
        </Link>
        {/* <Link
          onClick={signOut}
          className={`${
            pathname === "/"
              ? "bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-800 hover:text-stone-300 text-2xl"
              : "hidden"
          }`}
        >
          Sign out
        </Link> */}
        <Link
          to={"/"}
          className={`${
            pathname !== "/"
              ? "bg-primary text-white px-4 py-1 rounded-full hover:bg-sky-700 hover:text-stone-300 text-2xl"
              : "hidden"
          }`}
        >
          Regresar
        </Link>
      </div>
      <div className="w-full lg:w-[80%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
