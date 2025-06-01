import { Schema, model } from 'mongoose';
const user_schema = new Schema({
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
});
const user_model = model("users", user_schema);
export default user_model;
//# sourceMappingURL=user.model.js.map