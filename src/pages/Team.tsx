import React from 'react';
import { DeveloperCard } from '../components/DeveloperCard';

const developers = [
  {
    name: "Sarah Chen",
    role: "Lead AI Engineer",
    bio: "Full-stack developer with a passion for AI and machine learning. Specializes in neural networks and natural language processing.",
    experience: [
      "Senior Developer at Cresta (2018-2023)",
      "ML Engineer at Glean",
      "Led development at Figure AI"
    ],
    imageUrl: "https://i.pravatar.cc/300?img=47"
  },
  {
    name: "Marcus Rodriguez",
    role: "Backend Architect",
    bio: "Systems architect with extensive experience in scalable infrastructure and blockchain technology.",
    experience: [
      "Principal Engineer at Gemini",
      "Backend Lead at Crypto.com",
      "Developed high-performance trading platforms"
    ],
    imageUrl: "https://i.pravatar.cc/300?img=68"
  },
  {
    name: "Alex Thompson",
    role: "Frontend Developer",
    bio: "Creative developer focused on building intuitive and responsive user interfaces with modern web technologies.",
    experience: [
      "UI/UX Lead at Creative Digital",
      "Frontend Developer at Activision Studios",
      "Created award-winning web applications"
    ],
    imageUrl: "https://i.pravatar.cc/300?img=33"
  }
];

export function Team() {
  return (
    <div className="p-6 rounded-lg border border-[#00ff41] bg-[#0d0208]/90">
      <h1 className="text-2xl font-bold mb-6">Meet the Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} {...dev} />
        ))}
      </div>
    </div>
  );
}