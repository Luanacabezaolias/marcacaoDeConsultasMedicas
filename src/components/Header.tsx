// Importações necessárias
import React from 'react';
import styled from 'styled-components/native'; // biblioteca para estilização
import { Avatar } from 'react-native-elements'; // componente pronto para exibir foto de usuário
import { useAuth } from '../contexts/AuthContext'; // hook de autenticação para pegar dados do usuário
import NotificationBell from './NotificationBell'; // componente que exibe o sino de notificações
import theme from '../styles/theme'; // centralização de cores e estilos do app

// Componente principal do cabeçalho
const Header: React.FC = () => {
  const { user } = useAuth(); // pega o usuário do contexto de autenticação

  if (!user) return null; // se não existir usuário logado, não renderiza nada

  return (
    <Container> {/* Container principal do cabeçalho */}
      <UserInfo> {/* Agrupa avatar e textos */}
        <Avatar
          size="medium" // tamanho médio
          rounded // formato redondo
          source={{ uri: user.image }} // imagem do usuário
          containerStyle={styles.avatar} // estilo de fallback
        />
        <TextContainer> {/* Container dos textos ao lado do avatar */}
          <WelcomeText>Bem-vindo(a),</WelcomeText> {/* texto fixo */}
          <UserName>{user.name}</UserName> {/* nome do usuário */}
        </TextContainer>
      </UserInfo>
      <NotificationBell /> {/* ícone de notificações no lado direito */}
    </Container>
  );
};

// Estilo extra para o Avatar (fundo com cor do tema)
const styles = {
  avatar: {
    backgroundColor: theme.colors.primary,
  },
};

// Estilos criados com styled-components
const Container = styled.View`
  background-color: ${theme.colors.primary}; // cor de fundo do cabeçalho
  padding: 16px; // espaçamento interno
  flex-direction: row; // elementos lado a lado
  justify-content: space-between; // espaço entre avatar e notificações
  align-items: center; // alinhamento central na vertical
  border-bottom-width: 1px; // borda inferior
  border-bottom-color: ${theme.colors.border}; // cor da borda
`;

const UserInfo = styled.View`
  flex-direction: row; // avatar e textos lado a lado
  align-items: center; // alinhamento vertical centralizado
  flex: 1; // ocupa espaço disponível
`;

const TextContainer = styled.View`
  margin-left: 12px; // espaço entre avatar e textos
`;

const WelcomeText = styled.Text`
  font-size: 14px; // tamanho menor
  color: ${theme.colors.white}; // texto branco
  opacity: 0.9; // leve transparência
`;

const UserName = styled.Text`
  font-size: 18px; // maior que o texto de boas-vindas
  font-weight: bold; // em negrito
  color: ${theme.colors.white}; // texto branco
`;

export default Header; // exporta o componente para ser usado em outras telas
