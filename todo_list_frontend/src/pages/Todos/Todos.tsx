import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store/store";
import { deletTodo, searchTodos } from "../../features/slices/todosSlice";
import { ITodoSearchOptions } from "../../types/TodoTypes";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import toast from "react-hot-toast";
import { IError } from "../../types/AuthTypes";
import YesOrNoModel from "./YesOrNoModel";

export interface IEditBtn {
  id: string;
  edit: boolean;
}

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [addBtn, setAddBtn] = useState<boolean>(false);
  const [deleteBtn, setDeleteBtn] = useState({
    id: "",
    isDelete: false,
  });
  const [editBtn, setEditBtn] = useState<IEditBtn>({
    id: "",
    edit: false,
  });

  const { todos, totalCounts } = useSelector((state: RootState) => state.todos);
  const [searchOptions, setSearchOption] = useState<ITodoSearchOptions>({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(searchTodos(searchOptions));
  }, [searchOptions]);
  let totalPage = Math.ceil(totalCounts / searchOptions?.limit);

  useEffect(() => {
    const element = document.getElementById("mainPage");
    if (element) {
      if (addBtn || editBtn?.edit || deleteBtn?.isDelete) {
        element.style.overflowY = "hidden";
      } else {
        element.style.overflowY = "initial";
      }
    }
  }, [addBtn, editBtn, deleteBtn]);

  const handleDelete = async () => {
    try {
      const res = await dispatch(deletTodo(deleteBtn?.id!)).unwrap();
      if (res.success) {
        toast.success(res.message);
        setDeleteBtn({ id: "", isDelete: false });
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setDeleteBtn({ id: "", isDelete: false });
  };
  return (
    <main className="bg-gradient-to-br min-h-full  mx-0 from-red-600 to-green-500 py-4 flex justify-center mt-12 md:mt-16">
      <div className="w-[90%] md:w-1/2 min-h-1/2 2xl:w-1/3 2xl:mx-auto  bg-white p-5 rounded-md mt-8 relative">
        <div className="flex  items-center justify-between   w-full">
          <input
            type="text"
            placeholder="Search by title..."
            onChange={(e) =>
              setSearchOption((prev) => ({
                ...prev,
                searchTerm: e.target.value,
              }))
            }
            className="border w-[65%] px-2 py-2 rounded-md outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => setAddBtn(true)}
            className="bg-blue-600 text-white w-[30%] rounded-md py-2 text-sm  whitespace-nowrap hover:cursor-pointer"
          >
            Add New
          </button>
        </div>
        {todos?.length > 0 ? (
          <section className="flex flex-col gap-y-5 mb-5  py-10 text-white">
            {todos?.map((todo) => {
              let statusClr;
              if (todo?.status === "Pending") statusClr = "	bg-orange-500";
              if (todo?.status === "In Progress") statusClr = "	bg-yellow-500";
              if (todo?.status === "Completed") statusClr = "	bg-green-500";
              return (
                <div
                  key={todo?._id}
                  className="flex items-center  shadow-md shadow-black/60 h-36 md:h-full  text-sm poppins-medium rounded-md bg-gradient-to-br from-fuchsia-800 to-sky-400 p-5"
                >
                  <div className="basis-[90%]  h-full  gap-y-2 whitespace-nowrap flex flex-col items-start  md:flex md:flex-row md:items-center gap-x-4 text-center">
                    <p className="basis-1/4">
                      {todo.title
                        ? todo?.title?.length > 10
                          ? `${todo?.title?.slice(0, 10)}...`
                          : todo?.title
                        : "-"}
                    </p>
                    <p className="basis-1/5">
                      {todo.priority ? todo?.priority : "-"}
                    </p>
                    <p
                      className={`basis-1/5 ${statusClr} text-white rounded-md text-sm px-2 py-1`}
                    >
                      {todo.status ? todo?.status : "-"}
                    </p>
                    <p className="basis-1/5">
                      {todo.createdAt ? todo?.createdAt?.split("T")?.[0] : "-"}
                    </p>
                  </div>

                  <div className="basis-[10%] flex items-center gap-x-6  h-full">
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
                      onClick={() =>
                        setDeleteBtn({ id: todo?._id!, isDelete: true })
                      }
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
            })}
          </section>
        ) : (
          <div className="flex justify-center items-center  h-full">
            <p className="text-lg poppins-semibold">No Todos </p>
          </div>
        )}

        <div className="flex justify-end poppin-regular absolute bottom-5 right-7 items-center gap-x-4">
          <button
            disabled={searchOptions?.page === 1}
            onClick={() =>
              setSearchOption((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="hover:cursor-pointer disabled:bg-gray-400 bg-blue-700 py-1  px-4 rounded-md text-white  "
            type="button"
          >
            Prev
          </button>
          {Array.from({ length: totalPage === 0 ? 1 : totalPage }).map(
            (_, index) => {
              if (index + 1 > 4 && index + 1 !== totalPage) {
                return ".";
              } else {
                return (
                  <p
                    key={index}
                    onClick={() =>
                      setSearchOption((prev) => ({ ...prev, page: index + 1 }))
                    }
                    className={`border px-3 py-1 rounded-lg border-black/50 hover:cursor-pointer ${
                      searchOptions?.page === index + 1
                        ? "bg-green-600 text-white"
                        : "text-black"
                    }`}
                  >
                    {index + 1}
                  </p>
                );
              }
            }
          )}
          <button
            onClick={() =>
              setSearchOption((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={totalPage === searchOptions?.page || totalPage === 0}
            className="hover:cursor-pointer disabled:bg-gray-400 bg-blue-700 py-1  px-4 rounded-md text-white  "
            type="button"
          >
            Next
          </button>
        </div>
      </div>
      {addBtn && <AddTodo setClose={setAddBtn} key="close" />}
      {editBtn?.edit && (
        <EditTodo setClose={setEditBtn} editBtn={editBtn} key="editClose" />
      )}
      {deleteBtn?.isDelete && (
        <YesOrNoModel
          content="Are you sure want to delete?"
          handleCancel={handleCancel}
          handleSubmit={handleDelete}
          noContent="Cancel"
          yesContent="Delete"
          key="deleteModel"
        />
      )}
    </main>
  );
};

export default Todos;
