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
        timestamps: true, // Ensures only schema-defined fields are saved in the database
    }
);

export default mongoose.model("Todo", todoSchema);