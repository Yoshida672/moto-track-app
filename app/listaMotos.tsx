import { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert } from "react-native";
import { MotiView, AnimatePresence, MotiText } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "~/src/context/ThemeContext";
import { useRouter } from "expo-router";

import { api } from "../src/api/fetch";
import { api_delete } from "../src/api/delete";
import { Moto } from "../types/moto";
import { MenuItem, menuItems } from "~/types/MenuItems";

import BotaoAnimado from "~/src/components/BotaoAnimado";
import HeaderListaMoto from "~/src/components/moto/HeaderListaMoto";
import { Picker } from "@react-native-picker/picker";
import MenuLateral from "~/src/components/MenuLateral";

export default function ListaMotos() {
  const { colors } = useTheme();
  const router = useRouter();

  const [motos, setMotos] = useState<Moto[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [logado, setLogado] = useState(false);

  const filteredMenuItems = menuItems.filter((item: MenuItem) => {
    if (item.onlyLoggedIn && !logado) return false;
    if (item.onlyLoggedOut && logado) return false;
    return true;
  });

  const filiais = Array.from(new Set(motos.map((m) => m.filial))).sort();

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
      { text: "Excluir", style: "destructive", onPress: () => handleExcluirMoto(id) },
    ]);
  };

  const handleExcluirMoto = async (id: number) => {
    const motoRemovida = motos.find((m) => m.id === id);
    setMotos((prev) => prev.filter((m) => m.id !== id));
    try {
      await api_delete.deleteMoto(id);
    } catch {
      if (motoRemovida) setMotos((prev) => [...prev, motoRemovida]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderListaMoto title="Lista de Motos" onMenuPress={() => setMenuAberto(true)} />

      <MenuLateral aberto={menuAberto}  itens={filteredMenuItems} fecharMenu={() => setMenuAberto(false)} />

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 400 }}
        style={{ paddingHorizontal: 32, paddingTop: 24 }}
      >
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
      </MotiView>

      <ScrollView style={{ marginTop: 8, marginBottom: 16, paddingHorizontal: 32 }}>
        <AnimatePresence>
          {motos
            .filter((m) => patioSelecionado === "" || m.filial === patioSelecionado)
            .map((m) => (
              <MotiView
                key={m.id}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ type: "timing", duration: 300 }}
                style={{
                  borderWidth: 1,
                  borderColor: "#12a138",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <MotiText from={{ scale: 0.85 }} animate={{ scale: 1 }} style={{ fontSize: 15, color: "#222" }}>
                  <Text style={{ fontWeight: "bold" }}>Modelo:</Text> {m.modelo}
                </MotiText>
                <MotiText from={{ scale: 0.85 }} animate={{ scale: 1 }} style={{ fontSize: 15, color: "#222" }}>
                  <Text style={{ fontWeight: "bold" }}>Placa:</Text> {m.placa}
                </MotiText>
                <MotiText from={{ scale: 0.85 }} animate={{ scale: 1 }} style={{ fontSize: 15, color: "#222" }}>
                  <Text style={{ fontWeight: "bold" }}>Condição:</Text> {m.condicao}
                </MotiText>
                <MotiText from={{ scale: 0.85 }} animate={{ scale: 1 }} style={{ fontSize: 15, color: "#222" }}>
                  <Text style={{ fontWeight: "bold" }}>Filial:</Text> {m.filial}
                </MotiText>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
                  <BotaoAnimado
                    label="Editar"
                    onPress={() => router.push({ pathname: "/cadastroMoto", params: { id: m.id } })}
                  />
                  <BotaoAnimado label="Excluir" onPress={() => confirmarExclusao(m.id)} />
                </View>
              </MotiView>
            ))}
        </AnimatePresence>
      </ScrollView>
    </View>
  );
}
