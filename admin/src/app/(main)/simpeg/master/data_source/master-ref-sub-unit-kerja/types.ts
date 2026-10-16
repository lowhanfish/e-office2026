export interface CreateInterface {
  id: string;
  nama: string;
  unit_induk: boolean;
  penyedia_pbj: boolean;
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
