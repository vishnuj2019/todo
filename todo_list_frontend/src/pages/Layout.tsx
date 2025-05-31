import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";

const Layout = () => {
  const location = useLocation().pathname;

  const isAuth = /^(\/login|\/signup)$/.test(location);
  return (
    <div className="poppins-regular ">
      {!isAuth && <Header />}
      <div className="h-screen" id="mainPage">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
