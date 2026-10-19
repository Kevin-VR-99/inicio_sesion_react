import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

// Combina la versión de Rigoberto (main) con la de feature/flujo-splash-detalle:
// acepta { integrante: { name, role, bio } } o { nombre, rol, descripcion, correo }.
export default function DetailScreen({ route, navigation }) {
  const params = route.params || {};
  const integrante = params.integrante || {};
  const nombre = params.nombre || integrante.name;
  const rol = params.rol || integrante.role;
  const descripcion = params.descripcion || integrante.bio;
  const correo = params.correo || integrante.correo;
  const foto = params.foto || integrante.foto;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Regresar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {foto ? (
          <Image source={foto} style={styles.avatarFoto} resizeMode="cover" />
        ) : nombre ? (
          <View style={styles.avatar}>
            <Text style={styles.inicial}>{nombre.charAt(0)}</Text>
          </View>
        ) : null}
        <Text style={styles.title}>{nombre || 'Integrante'}</Text>
        <Text style={styles.role}>{rol || 'Rol no definido'}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Información</Text>
        <Text style={styles.description}>
          {descripcion || 'Aquí va la biografía o descripción del integrante.'}
        </Text>

        {correo ? <Text style={styles.email}>Correo: {correo}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  backButton: { padding: 20, paddingTop: 50 },
  backText: { fontSize: 16, color: '#000', fontWeight: '600' },
  content: { padding: 20 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarFoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 16,
    backgroundColor: '#e9ecef',
  },
  inicial: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 8 },
  role: { fontSize: 18, color: '#666', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 24, color: '#333' },
  email: { marginTop: 20, fontSize: 15, color: '#555' },
});
