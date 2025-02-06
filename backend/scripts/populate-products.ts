import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { select } from '@inquirer/prompts';
import { moneyHelper } from '../src/lib/money-helper';
const prisma = new PrismaClient();

export const getFakeProduct = (userId: string) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: moneyHelper.toCents(faker.number.int({ min: 100, max: 10000 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past(),
    deletedAt: Math.random() > 0.9 ? faker.date.recent() : null,
    userId: userId,
  };
};

const getUser = async () => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });
  const userId = await select({
    message: 'Select the user',
    choices: users.map((user) => {
      return {
        value: user.id,
        name: user.email,
      };
    }),
  });

  return users.find((user) => user.id === userId);
};
const main = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error('bad user');
  }
  for await (const _ of Array.from({ length: 15 }).fill(null)) {
    const pr = await prisma.product.create({
      data: getFakeProduct(user?.id),
    });
    console.log('Product:', pr.name);
  }
};

main().catch((err) => {
  console.log('err', err);
});
