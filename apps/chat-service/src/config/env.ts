export const config = {
  SSL: process.env.VITE_CHAT_SERVICE_SSL === 'true',
  HOSTNAME: process.env.VITE_CHAT_SERVICE_HOST || 'localhost',
  PORT: process.env.VITE_CHAT_SERVICE_PORT || '3001',
  CLIENT_SSL: process.env.CHAT_CLIENT_SSL === 'true',
  CLIENT_HOSTNAME: process.env.CHAT_CLIENT_HOST || 'localhost',
  CLIENT_PORT: process.env.CHAT_CLIENT_PORT || '4200',
};

export const API_ORIGIN = `${config.SSL ? 'https' : 'http'}://${config.HOSTNAME}:${config.PORT}`;
export const CLIENT_ORIGIN = `${config.CLIENT_SSL ? 'https' : 'http'}://${config.CLIENT_HOSTNAME}:${config.CLIENT_PORT}`;
