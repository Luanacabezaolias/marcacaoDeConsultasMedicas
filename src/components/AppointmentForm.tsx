import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Input, Text } from 'react-native-elements'; // Componentes de UI da biblioteca react-native-elements
import { Platform, View, TouchableOpacity } from 'react-native'; // Componentes básicos do React Native
import theme from '../styles/theme'; // Tema e estilo global da aplicação
import { Doctor } from '../types/doctors'; // Tipos de dados relacionados aos médicos
import { Appointment } from '../types/appointments'; // Tipos de dados relacionados aos agendamentos

// Lista de médicos fictícios para seleção na interface
const doctors: Doctor[] = [
   {
      id: '1',
      name: 'Dr. João Silva',
      specialty: 'Cardiologista',
      image: 'https://mighty.tools/mockmind-api/content/human/91.jpg', // Imagem do médico
   },
   {
      id: '2',
      name: 'Dra. Maria Santos',
      specialty: 'Dermatologista',
      image: 'https://mighty.tools/mockmind-api/content/human/97.jpg', // Imagem do médico
   },
   {
      id: '3',
      name: 'Dr. Pedro Oliveira',
      specialty: 'Oftalmologista',
      image: 'https://mighty.tools/mockmind-api/content/human/79.jpg', // Imagem do médico
   },
];

// Tipo para as propriedades do componente de agendamento
type AppointmentFormProps = {
   onSubmit: (appointment: {
      doctorId: string;
      date: Date;
      time: string;
      description: string;
   }) => void; // Função que será chamada ao enviar o formulário
};

// Função para gerar slots de horários para agendamento (9:00 até 18:00)
const generateTimeSlots = () => {
   const slots = [];
   for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`); // Adiciona slots de hora inteira
      slots.push(`${hour.toString().padStart(2, '0')}:30`); // Adiciona slots de meia hora
   }
   return slots;
};

// Componente do formulário de agendamento
const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
   const [selectedDoctor, setSelectedDoctor] = useState<string>(''); // Estado para armazenar o médico selecionado
   const [dateInput, setDateInput] = useState(''); // Estado para armazenar a data formatada
   const [selectedTime, setSelectedTime] = useState<string>(''); // Estado para armazenar o horário selecionado
   const [description, setDescription] = useState(''); // Estado para armazenar a descrição da consulta
   const timeSlots = generateTimeSlots(); // Gera os slots de horários

   // Função para validar a data informada pelo usuário
   const validateDate = (inputDate: string) => {
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // Regex para validar o formato da data (DD/MM/AAAA)
      const match = inputDate.match(dateRegex);

      if (!match) return false; // Se a data não corresponder ao padrão, retorna false

      const [, day, month, year] = match; // Desestruturação da data
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Criação do objeto Date
      const today = new Date(); // Data atual
      const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)); // Data máxima (3 meses à frente)

      // Verifica se a data está dentro do intervalo válido (hoje até 3 meses à frente)
      return date >= today && date <= maxDate;
   };

   // Função para lidar com a mudança da data digitada pelo usuário
   const handleDateChange = (text: string) => {
      const numbers = text.replace(/\D/g, ''); // Remove caracteres não numéricos (apenas números)
      
      // Formata a data conforme o usuário digita
      let formattedDate = '';
      if (numbers.length > 0) {
         if (numbers.length <= 2) {
            formattedDate = numbers;
         } else if (numbers.length <= 4) {
            formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
         } else {
            formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
         }
      }

      setDateInput(formattedDate); // Atualiza o estado da data formatada
   };

   // Função chamada quando o usuário clica no botão de agendamento
   const handleSubmit = () => {
      // Verifica se todos os campos foram preenchidos
      if (!selectedDoctor || !selectedTime || !description) {
         alert('Por favor, preencha todos os campos');
         return;
      }

      // Valida se a data fornecida é válida
      if (!validateDate(dateInput)) {
         alert('Por favor, insira uma data válida (DD/MM/AAAA)');
         return;
      }

      // Formata a data e chama a função de envio
      const [day, month, year] = dateInput.split('/');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      onSubmit({
         doctorId: selectedDoctor,
         date,
         time: selectedTime,
         description,
      });
   };

   // Função para verificar se o horário está disponível (aqui é apenas um mock, você pode adicionar lógica real)
   const isTimeSlotAvailable = (time: string) => {
      return true;
   };

   return (
      <Container>
         {/* Seção para selecionar o médico */}
         <Title>Selecione o Médico</Title>
         <DoctorList>
            {doctors.map((doctor) => (
               <DoctorCard
                  key={doctor.id}
                  selected={selectedDoctor === doctor.id}
                  onPress={() => setSelectedDoctor(doctor.id)} // Atualiza o médico selecionado ao clicar
               >
                  <DoctorImage source={{ uri: doctor.image }} />
                  <DoctorInfo>
                     <DoctorName>{doctor.name}</DoctorName>
                     <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
                  </DoctorInfo>
               </DoctorCard>
            ))}
         </DoctorList>

         {/* Seção para escolher a data */}
         <Title>Data e Hora</Title>
         <Input
            placeholder="Data (DD/MM/AAAA)"
            value={dateInput}
            onChangeText={handleDateChange} // Lida com a mudança de texto na data
            keyboardType="numeric"
            maxLength={10}
            containerStyle={InputContainer}
            errorMessage={dateInput && !validateDate(dateInput) ? 'Data inválida' : undefined} // Exibe erro se a data for inválida
         />

         {/* Seção para escolher o horário */}
         <TimeSlotsContainer>
            <TimeSlotsTitle>Horários Disponíveis:</TimeSlotsTitle>
            <TimeSlotsGrid>
               {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  return (
                     <TimeSlotButton
                        key={time}
                        selected={selectedTime === time} // Marca o horário selecionado
                        disabled={!isAvailable} // Desabilita horários indisponíveis
                        onPress={() => isAvailable && setSelectedTime(time)} // Atualiza o horário selecionado
                     >
                        <TimeSlotText selected={selectedTime === time} disabled={!isAvailable}>
                           {time}
                        </TimeSlotText>
                     </TimeSlotButton>
                  );
               })}
            </TimeSlotsGrid>
         </TimeSlotsContainer>

         {/* Seção para descrição da consulta */}
         <Input
            placeholder="Descrição da consulta"
            value={description}
            onChangeText={setDescription} // Atualiza a descrição
            multiline
            numberOfLines={4}
            containerStyle={InputContainer}
         />

         {/* Botão de submit */}
         <SubmitButton
            title="Agendar Consulta"
            onPress={handleSubmit} // Chama a função de submit quando pressionado
            buttonStyle={{
               backgroundColor: theme.colors.primary,
               borderRadius: 8,
               padding: 12,
               marginTop: 20,
            }}
         />
      </Container>
   );
};

// Estilos usando styled-components
const Container = styled.View`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const DoctorList = styled.ScrollView`
  margin-bottom: ${theme.spacing.large}px;
`;

const DoctorCard = styled(TouchableOpacity)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${(props: { selected: boolean }) => props.selected ? theme.colors.primary : theme.colors.white};
  border-radius: 8px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const TimeSlotsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsTitle = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
`;

const TimeSlotButton = styled(TouchableOpacity)<{ selected: boolean; disabled: boolean }>`
  background-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.white};
  padding: ${theme.spacing.small}px ${theme.spacing.medium}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.background 
      : props.selected 
        ? theme.colors.primary 
        : theme.colors.text};
  opacity: ${(props: { disabled: boolean }) => props.disabled ? 0.5 : 1};
`;

const TimeSlotText = styled(Text)<{ selected: boolean; disabled: boolean }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props: { selected: boolean; disabled: boolean }) => 
    props.disabled 
      ? theme.colors.text 
      : props.selected 
        ? theme.colors.white 
        : theme.colors.text};
`;

const InputContainer = {
   marginBottom: theme.spacing.medium,
   backgroundColor: theme.colors.white,
   borderRadius: 8,
   paddingHorizontal: theme.spacing.medium,
};

const SubmitButton = styled(Button)`
  margin-top: ${theme.spacing.large}px;
`;

export default AppointmentForm;
