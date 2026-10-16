// Configuración pública de Threads. El Client Secret NUNCA va aquí:
// vive solo en el .env (ignorado por git) y lo usa server/index.js.
// Los valores salen de .env (variables EXPO_PUBLIC_*). Ver README.
export const threadsConfig = {
  appId: process.env.EXPO_PUBLIC_THREADS_APP_ID || '',
  // Backend mínimo que cambia el code por el token (10.0.2.2 = PC desde el emulador).
  tokenServer: process.env.EXPO_PUBLIC_TOKEN_SERVER || '',
  // MODO DE PRUEBA: muestra un botón para entrar sin Threads (solo para probar la navegación).
  modoPrueba: process.env.EXPO_PUBLIC_MODO_PRUEBA === 'true',
  scopes: ['threads_basic'],
  authorizeUrl: 'https://www.threads.com/oauth/authorize',
  // Redirect https que se registra en Meta (proxy de Expo AuthSession).
  redirectHttps: 'https://auth.expo.io/@anonymous/mi-app-threads',
};
