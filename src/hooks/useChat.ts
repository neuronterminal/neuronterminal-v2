import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';
import { useAgent } from './useAgent';
import { useSpeech } from './useSpeech';
import { useContextAnalyzer } from './useContextAnalyzer';
import { useEmotionDetector } from './useEmotionDetector';
import { useMemory } from './useMemory';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReady, setIsReady] = useState(false);
  const { processInput, isThinking } = useAgent();
  const { speak } = useSpeech();
  const { analyzeContext } = useContextAnalyzer();
  const { detectEmotion } = useEmotionDetector();
  const { addToMemory, getRelevantMemories } = useMemory();

  useEffect(() => {
    const initializeAgent = async () => {
      const initialMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: "Neural network initialized. I am an autonomous AI agent with advanced natural language processing capabilities, deep learning, and adaptive memory systems. How may I assist you today?",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      addToMemory(initialMessage);
      setIsReady(true);
    };

    initializeAgent();
  }, [addToMemory]);

  const processMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    addToMemory(userMessage);

    try {
      // Analyze context and emotion
      const [context, emotion] = await Promise.all([
        analyzeContext(content),
        detectEmotion(content)
      ]);

      const relevantMemories = getRelevantMemories(content);

      // Generate response using neural processing
      const response = await processInput({
        message: content,
        context,
        emotion,
        memories: relevantMemories
      });

      const agentMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      addToMemory(agentMessage);

      // Optional: Speak the response
      speak(response);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'agent',
        content: "I apologize, but I encountered an error processing your request. Could you please try again?",
        timestamp: new Date(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [processInput, analyzeContext, detectEmotion, getRelevantMemories, addToMemory, speak]);

  return {
    messages,
    processMessage,
    isReady,
    isThinking
  };
}