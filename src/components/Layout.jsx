import { Outlet, Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Layout = ({ signOut }) => {
  const {pathname} = useLocation();
  return (
    <div className="flex h-screen">
      <div className="w-1/5 flex flex-col items-center justify-center gap-10 bg-blue-600">
        <Link
          to={"/create"}
          className={`${pathname === '/' ? "bg-white px-4 py-1 rounded-full hover:bg-stone-400 hover:text-stone-300 text-2xl" : 'hidden'}`}
        >
          Crear Producto
        </Link>
        <Link
          onClick={signOut}
          className={`${pathname === '/' ? "bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-800 hover:text-stone-300 text-2xl" : 'hidden'}`}
        >
          Sign out
        </Link>
        <Link to={'/'}
          className={`${pathname !== '/' ? "bg-orange-600 text-white px-4 py-1 rounded-full hover:bg-orange-800 hover:text-stone-300 text-2xl" : 'hidden'}`}
        >
          Back
        </Link>
      </div>
      <div className="w-full mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
