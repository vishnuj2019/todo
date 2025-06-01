import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IError } from "../../types/AuthTypes";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { logout } from "../../features/slices/userSlice";
import YesOrNoModel from "../../pages/Todos/YesOrNoModel";

const Header = () => {
  const location = useLocation().pathname;
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout()).unwrap();
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    const element = document.getElementById("toggle") as HTMLInputElement;
    if (element) {
      element.checked = false;
    }
  }, [location]);

  return (
    <section className="bg-blue-700 py-5  text-white grid grid-cols-2 fixed  z-50 w-full top-0 left-0 poppins-regular">
      <div className="px-5 flex items-center ">
        <Link to="/home" className="text-lg poppins-medium block">
          Todos
        </Link>
      </div>
      <div className=" hidden md:flex justify-evenly items-center">
        <Link to="/">
          Home
          <span
            className={`transform h-[2px] block w-full bg-orange-500  scale-0 transition-all  duration-200  ${
              location === "/" && "scale-100  "
            } `}
          ></span>
        </Link>
        <Link to="/about">
          About
          <span
            className={`transform h-[2px] block w-full bg-orange-500  scale-0 transition-all  duration-200  ${
              location === "/about" && "scale-100  "
            } `}
          ></span>
        </Link>
        <div onClick={() => setIsLogout(true)} className="hover:cursor-pointer">
          Logout
          <span className="transform h-[2px] block w-full bg-orange-500  scale-0 transition-all  duration-200"></span>
        </div>
      </div>
      <div className="flex justify-end pr-5">
        <input type="checkbox" id="toggle" className="hidden peer" />
        <label
          className="block peer-checked:hidden md:hidden "
          htmlFor="toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </label>
        <label
          className="hidden peer-checked:block md:hidden "
          htmlFor="toggle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </label>
        <ul className="hidden md:hidden peer-checked:block absolute w-full top-16 text-center  bg-white text-black left-0">
          <li className="py-2 border-b border-b-gray-400 ">
            <Link className="block" to="/">
              Home
            </Link>
          </li>
          <li className="py-2 border-b border-b-gray-400">
            <Link className="block" to="/about">
              About
            </Link>
          </li>
          <li className="hover:cursor-pointer py-2 border-b border-b-gray-400">
            <div onClick={() => setIsLogout(true)}>Logout</div>
          </li>
        </ul>
      </div>

      {isLogout && (
        <YesOrNoModel
          handleCancel={() => setIsLogout(false)}
          content="Are you sure want to logout"
          handleSubmit={handleLogout}
          noContent="No"
          yesContent="Yes"
          key="logout"
        />
      )}
    </section>
  );
};

export default Header;
