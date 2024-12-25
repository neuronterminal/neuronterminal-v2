import { useState, useCallback } from 'react';
import { ProcessingContext } from '../types/agent';
import { analyzeIntent } from '../utils/nlp/intentAnalysis';
import { generateContextualPrompt } from '../utils/prompts/contextual';
import { useLLM } from './useLLM';

export function useAgent() {
  const [isThinking, setIsThinking] = useState(false);
  const { generateResponse, currentProvider } = useLLM();

  const processInput = useCallback(async (context: ProcessingContext) => {
    setIsThinking(true);
    try {
      const intent = await analyzeIntent(context.message);
      const prompt = generateContextualPrompt({
        message: context.message,
        intent,
        context: context.context,
        emotion: context.emotion,
        memories: context.memories
      });

      const response = await generateResponse(prompt);
      return response.content;
    } catch (error) {
      console.error('Error processing input:', error);
      return 'I apologize, but I encountered an error processing your request. Could you please try again?';
    } finally {
      setIsThinking(false);
    }
  }, [generateResponse]);

  return {
    processInput,
    isThinking,
    currentProvider
  };
}