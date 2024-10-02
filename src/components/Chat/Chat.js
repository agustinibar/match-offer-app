import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore'; 
import { db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthContext'; // Importar el contexto de autenticación

export default function Chat({ match, closeChat }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext); // Obtener la información del usuario desde el contexto

  console.log("Este es el Match:", match)  
  useEffect(() => {
    const q = query(collection(db, 'messages'), where('matchId', '==', match._id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => doc.data());
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [match._id]);

  const sendMessage = async () => {
    if (message.trim() !== '') {
      await addDoc(collection(db, 'messages'), {
        matchId: match._id,    
        text: message,         
        sender: user?.name || 'Anónimo',  // Incluimos el nombre del remitente
        timestamp: new Date()
      });

      setMessage(''); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat con {match?.customer?.name || 'Cliente'}</Text>

      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text>{msg.sender}: {msg.text}</Text> {/* Mostramos el nombre del remitente */}
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un mensaje..."
      />
      <Button title="Enviar" onPress={sendMessage} />

      <Button title="Cerrar" onPress={closeChat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
