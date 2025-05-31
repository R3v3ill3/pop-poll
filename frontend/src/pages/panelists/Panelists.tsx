import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown, 
  Upload, 
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  User
} from 'lucide-react';

const Panelists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panelists</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={20} />
          Add New Panelist
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search panelists..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={20} />
            Filter
            <ChevronDown size={20} />
          </button>
          {isFilterOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white border rounded-lg shadow-lg p-2 w-48">
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedFilter === 'active' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('active')}
              >
                Active
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedFilter === 'inactive' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleFilterChange('inactive')}
              >
                Inactive
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <Upload size={20} />
          Import
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <Download size={20} />
          Export
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <User className="h-10 w-10 rounded-full bg-gray-200 p-2" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">Expert in UI/UX</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">john.doe@example.com</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Active
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  2 hours ago
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Panelists;