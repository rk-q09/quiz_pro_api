import request from 'supertest';
import { app } from '../../app';

import { userGenerator, createDummyUser } from '@test/data/user';

describe('POST /users/signup', () => {
  it('should return 201', async () => {
    const { email, password, username } = userGenerator();

    await request(app)
      .post('/users/signup')
      .send({ email, password, username })
      .expect(201);
  });

  it('should return validation error messages', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'noemail',
      username: 'toolongforusername',
      password: 'pw',
    });

    expect(res.body.errors.length).toEqual(3);
  });

  it('should return bad request error message', async () => {
    const { email, password, username } = userGenerator();

    await request(app)
      .post('/users/signup')
      .send({ email, password, username })
      .expect(201);

    const res = await request(app)
      .post('/users/signup')
      .send({ email, password, username })
      .expect('Content-Type', /json/);

    expect(res.body.errors[0].message).toEqual(
      '既に使用されているメールアドレスです'
    );
  });
});

describe('GET /users/auth/me', () => {
  it('should return 200', async () => {
    const { user, token } = await createDummyUser();
    const res = await request(app)
      .get('/users/auth/me')
      .set('authorization', token);

    expect(res.status).toEqual(200);
    expect(res.body.username).toMatch(user.username);
  });
});
