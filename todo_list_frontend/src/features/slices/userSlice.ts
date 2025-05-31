import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../hooks/useAxios"
import { ISignupAndLoginResponse, IRejectType, IAuthState } from "../../types/AuthTypes"
import { AxiosError } from "axios"
import { login_schema_type, signup_schema_type } from "../../models/AuthModel"

const initialState: IAuthState = {
     user: null,
     error: null,
     status: "Idle"
}
export const login = createAsyncThunk<ISignupAndLoginResponse, login_schema_type, { rejectValue: IRejectType }>('/login', async (data: login_schema_type, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post('/api/v1/user/login', data)
          return response.data
     } catch (error: unknown) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          };
          return rejectWithValue({ message: "Something went wrong when login" })
     }

})
export const signup = createAsyncThunk<ISignupAndLoginResponse, signup_schema_type, { rejectValue: IRejectType }>('/singup', async (data: signup_schema_type, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post('/api/v1/user/signup', data)
          return response.data
     } catch (error: unknown) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          };
          return rejectWithValue({ message: "Something went wrong when login" })
     }
})

export const verifyUser = createAsyncThunk<ISignupAndLoginResponse, string, { rejectValue: IRejectType }>('/verify', async (username: string, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post('/api/v1/user/verifyUser', { username: username.trim() })
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when verify the username" })
          }
     }
})
export const changePassword = createAsyncThunk<ISignupAndLoginResponse, { id: string, password: string }, { rejectValue: IRejectType }>('/changepassword', async ({ id, password }: { id: string, password: string }, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post(`/api/v1/user/forgetPassword/${id}`, { password: password })
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when change the password" })
          }
     }
})
export const logout = createAsyncThunk<ISignupAndLoginResponse, void, { rejectValue: IRejectType }>('/logout', async (_, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.post(`/api/v1/user/logout`)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when logout" })
          }
     }
})

export const decodedUser = createAsyncThunk<ISignupAndLoginResponse, void, { rejectValue: IRejectType }>('/decode', async (_, { rejectWithValue }) => {
     try {
          const response = await axiosInstance.get(`/api/v1/user/decodeUser`)
          return response.data
     } catch (error) {
          if (error instanceof AxiosError && error?.response) {
               return rejectWithValue(error?.response?.data)
          }
          else {
               return rejectWithValue({ message: "Something went wrong when decode" })
          }
     }
})

export const userSlice = createSlice({
     name: "user",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
               // Login
               .addCase(login.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(login.fulfilled, (state, action) => {
                    state.status = "Fulfilled",
                         state.user = action.payload.data
               })
               .addCase(login.rejected, (state, _action) => {
                    state.status = "Rejected"
               })
               // Signup
               .addCase(signup.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(signup.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
               })
               .addCase(signup.rejected, (state, _action) => {
                    state.status = "Rejected"
               })

               // Verify
               .addCase(verifyUser.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(verifyUser.fulfilled, (state, action) => {
                    state.status = "Fulfilled",
                         state.user = action.payload.data
               })
               .addCase(verifyUser.rejected, (state, _action) => {
                    state.status = "Rejected"
               })
               // Change password
               .addCase(changePassword.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(changePassword.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
               })
               .addCase(changePassword.rejected, (state, _action) => {
                    state.status = "Rejected"
               })
               // Logout
               .addCase(logout.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(logout.fulfilled, (state, _action) => {
                    state.status = "Fulfilled"
               })
               .addCase(logout.rejected, (state, _action) => {
                    state.status = "Rejected"
               })
               // decode
               .addCase(decodedUser.pending, (state, _action) => {
                    state.status = "Pending"
               })
               .addCase(decodedUser.fulfilled, (state, action) => {
                    state.status = "Fulfilled",
                         state.user = action.payload.data
               })
               .addCase(decodedUser.rejected, (state, _action) => {
                    state.status = "Rejected"
               })
     }
})

export default userSlice.reducer