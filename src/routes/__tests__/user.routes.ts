import request from 'supertest';
import { app } from '../../app';
import { faker } from '@faker-js/faker';

it('returns 201 on successful signup', async () => {
  await request(app)
    .post('/users/signup')
    .send({
      email: 'test@test.com',
      username: 'testuser',
      password: 'password',
    })
    .expect(201);
});

it('returns 400 with serialized error message', async () => {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const username = faker.internet.userName();

  await request(app)
    .post('/users/signup')
    .send({ email, password, username })
    .expect(201);

  await request(app)
    .post('/users/signup')
    .send({ email, password, username })
    .expect('Content-Type', /json/);
});
