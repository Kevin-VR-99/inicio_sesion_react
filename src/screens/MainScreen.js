import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const integrantes = [
  { id: '1', name: 'Kevin', role: 'Splash Screen y Configuración Inicial', bio: 'Creación de la pantalla de bienvenida/carga y estructura base del repositorio.' },
  { id: '2', name: 'Ailton', role: 'Login Screen (Front-End Threads)', bio: 'Diseño de la pantalla de Login con estética minimalista estilo Threads.' },
  { id: '3', name: 'Gabriel', role: 'Integración API Threads (Back-End OAuth 2.0)', bio: 'Configuración en Meta for Developers y lógica de autenticación OAuth 2.0.' },
  { id: '4', name: 'Aurelio', role: 'Pantalla de Bienvenida y 5 Tarjetas', bio: 'Interfaz principal con la información de la materia y tarjetas interactivas.' },
  { id: '5', name: 'Rigoberto', role: 'Detalle del Integrante & Navegación', bio: 'Gestión de perfil detallado y sistema general de rutas (React Navigation).' },
];

export default function MainScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Información de la materia */}
      <Text style={styles.headerTitle}>Desarrollo Móvil Integral</Text>
      <Text style={styles.subtitle}>Equipo MVP-LA — FootwearPoint</Text>

      {/* 5 Tarjetas Interactivas */}
      <View style={styles.cardsContainer}>
        {integrantes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { integrante: item })}
          >
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardRole}>{item.role}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#212529',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6c757d',
  },
  cardsContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  cardRole: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
});