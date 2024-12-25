import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SocialButtons } from './SocialButtons';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="w-full max-w-6xl mx-auto mb-6 p-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex flex-wrap justify-center gap-4 flex-1">
          <Link 
            to="/"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Chat
          </Link>
          <Link 
            to="/learn"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/learn' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Learn to Code
          </Link>
          <Link 
            to="/workspace"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/workspace' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Workspace
          </Link>
          <Link 
            to="/tokenomics"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/tokenomics' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Tokenomics
          </Link>
          <Link 
            to="/roadmap"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/roadmap' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Roadmap
          </Link>
          <Link 
            to="/team"
            className={`matrix-button px-6 py-2 rounded-lg text-center min-w-[120px] ${
              location.pathname === '/team' ? 'bg-[#00ff41]/20' : ''
            }`}
          >
            Team
          </Link>
        </div>
        <SocialButtons />
      </div>
    </nav>
  );
}