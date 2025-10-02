import { API_BASE_URL } from "../api/api_base";
import { MotoCreate } from "../../types/moto";

 const updateMoto = async (id: number, dados: MotoCreate) => {
  try {
    const response = await fetch(`${API_BASE_URL}motos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro ao atualizar: ${text}`);
    }

    const updatedMoto = await response.json();
    return updatedMoto;
  } catch (err) {
    console.error("Erro ao atualizar moto:", err);
    throw err;
  }
};
export const api_update= {
    updateMoto
}