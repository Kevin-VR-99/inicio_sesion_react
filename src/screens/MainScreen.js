import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import integrantes from '../data/integrantes';

export default function MainScreen({ navigation, route }) {
  const usuario = route.params?.sesion?.usuario;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Desarrollo Móvil Integral</Text>
      <Text style={styles.subtitle}>Equipo MVP-LA</Text>
      {usuario ? <Text style={styles.sesion}>Sesión de @{usuario}</Text> : null}

      {/* 5 Tarjetas Interactivas */}
      <View style={styles.cardsContainer}>
        {integrantes.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { integrante: item })}
          >
            {item.foto ? (
              <Image source={item.foto} style={styles.avatarFoto} resizeMode="cover" />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
            )}
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
    marginBottom: 8,
    color: '#6c757d',
  },
  sesion: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
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
  avatarFoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#e9ecef',
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