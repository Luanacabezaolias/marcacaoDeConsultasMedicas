import React from 'react';
// Importa o React, necessário para criar componentes.

import { AuthProvider } from './src/contexts/AuthContext';
// Provedor de contexto de autenticação, permitindo acesso ao usuário logado.

import { AppNavigator } from './src/navigation/AppNavigator';
// Gerencia a navegação entre as telas (ex: Login, Home, Perfil).

import { ThemeProvider } from 'styled-components/native';
import theme from './src/styles/theme';
// Aplica tema personalizado (cores, fontes) nos componentes.

import { StatusBar } from 'react-native';
// Controla a barra de status (cor, estilo dos ícones).

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Aplica o tema global na app */}
      <AuthProvider>
        {/* Prove o contexto de autenticação para todas as telas */}
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.colors.primary} 
        />
        {/* Configura a cor e estilo da barra de status */}
        <AppNavigator />
        {/* Renderiza as telas conforme a navegação do usuário */}
      </AuthProvider>
    </ThemeProvider>
  );
}
