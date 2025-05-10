import AsyncStorage from "@react-native-async-storage/async-storage";
import { Moto } from "../types/moto";

const STORAGE_KEY = "@motos";

export async function salvarMoto(moto: Moto) {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const motos: Moto[] = json ? JSON.parse(json) : [];

    motos.push(moto);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
  } catch (error) {
    console.error("Erro ao salvar a moto:", error);
  }
}

export async function buscarMotos(): Promise<Moto[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error("Erro ao buscar as motos:", error);
    return [];
  }
}
