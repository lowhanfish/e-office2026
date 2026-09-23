export interface CreateInterface {
  id: string;
  kode: string;
  nama: string;
  asn_jenis_jabatan_id: string;
  level_kompetensi_jabatan: string;
}

export interface ResponseInterface extends CreateInterface {
  created_by: string;
  created_at: string;
}

export interface ResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ResponseInterface[];
}
