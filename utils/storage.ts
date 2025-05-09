import AsyncStorage from "@react-native-async-storage/async-storage";
import { Moto } from "../types/moto";

const STORAGE_KEY = "@motos";

export async function salvarMoto(moto: Moto) {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  const motos: Moto[] = json ? JSON.parse(json) : [];
  motos.push(moto);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(motos));
}

export async function buscarMotos(): Promise<Moto[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}
