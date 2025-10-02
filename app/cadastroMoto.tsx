import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  Animated,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { api } from "../src/api/fetch";
import { api_create } from "../src/api/create";
import { Picker } from "@react-native-picker/picker";
import { PatioResponse, CondicaoResponse } from "~/types/uwb";
import { useSearchParams } from "expo-router/build/hooks";
import { api_update } from "~/src/api/update";
import { api_by_id } from "~/src/api/fetchById";
import TrocaTema from "~/src/components/TrocaTema";

export default function CadastroMoto() {
  const [menuAberto, setMenuAberto] = useState(false);
  const slideAnim = useRef(new Animated.Value(-220)).current;
  const router = useRouter();
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [patio, setPatio] = useState("");
  const [condicao, setCondicao] = useState("");
  const [modelos, setModelos] = useState<string[]>([]);
  const [patios, setPatios] = useState<PatioResponse[]>([]);
  const [condicoes, setCondicoes] = useState<CondicaoResponse[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = Boolean(id);

  // Carrega dados da API
  useEffect(() => {
    api.fetchPatios().then((data) => setPatios(data.content));
    api.fetchModelos().then((data) => setModelos(data));
    api.fetchCondicoes().then((data) => setCondicoes(data.content));
  }, []);

  // Animação do menu lateral
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuAberto ? 0 : -220,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  useEffect(() => {
  if (isEditing && id) {
    api_by_id.fetchMotoById(Number(id)).then((moto) => {
      setModelo(moto.modelo); // só leitura
      setPlaca(moto.placa);   // só leitura
      setPatio(moto.patioId.toString());
      setCondicao(moto.condicaoId.toString());
    });
  }
}, [id]);
  // Função de cadastro
  const handleCadastro = async () => {
    const placaRegex = /^[A-Z]{3}\d[A-Z0-9]\d{2}$|^[A-Z]{3}-\d{4}$/;
    if (!isEditing) {
      if (!modelo || !placa || !patio || !condicao) {
        Alert.alert("Atenção", "Preencha todos os campos!");
        return;
      }
      
          if (!placaRegex.test(placa.toUpperCase())) {
            Alert.alert("Erro", "Placa inválida! Use o formato ABC1D23 ou AAA-1234");
            return;
          }
    }

    try {
      const motoData = {
        placa,
        modelo,
        condicaoId: Number(condicao),
        patioId: Number(patio),
      };

      if (id) {
        // Edição
        await api_update.updateMoto(Number(id), motoData);
        Alert.alert("Sucesso", "Moto atualizada com sucesso!");
      } else {
        // Criação
        const response = await api_create.createMoto(motoData);
        Alert.alert(
          "Sucesso",
          `Moto cadastrada com sucesso! ID: ${response.id}`
        );
      }

      router.push("/listaMotos");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar a moto.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e6e6e6" }}>
      {/* MENU LATERAL */}
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
              { label: "Lista", href: "/listaMotos" },
              { label: "Cadastro", href: "/cadastroMoto" },
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

      {/* CABEÇALHO */}
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
          zIndex: 1,
        }}
      >
        {!menuAberto && (
          <Pressable onPress={() => setMenuAberto(true)}>
            <Image
              source={require("../assets/menuIcon.png")}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
        )}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Cadastro de Moto
        </Text>
                <TrocaTema />
        
        <Image
          source={require("../assets/iconePerfil.png")}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Preencha os dados da moto
        </Text>

        <Text style={{ marginBottom: 8 }}>Placa:</Text>
        <TextInput
          value={placa.toUpperCase()}
          onChangeText={setPlaca}
          placeholder="Placa"
          style={estiloInput}
          editable={!isEditing}
          
        />

        <Text style={{ marginBottom: 8 }}>Selecione um Modelo:</Text>
        <View style={estiloPicker}>
          <Picker
            selectedValue={modelo}
            onValueChange={setModelo}
            enabled={!isEditing}
          >
            <Picker.Item label="Selecione..." value="" />
            {modelos.map((m) => (
              <Picker.Item key={m} label={m} value={m} />
            ))}
          </Picker>
        </View>

        <Text style={{ marginBottom: 8 }}>Selecione um Pátio:</Text>
        <View style={estiloPicker}>
          <Picker selectedValue={patio} onValueChange={setPatio}>
            <Picker.Item label="Selecione..." value="" />
            {patios.map((p) => (
              <Picker.Item
                key={p.id}
                label={`Área: ${p.area}m² | Capacidade: ${p.capacidadeMax}`}
                value={p.id.toString()}
              />
            ))}
          </Picker>
        </View>

        <Text style={{ marginBottom: 8 }}>Selecione uma Condição:</Text>
        <View style={estiloPicker}>
          <Picker selectedValue={condicao} onValueChange={setCondicao}>
            <Picker.Item label="Selecione..." value="" />
            {condicoes.map((c) => (
              <Picker.Item
                key={c.id}
                label={c.nome + (c.cor ? ` - Cor: ${c.cor}` : "")}
                value={c.id.toString()}
              />
            ))}
          </Picker>
        </View>

        {/* Botão cadastrar */}
        <TouchableOpacity style={botaoCadastrar} onPress={handleCadastro}>
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
          >
            {id ? "Atualizar Moto" : "Cadastrar Moto"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const estiloInput = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#fff",
};

const estiloPicker = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  backgroundColor: "#fff",
  marginBottom: 12,
};

const botaoCadastrar = {
  backgroundColor: "#00994d",
  padding: 12,
  borderRadius: 8,
  marginTop: 20,
};
