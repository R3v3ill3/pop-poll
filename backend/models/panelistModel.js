import mongoose from 'mongoose';

const panelistSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: function() {
        return this.type === 'sms';
      },
      unique: function() {
        return this.type === 'sms';
      },
    },
    dynataId: {
      type: String,
      required: function() {
        return this.type === 'dynata';
      },
      unique: function() {
        return this.type === 'dynata';
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['sms', 'dynata'],
    },
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
    },
    location: {
      postcode: String,
      state: String,
      electorate: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    consentStatus: {
      type: Boolean,
      default: false,
    },
    consentDate: Date,
    participationHistory: [
      {
        surveyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Survey',
        },
        date: Date,
        completed: Boolean,
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'opted_out'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Panelist = mongoose.model('Panelist', panelistSchema);

export default Panelist;