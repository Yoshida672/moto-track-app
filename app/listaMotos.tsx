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
import { MenuItem,menuItems } from "~/src/components/MenuItems";
const MENU_ITEMS: MenuItem[] = menuItems;

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState("");
  const [menuAtivo, setMenuAtivo] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();

  useEffect(() => {
    carregarMotos();
  }, []);

  const carregarMotos = async () => {
    try {
      const data = await api.fetchMotos();
      setMotos(data.content);
    } catch (error) {
      console.error("Erro ao carregar motos:", error);
    }
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
      console.log("Tentando excluir moto id:", id);
      await api_delete.deleteMoto(id); 
      console.log("Excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      Alert.alert("Erro", "Não foi possível excluir a moto.");
      // Re-adiciona a moto caso falhe a exclusão
      if (motoRemovida) setMotos((prev) => [...prev, motoRemovida]);
    }
  };

  // Animação do menu lateral
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAtivo ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAtivo]);

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
        <TouchableOpacity onPress={() => setMenuAtivo(true)}>
          <Image
            source={require("../assets/menuIcon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Lista de Motos</Text>

        <Image
          source={require("../assets/iconePerfil.png")}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      {/* Menu Lateral */}
      {menuAtivo && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          {/* Fundo clicável para fechar */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setMenuAtivo(false)}
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
          />

          {/* Menu animado */}
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 220,
              height: "100%",
              backgroundColor: "#00994d",
              paddingTop: 60,
              paddingHorizontal: 20,
              transform: [{ translateX: slideAnim }],
            }}
          >
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.href}
                style={{ marginBottom: 20 }}
                onPress={() => {
                  setMenuAtivo(false);
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
        </View>
      )}

      {/* Conteúdo */}
      <View style={{ paddingHorizontal: 32, paddingTop: 24 }}>
        {/* Seleção de Filial */}
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

        {/* Lista de Motos */}
        <ScrollView style={{ marginTop: 8, marginBottom: 16 }}>
          {motos
            .filter(
              (m) => patioSelecionado === "" || m.filial === patioSelecionado
            ) // ✅ comparar com filial
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
