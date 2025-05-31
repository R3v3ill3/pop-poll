import { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Download,
  Calendar,
  Filter,
  ChevronDown,
  Clock,
  UserMinus
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('This Week');
  const [selectedFilter, setSelectedFilter] = useState('All Time');

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Present',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#4ade80',
      },
      {
        label: 'Absent',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: '#f87171',
      },
    ],
  };

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance Rate',
        data: [85, 88, 92, 89],
        borderColor: '#3b82f6',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Present Today</span>
          </div>
          <p className="text-2xl font-bold">85%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <UserMinus className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Absent Today</span>
          </div>
          <p className="text-2xl font-bold">15%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Monthly Average</span>
          </div>
          <p className="text-2xl font-bold">88.5%</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Late Arrivals</span>
          </div>
          <p className="text-2xl font-bold">5%</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            {selectedDateRange}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            {selectedFilter}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Weekly Attendance</h2>
          <Bar data={attendanceData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
          <Line data={trendData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;