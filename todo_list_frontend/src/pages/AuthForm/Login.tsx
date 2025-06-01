import Input from "../../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store/store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login_schema, login_schema_type } from "../../models/AuthModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, verifyUser } from "../../features/slices/userSlice";
import toast from "react-hot-toast";
import { IError } from "../../types/AuthTypes";
import { FormEvent, useState } from "react";
import ChangePassword from "./ChangePassword";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [openVerify, setOpenVerify] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<login_schema_type>({
    resolver: zodResolver(login_schema),
  });

  const onSubmit = async (data: login_schema_type) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err?.message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(verifyUser(username)).unwrap();
      if (res.success) {
        toast.success(res.message);
        setOpenVerify(false);
        setOpenChangePassword(true);
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center  bg-gradient-to-br to-gray-300/70 from-orange-700 ">
      <div className="bg-white md:w-1/3  px-5 py-4 rounded-lg flex flex-col ">
        <p className="py-1 px-2 cursor-pointer poppins-semibold text-2xl  text-center">
          Login
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-7 relative flex-col  justify-center"
        >
          <Input
            LabelFor="username"
            id="username"
            register={register("username")}
            label="User Name"
            type="text"
            key={1}
            errorMessage={errors && errors?.username?.message!}
          />
          <Input
            LabelFor="password"
            id="password"
            label="Password"
            register={register("password")}
            type="password"
            key={2}
            errorMessage={errors && errors?.password?.message!}
          />
          <p
            onClick={() => setOpenVerify(true)}
            className="text-right hover:cursor-pointer"
          >
            Forget Password
          </p>
          <div className=" flex mt-5 justify-end gap-x-2 items-center text-sm">
            <p>Don't have an account?</p>
            <Link
              to="/signup"
              className="text-blue-500 font-bold tracking-wide"
            >
              Signup
            </Link>
          </div>
          <button
            type={isSubmitting ? "button" : "submit"}
            className="poppins-semibold text-white  my-5 w-full hover:cursor-pointer focus:oultine-none bg-orange-500 py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
      {openVerify && (
        <div className="absolute bg-black/70 w-full h-screen flex justify-center items-center">
          <form
            onSubmit={handleVerify}
            className="bg-white md:w-1/4 rounded-md p-7 flex flex-col poppins-regular gap-y-7"
          >
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="focus:outline-none border border-black/35 px-3 rounded-md py-2 text-sm "
            />
            <button
              className="self-end bg-green-700 hover:cursor-pointer px-3 py-1 rounded-md text-sm text-white  "
              type="submit"
            >
              Verify
            </button>
          </form>
        </div>
      )}
      {openChangePassword && (
        <ChangePassword
          id={user?._id!}
          setClose={setOpenChangePassword}
          key="changepassword"
        />
      )}
    </section>
  );
};
export default Login;
