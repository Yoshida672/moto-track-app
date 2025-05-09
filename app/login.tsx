import { useState } from "react";
import { TextInput, View, Text, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Login() {
  const [senha, setSenha] = useState("");

  function autenticar() {
    if (senha === "1234") router.push("/cadastroMoto");
    else alert("Senha inválida!");
  }

  return (
    <View style={styles.container}>

      {/* Linha separadora */}
      <View style={styles.linha} />

      {/* Botão título */}
      <View style={styles.topButton}>
        <Text style={styles.topButtonText}>Login de Funcionário</Text>
      </View>

      {/* Ícone central */}
      <Image
        source={require('../assets/iconePerfil.png')}
        style={styles.avatar}
      />

      {/* Campo de senha */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Entrar */}
      <Pressable style={styles.button} onPress={autenticar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  voltarIcon: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  linha: {
    height: 1,
    width: '100%',
    backgroundColor: '#444',
    marginBottom: 20,
  },
  topButton: {
    borderWidth: 1,
    borderColor: '#008000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 24,
  },
  topButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 32,
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 24,
    color: '#000',
  },
  button: {
    borderWidth: 1,
    borderColor: '#008000',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});
