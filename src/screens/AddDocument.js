import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { getDocumentData } from "../services/api";
import DocumentCard from "../components/DocumentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddDocument = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const { data } = route.params;

  const [documentInfo, setDocumentInfo] = useState(null);
  useEffect(() => {
    const fetchDocumentData = async () => {
      const parsedData = await parseDocumentData(data);
      setDocumentInfo(parsedData);
    };
    fetchDocumentData();
  }, [data]);

  const parseDocumentData = async (data) => {
    const documentData = await getDocumentData(data);
    console.log(`${JSON.stringify(documentData)}`);
    return {
      _id: documentData.data._id || "Unknown _id",
      name: documentData.data.name || "Unknown name",
      cpf: documentData.data.cpf || "Unknown cpf",
      birthDate: documentData.data.birthDate || "Unknown date",
      institution: documentData.data.institution || "Unknown institution",
      course: documentData.data.course || "Unknown date",
      issuer: documentData.data.issuer || "Unknown issuer",
      validity: documentData.data.validity || "Unknown date",
      profilePicture: documentData.data.profilePicture || null,
    };
  };

  const handleAdd = async () => {
    try {
      const documentList =
        JSON.parse(await AsyncStorage.getItem("documents")) || [];
      documentList.push(documentInfo);
      await AsyncStorage.setItem("documents", JSON.stringify(documentList));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error saving document", error);
    }
  };

  return documentInfo ? (
    <View style={styles.container}>
      <Text
        style={[styles.title, isLandscape && styles.titleLandscape]}
        accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Adicionar documento"
      >
        Adicionar documento
      </Text>

      <Text
        style={[styles.subtitle, isLandscape && styles.subtitleLandscape]}
        accessible={true}
        accessibilityLabel="Verifique se as informações do seu documento estão corretas"
      >
        Verifique se as informações do seu documento estão corretas
      </Text>

      {documentInfo && (
        <View style={styles.cardContainer}>
          <DocumentCard
            {...documentInfo}
            accessible={true}
            accessibilityLabel="Informações do documento"
            accessibilityHint="Mostra as informações detalhadas do documento"
          />
        </View>
      )}
      <View style={[styles.buttonContainer, isLandscape && styles.buttonContainerLandscape,]}>
        <TouchableOpacity
          style={[styles.addButton, isLandscape && styles.buttonLandscape]}
          onPress={handleAdd}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Adicionar"
          accessibilityHint="Toque uma vez para adicionar o documento"
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancelButton, isLandscape && styles.buttonLandscape]}
          onPress={() => navigation.navigate("Home")}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Cancelar"
          accessibilityHint="Toque uma vez para cancelar"
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleLandscape: {
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitleLandscape: {
    marginBottom: 0,
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButtonText:{
    color: "#fff",
    fontSize: 16,
  },
  buttonLandscape: {
    marginVertical: 0,
    marginHorizontal: 10,
    marginTop: -20,
  },
});

export default AddDocument;
