export interface Moto {
  id: number;
  placa: string;
  modelo: string;
  condicao: string;
  condicaoId: number;
  patioId: number;
  patio: string;       
  filial: string;
  uwbtag?: string;     
  link?: {
    rel: string;
    href: string;
  };
}

export interface MotoCreate {
  placa: string;
  modelo: string;
  condicaoId: number;
  patioId: number;
}
