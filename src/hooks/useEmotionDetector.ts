import { useCallback } from 'react';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export function useEmotionDetector() {
  const detectEmotion = useCallback((text: string) => {
    const analysis = sentiment.analyze(text);
    
    return {
      score: analysis.score,
      comparative: analysis.comparative,
      tokens: analysis.tokens,
      positive: analysis.positive,
      negative: analysis.negative
    };
  }, []);

  return { detectEmotion };
}