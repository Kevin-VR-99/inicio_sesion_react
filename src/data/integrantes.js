const integrantes = [
  {
    id: '1',
    name: 'Kevin',
    foto: require('../../assets/perfil/kevin.jpg'),
    role: 'Splash Screen y configuración inicial',
    bio: 'Crea la pantalla de carga con temporizador e inicializa la estructura del proyecto para que el equipo trabaje sobre la misma base.',
  },
  {
    id: '2',
    name: 'Ailton',
    foto: require('../../assets/perfil/ailton.jpg'),
    role: 'Login con estética de Threads',
    bio: 'Diseña la pantalla de acceso: fondo negro, tipografía clara, logotipo y el botón que muestra la carga antes de llamar a la API.',
  },
  {
    id: '3',
    name: 'Gabriel',
    foto: require('../../assets/perfil/gabriel.jpg'),
    role: 'Integración API Threads (OAuth 2.0)',
    bio: 'Configura la app en Meta for Developers y arma el intercambio del código de autorización por la sesión del usuario.',
  },
  {
    id: '4',
    name: 'Aurelio',
    foto: require('../../assets/perfil/aurelio.jpg'),
    role: 'Bienvenida y 5 tarjetas',
    bio: 'Arma la pantalla principal con los datos de la materia y las tarjetas de cada integrante. Cada toque abre el detalle.',
  },
  {
    id: '5',
    name: 'Rigoberto',
    foto: require('../../assets/perfil/rigoberto.jpg'),
    role: 'Detalle del integrante y navegación',
    bio: 'Muestra la biografía de la persona elegida y conecta las rutas Splash, Login, Bienvenida y Detalle.',
  },
];

export default integrantes;
