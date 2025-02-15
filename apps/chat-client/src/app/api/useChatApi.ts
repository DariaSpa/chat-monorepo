import { getChatApiClient } from '@chat-monorepo/chat-api';

export function useChatApi() {
  const chatApi = getChatApiClient(
    import.meta.env.VITE_CHAT_SERVICE_HOST,
    import.meta.env.VITE_CHAT_SERVICE_PORT,
    import.meta.env.VITE_CHAT_SERVICE_SSL === 'true'
  );
  
  return chatApi;
}
