import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { threadsConfig } from '../config/threads';

WebBrowser.maybeCompleteAuthSession();

export const SESION_PRUEBA = { usuario: 'modo_prueba', id: 'prueba', prueba: true };

export function leerParametro(url, nombre) {
  const consulta = (url.split('?')[1] || '').split('#')[0];
  const par = consulta.split('&').find((parte) => parte.startsWith(`${nombre}=`));
  return par ? decodeURIComponent(par.slice(nombre.length + 1).replace(/\+/g, ' ')) : '';
}

export function configLista(config = threadsConfig) {
  return config.appId.trim() !== '' && config.tokenServer.trim() !== '';
}

export function construirUrlAutorizacion(config, returnUrl) {
  const authUrl = `${config.authorizeUrl}?${new URLSearchParams({
    client_id: config.appId.trim(),
    redirect_uri: config.redirectHttps,
    scope: config.scopes.join(','),
    response_type: 'code',
  }).toString()}`;
  return `${config.redirectHttps}/start?${new URLSearchParams({ authUrl, returnUrl }).toString()}`;
}

// El secret no está en la app: el backend (server/index.js) hace el intercambio y valida la sesión.
export async function cambiarCodigoPorSesion(code, config = threadsConfig) {
  try {
    const r = await fetch(`${config.tokenServer}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const datos = await r.json();
    if (!r.ok || !datos.usuario) {
      return { ok: false, motivo: 'token', mensaje: datos.error || 'Meta no entregó la sesión.' };
    }
    return { ok: true, sesion: { usuario: datos.usuario, id: datos.id || '' } };
  } catch (e) {
    return { ok: false, motivo: 'servidor', mensaje: 'No se pudo contactar el servidor de tokens (npm run server).' };
  }
}

export async function iniciarSesionThreads() {
  if (!configLista()) {
    return { ok: false, motivo: 'sin_llaves' };
  }
  const returnUrl = AuthSession.makeRedirectUri({ scheme: 'threadslogin', path: 'oauth' });
  const resultado = await WebBrowser.openAuthSessionAsync(
    construirUrlAutorizacion(threadsConfig, returnUrl),
    returnUrl,
  );
  if (resultado.type === 'cancel' || resultado.type === 'dismiss') {
    return { ok: false, motivo: 'cancelado' };
  }
  if (resultado.type !== 'success') {
    return { ok: false, motivo: 'navegador', mensaje: 'No se abrió la autorización de Threads.' };
  }
  const code = leerParametro(resultado.url, 'code');
  const error = leerParametro(resultado.url, 'error_message') || leerParametro(resultado.url, 'error');
  if (!code) {
    return { ok: false, motivo: 'codigo', mensaje: error || 'Threads no devolvió el código.' };
  }
  return cambiarCodigoPorSesion(code);
}
