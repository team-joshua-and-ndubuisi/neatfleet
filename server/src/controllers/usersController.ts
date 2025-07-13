const asyncHandler = require("express-async-handler");
// const User = require("../models/user");
const logger = require("../config/logger");
import { Request, Response, NextFunction } from "express";
import { ExtendedErrorT } from "../types/error";
import prisma from "../config/prisma";
import userService from "../services/userService";

// @desc    Search users
// @route   GET /search
// @access  Private
const searchUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { query } = req.query;
    let { firstName, lastName, email, page, limit } = req.query;

    if (!req.query || (!firstName && !lastName && !email)) {
      const error: ExtendedErrorT = new Error("Search query is required");
      error.statusCode = 400;
      return next(error);
    }

    const targetFirstName = firstName ? String(firstName) : "";
    const targetLastName = lastName ? String(lastName) : "";
    const targetEmail = email ? String(email) : "";

    const currentPage = !Number(page) ? 1 : Number(page);
    const queryLimit = !Number(limit) ? 10 : Number(limit);

    const users = await userService.searchUsers({
      firstName: targetFirstName,
      lastName: targetLastName,
      email: targetEmail,
      page: currentPage,
      limit: queryLimit,
    });

    res.status(200).json({ users });
  }
);

// @desc    Read all users
// @route   GET /users
// @access  Private
const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  }
);

// @desc    Read a single user
// @route   GET /users/:userId
// @access  Private
const getSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      logger.warn(`User not found with id ${req.params.userId}`);
      const error: ExtendedErrorT = new Error("No user found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ user });
  }
);

export { searchUsers, getUsers, getSingleUser };
