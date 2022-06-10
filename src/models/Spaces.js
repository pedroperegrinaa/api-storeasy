import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description : {
            type: String,
            required: true,
        },
        thumbnail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
        }
        
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Spaces", schema);

