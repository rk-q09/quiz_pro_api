import mongoose from 'mongoose';

interface QuizAttr {
  title: string;
  questions: mongoose.Types.Subdocument;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

export type CreateQuizDTO = Omit<QuizAttr, 'questions' | 'createdAt'>;

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        content: { type: String, required: true },
        choices: { type: Array, required: true },
        correctAnswer: { type: Number, required: true },
        _id: false,
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Quiz = mongoose.model<QuizAttr>('Quiz', quizSchema);

export { Quiz, QuizAttr };
