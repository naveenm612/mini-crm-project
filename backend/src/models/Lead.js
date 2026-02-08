import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide lead name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Won'],
      default: 'New',
    },

    // ✅ SAVE NAME DIRECTLY
    assignedTo: {
      type: String,
      required: [true, 'Please provide assigned user name'],
      trim: true,
    },

    // ✅ SAVE COMPANY NAME DIRECTLY
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hide soft deleted leads
leadSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

export default mongoose.model('Lead', leadSchema);
