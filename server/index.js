// Backend mínimo: cambia el "code" de Threads por un token usando el Client Secret
// (que solo existe en .env de la PC) y valida la sesión pidiendo /me. Uso: npm run server
const http = require('http');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  for (const linea of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const { THREADS_APP_ID, THREADS_APP_SECRET, THREADS_REDIRECT_URI } = process.env;
const PORT = process.env.PORT || 3001;

function responder(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/token') return responder(res, 404, { error: 'no encontrado' });
  let cuerpo = '';
  req.on('data', (c) => { cuerpo += c; });
  req.on('end', async () => {
    try {
      const { code } = JSON.parse(cuerpo || '{}');
      if (!code) return responder(res, 400, { error: 'Falta code' });
      if (!THREADS_APP_ID || !THREADS_APP_SECRET) return responder(res, 500, { error: 'Faltan llaves en .env' });
      const t = await fetch('https://graph.threads.net/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: THREADS_APP_ID,
          client_secret: THREADS_APP_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: THREADS_REDIRECT_URI,
          code,
        }).toString(),
      });
      const token = await t.json();
      if (!t.ok || !token.access_token) {
        return responder(res, 401, { error: token.error_message || 'Meta rechazó el code' });
      }
      const p = await fetch(`https://graph.threads.net/v1.0/me?fields=id,username&access_token=${encodeURIComponent(token.access_token)}`);
      const perfil = await p.json();
      if (!p.ok || !perfil.id) return responder(res, 401, { error: 'Sesión no válida' });
      // El token no se devuelve a la app; solo el perfil validado.
      return responder(res, 200, { usuario: perfil.username, id: perfil.id });
    } catch (e) {
      return responder(res, 500, { error: 'Error del servidor' });
    }
  });
}).listen(PORT, () => console.log(`Servidor de tokens Threads en http://localhost:${PORT}`));
