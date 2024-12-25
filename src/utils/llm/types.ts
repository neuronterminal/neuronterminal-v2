export interface LLMResponse {
  content: string;
  error?: string;
}

export interface LLMProvider {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  isAvailable: boolean;
}

export interface LLMConfig {
  provider: string;
  maxTokens?: number;
  temperature?: number;
}