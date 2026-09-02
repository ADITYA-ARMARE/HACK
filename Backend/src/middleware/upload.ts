import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import crypto from "crypto";
import cloudinary from "../services/storage.service.ts";

//THIS CODE I TAKE FROM README OF MULTER STORAGE CLOUDINARY
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // generate random hex string synchronously
    const filename = crypto.randomBytes(12).toString("hex");

    return {
      folder: "FundusImages",                
      allowed_formats: ["png", "jpg", "jpeg"],
      public_id: filename,                // unique name
    };
  },
});

const upload = multer({ storage });

export default upload;
