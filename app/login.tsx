import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "~/src/components/TrocaTema";

export default function Login() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;

  const menuItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
  ];

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user) {
        router.push("/");
      }
    };
    checkUser();
  }, []);

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
        if (error.code === "auth/network-request-failed") {
          Alert.alert("Error", "Verifique sua conexão");
        }
        if (error.code === "auth/invalid-credential") {
          Alert.alert("Atenção", "Verifique as credenciais");
        }
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      {/* MENU LATERAL */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: Dimensions.get("window").height,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            flexDirection: "row",
            zIndex: 10,
          }}
        >
          <Animated.View
            style={{
              width: 220,
              backgroundColor: "#00994d",
              paddingTop: 60,
              paddingHorizontal: 20,
              height: "100%",
              transform: [{ translateX: slideAnim }],
            }}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAberto(false);
                  router.push(item.href);
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.buttonText,
                    fontWeight: "bold",
                  }}
                >
                  {"> " + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      {/* CABEÇALHO */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.text,
          width: "100%",
        }}
      >
        <Pressable onPress={toggleMenu}>
          <Ionicons name="menu" size={32} color={colors.text} />
        </Pressable>

        <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}>
          LOGIN
        </Text>
        <View style={{ width: 32 }} />
        <TrocaTema />
      </View>

      {/* Ícone */}
      <Image
        source={require("../assets/iconePerfil.png")}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          marginVertical: 32,
        }}
      />

      {/* Inputs */}
      <TextInput
        style={{
          width: "85%",
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: colors.background,
          marginBottom: 24,
          color: colors.text,
        }}
        placeholder="E-mail"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          width: "85%",
          borderWidth: 2,
          borderColor: colors.text,
          borderRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 16,
          backgroundColor: colors.background,
          marginBottom: 24,
          color: colors.text,
        }}
        placeholder="Senha"
        placeholderTextColor={colors.text}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Entrar */}
      <Pressable
        style={{
          borderWidth: 1.5,
          borderColor: colors.buttonBackground,
          paddingVertical: 10,
          paddingHorizontal: 32,
          borderRadius: 25,
        }}
        onPress={autenticar}
      >
        <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
          Entrar
        </Text>
      </Pressable>
    </View>
  );
}
