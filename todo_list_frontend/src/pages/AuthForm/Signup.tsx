import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { signup } from "../../features/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup_schema, signup_schema_type } from "../../models/AuthModel";
import toast from "react-hot-toast";
import { IError } from "../../types/AuthTypes";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signup_schema),
  });

  const onSubmit = async (data: signup_schema_type) => {
    try {
      const response = await dispatch(signup(data)).unwrap();
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gradient-to-br to-gray-300/70 from-orange-700 ">
      <div className="bg-white md:w-1/3  px-5  rounded-lg flex flex-col ">
        <p className="py-1 px-2 my-5 cursor-pointer poppins-semibold text-2xl  text-center ">
          Signup
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-[85%] relative flex-col  justify-center   "
        >
          <Input
            LabelFor="username"
            id="username"
            label="User Name"
            type="text"
            register={register("username")}
            key={1}
            errorMessage={errors && errors?.username?.message!}
          />
          <Input
            LabelFor="password"
            id="password"
            label="Password"
            register={register("password")}
            type="password"
            errorMessage={errors && errors?.password?.message!}
            key={2}
          />
          <Input
            LabelFor="confirm_password"
            id="confirm_password"
            label="Confirm Password"
            register={register("confirm_password")}
            type="password"
            errorMessage={errors && errors?.confirm_password?.message!}
            key={3}
          />
          <div className=" flex justify-end gap-x-2 text-sm items-center">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 tracking-wide font-bold">
              Login
            </Link>
          </div>
          <button className="poppins-semibold text-white my-5 w-full hover:cursor-pointer focus:oultine-none bg-orange-500 py-2 rounded-lg">
            Signup
          </button>
        </form>
      </div>
    </section>
  );
};
export default Signup;
