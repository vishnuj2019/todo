import { format } from "date-fns";
import { ITodo } from "../../types/TodoTypes";

interface IProps {
  todo: ITodo;
  setEditBtn: (val: { id: string; edit: boolean }) => void;
  setDeleteBtn: (val: { id: string; isDelete: boolean }) => void;
}

const TodoCard = ({ todo, setEditBtn, setDeleteBtn }: IProps) => {
  let statusClr;
  if (todo?.status === "Pending") statusClr = "	bg-orange-500";
  if (todo?.status === "In Progress") statusClr = "	bg-yellow-500";
  if (todo?.status === "Completed") statusClr = "	bg-green-500";

  const dotsWithText = (text: string, limit: number) => {
    return text?.length > 10 ? `${text?.slice(0, limit)}...` : text;
  };

  return (
    <div className="grid grid-cols-[80%_20%] w-full items-center text-black border-b pb-4 px-4 border-gray-400  md:h-full   ">
      <div className=" flex gap-y-4  flex-col ">
        <div className="flex  justify-between items-center">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-lg">{dotsWithText(todo?.title, 10)}</p>
            <p className="text-gray-500 text-sm ">
              {dotsWithText(todo?.description!, 10)}
            </p>
          </div>
          <p
            className={` ${statusClr} text-white rounded-md text-sm  px-2 py-1`}
          >
            {todo.status ? todo?.status : "-"}
          </p>
        </div>

        <div className="flex items-center text-sm   justify-between">
          <p className=" ">
            {todo.createdAt ? todo?.createdAt?.split("T")?.[0] : "-"}
          </p>
          <p>
            {todo.createdAt
              ? format(new Date(todo?.createdAt), "hh:mm:ss a")
              : "-"}
          </p>
        </div>
      </div>

      <div className=" flex  flex-col justify-between   flex-1  items-end gap-x-6  h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={() => setEditBtn({ id: todo?._id!, edit: true })}
          className="size-6 hover:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 hover:cursor-pointer"
          onClick={() => setDeleteBtn({ id: todo?._id!, isDelete: true })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default TodoCard;
