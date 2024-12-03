import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"],
        },
        done: {
            type: Boolean,
            required: [true, "Status of todo is required!"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Todo", todoSchema,'todos');