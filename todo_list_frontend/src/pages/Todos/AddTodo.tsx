import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { createTodo, updateTodoState } from "../../features/slices/todosSlice";
import { add_todo_schema, add_todo_schema_type } from "../../models/TodoModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { IError } from "../../types/AuthTypes";
import toast from "react-hot-toast";
import Loading from "../../components/General/Loading";

interface IFormProps {
  setClose: (val: boolean) => void;
}
const AddTodo = ({ setClose }: IFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<add_todo_schema_type>({
    resolver: zodResolver(add_todo_schema),
  });

  const onSubmit = async (data: add_todo_schema_type) => {
    try {
      const res = await dispatch(createTodo(data)).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(updateTodoState());
        setClose(false);
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };
  return (
    <section className="absolute w-full left-0 top-0  z-50 h-screen bg-gray-600/75 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white md:w-1/3 flex flex-col gap-y-2  rounded-md  py-5 "
      >
        <div className="poppins-semibold text-xl border-b  px-6 py-2 border-black/40 flex items-center justify-between">
          <h2>Add Todo</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:cursor-pointer"
            onClick={() => setClose(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="p-6 flex flex-col gap-y-1.5">
          <div className=" min-h-16">
            <input
              {...register("title")}
              placeholder="Enter title"
              className="focus:outline-none w-full border px-3 py-2 text-sm rounded-sm border-gray-500"
            />
            {errors && (
              <p className="text-xs ml-1 mt-1 text-red-400 tracking-wider">
                {errors.title?.message}
              </p>
            )}
          </div>
          <div className=" min-h-16">
            <select
              {...register("priority")}
              className="focus:outline-none w-full border px-2 py-2 text-sm rounded-sm border-gray-500"
            >
              <option hidden value="">
                Select Priority
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors && (
              <p className="text-xs ml-1 mt-1 text-red-400 tracking-wider">
                {errors.priority?.message}
              </p>
            )}
          </div>
          <div className=" min-h-16">
            <textarea
              {...register("description")}
              placeholder="Type something"
              className="focus:outline-none w-full min-h-28 max-h-28 border px-3  py-2 text-sm rounded-sm border-gray-500"
            />
            {errors && (
              <p className="text-xs ml-1 mt-1 text-red-400 tracking-wider">
                {errors.description?.message}
              </p>
            )}
          </div>
        </div>
        <button
          type={isSubmitting ? "button" : "submit"}
          className="bg-orange-500  rounded-lg py-2 w-[25%] h-10 mx-auto hover:cursor-pointer  text-white poppins-medium"
        >
          {isSubmitting ? <Loading /> : "Add"}
        </button>
      </form>
    </section>
  );
};

export default AddTodo;
