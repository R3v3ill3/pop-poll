import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="mb-4 text-9xl font-bold text-primary-600">404</h1>
      <h2 className="mb-8 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link
        to="/dashboard"
        className="btn btn-primary inline-flex items-center"
      >
        <Home size={16} className="mr-2" />
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;