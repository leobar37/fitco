import { input, password as passwordCli, select } from '@inquirer/prompts';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { createUserDtoSchema } from '../src/domain/dto/user';
const client = new PrismaClient();

export const getUserInfo = async () => {
  const name = await input({
    message: 'Name:',
  });
  const email = await input({
    message: 'Email:',
  });

  const password = await passwordCli({
    message: 'Password:',
    mask: '😛',
  });

  const role = await select({
    message: 'Rol:',
    choices: [
      {
        value: Role.ADMIN,
        name: 'administrator',
      },
      {
        value: Role.USER,
        name: 'user',
      },
    ],
  });
  return {
    name,
    email,
    password,
    role,
    verified: true
  };
};

const main = async () => {
  const userInfo = await getUserInfo();
  console.log('user info', userInfo);
  if (!createUserDtoSchema.parseAsync(userInfo)) {
    throw Error('Error when creating');
  }

  const password = await bcrypt.hash(userInfo.password , 10)
  const createdUser = await client.user.create({
    data: {
      email: userInfo.email,
      name: userInfo.name,
      password: password,
      role: userInfo.role,
    },
  });
  console.log('user', createdUser);
};

main().catch((err) => {
  console.log('err', err);
});
