import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { iniciarSesionThreads, SESION_PRUEBA } from '../services/threadsAuth';
import { threadsConfig } from '../config/threads';

export default function LoginScreen({ navigation }) {
  const [cargando, setCargando] = useState(false);

  const irABienvenida = (sesion) => {
    navigation.replace('Bienvenida', { sesion });
  };

  const manejarAcceso = async () => {
    if (cargando) {
      return;
    }

    setCargando(true);

    try {
      const resultado = await iniciarSesionThreads();

      if (resultado.ok) {
        irABienvenida(resultado.sesion);
        return;
      }

      if (resultado.motivo === 'sin_llaves') {
        Alert.alert(
          'Faltan las llaves de Threads',
          'Configura EXPO_PUBLIC_THREADS_APP_ID y EXPO_PUBLIC_TOKEN_SERVER en .env (ver README).',
        );
        return;
      }

      if (resultado.motivo === 'cancelado') {
        return;
      }

      Alert.alert('No se pudo iniciar sesión', resultado.mensaje || 'Revisa la app en Meta for Developers.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.logoArea}>
        <Text style={styles.logo}>@</Text>
        <Text style={styles.titulo}>Threads</Text>
        <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>
      </View>

      <TouchableOpacity
        style={[styles.boton, cargando && styles.botonInactivo]}
        onPress={manejarAcceso}
        disabled={cargando}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Continuar con Threads"
        accessibilityState={{ busy: cargando, disabled: cargando }}
      >
        {cargando ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <Text style={styles.botonTexto}>Continuar con Threads</Text>
        )}
      </TouchableOpacity>

      {threadsConfig.modoPrueba ? (
        <TouchableOpacity
          style={styles.botonPrueba}
          onPress={() => irABienvenida(SESION_PRUEBA)}
          accessibilityRole="button"
          accessibilityLabel="Entrar en modo de prueba"
        >
          <Text style={styles.botonPruebaTexto}>Entrar en MODO DE PRUEBA (sin Threads)</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.pie}>
        El botón muestra la carga y después abre la autorización de Threads.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 72,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 15,
    color: '#999999',
    marginTop: 8,
  },
  boton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonInactivo: {
    opacity: 0.7,
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  botonPrueba: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 12,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPruebaTexto: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: '700',
  },
  pie: {
    marginTop: 28,
    textAlign: 'center',
    color: '#666666',
    fontSize: 13,
    lineHeight: 18,
  },
});
