import request from 'supertest';
import { app } from '../../app';
 
import { createDummyUser } from '@test/data/user';
import { quizGenerator, questionGenerator } from '@test/data/quiz';

describe('POST /quizzes', () => {
  it('should return 201 & create a quiz', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    const res = await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);
      
    expect(res.body.title).toMatch(title);
  });

  it('should return 401 without auth', async () => {
    const { user } = await createDummyUser();
    const { title } = quizGenerator();
    
    const res = await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
    
    expect(res.status).toEqual(401);
  });
});

describe('GET /quizzes/:quizId', () => {
  it('should return a quiz', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    const createdQuizResponse = await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);

    const quizId = createdQuizResponse.body.id;

    const res = await request(app)
      .get(`/quizzes/${quizId}`)
      .set('authorization', token);

    expect(res.body.title).toMatch(title);
  });
});

describe('POST /quizzes/:quizId', () => {
  it('should return 201 & add a question', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    const createdQuizResponse = await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);

    const quizId = createdQuizResponse.body.id;

    const { content, choices, answer } = questionGenerator();

    const res = await request(app)
      .post(`/quizzes/${quizId}`)
      .send({
        content,
        choices,
        answer
      })
      .set('authorization', token);

    expect(res.body.questions.length).toEqual(1);
  });
});

describe('DELETE /quizzes/:quizId', () => {
  it('should return 200 & delete a quiz', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    const createdQuizResponse = await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);

    const quizId = createdQuizResponse.body.id;

    const res = await request(app)
      .delete(`/quizzes/${quizId}`)
      .set('authorization', token);

    expect(res.body.id).toMatch(quizId);
  });
});

describe('GET /quizzes/count', () => {
  it('should return number of quizzes', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);

    const res = await request(app)
      .get('/quizzes/count');

    expect(res.body.count).toEqual(1);
  });
});

describe('GET /quizzes/search/count', () => {
  it('should return number of matched quizzes', async () => {
    const { user, token } = await createDummyUser();
    const { title } = quizGenerator();
    
    await request(app)
      .post('/quizzes')
      .send({
        userId: user.id,
        title
      })
      .set('authorization', token);
    
    const res = await request(app)
      .get(`/quizzes/search/count?search=${title}`);

    expect(res.body.count).toEqual(1);
  });
});















