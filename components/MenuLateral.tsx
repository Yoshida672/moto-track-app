import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Pressable,
  Image,
} from "react-native";

export default function MenuLateral() {
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  return (
    <View style={{ zIndex: 100 }}>
      {/* Botão do menu no cabeçalho */}
      {!menuAberto && (
        <Pressable onPress={() => setMenuAberto(true)}>
          <Image
            source={require("../assets/menuIcon.png")}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      )}

      {/* MENU LATERAL (ABSOLUTE) */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
          style={{
            position: "absolute",
            top: -55,
            left: -15,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 100,
            flexDirection: "row",
          }}
        >
          <Animated.View
            style={{
              width: 220,
              height: "100%",
              backgroundColor: "#00994d",
              paddingTop: 60,
              paddingHorizontal: 20,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {[
              { label: "Início", href: "/" },
              { label: "Login", href: "/login" },
              { label: "Cadastro", href: "/cadastroMoto" },
              { label: "Lista", href: "/listaMotos" },
              { label: "Sobre", href: "/sobre" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAberto(false);
                  router.push(item.href);
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#000", fontWeight: "bold" }}
                >
                  {"> " + item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
      )}
    </View>
  );
}
