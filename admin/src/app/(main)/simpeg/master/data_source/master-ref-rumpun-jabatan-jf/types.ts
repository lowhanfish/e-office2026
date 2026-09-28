export interface CreateInterface {
  id: string;
  kode: string;
  nama: string;
  kode_rumpun?: string;
}

export interface ResponseInterface extends CreateInterface {
  kode_rumpun?: string;
  kode_utama_rumpun?: string;
  nama_rumpun?: string;
  created_by: string;
  created_at: string;
}

export interface ResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ResponseInterface[];
}
