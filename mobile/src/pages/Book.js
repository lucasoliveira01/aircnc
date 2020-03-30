import React, { useState } from "react";
import {
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

import DatePicker from 'react-native-datepicker'

import api from "../services/api";

export default function Book({ navigation }) {
  let today = new Date().toISOString().slice(0, 10)

  const [date, setDate] = useState('');

  const id = navigation.getParam("id");

  if(id){
    navigation.navigate("Book")
  }

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    console.log(id, user_id);

    let url = `/spots/${id}/bookings`;

    console.log(url);

    const response = await api.get(
      `/spots/${id}/bookings`,
      {
        date
      },
      {
        headers: { user_id }
      }
    )

    console.log(response);

    Alert.alert("Solicitação de reserva enviada.");

    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false} //sem correçao de texto
        value={date}
        onChangeText={setDate}
      /> */}
      <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },

  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
