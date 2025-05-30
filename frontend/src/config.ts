// Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Constants
export const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'likert', label: 'Likert Scale' },
  { value: 'open_ended', label: 'Open Ended' },
  { value: 'demographic', label: 'Demographic' }
];

export const SURVEY_STATUSES = [
  { value: 'draft', label: 'Draft', color: 'bg-gray-200 text-gray-800' },
  { value: 'active', label: 'Active', color: 'bg-green-200 text-green-800' },
  { value: 'paused', label: 'Paused', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-200 text-blue-800' }
];

export const GEOGRAPHY_OPTIONS = [
  { value: 'nationwide', label: 'Nationwide' },
  { value: 'state', label: 'State' },
  { value: 'electorate', label: 'Electorate' }
];

export const STATE_OPTIONS = [
  { value: 'nsw', label: 'New South Wales' },
  { value: 'vic', label: 'Victoria' },
  { value: 'qld', label: 'Queensland' },
  { value: 'wa', label: 'Western Australia' },
  { value: 'sa', label: 'South Australia' },
  { value: 'tas', label: 'Tasmania' },
  { value: 'act', label: 'Australian Capital Territory' },
  { value: 'nt', label: 'Northern Territory' }
];

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' }
];

// Age brackets for quotas
export const AGE_BRACKETS = [
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45-54', label: '45-54' },
  { value: '55-64', label: '55-64' },
  { value: '65+', label: '65+' }
];