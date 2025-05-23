import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ requiredRole, children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and role in useEffect to avoid hydration issues
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      // navigate('/unauthorized', { replace: true });
      return;
    }
  }, [user, requiredRole, navigate]);

  if (!user) {
    return null;
  }

  // Check role (case-sensitive comparison)
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600 mb-2">403 - Akses Ditolak</h1>
        <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kembali
        </button>
      </div>
    );
  }

  return children;
}