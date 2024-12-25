import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type Lesson } from '../types';
import { CodeEditor } from '../../editor/components/CodeEditor';
import { useLesson } from '../hooks/useLesson';
import { TestResults } from './TestResults';
import { CodeFeedback } from './CodeFeedback';

interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const [code, setCode] = useState(lesson.exercises[0].startingCode);
  const { currentExercise, submitCode, getHint } = useLesson(lesson);
  const [testResults, setTestResults] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async () => {
    try {
      const results = await submitCode(code);
      setTestResults(results);
    } catch (error) {
      console.error('Failed to submit code:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="p-4 border border-[#00ff41] rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
        <p className="text-sm opacity-80 mb-4">{lesson.description}</p>
        <div className="p-3 bg-[#0d0208] rounded border border-[#00ff41]/20">
          <h3 className="font-medium mb-2">Exercise: {currentExercise.prompt}</h3>
          {showHint && (
            <p className="text-sm text-yellow-400 mb-2">Hint: {getHint()}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CodeEditor
            value={code}
            onChange={value => setCode(value || '')}
            language="javascript"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="matrix-button px-4 py-2 rounded-lg"
            >
              Run Tests
            </button>
            <button
              onClick={() => setShowHint(true)}
              className="matrix-button px-4 py-2 rounded-lg"
            >
              Get Hint
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {testResults && (
            <>
              <TestResults results={testResults.testResults} />
              {testResults.submission && (
                <CodeFeedback analysis={testResults.submission.analysis} />
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}