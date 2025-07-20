// scripts/testUserQueries.ts

import { createUser } from '../src/services/userService';
import prisma from '../src/config/prisma';

const userCreationObj = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

async function main() {
  // Test 1, user creation 
  const user = await createUser(userCreationObj);
  console.log('Created user:', user);
}

main()
  .catch((err) => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
