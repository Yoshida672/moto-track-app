import React from "react";
import BotaoAnimado from "../BotaoAnimado";

interface BotaoCadastroMotoProps {
  onPress: () => void;
  isEditing: boolean;
}

export default function BotaoCadastroMoto({ onPress, isEditing }: BotaoCadastroMotoProps) {
  return (
    <BotaoAnimado
      label={isEditing ? "Atualizar Moto" : "Cadastrar Moto"}
      onPress={onPress}
      marginTop={20}
    />
  );
}
