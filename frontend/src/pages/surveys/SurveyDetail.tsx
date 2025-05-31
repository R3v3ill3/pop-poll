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

const SurveyDetail = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`/api/surveys/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch survey');
        }
        const data = await response.json();
        setSurvey(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!survey) return <div>Survey not found</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case SURVEY_STATUSES.ACTIVE:
        return 'text-green-500';
      case SURVEY_STATUSES.PAUSED:
        return 'text-yellow-500';
      case SURVEY_STATUSES.COMPLETED:
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case SURVEY_STATUSES.ACTIVE:
        return <Play className="w-5 h-5" />;
      case SURVEY_STATUSES.PAUSED:
        return <Pause className="w-5 h-5" />;
      case SURVEY_STATUSES.COMPLETED:
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/surveys" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Surveys
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{survey.title}</h1>
          <div className={`flex items-center ${getStatusColor(survey.status)}`}>
            {getStatusIcon(survey.status)}
            <span className="ml-2 font-medium">{survey.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <BarChart2 className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Responses</p>
              <p className="text-xl font-semibold">{survey.responseCount}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Target Participants</p>
              <p className="text-xl font-semibold">{survey.targetParticipants}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="text-xl font-semibold">
                {new Date(survey.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <MapPin className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-xl font-semibold">{survey.location}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700">{survey.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Target Demographics</h2>
          <div className="flex flex-wrap gap-3">
            {survey.targetDemographics.map((demographic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {demographic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Survey Goals</h2>
          <div className="space-y-4">
            {survey.goals.map((goal, index) => (
              <div key={index} className="flex items-start">
                <Target className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                <p className="text-gray-700">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetail;