import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  BarChart2,
  Users,
  Calendar,
  MapPin,
  Target,
} from 'lucide-react';
import { SURVEY_STATUSES } from '../../config';

interface Survey {
  id: string;
  title: string;
  description: string;
  status: string;
  currentResponses: number;
  targetResponses: number;
  createdAt: string;
  startDate: string | null;
  endDate: string | null;
  questions: Array<{
    id: string;
    text: string;
    type: string;
    options?: string[];
  }>;
  targetAudience: {
    geography: string;
    state?: string;
    electorate?: string;
  };
  quotas: Array<{
    demographic: string;
    value: string;
    target: number;
    current: number;
  }>;
  distribution: {
    smsPercentage: number;
    dynataPercentage: number;
  };
}

const SurveyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock API call - replace with actual API call in production
    const fetchSurvey = async () => {
      try {
        // Simulated API response
        const mockSurvey: Survey = {
          id: '1',
          title: 'Consumer Technology Preferences',
          description: 'Survey about consumer preferences for various technology products and services.',
          status: 'active',
          currentResponses: 342,
          targetResponses: 600,
          createdAt: '2025-05-10T00:00:00Z',
          startDate: '2025-05-15T00:00:00Z',
          endDate: null,
          questions: [
            {
              id: '1',
              text: 'How often do you purchase new technology products?',
              type: 'multiple_choice',
              options: ['Monthly', 'Quarterly', 'Annually', 'Rarely'],
            },
            {
              id: '2',
              text: 'Rate your satisfaction with your current smartphone',
              type: 'likert',
              options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
            },
            {
              id: '3',
              text: 'What features are most important to you when choosing a new device?',
              type: 'open_ended',
            },
          ],
          targetAudience: {
            geography: 'nationwide',
          },
          quotas: [
            {
              demographic: 'age',
              value: '18-24',
              target: 100,
              current: 45,
            },
            {
              demographic: 'gender',
              value: 'female',
              target: 300,
              current: 180,
            },
          ],
          distribution: {
            smsPercentage: 60,
            dynataPercentage: 40,
          },
        };

        setSurvey(mockSurvey);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch survey details');
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              {error || 'Survey not found'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const statusConfig = SURVEY_STATUSES.find(s => s.value === status);
    return statusConfig?.color || 'bg-gray-200 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play size={16} className="mr-1" />;
      case 'paused':
        return <Pause size={16} className="mr-1" />;
      case 'completed':
        return <CheckCircle2 size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/surveys"
          className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Surveys
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{survey.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(survey.status)}`}>
              {getStatusIcon(survey.status)}
              {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Responses</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">
                {survey.currentResponses}
              </h3>
            </div>
            <div className="rounded-full bg-primary-100 p-3 text-primary-600">
              <Users size={20} />
            </div>
          </div>
          <div className="bg-primary-50 px-5 py-1.5">
            <p className="text-xs font-medium text-primary-700">
              Target: {survey.targetResponses}
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">
                {Math.round((survey.currentResponses / survey.targetResponses) * 100)}%
              </h3>
            </div>
            <div className="rounded-full bg-secondary-100 p-3 text-secondary-600">
              <Target size={20} />
            </div>
          </div>
          <div className="bg-secondary-50 px-5 py-1.5">
            <p className="text-xs font-medium text-secondary-700">
              {survey.targetResponses - survey.currentResponses} responses needed
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Geography</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {survey.targetAudience.geography.charAt(0).toUpperCase() + 
                 survey.targetAudience.geography.slice(1)}
              </h3>
            </div>
            <div className="rounded-full bg-accent-100 p-3 text-accent-600">
              <MapPin size={20} />
            </div>
          </div>
          <div className="bg-accent-50 px-5 py-1.5">
            <p className="text-xs font-medium text-accent-700">
              {survey.targetAudience.state || survey.targetAudience.electorate || 'All regions'}
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {survey.startDate
                  ? `${Math.ceil(
                      (new Date().getTime() - new Date(survey.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )} days`
                  : 'Not started'}
              </h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <Calendar size={20} />
            </div>
          </div>
          <div className="bg-green-50 px-5 py-1.5">
            <p className="text-xs font-medium text-green-700">
              {survey.startDate
                ? `Started ${new Date(survey.startDate).toLocaleDateString()}`
                : 'Draft'}
            </p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Questions */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-medium text-gray-900">Questions</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {survey.questions.map((question, index) => (
                <div key={question.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {index + 1}. {question.text}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Type: {question.type.replace('_', ' ').charAt(0).toUpperCase() + 
                              question.type.slice(1).replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  {question.options && (
                    <div className="mt-3">
                      <p className="mb-2 text-sm font-medium text-gray-700">Options:</p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="rounded-md border border-gray-200 px-3 py-2 text-sm"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quotas */}
        <div>
          <div className="card">
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-medium text-gray-900">Quotas</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {survey.quotas.map((quota) => (
                <div key={quota.demographic + quota.value} className="p-5">
                  <div>
                    <p className="font-medium text-gray-900">
                      {quota.demographic.charAt(0).toUpperCase() + quota.demographic.slice(1)}:{' '}
                      {quota.value}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {quota.current} / {quota.target}
                        </span>
                        <span className="font-medium text-gray-900">
                          {Math.round((quota.current / quota.target) * 100)}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="relative h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="absolute left-0 top-0 h-2 rounded-full bg-primary-600"
                            style={{
                              width: `${Math.min(
                                100,
                                (quota.current / quota.target) * 100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution */}
          <div className="card mt-6">
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-medium text-gray-900">Distribution</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">SMS Panel</span>
                    <span className="font-medium text-gray-900">
                      {survey.distribution.smsPercentage}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="relative h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-primary-600"
                        style={{ width: `${survey.distribution.smsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Dynata Panel</span>
                    <span className="font-medium text-gray-900">
                      {survey.distribution.dynataPercentage}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="relative h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-accent-600"
                        style={{ width: `${survey.distribution.dynataPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;