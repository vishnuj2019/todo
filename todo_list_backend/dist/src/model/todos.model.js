import { model, Schema } from "mongoose";
const todos_schema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
});
const todo_model = model('todos', todos_schema);
export default todo_model;
//# sourceMappingURL=todos.model.js.map