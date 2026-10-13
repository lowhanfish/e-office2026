export interface MasterResponse {
  id?: string;
  kode: string;
  nama: string;
  created_by?: string;
  created_at?: string;
}

export interface MasterResponseList {
  total: number;
  skip: number;
  limit: number;
  data: MasterResponse[];
}
