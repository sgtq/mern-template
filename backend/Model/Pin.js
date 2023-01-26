import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const pinSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            min: 3,
        },
        description: {
            type: String,
            unique: true,
            min: 5,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        photo: {
            type: String,
            default: "",
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        collection: `${process.env.MONGO_PREFIX}-pins`,
    }
);

export default mongoose.model("Pin", pinSchema);
