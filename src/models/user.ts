import mongoose from 'mongoose';
import { Password } from '@utils/password';

interface UserAttr {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    postedQuizzes: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.model<UserAttr>('User', userSchema);

export { User, UserAttr };
