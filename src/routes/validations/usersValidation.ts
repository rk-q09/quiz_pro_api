import type { Schema } from 'express-validator';

const signUpSchema: Schema = {
  username: {
    isLength: {
      errorMessage: '4~15文字以内で入力して下さい',
      options: { min: 4, max: 15 },
    },
  },
  email: {
    isEmail: {
      bail: true,
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      errorMessage: '8~15文字以内で入力して下さい',
      options: { min: 8, max: 15 },
    },
  },
};

const signInSchema: Schema = {
  email: {
    isEmail: {
      bail: true,
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      errorMessage: '4~15文字以内で入力して下さい',
      options: { min: 8, max: 15 },
    },
  },
};

export { signUpSchema, signInSchema };
