

export interface IError {
     success: false,
     message: string
}
export interface IRejectType {
     message: string
}
export interface IUser {
     _id: string,
     username: string
}
export interface ISignupAndLoginResponse {
     success: true,
     message: string,
     data: {
          _id: string,
          username: string
     }
}
export interface IAuthState {
     status: "Idle" | "Pending" | "Rejected" | "Fulfilled",
     error: null | IError,
     user: IUser | null
}