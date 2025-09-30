import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import TrocaTema from "~/src/components/TrocaTema";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const { colors } = useTheme();
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

const menuItems = logado
    ? [
        { label: "Início", href: "/" },
        { label: "Lista", href: "/listaMotos" },
        { label: "Cadastro", href: "/cadastroMoto" },
        { label: "Sobre", href: "/sobre" },
      ]
    : [
        { label: "Início", href: "/" },
        { label: "Login", href: "/login" },
        { label: "Sobre", href: "/sobre" },
      ];

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    router.replace("/");
  };

  useEffect(() => {
    const toValue = menuAberto ? 0 : -220;
    Animated.timing(slideAnim, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("@user");
      setLogado(!!user);
    };
    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Cabeçalho */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 40,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.text,
        }}
      >
        <Pressable onPress={() => setMenuAberto(true)}>
          <Ionicons name="menu" size={32} color={colors.text} />
        </Pressable>

        <Pressable
          onPress={logout}
          disabled={!logado}
          style={{ display: logado ? "flex" : "none" }}
        >
          <Text style={{ color: colors.text }}>Sair</Text>
        </Pressable>

        <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}>
          MOTOTRACK
        </Text>

        <TrocaTema />
        <Image
          source={require("../assets/iconePerfil.png")}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Linha separadora */}
      <View style={{ height: 1, backgroundColor: colors.text, width: "100%" }} />

      {/* Menu lateral */}
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
                  style={{ fontSize: 18, color: colors.text, fontWeight: "bold" }}
                >
                  {"> " + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      {/* Banner */}
      <View style={{ width: "100%", height: 240, backgroundColor: colors.background }}>
        <Image
          source={require("../assets/backgroundMottu.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Conteúdo principal */}
      <View
        style={{
          backgroundColor: colors.background,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 8,
            color: colors.text,
          }}
        >
          Bem-Vindo ao Moto Track, um sistema de gestão de motos com UWDTags.
        </Text>

        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            marginBottom: 20,
            color: colors.text,
          }}
        >
          Este sistema visa controlar e mapear motos usando etiquetas UWD.
        </Text>

        {logado ? (
          <Link href="/cadastroMoto" asChild>
            <Pressable
              style={{
                borderWidth: 1.5,
                borderColor: "#00994d",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 25,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "500" }}>
                Cadastrar Moto
              </Text>
            </Pressable>
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Pressable
              style={{
                borderWidth: 1.5,
                borderColor: "#00994d",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 25,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "500" }}>
                Acessar como funcionário
              </Text>
            </Pressable>
          </Link>
        )}
      </View>
    </View>
  );
}
