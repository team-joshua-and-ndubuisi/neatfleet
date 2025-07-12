import { Router } from "express";

import {
  registerUser,
  loginUser,
  userProfile,
  editProfile,
  deleteProfile,
} from "../controllers/authController";

const {
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  passwordValidator,
  checkValidations,
} = require("../middleware/inputValidators");
const { isAuth } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/register",
  firstNameValidator,
  lastNameValidator,
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
  firstNameValidator,
  lastNameValidator,
  emailValidator,
  checkValidations,
  editProfile
);
router.delete("/profile", isAuth, deleteProfile);

export default router;
