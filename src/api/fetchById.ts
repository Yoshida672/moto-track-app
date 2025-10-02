import { API_BASE_URL } from "../api/api_base";

async function fetchFilialById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}filiais/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Erro ao buscar filial');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching filial with id ${id}:`, error);
    throw error;
  }
}


export const api_by_id = {
    fetchFilialById
};
