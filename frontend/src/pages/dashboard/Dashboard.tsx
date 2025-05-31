import React from 'react';
import { BarChart3, Users, FileText, Settings } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      title: "Total Surveys",
      value: "24",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Panelists",
      value: "1,234",
      icon: <Users className="w-6 h-6 text-green-600" />,
      change: "+3.2%",
      changeType: "positive"
    },
    {
      title: "Response Rate",
      value: "78%",
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      change: "-2%",
      changeType: "negative"
    },
    {
      title: "Avg. Completion Time",
      value: "12m",
      icon: <Settings className="w-6 h-6 text-orange-600" />,
      change: "+1m",
      changeType: "neutral"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-gray-50">{stat.icon}</div>
            </div>
            <h2 className="text-gray-500 text-sm font-medium">{stat.title}</h2>
            <div className="flex items-baseline mt-2">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;