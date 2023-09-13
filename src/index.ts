import "dotenv/config";
import mongoose from "mongoose";
import { User, Post } from "./models";

async function app() {
    if (!process.env.MONGO_CONNECTION_STRING) {
        throw new Error("No connection string!");
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("connected");

    const omer = new User({
        email: "omer@gmail",
        name: "omer"
    });

    await omer.save();

    const firstPost = new Post({
        authorId: omer._id,
        createdAt: new Date(),
        content: "hello world"
    });

    await firstPost.save();

    const posts = await Post.find({}, undefined, { populate: "authorId" }).exec();
    console.log(posts);

    await mongoose.disconnect();
}

app();
