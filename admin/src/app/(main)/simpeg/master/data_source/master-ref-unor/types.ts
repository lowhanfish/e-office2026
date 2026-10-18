export interface CreateInterface {
  id: string;
  nama: string;
  parent_id: string;
  parent_id_nama?: string;
  sub_unit_kerja: string;
}

export interface ResponseInterface extends CreateInterface {
  sub_unit_kerja_nama: string;
  created_by: string;
  created_at: string;
}

export interface ResponseListInterface {
  skip: number;
  limit: number;
  total: number;
  data: ResponseInterface[];
}
