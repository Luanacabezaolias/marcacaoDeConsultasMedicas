// Importações
import React from 'react';
import styled from 'styled-components/native'; // estilização com styled-components
import { ViewStyle, TouchableOpacity } from 'react-native'; // tipos e botão clicável
import theme from '../styles/theme'; // tema centralizado de cores e estilos

// Props recebidas pelo componente
interface TimeSlotListProps {
  onSelectTime: (time: string) => void; // função chamada ao selecionar horário
  selectedTime?: string; // horário selecionado (opcional)
  style?: ViewStyle; // estilos extras passados de fora
}

// Props para estilização condicional
interface StyledProps {
  isSelected: boolean; // indica se o card está selecionado
}

// Componente principal
const TimeSlotList: React.FC<TimeSlotListProps> = ({
  onSelectTime,
  selectedTime,
  style,
}) => {
  // Função que gera os horários de 30 em 30 minutos das 9h às 18h
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) { // laço de 9h até 17h
      slots.push(`${hour.toString().padStart(2, '0')}:00`); // exemplo: 09:00, 10:00...
      slots.push(`${hour.toString().padStart(2, '0')}:30`); // exemplo: 09:30, 10:30...
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(); // gera lista de horários

  return (
    <Container style={style}>
      <TimeGrid>
        {timeSlots.map((time) => (
          <TimeCard
            key={time} // chave única
            onPress={() => onSelectTime(time)} // dispara callback ao clicar
            isSelected={selectedTime === time} // verifica se está selecionado
          >
            <TimeText isSelected={selectedTime === time}>{time}</TimeText>
          </TimeCard>
        ))}
      </TimeGrid>
    </Container>
  );
};

// --- Estilos com styled-components ---

// Container externo
const Container = styled.View`
  margin-bottom: 15px;
`;

// Grid de horários (distribui botões em várias linhas)
const TimeGrid = styled.View`
  flex-direction: row; // itens lado a lado
  flex-wrap: wrap; // permite quebrar linha
  justify-content: space-between; // espaço entre os cards
  gap: 6px; // espaçamento entre eles
`;

// Card de horário (clicável)
const TimeCard = styled(TouchableOpacity)<StyledProps>`
  width: 23%; // ocupa 23% da linha (4 por linha, com espaço)
  padding: 8px;
  border-radius: 6px;
  background-color: ${(props: StyledProps) =>
    props.isSelected ? theme.colors.primary + '20' : theme.colors.background}; // cor muda se selecionado
  border-width: 1px;
  border-color: ${(props: StyledProps) =>
    props.isSelected ? theme.colors.primary : theme.colors.border}; // borda também muda
  align-items: center;
  justify-content: center;
`;

// Texto do horário
const TimeText = styled.Text<StyledProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${(props: StyledProps) =>
    props.isSelected ? theme.colors.primary : theme.colors.text}; // cor do texto muda se selecionado
`;

export default TimeSlotList;
