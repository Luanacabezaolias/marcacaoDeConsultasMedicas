// Importa as dependências principais do React
import React, { createContext, useContext, useState, useEffect } from 'react';
// Importa o AsyncStorage (armazenamento persistente no dispositivo)
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importa os serviços de autenticação (funções externas para login, registro, etc.)
import { authService } from '../services/auth';
// Importa os tipos usados para tipagem do contexto
import { User, LoginCredentials, RegisterData, AuthContextData } from '../types/auth';

// Define chaves únicas para salvar informações no AsyncStorage
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
};

// Cria o contexto de autenticação, inicialmente vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider que envolve toda a aplicação, fornecendo acesso ao contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado que guarda o usuário logado
  const [user, setUser] = useState<User | null>(null);
  // Estado que indica se está carregando dados do storage
  const [loading, setLoading] = useState(true);

  // Ao montar o componente, carrega usuário salvo e lista de usuários
  useEffect(() => {
    loadStoredUser();
    loadRegisteredUsers();
  }, []);

  // Carrega o usuário que estava salvo no AsyncStorage
  const loadStoredUser = async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser); // Se encontrar, define no estado
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false); // Marca como concluído o carregamento
    }
  };

  // Carrega os usuários registrados (depende do service)
  const loadRegisteredUsers = async () => {
    try {
      await authService.loadRegisteredUsers();
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  };

  // Função de login
  const signIn = async (credentials: LoginCredentials) => {
    try {
      // Faz login pelo service
      const response = await authService.signIn(credentials);
      setUser(response.user); // Salva o usuário no estado
      // Persiste os dados no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error; // Repassa o erro para quem chamou
    }
  };

  // Função de registro
  const register = async (data: RegisterData) => {
    try {
      // Cria um novo usuário pelo service
      const response = await authService.register(data);
      setUser(response.user); // Salva no estado
      // Persiste os dados no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      await authService.signOut(); // Chama o service para encerrar a sessão
      setUser(null); // Remove o usuário do estado
      // Remove do AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Atualiza os dados do usuário logado
  const updateUser = async (updatedUser: User) => {
    try {
      setUser(updatedUser); // Atualiza no estado
      // Atualiza também no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  };

  // Fornece o contexto para toda a aplicação
  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
