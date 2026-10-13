export interface MasterResponse {
  id?: string;
  kode: string;
  kode_cepat: string;
  nama: string;
  status: boolean;
  created_by?: string;
  created_at?: string;
}

export interface MasterResponseList {
  total: number;
  skip: number;
  limit: number;
  data: MasterResponse[];
}
