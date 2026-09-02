import {Router} from "express"
import { createPost,seePosts } from "../controllers/uploadController.ts";
import upload from "../middleware/upload.ts";

const router = Router();

router.post("/create",upload.single("imageUrl"),createPost);
router.get("/posts",seePosts);

export default router;
