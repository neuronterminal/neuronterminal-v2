import React, { ReactNode } from 'react';

interface ChatContainerProps {
  children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="w-full max-w-2xl chat-container rounded-lg p-4 md:p-6 relative z-10 mx-auto min-h-[80vh] md:min-h-0 flex flex-col">
      {children}
    </div>
  );
}