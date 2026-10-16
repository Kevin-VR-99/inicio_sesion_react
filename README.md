# mi-app-threads (Expo SDK 53)

Splash → Login (Threads OAuth 2.0) → Bienvenida (5 tarjetas) → Detalle.

## Correr en Android
```
npm install
npm run server      # backend de tokens (puerto 3001), en otra terminal
npx expo start --android
```

## Configuración (.env, ignorado por git)
Crea `.env` en la raíz (NO se sube):
```
EXPO_PUBLIC_THREADS_APP_ID=<Threads App ID / Client ID>
EXPO_PUBLIC_TOKEN_SERVER=http://10.0.2.2:3001   # 10.0.2.2 = tu PC vista desde el emulador
EXPO_PUBLIC_MODO_PRUEBA=false                    # muestra el botón "MODO DE PRUEBA"
THREADS_APP_ID=<mismo Client ID>
THREADS_APP_SECRET=<Threads App Secret>          # solo lo lee server/index.js, nunca la app
THREADS_REDIRECT_URI=https://auth.expo.io/@anonymous/mi-app-threads
```
Las variables `EXPO_PUBLIC_*` se empaquetan en la app: el secret NO debe llevar ese prefijo.

## Qué configurar en Meta for Developers (app con caso de uso "Acceder a la API de Threads")
1. **Configuración de Threads → Redirect Callback URLs (OAuth válidos):**
   `https://auth.expo.io/@anonymous/mi-app-threads` (debe ser https; es el proxy de Expo AuthSession,
   que reenvía el `code` a la app `threadslogin://oauth` / `exp://...`).
   Si inicias sesión en Expo (`npx expo login`) cambia `@anonymous` por tu usuario, aquí, en `.env` y en `src/config/threads.js`.
2. **Permisos:** `threads_basic`.
3. **Roles de la app → Evaluadores de Threads (Threads Testers):** agrega la cuenta de Threads con la que vas a entrar.
4. **En la app de Threads (o threads.com) con esa cuenta:** Configuración → Cuenta → Permisos del sitio web →
   Invitaciones → **Aceptar** la invitación. Sin esto Meta responde
   `"The user has not accepted the invite to test the app" (1349245)`.

## Modo de prueba
Con `EXPO_PUBLIC_MODO_PRUEBA=true` aparece en el Login el botón amarillo
**"Entrar en MODO DE PRUEBA (sin Threads)"**, que entra con una sesión ficticia (`@modo_prueba`)
para probar la navegación. Por defecto está apagado (`false`).

## Pruebas
`npm test`
