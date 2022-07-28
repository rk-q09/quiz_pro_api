import { quizService } from '@services/quiz.service';
import { createDummyUser } from '@test/data/user';

describe('addQuiz', () => {
  it('should resolve with true', async () => {
    const { user } = await createDummyUser();

    const title = 'test quiz';

    const response = await quizService.addQuiz({ title, createdBy: user.id });

    expect(response.title).toEqual(title);
  });
});
