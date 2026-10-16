jest.mock('expo-auth-session', () => ({ makeRedirectUri: () => 'threadslogin://oauth' }));
jest.mock('expo-web-browser', () => ({ maybeCompleteAuthSession: jest.fn(), openAuthSessionAsync: jest.fn() }));

const cfg = {
  appId: '123',
  tokenServer: 'http://srv',
  scopes: ['threads_basic'],
  authorizeUrl: 'https://www.threads.com/oauth/authorize',
  redirectHttps: 'https://auth.expo.io/@anonymous/mi-app-threads',
};
const auth = require('../src/services/threadsAuth');

test('la URL de autorización lleva client_id y redirect https, sin secret', () => {
  const url = auth.construirUrlAutorizacion(cfg, 'threadslogin://oauth');
  const authUrl = decodeURIComponent(url.split('authUrl=')[1].split('&returnUrl')[0]);
  expect(url.startsWith('https://auth.expo.io/')).toBe(true);
  expect(authUrl).toContain('client_id=123');
  expect(authUrl).toContain('response_type=code');
  expect(url).not.toMatch(/secret/i);
});

test('lee el code del redirect', () => {
  expect(auth.leerParametro('threadslogin://oauth?code=abc%23_&state=x#_', 'code')).toBe('abc#_');
});

test('configLista exige appId y servidor', () => {
  expect(auth.configLista(cfg)).toBe(true);
  expect(auth.configLista({ ...cfg, appId: '' })).toBe(false);
});

test('intercambio exitoso devuelve la sesión validada', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ usuario: 'gabriel', id: '1' }) });
  await expect(auth.cambiarCodigoPorSesion('c', cfg)).resolves.toEqual({ ok: true, sesion: { usuario: 'gabriel', id: '1' } });
});

test('intercambio rechazado devuelve error', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'no' }) });
  const r = await auth.cambiarCodigoPorSesion('c', cfg);
  expect(r.ok).toBe(false);
});

test('sin configuración, iniciarSesionThreads pide llaves', async () => {
  await expect(auth.iniciarSesionThreads()).resolves.toEqual({ ok: false, motivo: 'sin_llaves' });
});
