import { useState, useRef, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Animated,
  Alert,
} from "react-native";
import { router, Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [menuVisible, setMenuVisible] = useState(false);

  const autenticar = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (error.code === "auth/network-request-failed") {
          Alert.alert("Error", "Verifique sua conexão");
        }
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Atenção", "Verifique as credenciais");
        }
      });
  };
  

  function toggleMenu() {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!menuVisible);
  }

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        router.push("/");
      } else {
        console.log("Error ao verificar login");
      }
    };
    checkUser();
  }, []);


  return (
    <View style={styles.container}>
      {/* Menu lateral */}
      <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
        <Link href="/" asChild><Text style={styles.link}> {'>'} Início</Text></Link>
        <Link href="/sobre" asChild><Text style={styles.link}> {'>'} Sobre</Text></Link>
      </Animated.View>

      {/* Cabeçalho com botão de menu */}
      <View style={styles.header}>
        <Pressable onPress={toggleMenu}>
          <Image
            source={require('../assets/menuIcon.png')}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
        <Text style={styles.headerTitle}>LOGIN</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Linha separadora */}
      <View style={styles.linha} />

      {/* Botão título */}
      <View style={styles.topButton}>
        <Text style={styles.topButtonText}>Login de Funcionário</Text>
      </View>

      {/* Ícone central */}
      <Image
        source={require("../assets/iconePerfil.png")}
        style={styles.avatar}
      />
  
       {/* Campo de e-mail */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />

      {/* Campo de senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
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
    backgroundColor: "#eee",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#00994d",
    paddingTop: 100,
    paddingLeft: 20,
    zIndex: 1000,
  },
  link: {
    color: "#000",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    width: "100%",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  linha: {
    height: 1,
    width: "100%",
    backgroundColor: "#444",
    marginBottom: 20,
  },
  topButton: {
    borderWidth: 1,
    borderColor: "#008000",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 24,
  },
  topButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 32,
  },
  input: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    marginBottom: 24,
    color: "#000",
  },
  button: {
    borderWidth: 1,
    borderColor: "#008000",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});
