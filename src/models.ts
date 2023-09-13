import mongoose, { Schema, Types } from "mongoose";

interface User {
    email: string;
    name: string;
}

interface Comment {
    authorId: Types.ObjectId;
    createdAt: Date;
    content: string;
}

interface Post {
    authorId: Types.ObjectId;
    createdAt: Date;
    content: string;
    comments: Comment[];
}

const UserSchema = new Schema<User>({
    name: String,
    email: String
});

const PostSchema = new Schema<Post>({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date,
    content: String,
    comments: [{
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: Date,
        content: String,
    }]
});

export const User = mongoose.model("User", UserSchema);
export const Post = mongoose.model("Post", PostSchema);
