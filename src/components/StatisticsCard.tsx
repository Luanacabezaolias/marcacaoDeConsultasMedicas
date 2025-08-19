// Importações
import React from 'react';
import styled from 'styled-components/native'; // estilização com styled-components
import { ViewStyle } from 'react-native'; // tipo para estilos extras
import theme from '../styles/theme'; // tema de cores e estilos

// Tipagem das props do componente
interface StatisticsCardProps {
  title: string; // título do card
  value: string | number; // valor principal (estatística)
  subtitle?: string; // subtítulo opcional
  color?: string; // cor personalizada (borda/valor)
  icon?: React.ReactNode; // ícone opcional
  style?: ViewStyle; // estilo externo opcional
}

// Componente principal
const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  color = theme.colors.primary, // se não passar, usa cor padrão do tema
  icon,
  style,
}) => {
  return (
    <Container style={style} color={color}> {/* container com borda colorida */}
      <Header>
        {icon && <IconContainer>{icon}</IconContainer>} {/* mostra ícone se existir */}
        <Title>{title}</Title> {/* título do card */}
      </Header>
      <Value color={color}>{value}</Value> {/* valor principal, destacado na cor */}
      {subtitle && <Subtitle>{subtitle}</Subtitle>} {/* subtítulo opcional */}
    </Container>
  );
};

// Estilos com styled-components

// Container principal do card
const Container = styled.View<{ color: string }>`
  background-color: ${theme.colors.white}; // fundo branco
  border-radius: 12px; // cantos arredondados
  padding: 16px; // espaçamento interno
  margin: 8px; // espaçamento externo
  min-height: 120px; // altura mínima
  justify-content: space-between; // distribui conteúdo no espaço
  border-left-width: 4px; // borda lateral esquerda
  border-left-color: ${(props) => props.color}; // cor da borda
  shadow-color: ${theme.colors.text}; // cor da sombra
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3; // sombra no Android
`;

// Header: título + ícone
const Header = styled.View`
  flex-direction: row; // ícone + texto na horizontal
  align-items: center; // alinhamento vertical
  margin-bottom: 8px; // espaço inferior
`;

// Container do ícone
const IconContainer = styled.View`
  margin-right: 8px; // espaço entre ícone e título
`;

// Título
const Title = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500; // semi-negrito
  opacity: 0.8;
`;

// Valor principal
const Value = styled.Text<{ color: string }>`
  font-size: 28px; // bem maior
  font-weight: bold;
  color: ${(props) => props.color}; // destaca na cor escolhida
  margin-bottom: 4px;
`;

// Subtítulo (opcional)
const Subtitle = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.6; // mais apagado
`;

export default StatisticsCard; // exporta o card
