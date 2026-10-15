import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Temporizador de 3 segundos antes de pasar al Login
    const timer = setTimeout(() => {
      // Si la navegación ya está configurada pasa a 'Login', de lo contrario no rompe la app
      if (navigation) {
        navigation.replace('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Título o Logotipo de la App */}
      <Text style={styles.title}>Threads App</Text>
      <Text style={styles.subtitle}>Proyecto de Integración en la Nube</Text>

      {/* Indicador de Carga */}
      <ActivityIndicator size="large" color="#000000" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
});