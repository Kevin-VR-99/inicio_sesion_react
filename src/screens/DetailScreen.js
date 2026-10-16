import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  // Recibe los datos que envía la pantalla principal (las tarjetas)
  const { nombre, rol, descripcion, correo } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Regresar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{nombre || 'Integrante'}</Text>
        <Text style={styles.role}>{rol || 'Rol no definido'}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Información</Text>
        <Text style={styles.description}>
          {descripcion || 'Aquí va la biografía o descripción del integrante.'}
        </Text>

        {correo && (
          <Text style={styles.email}>Correo: {correo}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 20,
    paddingTop: 50,
  },
  backText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  email: {
    marginTop: 20,
    fontSize: 15,
    color: '#555',
  },
});