import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Moto } from "../types/moto";
import { useRouter } from "expo-router";
import { api } from "../src/api/fetch";
import { api_delete } from "../src/api/delete";
import { MenuItem, menuItems } from "~/src/components/MenuItems";
import TrocaTema from "~/src/components/TrocaTema";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MENU_ITEMS: MenuItem[] = menuItems;

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  useEffect(() => {
    carregarMotos();
    checkUser();
  }, []);

  const carregarMotos = async () => {
    try {
      const data = await api.fetchMotos();
      setMotos(data.content);
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
    }
  };

  const checkUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    setLogado(!!user);
  };

  const confirmarExclusao = (id: number) => {
    Alert.alert("Confirmar", "Deseja realmente excluir esta moto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => handleExcluirMoto(id),
      },
    ]);
  };

  const handleExcluirMoto = async (id: number) => {
    const motoRemovida = motos.find((m) => m.id === id);
    setMotos((prev) => prev.filter((m) => m.id !== id));

    try {
      await api_delete.deleteMoto(id);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a moto.");
      if (motoRemovida) setMotos((prev) => [...prev, motoRemovida]);
    }
  };

  // Animação do menu lateral
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  // Filtra menu por login
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  const filiais = Array.from(new Set(motos.map((m) => m.filial))).sort();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          borderBottomColor: "#aaa",
        }}
      >
        <TouchableOpacity onPress={() => setMenuAberto(true)}>
          <Image
            source={require("../assets/menuIcon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Lista de Motos</Text>

        <TrocaTema />

        <Image
          source={require("../assets/iconePerfil.png")}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Menu Lateral */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setMenuAberto(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "rgba(0,0,0,0.2)",
            flexDirection: "row",
            zIndex: 10,
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
            {filteredMenuItems.map((item) => (
              <TouchableOpacity
                key={item.href}
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

      {/* Conteúdo */}
      <View style={{ paddingHorizontal: 32, paddingTop: 24 }}>
        <Picker
          selectedValue={patioSelecionado}
          onValueChange={setPatioSelecionado}
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
            marginBottom: 20,
            color: "#12a138",
          }}
        >
          <Picker.Item label="Selecione uma Filial" value="" />
          {filiais.map((f) => (
            <Picker.Item key={f} label={f} value={f} />
          ))}
        </Picker>

        <ScrollView style={{ marginTop: 8, marginBottom: 16 }}>
          {motos
            .filter(
              (m) => patioSelecionado === "" || m.filial === patioSelecionado
            )
            .map((m) => (
              <View
                key={m.id}
                style={{
                  borderWidth: 1,
                  borderColor: "#12a138",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Text style={{ color: "#222", fontSize: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>Modelo:</Text> {m.modelo}
                </Text>
                <Text style={{ color: "#222", fontSize: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>Placa:</Text> {m.placa}
                </Text>
                <Text style={{ color: "#222", fontSize: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>Condição:</Text>{" "}
                  {m.condicao}
                </Text>
                <Text style={{ color: "#222", fontSize: 15 }}>
                  <Text style={{ fontWeight: "bold" }}>Filial:</Text> {m.filial}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/cadastroMoto",
                        params: { id: m.id },
                      })
                    }
                    style={{
                      backgroundColor: "#000",
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => confirmarExclusao(m.id)}
                    style={{
                      backgroundColor: "#00994d",
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
