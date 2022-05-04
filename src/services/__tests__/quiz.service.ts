import { quizService } from '@services/quiz.service';
import { createDummy } from '@test/user';

describe('addQuiz', () => {
  it('should resolve with true', async () => {
    const { user } = await createDummy();

    const title = 'test quiz';

    const response = await quizService.addQuiz({ title, createdBy: user.id });

    expect(response.title).toEqual(title);
  });
});
