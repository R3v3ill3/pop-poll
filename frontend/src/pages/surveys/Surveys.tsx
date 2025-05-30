import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from 'lucide-react';
import { SURVEY_STATUSES } from '../../config';

// Types
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
}

const Surveys = () => {
  // Mock data - in a real application, this would come from API calls
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Consumer Technology Preferences',
      description: 'Survey about consumer preferences for various technology products and services.',
      status: 'active',
      currentResponses: 342,
      targetResponses: 600,
      createdAt: '2025-05-10T00:00:00Z',
      startDate: '2025-05-15T00:00:00Z',
      endDate: null,
    },
    {
      id: '2',
      title: 'Political Opinion - June 2025',
      description: 'National political opinion survey for June 2025.',
      status: 'draft',
      currentResponses: 0,
      targetResponses: 2401,
      createdAt: '2025-05-20T00:00:00Z',
      startDate: null,
      endDate: null,
    },
    {
      id: '3',
      title: 'Climate Change Attitudes',
      description: 'Survey on public attitudes toward climate change and environmental policies.',
      status: 'completed',
      currentResponses: 1205,
      targetResponses: 1200,
      createdAt: '2025-04-01T00:00:00Z',
      startDate: '2025-04-10T00:00:00Z',
      endDate: '2025-04-25T00:00:00Z',
    },
    {
      id: '4',
      title: 'Healthcare System Satisfaction',
      description: 'Survey measuring satisfaction with the healthcare system.',
      status: 'paused',
      currentResponses: 567,
      targetResponses: 1000,
      createdAt: '2025-03-15T00:00:00Z',
      startDate: '2025-03-20T00:00:00Z',
      endDate: null,
    },
    {
      id: '5',
      title: 'Education Policy Preferences',
      description: 'Survey on preferences for various education policies.',
      status: 'completed',
      currentResponses: 1850,
      targetResponses: 1800,
      createdAt: '2025-02-10T00:00:00Z',
      startDate: '2025-02-15T00:00:00Z',
      endDate: '2025-03-05T00:00:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>(surveys);

  // Apply filters when search term or status filter changes
  useEffect(() => {
    let result = surveys;
    
    if (searchTerm) {
      result = result.filter(
        survey => survey.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      result = result.filter(survey => survey.status === statusFilter);
    }
    
    setFilteredSurveys(result);
  }, [searchTerm, statusFilter, surveys]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 size={16} className="mr-1 text-green-600" />;
      case 'draft':
        return <Clock size={16} className="mr-1 text-gray-600" />;
      case 'paused':
        return <AlertCircle size={16} className="mr-1 text-yellow-600" />;
      case 'completed':
        return <CheckCircle2 size={16} className="mr-1 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
        <div className="mt-3 sm:mt-0">
          <Link
            to="/surveys/create"
            className="btn btn-primary inline-flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Create New Survey
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <button
            type="button"
            className="btn btn-outline inline-flex items-center"
            onClick={() => setStatusFilter(null)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {statusFilter ? `Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}` : 'All Statuses'}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                onClick={() => setStatusFilter(null)}
              >
                All Statuses
              </button>
              {SURVEY_STATUSES.map((status) => (
                <button
                  key={status.value}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setStatusFilter(status.value)}
                >
                  <span className="inline-flex items-center">
                    {getStatusIcon(status.value)}
                    {status.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Survey list */}
      {filteredSurveys.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 rounded-full bg-primary-100 p-3">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No surveys found</h3>
          <p className="mb-6 text-gray-500">
            {searchTerm || statusFilter
              ? 'Try adjusting your search or filter criteria'
              : "You haven't created any surveys yet"}
          </p>
          <Link to="/surveys/create" className="btn btn-primary">
            Create Your First Survey
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Survey
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Responses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Created
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredSurveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{survey.title}</div>
                      <div className="text-sm text-gray-500">{survey.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {SURVEY_STATUSES.map(
                      (status) =>
                        status.value === survey.status && (
                          <span
                            key={status.value}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}
                          >
                            {getStatusIcon(status.value)}
                            {status.label}
                          </span>
                        )
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {survey.currentResponses} / {survey.targetResponses}
                    </div>
                    {survey.status !== 'draft' && (
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-1.5 rounded-full bg-primary-600"
                          style={{
                            width: `${Math.min(
                              100,
                              (survey.currentResponses / survey.targetResponses) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link to={`/surveys/${survey.id}`} className="text-primary-600 hover:text-primary-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Surveys;