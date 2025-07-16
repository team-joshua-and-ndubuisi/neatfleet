import { Router } from "express";

import {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
} from "../controllers/authController";

const {
  first_nameValidator,
  last_nameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
} = require("../middleware/inputValidators");
const { isAuth } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/register",
  first_nameValidator,
  last_nameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
  registerUser
);
router.post(
  "/login",
  emailValidator,
  passwordValidator,
  checkValidations,
  loginUser
);
router.get("/profile", isAuth, userProfile);

router.put(
  "/profile",
  isAuth,
  first_nameValidator,
  last_nameValidator,
  emailValidator,
  checkValidations,
  editProfile
);
router.delete("/profile", isAuth, deleteProfile);

export default router;
