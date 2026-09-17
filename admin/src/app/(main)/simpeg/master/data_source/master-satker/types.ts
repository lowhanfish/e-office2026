export interface MasterSatkerItem {
    id: string
    kode: string
    nama: string
    instansi_id: string
    instansi_nama?: string
    created_by?: string
    created_at?: string
}

export interface MasterSatkerList {
    total: number
    skip: number
    limit: number
    data: MasterSatkerItem[]
}

export interface MasterSatkerCreate {
    id: string
    kode: string
    nama: string
    instansi_id: string
}

export interface MasterInstansiOptionItem {
    kode: string
    nama: string
}
