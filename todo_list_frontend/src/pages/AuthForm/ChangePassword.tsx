import { useForm } from "react-hook-form";
import {
  changepassword_schema,
  changepassword_schema_type,
} from "../../models/AuthModel";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { changePassword } from "../../features/slices/userSlice";
import { IError } from "../../types/AuthTypes";
import toast from "react-hot-toast";

interface IChangePasswordProps {
  id: string;
  setClose: (val: boolean) => void;
}

const ChangePassword = ({ id, setClose }: IChangePasswordProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(changepassword_schema),
  });

  const onSubmit = async (data: changepassword_schema_type) => {
    try {
      const res = await dispatch(
        changePassword({ id: id, password: data?.password })
      ).unwrap();

      if (res.success) {
        toast.success(res.message);
        setClose(false);
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };
  return (
    <div className="absolute bg-black/70 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white md:w-1/4 rounded-md  flex flex-col poppins-regular"
      >
        <p className="text-lg poppins-medium border-b border-b-black/25 my-2 px-5 py-2 ">
          Change password
        </p>
        <div className="p-5">
          <Input
            LabelFor="password"
            id="password"
            label="Password"
            register={register("password")}
            type="password"
            key={"password"}
            errorMessage={errors && errors?.password?.message!}
          />
          <Input
            LabelFor="confirm_password"
            id="confirm_password"
            label="Confirm Password"
            register={register("confirm_password")}
            type="password"
            key={"confirm password"}
            errorMessage={errors && errors?.confirm_password?.message!}
          />
        </div>
        <button
          type="submit"
          className="py-2 bg-green-600 text-white tracking-wider poppins-bold rounded-b-md hover:cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
