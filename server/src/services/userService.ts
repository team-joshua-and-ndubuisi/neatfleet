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

export default { getUserById, getAllUsers, createUser };
