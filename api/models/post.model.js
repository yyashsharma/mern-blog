import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2022/07/14/12/48/view-7321141_1280.png"
    },
    category: {
        type: String,
        default: 'uncategorized',
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    approved: { 
        type: Boolean,
        default: false 
        },
},
    { timestamps: true }
);

//create a model
export const Post = mongoose.model("Post", postSchema);