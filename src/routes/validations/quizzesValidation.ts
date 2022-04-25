import type { Schema } from 'express-validator';

const createQuizSchema: Schema = {
  title: {
    isLength: {
      errorMessage: '1~20文字以内で入力してください',
      options: { min: 1, max: 15 },
    },
  },
};

export { createQuizSchema };
