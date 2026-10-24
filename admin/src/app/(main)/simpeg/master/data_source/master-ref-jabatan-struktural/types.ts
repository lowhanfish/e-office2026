export interface CreateInterface {
  kode: string;
  nama: string;
  kode_cepat: string;
  bup_usia: number;
  ref_kel_jabatan_id: string;
  jenjang: string;
  status: string;
}

export interface ResponseInterface extends CreateInterface {
  id: string;
  ref_kel_jabatan_nama: string;
  jenjang_nama: string;
  created_by: string;
  created_at: string;
}

export interface ResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ResponseInterface[];
}
