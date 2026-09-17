export interface RefLokasiItem {
    id: string
    kode: string
    nama: string
    kanreg_id: string
    ref_lokasi_id?: string | null
    kode_cepat: string
    ref_jns_lokasi_id: string
    created_by?: string
    created_at?: string
}

export interface RefLokasiList {
    total: number
    skip: number
    limit: number
    data: RefLokasiItem[]
}

export type RefLokasiReadResponse = RefLokasiItem[] | RefLokasiList

export interface RefJnsLokasiItem {
    id: string
    kode: string
    nama: string
}

export interface RefJnsLokasiList {
    total: number
    skip: number
    limit: number
    data: RefJnsLokasiItem[]
}

export interface SelectOption {
    id: string
    value: string
}
