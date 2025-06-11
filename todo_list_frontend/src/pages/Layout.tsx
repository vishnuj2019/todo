import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";

const Layout = () => {
  const location = useLocation().pathname;

  const isAuth = /^(\/login|\/signup)$/.test(location);
  return (
    <div className="poppins-regular   " id="parent">
      {!isAuth && <Header />}
      <div className={`${!isAuth && " mt-[12vh]"}  `} id="child">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
