import React from 'react';
import { BarChart3 } from 'lucide-react';

const Surveys = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Surveys</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Create Survey
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No surveys created yet.</p>
          <p className="mt-2">Create your first survey to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default Surveys;