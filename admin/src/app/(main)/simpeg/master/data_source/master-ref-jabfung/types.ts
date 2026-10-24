export interface CreateInterface {
  id: string;
  kode: string;
  nama: string;
  ref_jns_jabatan_id: string;
  ref_jns_jabatan_nama: string;
  ref_rumpun_jabatan_id: string;
  ref_rumpun_jabatan_nama: string;
  pembina_id: string;
  pembina_nama: string;
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
