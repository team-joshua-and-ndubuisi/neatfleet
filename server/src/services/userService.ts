import { NextFunction } from "express";
import prismaClient from "../config/prisma"; // Ensure your db connection is set up correctly

const getUserById = async (id: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Error fetching user with ID ${id}: ${error.message}`);
  }
};

const getAllUsers = async () => {
  try {
    const users = await prismaClient.user.findMany();
    return users;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const searchUsers = async ({
  firstName,
  lastName,
  email,
  page = 1,
  limit = 10,
}: {
  firstName?: string;
  lastName?: string;
  email: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const users = await prismaClient.user.findMany({
      orderBy: [{ last_name: "asc" }, { first_name: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          { first_name: { contains: firstName, mode: "insensitive" } },
          { last_name: { contains: lastName, mode: "insensitive" } },
          { email: { contains: email, mode: "insensitive" } },
        ],
      },
    });

    return users;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

const createUser = async (name: string, email: string) => {
  try {
    const user = await prismaClient.user.create({
      data: {
        first_name: name,
        email,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error: any) {
    throw new Error(
      `Error fetching user with email ${email}: ${error.message}`
    );
  }
};

export default {
  getUserById,
  getAllUsers,
  createUser,
  searchUsers,
  findUserByEmail,
};
