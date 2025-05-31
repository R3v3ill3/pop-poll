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

interface Panelist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  type: 'sms' | 'dynata';
  age: number;
  gender: string;
  location: {
    postcode: string;
    state: string;
    electorate: string;
  };
  consentStatus: boolean;
  consentDate: string | null;
  status: 'active' | 'inactive' | 'opted_out';
  createdAt: string;
}

const Panelists = () => {
  // Mock data - in a real application, this would come from API calls
  const [panelists, setPanelists] = useState<Panelist[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+61412345678',
      type: 'sms',
      age: 35,
      gender: 'male',
      location: {
        postcode: '2000',
        state: 'NSW',
        electorate: 'Sydney',
      },
      consentStatus: true,
      consentDate: '2025-01-15T00:00:00Z',
      status: 'active',
      createdAt: '2025-01-15T00:00:00Z',
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      type: 'dynata',
      age: 42,
      gender: 'female',
      location: {
        postcode: '3000',
        state: 'VIC',
        electorate: 'Melbourne',
      },
      consentStatus: true,
      consentDate: '2025-02-01T00:00:00Z',
      status: 'active',
      createdAt: '2025-02-01T00:00:00Z',
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Wong',
      email: 'michael.w@example.com',
      phone: '+61487654321',
      type: 'sms',
      age: 28,
      gender: 'male',
      location: {
        postcode: '4000',
        state: 'QLD',
        electorate: 'Brisbane',
      },
      consentStatus: true,
      consentDate: '2025-01-20T00:00:00Z',
      status: 'opted_out',
      createdAt: '2025-01-20T00:00:00Z',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'sms' | 'dynata'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'opted_out'>('all');
  const [filteredPanelists, setFilteredPanelists] = useState<Panelist[]>(panelists);

  // Apply filters when search term or filters change
  useEffect(() => {
    let result = panelists;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        panelist => 
          panelist.firstName.toLowerCase().includes(term) ||
          panelist.lastName.toLowerCase().includes(term) ||
          panelist.email.toLowerCase().includes(term) ||
          (panelist.phone && panelist.phone.includes(term))
      );
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(panelist => panelist.type === typeFilter);
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(panelist => panelist.status === statusFilter);
    }
    
    setFilteredPanelists(result);
  }, [searchTerm, typeFilter, statusFilter, panelists]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 size={16} className="mr-1 text-green-600" />;
      case 'inactive':
        return <Clock size={16} className="mr-1 text-yellow-600" />;
      case 'opted_out':
        return <XCircle size={16} className="mr-1 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'opted_out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Panelists</h1>
        <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:gap-4">
          <button className="btn btn-outline inline-flex items-center">
            <Upload size={16} className="mr-2" />
            Import
          </button>
          <button className="btn btn-outline inline-flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="btn btn-primary inline-flex items-center">
            <Plus size={16} className="mr-2" />
            Add Panelist
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="form-input pl-10"
            placeholder="Search panelists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <button
              type="button"
              className="btn btn-outline inline-flex items-center"
              onClick={() => setTypeFilter('all')}
            >
              <Filter className="mr-2 h-4 w-4" />
              {typeFilter === 'all' ? 'All Types' : `Type: ${typeFilter.toUpperCase()}`}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setTypeFilter('all')}
                >
                  All Types
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setTypeFilter('sms')}
                >
                  SMS
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setTypeFilter('dynata')}
                >
                  Dynata
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              className="btn btn-outline inline-flex items-center"
              onClick={() => setStatusFilter('all')}
            >
              <Filter className="mr-2 h-4 w-4" />
              {statusFilter === 'all' ? 'All Statuses' : `Status: ${statusFilter}`}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setStatusFilter('all')}
                >
                  All Statuses
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setStatusFilter('inactive')}
                >
                  Inactive
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => setStatusFilter('opted_out')}
                >
                  Opted Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panelist list */}
      {filteredPanelists.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 rounded-full bg-primary-100 p-3">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="mb-2 text-lg font-medium">No panelists found</h3>
          <p className="mb-6 text-gray-500">
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : "You haven't added any panelists yet"}
          </p>
          <button className="btn btn-primary">
            Add Your First Panelist
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Panelist
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Joined
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredPanelists.map((panelist) => (
                <tr key={panelist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {panelist.firstName} {panelist.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{panelist.email}</div>
                      {panelist.phone && (
                        <div className="text-sm text-gray-500">{panelist.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {panelist.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {panelist.location.state}
                    </div>
                    <div className="text-sm text-gray-500">
                      {panelist.location.electorate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                        panelist.status
                      )}`}
                    >
                      {getStatusIcon(panelist.status)}
                      {panelist.status.charAt(0).toUpperCase() + panelist.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(panelist.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      Edit
                    </button>
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

export default Panelists;