import { Schema, model } from 'mongoose'
import { IUser } from '../types/user'


const user_schema = new Schema<IUser>({
     username: {
          type: String,
          trim: true,
          required: [true, "username is required"],
          cast: false,
          unique: true
     },
     password: {
          type: String,
          trim: true,
          required: [true, "password is required"]
     },

     todos: [
          {
               ref: "todos",
               type: Schema.Types.ObjectId,
          }
     ],
})

const user_model = model("users", user_schema)

export default user_model