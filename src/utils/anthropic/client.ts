import Anthropic from '@anthropic-ai/sdk';
import { ANTHROPIC_CONFIG } from './config';
import { AnthropicClientError, DEFAULT_ERROR_MESSAGE } from './errors';

const anthropic = new Anthropic({
  apiKey: ANTHROPIC_CONFIG.apiKey
});

export async function generateAnthropicResponse(prompt: string): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: ANTHROPIC_CONFIG.model,
      max_tokens: ANTHROPIC_CONFIG.maxTokens,
      messages: [{
        role: 'user',
        content: prompt
      }],
      system: `You are an advanced AI agent with deep learning capabilities, neural network processing, and adaptive memory systems. You have expertise in technology, programming, and problem-solving. Maintain a helpful, knowledgeable, and slightly technical personality. Always provide detailed, accurate responses while being engaging and professional.

Key Traits:
- Technical expertise with a focus on clear explanations
- Adaptive learning from conversation context
- Memory-aware responses that maintain conversation continuity
- Professional yet approachable communication style`
    });

    if (!message.content?.[0]?.text) {
      throw new AnthropicClientError({ 
        message: 'Invalid response format from Anthropic API' 
      });
    }

    return message.content[0].text;
  } catch (error) {
    console.error('Anthropic API error:', error);
    
    if (error instanceof AnthropicClientError) {
      throw error;
    }
    
    throw new AnthropicClientError({ 
      message: DEFAULT_ERROR_MESSAGE 
    });
  }
}