import {Router} from "express"
import { createuser, logined ,logout,forgotPassword,resetPassword,htMl} from "../controllers/authController.ts";
import { isloggined } from "../middleware/isloggined.ts";

const router = Router();

router.post("/createuser",createuser);
router.post("/check",isloggined,logined);
router.get("/logout",logout);
router.post('/forgot-password',          forgotPassword);
router.post('/reset-password/:token',    resetPassword);
router.get("/reset-password/:token",htMl);

export default router;
