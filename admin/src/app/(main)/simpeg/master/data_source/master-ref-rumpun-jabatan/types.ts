export interface CreateInterface {
  id: string;
  kode: string;
  nama: string;
  kode_cepat: string;
}

export interface ResponseInterface extends CreateInterface {
  kode_cepat: string;
  created_by: string;
  created_at: string;
}

export interface ResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ResponseInterface[];
}
