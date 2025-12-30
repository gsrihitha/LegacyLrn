import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { matchAPI } from '../services/api';
import Navbar from '../components/Navbar';

export default function MentorDashboard() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshEmbeddings = async () => {
    setRefreshing(true);
    try {
      const response = await matchAPI.refreshEmbeddings();
      alert(response.data.message || 'Embeddings refreshed successfully!');
    } catch (err) {
      alert('Failed to refresh embeddings: ' + (err.response?.data?.detail || 'Unknown error'));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mentor Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.email}</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Profile</h3>
            <p className="text-gray-600 mb-4">
              Your profile is visible to students searching for mentors with your expertise.
            </p>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View Profile →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sessions</h3>
            <p className="text-gray-600 mb-4">
              Manage your mentorship sessions with students.
            </p>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View Sessions →
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reviews</h3>
            <p className="text-gray-600 mb-4">
              See feedback and reviews from your students.
            </p>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View Reviews →
            </button>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Management</h2>
          <p className="text-gray-600 mb-4">
            Update your profile information to improve your visibility in search results.
            Refresh embeddings after updating your skills or expertise.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleRefreshEmbeddings}
              disabled={refreshing}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? 'Refreshing...' : 'Refresh Embeddings'}
            </button>
            
            <p className="text-sm text-gray-500">
              This will update your profile's AI embeddings to improve matching with student queries.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold text-primary-600 mb-1">-</p>
              <p className="text-gray-600">Total Sessions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600 mb-1">-</p>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600 mb-1">-</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

