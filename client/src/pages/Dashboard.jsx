import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.username}!</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {profile ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Protected Data</h2>
                <pre className="bg-black/20 p-4 rounded-xl text-sm">{JSON.stringify(profile, null, 2)}</pre>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Status</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>User ID:</span>
                    <span className="font-mono">{user?.id || 'demo'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token:</span>
                    <span className="font-mono text-xs">{token?.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Environment:</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Development</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Protected content loads here with valid JWT.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
