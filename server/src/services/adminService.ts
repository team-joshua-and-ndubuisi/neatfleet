import prismaClient from "../config/prisma";

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

export {createAdmin};