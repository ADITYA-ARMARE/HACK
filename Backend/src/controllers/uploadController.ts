import type {Request,Response} from "express"
import fundusmodel from "../models/fundusModel.ts";





// Create Post
export const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageUrl: string = req.file.path;

    const userPost = await fundusmodel.create({ imageUrl });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: userPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// See Posts
export const seePosts = async (req: Request, res: Response) => {
  try {
    const posts = await fundusmodel.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({ success: false, message: "No posts found" });
    }

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

