import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IError } from "../../types/AuthTypes";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store/store";
import { logout } from "../../features/slices/userSlice";
import YesOrNoModel from "../../pages/Todos/YesOrNoModel";

const Header = () => {
  const location = useLocation().pathname;
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  let id = useRef(0);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);

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
  console.log(id);

  useEffect(() => {
    const element = document.getElementById("toggle") as HTMLInputElement;
    if (element) {
      element.checked = false;
    }
  }, [location]);

  return (
    <section className="bg-white shadow-xl shadow-black/15 h-[12vh]  text-black grid grid-cols-2 fixed  z-50 w-full top-0 left-0 text-lg">
      <div className="px-5 flex items-center h-full ">
        <Link to="/" className="text-lg   ">
          <img
            className="w-14 h-14"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK8mumBv0Gje9ZGjLFs6Cxo6i0DHynl9kVvQ&s"
          />
        </Link>
      </div>
      <div className=" hidden md:flex justify-evenly h-full  items-center">
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

        <div
          className="hover:cursor-pointer relative  h-full flex items-center "
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() =>
            (id.current = setTimeout(() => {
              setShow(false);
            }, 200))
          }
        >
          <img src="/images/user.png" className="w-14 h-14 rounded-full" />
          {show && (
            <ul
              className="absolute bg-white  text-[15px] w-36 text-center top-20 mt-1 -left-10 rounded-md  "
              onMouseEnter={(e) => {
                if (id.current) clearTimeout(id.current);
                e.stopPropagation();
              }}
            >
              <li className="py-2 hover:bg-gray-100 rounded-md">
                <Link to="/profile">Profile</Link>
              </li>
              <li
                onClick={() => setIsLogout(true)}
                className="py-2 hover:bg-gray-100 rounded-md"
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-end pr-5 md:hidden">
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
          <li>
            <img src="/images/noimage.png" className="w-10 h-10" />
          </li>

          {/*<li className="hover:cursor-pointer py-2 border-b border-b-gray-400">
            <div onClick={() => setIsLogout(true)}>Logout</div>
          </li>*/}
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
