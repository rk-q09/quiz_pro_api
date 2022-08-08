import { faker } from '@faker-js/faker';

export function quizGenerator() {
  return {
    title: faker.lorem.word(),
  }
};

export function questionGenerator() {
  const choices1 = faker.lorem.word();
  const choices2 = faker.lorem.word();
  const choices3 = faker.lorem.word();
  const choices4 = faker.lorem.word();
  const choices = [...choices1, choices2, choices3, choices4];

  return {
      content: faker.lorem.word(),
      choices,
      answer: 1
  }
};
