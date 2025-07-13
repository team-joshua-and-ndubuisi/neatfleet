const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
import { issueJWT } from "../lib/issueJWT";
const { logger } = require("../config/logger");

import { NextFunction, Request, Response } from "express";

import userService from "../services/userService";

import { ExtendedErrorT } from "../types/error";

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;
    logger.info("Attempting to register user", { firstName, lastName, email });

    // const userExists = await User.findUnique({ where: { email } });
    const userExists = await userService.findUserByEmail(email);

    if (userExists) {
      logger.warn(
        `${firstName} ${lastName} is already registered with email ${email}`
      );
      const error: ExtendedErrorT = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = await userService.createUser({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      is_admin: false,
    });

    if (!user) {
      logger.error(`Registration failed for ${firstName} ${lastName}`);
      const error: ExtendedErrorT = new Error("User registration failed");
      error.statusCode = 400;
      return next(error);
    }

    const tokenData = issueJWT(user);

    logger.info(`${firstName} ${lastName} has been successfully registered`);

    return res.status(201).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin,
      },
      token: tokenData.token,
      expiresIn: tokenData.expires,
    });
  }
);

// @desc    Login user
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    logger.info(`Attempting to login user with ${email}...`);

    const user = await userService.findUserByEmail(email);
    // const user = await User.findUnique({ where: { email } });

    if (!user) {
      logger.warn(`No user exists with email ${email}`);
      const error: ExtendedErrorT = new Error("No user exists with that email");
      error.statusCode = 404;
      return next(error);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      logger.warn(`Incorrect password for user ${email}`);
      const error: ExtendedErrorT = new Error(
        "Incorrect password, please try again"
      );
      error.statusCode = 401;
      return next(error);
    }

    const tokenData = issueJWT(user);

    logger.info(`${user.first_name} ${user.last_name} has been logged in`);

    return res.status(200).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin,
      },
      token: tokenData.token,
      expiresIn: tokenData.expires,
    });
  }
);

// @desc    Get user profile
// @route   GET /profile
// @access  Private
const userProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user.id;
    logger.info(`Attempting to find user with id ${userId}...`);

    const user = await userService.getUserProfile(userId);

    if (!user) {
      logger.warn(`No user found with id ${userId}`);
      const error: ExtendedErrorT = new Error("No user found");
      error.statusCode = 404;
      return next(error);
    }

    logger.info(`User found`, user);
    return res.status(200).json({ user });
  }
);

// @desc    Edit user profile
// @route   PUT /profile
// @access  Private
const editProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      const error: ExtendedErrorT = new Error("User not authenticated");
      error.statusCode = 401;
      return next(error);
    }
    //@ts-expect-error user will need to be authenticated before this route is hit id will exist
    const userId = req.user.id;

    const { firstName, lastName, email, currentPassword, newPassword } =
      req.body;

    const user = await userService.getUserById(userId);

    if (!user) {
      logger.warn(`No user found with id ${userId}`);
      const error: ExtendedErrorT = new Error("No user found");
      error.statusCode = 404;
      return next(error);
    }

    if (firstName) user.first_name = firstName;
    if (lastName) user.last_name = lastName;
    if (email) user.email = email;

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        const error: ExtendedErrorT = new Error(
          "Both currentPassword and newPassword are required to change password"
        );
        error.statusCode = 400;
        return next(error);
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        const error: ExtendedErrorT = new Error(
          "Current password is incorrect"
        );
        error.statusCode = 401;
        return next(error);
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await userService.editProfile(userId, {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    });

    logger.info(`User profile updated for id ${userId}`);

    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin,
      },
      message: "Profile updated successfully",
    });
  }
);

// @desc    Delete user profile
// @route   DELETE /profile
// @access  Private
const deleteProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-expect-error user will need to be authenticated before this route is hit _id will exist
    const userId = req.user.id;

    const user = await userService.getUserById(userId);

    if (!user) {
      logger.warn(`No user found with id ${userId}`);
      const error: ExtendedErrorT = new Error("No user found");
      error.statusCode = 404;
      return next(error);
    }

    await userService.deleteUserById(userId);

    logger.info(`User deleted with id ${userId}`);

    res.status(200).json({ message: "User deleted successfully" });
  }
);

export { registerUser, loginUser, userProfile, editProfile, deleteProfile };
