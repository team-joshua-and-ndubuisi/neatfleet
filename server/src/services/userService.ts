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

const createUser = async ({
  first_name, 
  last_name,
  email,
  phone,
  hashedPassword, 
} : {
  first_name: string, 
  last_name: string, 
  email: string, 
  phone: string, 
  hashedPassword: string 
}) => {
  try {
    const user = await prismaClient.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email,
        phone,
        password: hashedPassword,

      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export { getUserById, getAllUsers, createUser };
