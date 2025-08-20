// Importa o criador de Stack Navigator (navegação em pilha)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importa as telas que serão usadas nas rotas
import HomeScreen from '../screens/HomeScreen';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Cria o stack (objeto de navegação)
const Stack = createNativeStackNavigator();

// Componente principal que define as rotas do app
export default function AppRoutes() {
  return (
    <Stack.Navigator
      // Opções padrão aplicadas a todas as telas
      screenOptions={{
        headerShown: false,          // Oculta o cabeçalho (header) padrão do React Navigation
        animation: 'slide_from_right', // Animação ao trocar de tela (slide da direita p/ esquerda)
      }}
    >
      {/* Rota inicial (Home) */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Rota para criar um agendamento */}
      <Stack.Screen name="CreateAppointment" component={CreateAppointmentScreen} />

      {/* Rota do perfil do usuário */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
