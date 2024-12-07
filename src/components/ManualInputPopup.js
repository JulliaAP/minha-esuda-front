import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";

const ManualInputPopup = ({ visible, onSubmit, onCancel }) => {
  const [code, setCode] = useState("");

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Digite o código do documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o código"
            value={code}
            onChangeText={setCode}
            accessible={true}
            accessibilityLabel="Campo de entrada de código"
            accessibilityHint="Digite o código do documento"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
                onSubmit(code);
                setCode(""); 
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Enviar código"
            accessibilityHint="Toque uma vez para enviar o código"
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
                onCancel();
                setCode(""); 
              }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Cancelar"
            accessibilityHint="Toque uma vez para cancelar"
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "50%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ManualInputPopup;