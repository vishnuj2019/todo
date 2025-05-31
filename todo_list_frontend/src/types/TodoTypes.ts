import { IError } from "./AuthTypes"

export interface ITodo {
     _id?: string,
     title: string,
     status: string,
     priority: string,
     description?: string
     createdAt?: string
}

export interface ITodoSearchOptions {
     searchTerm: string,
     page: number,
     limit: number
}
export interface ITodoState {
     status: "Idle" | "Pending" | "Rejected" | "Fulfilled",
     error: IError | null,
     todos: ITodo[],
     totalCounts: number,
     count: number

}

export interface ITodoResponse {
     success: boolean,
     message: string,
     totalCounts: number,
     count: number,
     data: ITodo[]
}

export interface IAdd_Update_Get_TodoResponse {
     success: boolean,
     message: string,
     data: ITodo
}