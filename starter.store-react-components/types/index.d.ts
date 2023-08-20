declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
    NODE_ENV: 'development' | 'production',
    USE_LOCAL_SERVER?: 'true' | any
  }
}

declare var __DEV__: boolean;
