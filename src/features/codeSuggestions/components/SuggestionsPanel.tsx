import React from 'react';
import { motion } from 'framer-motion';
import { type Suggestion } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  onApplySuggestion: (suggestion: Suggestion) => void;
}

export function SuggestionsPanel({ 
  suggestions, 
  isLoading,
  onApplySuggestion 
}: SuggestionsPanelProps) {
  if (isLoading) {
    return (
      <div className="p-4 border border-[#00ff41] rounded-lg">
        <p className="text-[#00ff41]">Generating suggestions...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-[#00ff41] rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
      
      <div className="space-y-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-sm opacity-70">
                {suggestion.type} - {suggestion.timestamp.toLocaleTimeString()}
              </span>
              <button
                onClick={() => onApplySuggestion(suggestion)}
                className="matrix-button px-2 py-1 text-sm rounded"
              >
                Apply
              </button>
            </div>
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              className="rounded-lg text-sm"
            >
              {suggestion.content}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </motion.div>
  );
}