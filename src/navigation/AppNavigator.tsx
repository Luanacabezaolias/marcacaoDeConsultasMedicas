import React from 'react';
// Importa o container de navegação do React Navigation
import { NavigationContainer } from '@react-navigation/native';
// Cria a pilha de navegação nativa
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Hook para obter informações do usuário autenticado
import { useAuth } from '../contexts/AuthContext';
// Tipagem das rotas da aplicação
import { RootStackParamList } from '../types/navigation';

// Importa todas as telas da aplicação
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import PatientDashboardScreen from '../screens/PatientDashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Cria a stack navigator com tipagem das rotas
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente principal do Navigator da aplicação
export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth(); // Pega o usuário e estado de loading do contexto de autenticação

  // Enquanto os dados do usuário estão carregando, não renderiza nada (ou poderia ser um loading)
  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Remove o header padrão de todas as telas
        }}
      >
        {!user ? (
          // Se não tiver usuário logado, renderiza apenas as rotas públicas
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Se tiver usuário logado, renderiza as rotas protegidas
          <>
            {user.role === 'admin' && (
              // Tela exclusiva para administrador
              <Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboardScreen}
                options={{ title: 'Painel Administrativo' }}
              />
            )}
            
            {user.role === 'doctor' && (
              // Tela exclusiva para médico
              <Stack.Screen 
                name="DoctorDashboard" 
                component={DoctorDashboardScreen}
                options={{ title: 'Painel do Médico' }}
              />
            )}
            
            {user.role === 'patient' && (
              // Tela exclusiva para paciente
              <Stack.Screen 
                name="PatientDashboard" 
                component={PatientDashboardScreen}
                options={{ title: 'Painel do Paciente' }}
              />
            )}

            {/* Rotas comuns para todos os usuários autenticados */}
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'Início' }}
            />
            <Stack.Screen 
              name="CreateAppointment" 
              component={CreateAppointmentScreen}
              options={{ title: 'Agendar Consulta' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Perfil' }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ title: 'Editar Perfil' }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
              options={{ title: 'Notificações' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ title: 'Configurações' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
