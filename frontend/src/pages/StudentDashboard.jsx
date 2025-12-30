import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { matchAPI, feedbackAPI } from '../services/api';
import Navbar from '../components/Navbar';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await matchAPI.getRecommendations(query);
      setRecommendations(response.data?.matches || []);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get recommendations');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!selectedMentor) return;

    try {
      await feedbackAPI.submitFeedback({
        student_email: user.email,
        mentor_email: selectedMentor.email || selectedMentor.mentor_email,
        query: query,
        rating: feedback.rating,
        comment: feedback.comment,
      });
      alert('Feedback submitted successfully!');
      setFeedbackOpen(false);
      setSelectedMentor(null);
      setFeedback({ rating: 5, comment: '' });
    } catch (err) {
      alert('Failed to submit feedback: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Find the perfect mentor for your learning journey</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Find a Mentor</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to learn?
              </label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Describe what you want to learn, your goals, preferred teaching style, etc..."
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Search Mentors'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recommended Mentors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((mentor, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {mentor.name || mentor.mentor_name || 'Mentor'}
                    </h3>
                    <p className="text-primary-600 font-medium mb-2">
                      {mentor.skill || mentor.expertise || 'Expert'}
                    </p>
                    {mentor.years_experience && (
                      <p className="text-gray-600 text-sm">
                        {mentor.years_experience} years of experience
                      </p>
                    )}
                  </div>

                  {mentor.explanation && (
                    <p className="text-gray-700 mb-4 text-sm">{mentor.explanation}</p>
                  )}

                  <div className="space-y-2 mb-4">
                    {mentor.hourly_rate && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Rate:</span> ${mentor.hourly_rate}/hour
                      </p>
                    )}
                    {mentor.mode && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Mode:</span>{' '}
                        {mentor.mode === 'online' ? 'Online' : 'In Person'}
                      </p>
                    )}
                    {mentor.location && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Location:</span> {mentor.location}
                      </p>
                    )}
                  </div>

                  {mentor.score && (
                    <p className="text-sm text-gray-500 mb-4">
                      Match Score: {(mentor.score * 100).toFixed(1)}%
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setSelectedMentor(mentor);
                      setFeedbackOpen(true);
                    }}
                    className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Provide Feedback
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && recommendations.length === 0 && query && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600">No mentors found. Try a different search query.</p>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {feedbackOpen && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Provide Feedback</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5)
                </label>
                <select
                  value={feedback.rating}
                  onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'star' : 'stars'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Share your experience..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setFeedbackOpen(false);
                  setSelectedMentor(null);
                }}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
