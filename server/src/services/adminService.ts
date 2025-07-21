import prismaClient from "../config/prisma";
import {getUserIdByEmail} from "./userService";

const createAdmin = async (userId: string) => {
  try {
    const admin = await prismaClient.admin.create({
        data: {
        user_id: userId,
        },
    });
    return admin;
  } catch (error: any) {
    throw new Error(`Error creating admin: ${error.message}`);
  }
}


const setUserAsAdmin = async (email: string) => {
  // 1st check if user exist, if not throw an error
  // if user exist, use user id to create an admin row based on user id
  try {
    const userID = await getUserIdByEmail(email);
    if (!userID) {
      throw new Error(`User with email ${email} not found.`);
    }

    const admin = await createAdmin(userID);

    return admin;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error setting user as admin, user email ${email}: ${error.message}`);
    }
    throw new Error(`Unknown error deactivating user with email ${email}`);
  }
}

const isAdmin = async (email: string) => {
  try {
    const userID = await getUserIdByEmail(email);
    if (!userID) {
      throw new Error(`User with email ${email} not found.`);
    }

    // query with userID, if return result return true, otherwise return false
    const exists = await prismaClient.admin.findUnique({
        where: {user_id: userID}
    });

    return exists !== null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error setting user as admin, user email ${email}: ${error.message}`);
    }
    throw new Error(`Unknown error deactivating user with email ${email}`);
  }    
}

export {createAdmin, setUserAsAdmin, isAdmin};