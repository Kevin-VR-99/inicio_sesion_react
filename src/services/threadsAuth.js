import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { threadsConfig } from '../config/threads';

WebBrowser.maybeCompleteAuthSession();

function leerParametro(url, nombre) {
  const consulta = url.split('?')[1] || '';
  const par = consulta.split('&').find((parte) => parte.startsWith(`${nombre}=`));
  if (!par) {
    return '';
  }
  return decodeURIComponent(par.slice(nombre.length + 1));
}

function llavesListas() {
  return threadsConfig.appId.trim() !== '' && threadsConfig.appSecret.trim() !== '';
}

async function cambiarCodigoPorSesion(code, redirectUri) {
  const cuerpo = new URLSearchParams({
    client_id: threadsConfig.appId,
    client_secret: threadsConfig.appSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
  });

  const tokenRespuesta = await fetch(threadsConfig.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: cuerpo.toString(),
  });
  const token = await tokenRespuesta.json();

  if (!tokenRespuesta.ok || !token.access_token) {
    return {
      ok: false,
      motivo: 'token',
      mensaje: token.error_message || 'Meta no entregó la sesión.',
    };
  }

  const perfilUrl = `${threadsConfig.perfilEndpoint}?fields=id,username,name&access_token=${encodeURIComponent(token.access_token)}`;
  const perfilRespuesta = await fetch(perfilUrl);
  const perfil = await perfilRespuesta.json();

  return {
    ok: true,
    sesion: {
      usuario: perfil.username || perfil.name || 'Threads',
      id: perfil.id || '',
    },
  };
}

export async function iniciarSesionThreads() {
  if (!llavesListas()) {
    return { ok: false, motivo: 'sin_llaves' };
  }

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'threadslogin',
    path: 'oauth',
  });

  const authUrl =
    `${threadsConfig.authorizationEndpoint}` +
    `?client_id=${encodeURIComponent(threadsConfig.appId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(threadsConfig.scopes.join(','))}` +
    `&response_type=code`;

  const resultado = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

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

  return cambiarCodigoPorSesion(code, redirectUri);
}
