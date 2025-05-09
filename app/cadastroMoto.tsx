import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";
import { salvarMoto } from "../utils/storage";
import { Moto } from "../types/moto";
import { v4 as uuidv4 } from "uuid";

export default function CadastroMoto() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [apriltag, setApriltag] = useState("");
  const [patio, setPatio] = useState("");

  async function salvar() {
    const novaMoto: Moto = {
      id: uuidv4(),
      modelo,
      placa,
      apriltag,
      patio,
    };
    await salvarMoto(novaMoto);
    alert("Moto cadastrada!");
    setModelo("");
    setPlaca("");
    setApriltag("");
    setPatio("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrando sua moto.</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Modelo:</Text>
        <TextInput
          placeholder="Ex: POP 100"
          style={styles.input}
          value={modelo}
          onChangeText={setModelo}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Placa:</Text>
        <TextInput
          placeholder="Ex: DWS4567"
          style={styles.input}
          value={placa}
          onChangeText={setPlaca}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>AprilTag:</Text>
        <TextInput
          placeholder="Ex: 02134"
          style={styles.input}
          value={apriltag}
          onChangeText={setApriltag}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pátio:</Text>
        <TextInput
          placeholder="Ex: Pátio Paulista"
          style={styles.input}
          value={patio}
          onChangeText={setPatio}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Salvar Moto" onPress={salvar} color="#12a138" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 32,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#12a138",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 40,
    color: "#000",
  },
  formGroup: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    width: "30%",
    textAlign: "right",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#12a138",
    width: "60%",
    fontSize: 16,
    color: "#12a138",
    paddingBottom: 4,
  },
  buttonContainer: {
    marginTop: 32,
    width: "100%",
  },
});
