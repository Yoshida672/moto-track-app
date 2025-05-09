import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { buscarMotos } from "../utils/storage";
import { Moto } from "../types/moto";

export default function ListaMotos() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [patioSelecionado, setPatioSelecionado] = useState("");

  useEffect(() => {
    buscarMotos().then(setMotos);
  }, []);

  const patios = Array.from(new Set(motos.map(m => m.patio)));

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        Motos por Pátio
      </Text>

      <Picker
        selectedValue={patioSelecionado}
        onValueChange={(itemValue) => setPatioSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um pátio" value="" />
        {patios.map(p => (
          <Picker.Item key={p} label={p} value={p} />
        ))}
      </Picker>

      <ScrollView style={{ marginTop: 16 }}>
        {motos.filter(m => m.patio === patioSelecionado).map((m) => (
          <View
            key={m.id}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 16,
              marginBottom: 8,
              borderRadius: 8
            }}
          >
            <Text>Modelo: {m.modelo}</Text>
            <Text>Placa: {m.placa}</Text>
            <Text>AprilTag: {m.apriltag}</Text>
            <Text>Pátio: {m.patio}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

