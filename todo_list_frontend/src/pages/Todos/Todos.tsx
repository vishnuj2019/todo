import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/store/store";
import {
  deletTodo,
  searchTodos,
  updateTodoState,
} from "../../features/slices/todosSlice";
import { ITodoSearchOptions } from "../../types/TodoTypes";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import toast from "react-hot-toast";
import { IError } from "../../types/AuthTypes";
import YesOrNoModel from "./YesOrNoModel";
import { debounce } from "../../components/General/Debounce";
import TodoCard from "./TodoCard";

import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export interface IEditBtn {
  id: string;
  edit: boolean;
}

const Todos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  const [addBtn, setAddBtn] = useState<boolean>(false);
  const [deleteBtn, setDeleteBtn] = useState({
    id: "",
    isDelete: false,
  });
  const [editBtn, setEditBtn] = useState<IEditBtn>({
    id: "",
    edit: false,
  });

  const { todos, totalCount, isTodoUpdated } = useSelector(
    (state: RootState) => state.todos
  );
  const [searchOptions, setSearchOption] = useState<ITodoSearchOptions>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch(searchTodos({ ...searchOptions, searchTerm: search }));
  }, [searchOptions, isTodoUpdated, search]);

  let totalPage = Math.ceil(totalCount / searchOptions?.limit);

  //  useEffect(() => {
  //    const element = document.getElementById("mainPage");
  //    if (element) {
  //      if (addBtn || editBtn?.edit || deleteBtn?.isDelete) {
  //        element.style.overflowY = "hidden";
  //      } else {
  //        element.style.overflowY = "initial";
  //      }
  //    }
  //    return () => {
  //      if (element) element.style.overflowY = "auto";
  //    };
  //  }, [addBtn, editBtn, deleteBtn]);

  useEffect(() => {
    const target = document.getElementById("parent");
    const div = document.getElementById("child");
    if (addBtn || editBtn?.edit || deleteBtn?.isDelete) {
      div.style.marginTop = "0px";
      disableBodyScroll(target);
    } else {
      div.style.marginTop = "12vh";

      enableBodyScroll(target);
    }
  }, [addBtn, editBtn, deleteBtn]);

  const handleDelete = async () => {
    try {
      const res = await dispatch(deletTodo(deleteBtn?.id!)).unwrap();
      if (res.success) {
        toast.success(res.message);
        if (todos?.length === 1) {
          setSearchOption((prev) => ({
            ...prev,
            page: searchOptions?.page === 1 ? 1 : searchOptions?.page - 1,
          }));
        }
        setDeleteBtn({ id: "", isDelete: false });
        dispatch(updateTodoState());
      }
    } catch (error) {
      const err = error as IError;
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setDeleteBtn({ id: "", isDelete: false });
  };

  const debouncedSearch = useMemo(() => debounce(setSearch, 700), []);
  return (
    <main className="  w-1/2 mx-auto rounded-md flex py-10 bg-white flex-col justify-between min-h-[88vh] ">
      <div className="">
        <div className="flex  items-center justify-between   w-full">
          <input
            type="text"
            placeholder="Search by title..."
            onChange={(e) => debouncedSearch(e.target.value)}
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
          <section className="flex flex-col items-center gap-y-5 mb-5  py-10 text-white">
            {todos?.map((todo) => (
              <TodoCard
                key={todo?._id}
                todo={todo}
                setDeleteBtn={setDeleteBtn}
                setEditBtn={setEditBtn}
              />
            ))}
          </section>
        ) : (
          <div className="flex justify-center items-center  h-full">
            <p className="text-lg poppins-semibold">No Todos </p>
          </div>
        )}
      </div>

      <div className="flex justify-end poppin-regular  bottom-5 right-7 items-center gap-x-4">
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
