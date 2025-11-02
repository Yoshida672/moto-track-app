import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useTheme } from "~/src/context/ThemeContext";
import MenuLateral from "~/src/components/MenuLateral";
import FormularioMoto from "~/src/components/moto/FormularioMoto";
import BotaoCadastroMoto from "~/src/components/moto/BotaoCadastroMoto";
import { api } from "~/src/api/fetch";
import { api_create } from "~/src/api/create";
import { api_by_id } from "~/src/api/fetchById";
import { api_update } from "~/src/api/update";
import { PatioResponse, CondicaoResponse } from "~/types/uwb";
import { MotoCreate } from "~/types/moto";
import HeaderCadastroMoto from "~/src/components/moto/HeaderCadastroMoto";
import { menuItems } from "~/types/MenuItems";

export default function CadastroMoto() {
  const { colors } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isEditing = Boolean(id);

  const [menuAberto, setMenuAberto] = useState(false);
  const itensMenu = menuItems.filter(
    (item) => !item.onlyLoggedOut || item.onlyLoggedIn
  );

  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [patio, setPatio] = useState("");
  const [condicao, setCondicao] = useState("");

  const [modelos, setModelos] = useState<string[]>([]);
  const [patios, setPatios] = useState<PatioResponse[]>([]);
  const [condicoes, setCondicoes] = useState<CondicaoResponse[]>([]);

  useEffect(() => {
    api.fetchPatios().then((data) => setPatios(data.content));
    api.fetchModelos().then((data) => setModelos(data));
    api.fetchCondicoes().then((data) => setCondicoes(data.content));
  }, []);

  useEffect(() => {
    if (isEditing && id) {
      api_by_id.fetchMotoById(Number(id)).then((moto) => {
        setModelo(moto.modelo);
        setPlaca(moto.placa);
        setPatio(moto.patioId.toString());
        setCondicao(moto.condicaoId.toString());
      });
    }
  }, [id]);

  const handleCadastro = async () => {
    const placaRegex = /^[A-Z]{3}\d[A-Z0-9]\d{2}$|^[A-Z]{3}-\d{4}$/;
    if (!isEditing && (!modelo || !placa || !patio || !condicao)) return;
    if (!isEditing && !placaRegex.test(placa.toUpperCase())) return;

    const motoData: MotoCreate = {
      modelo,
      placa: placa.toUpperCase(),
      patioId: Number(patio),
      condicaoId: Number(condicao),
    };

    if (id) await api_update.updateMoto(Number(id), motoData);
    else await api_create.createMoto(motoData);

    router.push("/listaMotos");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <MenuLateral
        aberto={menuAberto}
        itens={itensMenu}
        fecharMenu={() => setMenuAberto(false)}
      />

      <HeaderCadastroMoto
        titulo="Cadastro de Moto"
        onMenuPress={() => setMenuAberto(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <FormularioMoto
          placa={placa}
          setPlaca={setPlaca}
          modelo={modelo}
          setModelo={setModelo}
          patio={patio}
          setPatio={setPatio}
          condicao={condicao}
          setCondicao={setCondicao}
          modelos={modelos}
          patios={patios}
          condicoes={condicoes}
          isEditing={isEditing}
        />
        <BotaoCadastroMoto onPress={handleCadastro} isEditing={isEditing} />
      </ScrollView>
    </View>
  );
}
