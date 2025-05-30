import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Surveys from './pages/surveys/Surveys';
import CreateSurvey from './pages/surveys/CreateSurvey';
import SurveyDetail from './pages/surveys/SurveyDetail';
import Panelists from './pages/panelists/Panelists';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/login\" replace />} />
        <Route path="login" element={user ? <Navigate to="/dashboard\" replace /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard\" replace /> : <Register />} />
      </Route>

      {/* Dashboard Routes - Protected */}
      <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login\" replace />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="surveys" element={<Surveys />} />
        <Route path="surveys/create" element={<CreateSurvey />} />
        <Route path="surveys/:id" element={<SurveyDetail />} />
        <Route path="panelists" element={<Panelists />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;