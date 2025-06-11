import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../features/store/store";
import { getTodo, updateTodo } from "../../features/slices/todosSlice";
import {
  edit_todo_schema,
  edit_todo_schema_type,
} from "../../models/TodoModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { IError } from "../../types/AuthTypes";
import toast from "react-hot-toast";
import { IEditBtn } from "./Todos";
import { useEffect } from "react";
import Loading from "../../components/General/Loading";

interface IFormProps {
  setClose: (val: IEditBtn) => void;
  editBtn: IEditBtn;
}
const EditTodo = ({ setClose, editBtn }: IFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<edit_todo_schema_type>({
    resolver: zodResolver(edit_todo_schema),
    defaultValues: async () => {
      const res = await dispatch(getTodo(editBtn?.id)).unwrap();
      return res.data;
    },
  });

  const onSubmit = async (data: edit_todo_schema_type) => {
    try {
      const payload = { id: editBtn?.id, data };
      const res = await dispatch(updateTodo(payload)).unwrap();
      if (res.success) {
        toast.success(res.message);
        setClose({ id: "", edit: false });
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };
  return (
    <section className="absolute w-full top-0 left-0 z-50 h-screen bg-gray-600/50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white md:w-1/3 flex flex-col gap-y-2 py-2 rounded-md "
      >
        <div className="poppins-semibold text-xl border-b  px-6 py-2 border-black/40 flex items-center justify-between">
          <h2>Edit Todo</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:cursor-pointer"
            onClick={() => setClose({ id: "", edit: false })}
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
            <select
              {...register("status")}
              className="focus:outline-none w-full border px-2 py-2 text-sm rounded-sm border-gray-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {errors && (
              <p className="text-xs ml-1 mt-1 text-red-400 tracking-wider">
                {errors.status?.message}
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
          {isSubmitting ? <Loading /> : "Update"}
        </button>
      </form>
    </section>
  );
};

export default EditTodo;
