export interface JenisInstansi {
    kode: string
    nama: string
    id: string
    created_by: string
    created_at: string
}

export type JenisInstansiResponse = JenisInstansi[]

export interface SelectOption {
    id: string
    value: string
}

export interface RefJenisInstansiIdItem {
    id: string
    nama: string
    kode: string
    created_by?: string
    created_at?: string
}

export type RefJenisInstansiIdResponse = RefJenisInstansiIdItem[]
