import mongoose from 'mongoose';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.PENDING,
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.MEDIUM,
  },
  dueDate: {
    type: Date,
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema); 