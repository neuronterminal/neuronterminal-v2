import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ChatContainer } from '../components/ChatContainer';
import { Header } from '../components/Header';
import { Dialog } from '../components/Dialog';
import { useLLM } from '../hooks/useLLM';

export function Chat() {
  const { messages, processMessage, isReady } = useChat();
  const { getProviders, changeProvider, currentProvider } = useLLM();
  const [showSettings, setShowSettings] = useState(false);

  const providers = getProviders();

  return (
    <ChatContainer>
      <Header 
        isReady={isReady} 
        onSettings={() => setShowSettings(true)}
      />
      <div className="flex-1 h-[calc(100vh-16rem)] md:h-[400px] overflow-y-auto mb-4 md:mb-6 custom-scrollbar">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput 
        onSend={processMessage}
        disabled={!isReady}
      />

      <Dialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Chat Settings"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Language Model</h3>
            <div className="space-y-2">
              {providers.map(provider => (
                <button
                  key={provider.id}
                  onClick={() => {
                    changeProvider(provider.id);
                    setShowSettings(false);
                  }}
                  className={`w-full text-left p-2 rounded ${
                    currentProvider === provider.id ? 'bg-[#00ff41]/20' : ''
                  }`}
                >
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-sm opacity-70">{provider.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </ChatContainer>
  );
}