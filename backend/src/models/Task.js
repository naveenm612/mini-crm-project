import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide task title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    lead: {
      type: String,
      required: [true, 'Please provide lead name'],
      trim: true,
    },
    assignedTo: {
      type: String,
      required: [true, 'Please provide assigned user'],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, 'Please provide due date'],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
