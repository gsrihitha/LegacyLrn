import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Home() {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">LegacyLearn</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Connect with experienced mentors who have spent decades perfecting their craft.
            Learn from the best, directly.
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg border-2 border-primary-600"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={`/${role}/dashboard`}
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Our intelligent system matches you with mentors based on your learning goals and preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Experienced Mentors</h3>
            <p className="text-gray-600">
              Learn from retired professionals with years of industry experience and wisdom to share.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Safe & Secure</h3>
            <p className="text-gray-600">
              Verified profiles, secure payments, and recorded sessions ensure a safe learning environment.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Profile</h3>
                <p className="text-gray-600">Sign up as a student or mentor and complete your profile with your goals or skills.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Find Perfect Matches</h3>
                <p className="text-gray-600">Our AI analyzes your preferences and matches you with the best mentors for your needs.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Start Learning</h3>
                <p className="text-gray-600">Connect with your mentor, schedule sessions, and begin your learning journey.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

