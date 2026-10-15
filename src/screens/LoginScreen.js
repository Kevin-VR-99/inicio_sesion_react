import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);

  // El boton solo se habilita cuando los dos campos tienen algo escrito
  const formularioListo = usuario.trim().length > 0 && contrasena.length > 0;

  /**
   * Punto de entrada para la integracion con la API de Threads (OAuth 2.0).
   *
   * PENDIENTE (Back-End): aqui va la llamada al flujo de autenticacion de
   * Meta for Developers. Esta pantalla ya entrega:
   *   - usuario: lo que escribio la persona en el primer campo
   *   - contrasena: lo que escribio en el segundo campo
   *
   * Cuando el back-end valide la sesion debe llamar a terminarCarga() para
   * apagar el spinner, y navegar a la pantalla de Bienvenida.
   */
  const iniciarSesionThreads = async () => {
    // TODO: conectar con el OAuth 2.0 de la Threads API.
  };

  const terminarCarga = () => setCargando(false);

  // Evento visual: se muestra el spinner antes de salir hacia la API
  const manejarAcceso = async () => {
    if (!formularioListo || cargando) {
      return;
    }

    setCargando(true);

    try {
      await iniciarSesionThreads();
    } finally {
      // Mientras la API no este lista, el spinner se apaga solo para que la
      // pantalla no se quede trabada durante las pruebas.
      terminarCarga();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logotipo */}
          <View style={styles.logoArea}>
            <Text style={styles.logo}>@</Text>
            <Text style={styles.titulo}>Threads App</Text>
            <Text style={styles.subtitulo}>Inicia sesion para continuar</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formulario}>
            <TextInput
              style={styles.input}
              placeholder="Usuario o correo"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={usuario}
              onChangeText={setUsuario}
              editable={!cargando}
            />

            <TextInput
              style={styles.input}
              placeholder="Contrasena"
              placeholderTextColor="#777777"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
              editable={!cargando}
            />

            <TouchableOpacity
              style={[
                styles.boton,
                (!formularioListo || cargando) && styles.botonInactivo,
              ]}
              onPress={manejarAcceso}
              disabled={!formularioListo || cargando}
              activeOpacity={0.8}
            >
              {cargando ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                <Text style={styles.botonTexto}>Iniciar sesion</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} disabled={cargando}>
              <Text style={styles.enlace}>Olvidaste tu contrasena?</Text>
            </TouchableOpacity>
          </View>

          {/* Pie */}
          <View style={styles.pie}>
            <View style={styles.separador} />
            <Text style={styles.pieTexto}>
              Al continuar se validara tu sesion con la API de Threads
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 44,
  },
  logo: {
    fontSize: 72,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitulo: {
    fontSize: 15,
    color: '#999999',
    marginTop: 6,
  },
  formulario: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2B2B2B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 14,
  },
  boton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    minHeight: 52,
  },
  botonInactivo: {
    opacity: 0.4,
  },
  botonTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  enlace: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 14,
    marginTop: 18,
  },
  pie: {
    marginTop: 48,
    alignItems: 'center',
  },
  separador: {
    height: 1,
    width: '60%',
    backgroundColor: '#222222',
    marginBottom: 16,
  },
  pieTexto: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
  },
});
