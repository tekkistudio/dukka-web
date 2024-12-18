// apps/web/src/components/sections/demo/messages/ChatMessage.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: {
    content: string;
    type: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      alt: string;
      caption?: string;
    }[];
  };
  isBot: boolean;
  scenario: {
    chatbotName: string;
    id: string;
  };
  animate?: boolean;
  showTimestamp?: boolean;
}

const ChatMessage = ({ 
  message, 
  isBot, 
  scenario,
  animate = false,
  showTimestamp = true 
}: ChatMessageProps) => {
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [url]: true
    }));
  };

  const renderMedia = (media: ChatMessageProps['message']['media']) => {
    if (!media) return null;

    return (
      <div className={`
        ${media.length > 1 ? 'grid grid-cols-2 gap-1' : ''}
        mb-2 rounded-lg overflow-hidden
      `}>
        {media.map((item, index) => (
          <div 
            key={index} 
            className={`
              relative rounded-lg overflow-hidden
              ${!loadedImages[item.url] ? 'bg-gray-100 animate-pulse' : ''}
              ${media.length === 1 ? 'max-w-[300px]' : ''}
            `}
          >
            <Image
              src={item.url}
              alt={item.alt}
              width={300}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
              onLoad={() => handleImageLoad(item.url)}
            />
            {item.caption && (
              <div className="mt-1 text-sm text-gray-600">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = (content: string) => {
    return (
      <div className={`${isBot ? 'text-gray-800' : 'text-white'}`}>
        {content.split('\n').map((line, i) => (
          <p key={i} className={`${i > 0 ? 'mt-2' : ''}`}>
            {line}
          </p>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className={`flex items-start gap-2 ${!isBot && 'justify-end'}`}
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 1 } : undefined}
      transition={{ duration: 0.2 }}
    >      
      <div className={`
        max-w-[85%] rounded-2xl p-3
        ${isBot ? 'bg-white' : 'bg-dukka-primary'}
      `}>
        {isBot && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-gray-800">
              {scenario.chatbotName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              Assistant
            </span>
          </div>
        )}
        
        {message.media && renderMedia(message.media)}
        {renderContent(message.content)}
        
        {showTimestamp && (
          <div className={`
            text-[11px] mt-1
            ${isBot ? 'text-gray-500' : 'text-white/70'}
          `}>
            {new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;