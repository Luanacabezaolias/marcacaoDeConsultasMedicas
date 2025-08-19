import React from 'react';
import styled from 'styled-components/native'; // Importa styled-components para criar componentes com estilo
import { ViewStyle } from 'react-native'; // Importa o tipo ViewStyle para estilizar componentes nativos
import { ListItem, Avatar } from 'react-native-elements'; // Importa componentes da biblioteca react-native-elements
import theme from '../styles/theme'; // Importa o tema global da aplicação, onde as cores e outros estilos são definidos

// Interface para o tipo de dados de um médico
interface Doctor {
  id: string; // Identificador único do médico
  name: string; // Nome do médico
  specialty: string; // Especialidade do médico
  image: string; // URL da imagem do médico
}

// Interface para as propriedades do componente DoctorList
interface DoctorListProps {
  doctors: Doctor[]; // Lista de médicos a ser exibida
  onSelectDoctor: (doctor: Doctor) => void; // Função que será chamada quando um médico for selecionado
  selectedDoctorId?: string; // ID do médico selecionado (se houver)
  style?: ViewStyle; // Estilo opcional para o container (para customização)
}

// Componente funcional DoctorList
const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onSelectDoctor,
  selectedDoctorId,
  style,
}) => {
  return (
    <Container style={style}>
      {/* Mapeia a lista de médicos e renderiza um item para cada médico */}
      {doctors.map((doctor) => (
        <ListItem
          key={doctor.id} // Usa o ID do médico como chave única para o item da lista
          onPress={() => onSelectDoctor(doctor)} // Chama a função onSelectDoctor quando o item for pressionado
          containerStyle={[ 
            styles.listItem, // Aplica o estilo básico do item da lista
            selectedDoctorId === doctor.id && styles.selectedItem, // Se o médico for o selecionado, aplica estilo adicional
          ]}
        >
          {/* Exibe a imagem do médico com o componente Avatar */}
          <Avatar
            size="medium"
            rounded
            source={{ uri: doctor.image }} // A URL da imagem é passada como fonte
            containerStyle={styles.avatar} // Estilo do avatar
          />
          <ListItem.Content>
            {/* Exibe o nome do médico */}
            <ListItem.Title style={styles.name}>{doctor.name}</ListItem.Title>
            {/* Exibe a especialidade do médico */}
            <ListItem.Subtitle style={styles.specialty}>
              {doctor.specialty}
            </ListItem.Subtitle>
          </ListItem.Content>
          {/* Exibe um ícone de "Chevron" (seta) indicando que é possível clicar para mais detalhes */}
          <ListItem.Chevron />
        </ListItem>
      ))}
    </Container>
  );
};

// Estilos para os diferentes elementos da lista de médicos
const styles = {
  listItem: {
    borderRadius: 8, // Bordas arredondadas
    marginVertical: 4, // Margem vertical entre os itens
    backgroundColor: theme.colors.background, // Cor de fundo do item (do tema)
    borderWidth: 1, // Borda fina
    borderColor: theme.colors.border, // Cor da borda (do tema)
  },
  selectedItem: {
    backgroundColor: theme.colors.primary + '20', // Cor de fundo quando o item está selecionado (opacidade adicionada)
    borderColor: theme.colors.primary, // Cor da borda quando o item está selecionado
  },
  avatar: {
    backgroundColor: theme.colors.primary, // Cor de fundo do avatar
  },
  name: {
    fontSize: 16, // Tamanho da fonte do nome do médico
    fontWeight: 'bold', // Define a fonte como negrito
    color: theme.colors.text, // Cor do texto (do tema)
  },
  specialty: {
    fontSize: 14, // Tamanho da fonte da especialidade
    color: theme.colors.text, // Cor do texto (do tema)
    opacity: 0.7, // Opacidade para diminuir a intensidade da cor
  },
};

// Estilo para o container que envolve a lista de médicos
const Container = styled.View`
  margin-bottom: 15px; // Espaço inferior para o container
`;

export default DoctorList; // Exporta o componente DoctorList para ser utilizado em outras partes da aplicação
