export interface JenisInstansi {
    kode: string
    nama: string
    id: string
    created_by: string
    created_at: string
}

export type JenisInstansiResponse = JenisInstansi[]

export interface JenisInstansiOption {
    id: string
    value: string
}