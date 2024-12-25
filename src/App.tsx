import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MatrixBackground } from './components/MatrixBackground';
import { Navigation } from './components/Navigation';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <Router>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-screen p-4 flex flex-col items-center">
          <MatrixBackground />
          <Navigation />
          <main className="w-full max-w-6xl flex-1 relative z-1">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}