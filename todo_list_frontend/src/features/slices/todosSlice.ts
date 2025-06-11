import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../hooks/useAxios'
import { IAdd_Update_Get_TodoResponse, ITodo, ITodoResponse, ITodoSearchOptions, ITodoState } from '../../types/TodoTypes'
import { IRejectType } from '../../types/AuthTypes'
import { AxiosError } from 'axios'
import { add_todo_schema_type } from '../../models/TodoModel'

const initialState: ITodoState = {
     todos: [],
     totalCount: 0,
     isTodoUpdated: false,
     status: "Idle",
     error: null
}


export const searchTodos = createAsyncThunk<ITodoResponse, ITodoSearchOptions, { rejectValue: IRejectType }>('todos/search', async (data: ITodoSearchOptions, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.get(`/api/v1/todos/search?searchTerm=${data.searchTerm || ""}&page=${data.page}&limit=${data.limit}`)
          console.log(response.data)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               ``
               return rejectWithValue({ message: "Something went wrong when get todos" })
          }
     }
})

export const createTodo = createAsyncThunk<IAdd_Update_Get_TodoResponse, add_todo_schema_type, { rejectValue: IRejectType }>('/create', async (data: add_todo_schema_type, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post('/api/v1/todos/create', data)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when add todo" })
          }
     }
})

export const updateTodo = createAsyncThunk<IAdd_Update_Get_TodoResponse, { id: string, data: ITodo }, { rejectValue: IRejectType }>('/updateTodo', async (data: { id: string, data: ITodo }, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.put(`/api/v1/todos/update/${data?.id}`, data.data)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when update the todo" })
          }
     }
})

export const getTodo = createAsyncThunk<IAdd_Update_Get_TodoResponse, string, { rejectValue: IRejectType }>('/getTodo', async (id: string, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.get(`/api/v1/todos/get/${id}`)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when get a todo" })
          }
     }
})

export const deletTodo = createAsyncThunk<IAdd_Update_Get_TodoResponse, string, { rejectValue: IRejectType }>('/deletTodo', async (id: string, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.delete(`/api/v1/todos/delete/${id}`)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when delete a todo" })
          }
     }
})
const todoSlice = createSlice({
     name: "todos",
     initialState,
     reducers: {
          updateTodoState: (state) => {
               state.isTodoUpdated = !state.isTodoUpdated
          }
     },
     extraReducers: (builder) => {
          builder
               .addCase(searchTodos.pending, (state, _action) => {
                    state.status = "Pending"

               })
               .addCase(searchTodos.fulfilled, (state, action) => {
                    state.status = "Fulfilled",
                         state.todos = action.payload.data,
                         state.totalCount = action.payload.totalCount

               })
               .addCase(searchTodos.rejected, (state, _action) => {
                    state.status = "Rejected"

               })
               .addCase(createTodo.pending, (state, _action) => {
                    state.status = "Pending"

               })
               .addCase(createTodo.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
                    //state.todos = [action.payload?.data, ...state.todos]

               })
               .addCase(createTodo.rejected, (state, _action) => {
                    state.status = "Rejected"

               })
               .addCase(updateTodo.pending, (state, _action) => {
                    state.status = "Pending"

               })
               .addCase(updateTodo.fulfilled, (state, action) => {
                    state.status = "Fulfilled",
                         state.todos = state.todos?.map((todo) => todo._id === action.payload?.data?._id ? action?.payload?.data : todo)
               })
               .addCase(updateTodo.rejected, (state, _action) => {
                    state.status = "Rejected"

               })
               .addCase(getTodo.pending, (state, _action) => {
                    state.status = "Pending"

               })
               .addCase(getTodo.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
               })
               .addCase(getTodo.rejected, (state, _action) => {
                    state.status = "Rejected"

               })
               .addCase(deletTodo.pending, (state, _action) => {
                    state.status = "Pending"

               })
               .addCase(deletTodo.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
                    //state.todos = state.todos?.filter((todo) => todo?._id !== action.payload?.data?._id!)
               })
               .addCase(deletTodo.rejected, (state, _action) => {
                    state.status = "Rejected"

               })
     }

})

export default todoSlice.reducer
export const { updateTodoState } = todoSlice.actions