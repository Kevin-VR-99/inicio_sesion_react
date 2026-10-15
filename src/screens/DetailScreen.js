import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailScreen({ route }) {
  const integrante = route.params?.integrante;

  if (!integrante) {
    return (
      <View style={styles.container}>
        <Text style={styles.nombre}>No hay datos de este integrante.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.inicial}>{integrante.name.charAt(0)}</Text>
      </View>
      <Text style={styles.nombre}>{integrante.name}</Text>
      <Text style={styles.rol}>{integrante.role}</Text>
      <Text style={styles.bio}>{integrante.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  inicial: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  nombre: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  rol: {
    marginTop: 8,
    fontSize: 15,
    color: '#555555',
  },
  bio: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: '#222222',
  },
});
