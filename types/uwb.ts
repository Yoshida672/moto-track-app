interface Localizacao {
  id: number;
  timestampFormatado: string;
  xCoord: number;
  yCoord: number;
}

export interface UwbResponse {
  id: number;
  codigo: string;
  status: string;
  moto: string | null;
  localizacao: Localizacao | null;
  link: any;
}

interface TagsMock {
  content: UwbResponse[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
