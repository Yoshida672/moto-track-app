import React from "react";
import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "~/src/context/ThemeContext";
import { MotiView } from "moti";
import { PatioResponse, CondicaoResponse } from "~/types/uwb";

interface FormularioMotoProps {
  placa: string;
  setPlaca: (value: string) => void;
  modelo: string;
  setModelo: (value: string) => void;
  patio: string;
  setPatio: (value: string) => void;
  condicao: string;
  setCondicao: (value: string) => void;
  modelos: string[];
  patios: PatioResponse[];
  condicoes: CondicaoResponse[];
  isEditing: boolean;
}

export default function FormularioMoto({
  placa,
  setPlaca,
  modelo,
  setModelo,
  patio,
  setPatio,
  condicao,
  setCondicao,
  modelos,
  patios,
  condicoes,
  isEditing,
}: FormularioMotoProps) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "spring", delay: 200 }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          color: colors.text,
        }}
      >
        Preencha os dados da moto
      </Text>

      <Text style={{ marginBottom: 8, color: colors.text }}>Placa:</Text>
      <TextInput
        value={placa.toUpperCase()}
        onChangeText={setPlaca}
        placeholder="Placa"
        placeholderTextColor={colors.text}
        style={[estiloInput, { color: colors.text, backgroundColor: colors.inputBackground }]}
        editable={!isEditing}
      />

      <Text style={{ marginBottom: 8, color: colors.text }}>Selecione um Modelo:</Text>
      <View style={[estiloPicker, { backgroundColor: colors.inputBackground }]}>
        <Picker selectedValue={modelo} onValueChange={setModelo} enabled={!isEditing}>
          <Picker.Item label="Selecione..." style={{ color: colors.text, backgroundColor: colors.inputBackground}} value="" />
          {modelos.map((m) => (
            <Picker.Item key={m} label={m} value={m} />
          ))}
        </Picker>
      </View>

      <Text style={{ marginBottom: 8, color: colors.text }}>Selecione um Pátio:</Text>
      <View style={[estiloPicker, { backgroundColor: colors.inputBackground }]}>
        <Picker selectedValue={patio} onValueChange={setPatio}>
          <Picker.Item label="Selecione..." style={{ color: colors.text, backgroundColor: colors.inputBackground}} value="" />
          {patios.map((p) => (
            <Picker.Item
              key={p.id}
              label={`Área: ${p.area}m² | Capacidade: ${p.capacidadeMax}`}
              value={p.id.toString()}
            />
          ))}
        </Picker>
      </View>

      <Text style={{ marginBottom: 8, color: colors.text }}>Selecione uma Condição:</Text>
      <View style={[estiloPicker, { backgroundColor: colors.inputBackground }]}>
        <Picker selectedValue={condicao} style={{ color: colors.text, backgroundColor: colors.inputBackground}} onValueChange={setCondicao}>
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
    </MotiView>
  );
}

const estiloInput = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginBottom: 12,
  backgroundColor: "#fff"
};

const estiloPicker = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  backgroundColor: "#fff",
  marginBottom: 12,
};
