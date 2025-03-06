import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Home, BarChart3, Wallet2, MoreHorizontal } from 'lucide-react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import AccountsPage from './pages/AccountsPage';
import MorePage from './pages/MorePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-indigo-900 tracking-tight">Personal Expense Manager</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/more" element={<MorePage />} />
          </Routes>
        </main>

        {/* Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                  }`
                }
              >
                <Home className="h-6 w-6" />
                <span className="mt-1">Home</span>
              </NavLink>

              <NavLink
                to="/analysis"
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                  }`
                }
              >
                <BarChart3 className="h-6 w-6" />
                <span className="mt-1">Analysis</span>
              </NavLink>

              <NavLink
                to="/accounts"
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                  }`
                }
              >
                <Wallet2 className="h-6 w-6" />
                <span className="mt-1">Accounts</span>
              </NavLink>

              <NavLink
                to="/more"
                className={({ isActive }) =>
                  `flex flex-col items-center py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                  }`
                }
              >
                <MoreHorizontal className="h-6 w-6" />
                <span className="mt-1">More</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;