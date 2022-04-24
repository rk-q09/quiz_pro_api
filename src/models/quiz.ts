import mongoose from 'mongoose';

interface QuizAttr {
  title: string;
  questions: mongoose.Types.Subdocument;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

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

export { Quiz };
