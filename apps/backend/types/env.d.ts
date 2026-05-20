declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_BE_PORT: string
      APP_WS_PORT: string
      APP_BE_COMMENT: string
      APP_ORIGIN: string
      NODE_ENV: 'development' | 'production' | 'test'
      // DB_URL: string;
    }
  }
}

export {} // Делаем файл модулем
