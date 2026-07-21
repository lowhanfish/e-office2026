export interface RefJenisInstansiIdItem {
    id : string,
    nama : string,
    kode : string,
    created_by? : string,
    created_at? : string
}

export type RefJenisInstansiIdAll = RefJenisInstansiIdItem[]

export interface RefJenisInstansiIdOption {
    id : string,
    value : string
}