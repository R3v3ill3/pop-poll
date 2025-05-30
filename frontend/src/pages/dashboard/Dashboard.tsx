import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Mock data - in a real application, this would come from API calls
  const [stats, setStats] = useState({
    activeSurveys: 3,
    completedSurveys: 12,
    totalPanelists: 2450,
    activeRespondents: 342,
    averageCompletionRate: 84,
  });

  const [recentSurveys, setRecentSurveys] = useState([
    {
      id: '1',
      title: 'Consumer Technology Preferences',
      status: 'active',
      responses: 342,
      target: 600,
      startDate: '2025-05-15T00:00:00Z',
    },
    {
      id: '2',
      title: 'Political Opinion - June 2025',
      status: 'draft',
      responses: 0,
      target: 2401,
      startDate: null,
    },
    {
      id: '3',
      title: 'Climate Change Attitudes',
      status: 'completed',
      responses: 1205,
      target: 1200,
      startDate: '2025-04-10T00:00:00Z',
    },
  ]);

  // Chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'SMS Responses',
        data: [450, 380, 520, 410, 490, 534],
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
      },
      {
        label: 'Online Responses',
        data: [320, 350, 480, 390, 430, 502],
        backgroundColor: 'rgba(124, 58, 237, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Responses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let color = '';
    let icon = null;
    
    switch (status) {
      case 'active':
        color = 'bg-green-100 text-green-800';
        icon = <CheckCircle2 size={14} className="mr-1" />;
        break;
      case 'draft':
        color = 'bg-gray-100 text-gray-800';
        icon = <Clock size={14} className="mr-1" />;
        break;
      case 'paused':
        color = 'bg-yellow-100 text-yellow-800';
        icon = <AlertCircle size={14} className="mr-1" />;
        break;
      case 'completed':
        color = 'bg-blue-100 text-blue-800';
        icon = <CheckCircle2 size={14} className="mr-1" />;
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0">
          <Link
            to="/surveys/create"
            className="btn btn-primary"
          >
            Create New Survey
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Surveys</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{stats.activeSurveys}</h3>
            </div>
            <div className="rounded-full bg-primary-100 p-3 text-primary-600">
              <FileText size={20} />
            </div>
          </div>
          <div className="bg-primary-50 px-5 py-1.5">
            <p className="text-xs font-medium text-primary-700">
              {stats.completedSurveys} surveys completed overall
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Panelists</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalPanelists}</h3>
            </div>
            <div className="rounded-full bg-secondary-100 p-3 text-secondary-600">
              <Users size={20} />
            </div>
          </div>
          <div className="bg-secondary-50 px-5 py-1.5">
            <p className="text-xs font-medium text-secondary-700">
              {stats.activeRespondents} currently active
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">{stats.averageCompletionRate}%</h3>
            </div>
            <div className="rounded-full bg-accent-100 p-3 text-accent-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="bg-accent-50 px-5 py-1.5">
            <p className="text-xs font-medium text-accent-700">
              Above industry average
            </p>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-500">Data Quality</p>
              <h3 className="mt-1 text-3xl font-semibold text-gray-900">High</h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <BarChart2 size={20} />
            </div>
          </div>
          <div className="bg-green-50 px-5 py-1.5">
            <p className="text-xs font-medium text-green-700">
              Low margin of error ±2%
            </p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent surveys */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Surveys</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {recentSurveys.map((survey) => (
                <div key={survey.id} className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link to={`/surveys/${survey.id}`} className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        {survey.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-3">
                        <StatusBadge status={survey.status} />
                        <span className="text-sm text-gray-500">
                          {survey.status === 'draft' 
                            ? 'Not started' 
                            : `Started ${new Date(survey.startDate!).toLocaleDateString()}`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Responses</p>
                      <p className="text-lg font-medium text-gray-900">
                        {survey.responses} / {survey.target}
                      </p>
                    </div>
                  </div>
                  {survey.status === 'active' && (
                    <div className="mt-3">
                      <div className="relative h-2 w-full rounded-full bg-gray-200">
                        <div 
                          className="absolute left-0 top-0 h-2 rounded-full bg-primary-600"
                          style={{ width: `${Math.min(100, (survey.responses / survey.target) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 px-5 py-4">
              <Link to="/surveys" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                View all surveys →
              </Link>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card">
          <div className="border-b border-gray-200 px-5 py-4">
            <h3 className="text-lg font-medium text-gray-900">Response Trends</h3>
          </div>
          <div className="p-5">
            <div className="h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;