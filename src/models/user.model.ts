import mongoose from 'mongoose';
import { hash, compare } from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await hash(this.password, 12);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 