import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['multiple_choice', 'likert', 'open_ended', 'demographic'],
    },
    options: [String],
    required: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

const quotaSchema = mongoose.Schema({
  demographic: {
    type: String,
    required: true,
    enum: ['age', 'gender', 'location'],
  },
  value: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    default: 0,
  },
});

const surveySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['draft', 'active', 'paused', 'completed'],
      default: 'draft',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    questions: [questionSchema],
    targetAudience: {
      geography: {
        type: String,
        enum: ['nationwide', 'state', 'electorate'],
        required: true,
      },
      state: String,
      electorate: String,
    },
    quotas: [quotaSchema],
    distribution: {
      smsPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      dynataPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
    },
    targetResponses: {
      type: Number,
      required: true,
      min: 100,
      default: 2401, // For 2% MoE at 95% CI
    },
    currentResponses: {
      type: Number,
      default: 0,
    },
    marginOfError: {
      type: Number,
      default: 2.0,
    },
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;