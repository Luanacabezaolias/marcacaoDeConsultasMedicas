// Importações
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native'; // estilização
import { TouchableOpacity } from 'react-native'; // botão clicável
import { Badge } from 'react-native-elements'; // bolinha de contador
import { useAuth } from '../contexts/AuthContext'; // contexto do usuário
import { useNavigation } from '@react-navigation/native'; // navegação
import { notificationService } from '../services/notifications'; // serviço de notificações
import theme from '../styles/theme'; // tema de cores

// Componente do sino de notificações
const NotificationBell: React.FC = () => {
  const { user } = useAuth(); // pega o usuário autenticado
  const navigation = useNavigation(); // hook para navegar entre telas
  const [unreadCount, setUnreadCount] = useState(0); // estado com número de notificações não lidas

  // Função para carregar contador de notificações não lidas
  const loadUnreadCount = async () => {
    if (!user?.id) return; // se não tiver usuário logado, não faz nada
    
    try {
      const count = await notificationService.getUnreadCount(user.id); // busca no serviço
      setUnreadCount(count); // salva no estado
    } catch (error) {
      console.error('Erro ao carregar contador de notificações:', error);
    }
  };

  // Efeito: carrega contador ao montar e recarrega a cada 30s
  useEffect(() => {
    loadUnreadCount();
    
    const interval = setInterval(loadUnreadCount, 30000); // recarrega a cada 30 segundos
    
    return () => clearInterval(interval); // limpa intervalo ao desmontar
  }, [user?.id]);

  // Efeito: recarrega quando a tela volta ao foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUnreadCount);
    return unsubscribe; // remove listener ao desmontar
  }, [navigation, user?.id]);

  // Ação ao clicar no sino
  const handlePress = () => {
    navigation.navigate('Notifications' as never); // vai para tela "Notifications"
  };

  return (
    <TouchableOpacity onPress={handlePress}> {/* botão clicável */}
      <BellContainer>
        <BellIcon>🔔</BellIcon> {/* ícone do sino */}
        
        {unreadCount > 0 && ( // só mostra badge se houver notificações
          <Badge
            value={unreadCount > 99 ? '99+' : unreadCount.toString()} // exibe número (ou 99+)
            status="error" // cor vermelha
            containerStyle={styles.badge} // estilo do container
            textStyle={styles.badgeText} // estilo do texto
          />
        )}
      </BellContainer>
    </TouchableOpacity>
  );
};

// Estilos para o Badge
const styles = {
  badge: {
    position: 'absolute' as const, // badge fica sobreposto
    top: -8,
    right: -8,
  },
  badgeText: {
    fontSize: 10, // fonte pequena
  },
};

// Estilos com styled-components
const BellContainer = styled.View`
  position: relative; // necessário para o badge ficar sobreposto
  padding: 8px;
`;

const BellIcon = styled.Text`
  font-size: 24px; // tamanho do sino
  color: ${theme.colors.white}; // cor branca do tema
`;

export default NotificationBell; // exporta o componente
