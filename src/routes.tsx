import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Chat } from './pages/Chat';
import { Learn } from './pages/Learn';
import { Workspace } from './pages/Workspace';
import { Tokenomics } from './pages/Tokenomics';
import { Roadmap } from './pages/Roadmap';
import { Team } from './pages/Team';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/tokenomics" element={<Tokenomics />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
}