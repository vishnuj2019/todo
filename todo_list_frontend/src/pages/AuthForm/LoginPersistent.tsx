import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { Outlet, useNavigate } from "react-router-dom";
import { decodedUser } from "../../features/slices/userSlice";
import { useEffect, useRef, useState } from "react";
//import toast from "react-hot-toast";
import { IError } from "../../types/AuthTypes";

const LoginPersistent = () => {
  const ref = useRef(0);

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const naviage = useNavigate();
  console.log("persist");
  useEffect(() => {
    const decode = async () => {
      try {
        const res = await dispatch(decodedUser()).unwrap();
        if (res.success) {
          setIsLoading(false);
        }
      } catch (error) {
        const err = error as IError;
        console.log(error);
        if (!err.success && ref.current == 0) {
          ref.current += 1;
          //console.log(ref.current);
          //toast.error(err.message);
          setIsLoading(false);
          naviage("/login");
        }
      }
    };
    decode();
  }, [location.pathname]);
  return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default LoginPersistent;
