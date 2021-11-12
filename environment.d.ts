declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'test';
      PORT?: string;
      PWD: string;
      SECRET: string;
    }
  }
}

export {}