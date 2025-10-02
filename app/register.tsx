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
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "~/src/components/TrocaTema";

export default function Register() {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(-220)).current;

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/sobre" },
  ];

  const toggleMenu = () => setMenuAberto(!menuAberto);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  const registrar = () => {
    if (!email || !senha || !confirmSenha) {
      Alert.alert("Atenção", "Preencha todos os campos");
      return;
    }
    if (senha !== confirmSenha) {
      Alert.alert("Atenção", "As senhas não conferem");
      return;
    }

    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        Alert.alert("Sucesso", "Conta criada com sucesso");
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Atenção", "E-mail já cadastrado");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Atenção", "E-mail inválido");
        } else if (error.code === "auth/weak-password") {
          Alert.alert("Atenção", "Senha muito fraca");
        } else {
          Alert.alert("Erro", "Algo deu errado");
        }
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", paddingTop: 50 }}>

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
                <Text style={{ fontSize: 18, color: colors.buttonText, fontWeight: "bold" }}>
                  {"> " + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

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
          REGISTRAR
        </Text>

        <View style={{ width: 32 }} />
        <TrocaTema />
      </View>

      <Image
        source={require("../assets/iconePerfil.png")}
        style={{ width: 120, height: 120, borderRadius: 60, marginVertical: 32 }}
      />

      {["E-mail", "Senha", "Confirmar Senha"].map((placeholder, index) => {
        const value = index === 0 ? email : index === 1 ? senha : confirmSenha;
        const setValue = index === 0 ? setEmail : index === 1 ? setSenha : setConfirmSenha;
        const secure = index > 0;

        return (
          <TextInput
            key={index}
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
            placeholder={placeholder}
            placeholderTextColor={colors.text}
            secureTextEntry={secure}
            value={value}
            onChangeText={setValue}
          />
        );
      })}

      <Pressable
        style={{
          borderWidth: 1.5,
          borderColor: colors.buttonBackground,
          paddingVertical: 10,
          paddingHorizontal: 32,
          borderRadius: 25,
        }}
        onPress={registrar}
      >
        <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
          Registrar
        </Text>
      </Pressable>
    </View>
  );
}
