
import React from 'react';

const Landing: React.FC = () => {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-800/50 backdrop-blur-md bg-gray-950/80 sticky top-0 z-50">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-lg">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-blue-500 font-outfit">CampusFix</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Log in
          </button>
          <button
            onClick={handleSignup}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-outfit">
            Smart College <span className="text-blue-500">Problem Reporter</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-400 mb-10 max-w-none mx-auto leading-relaxed">
            Report campus issues instantly. Admins resolve them faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSignup}
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center group"
            >
              Get Started
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-900 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} CampusFix Reporter. Streamlining institutional support.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
