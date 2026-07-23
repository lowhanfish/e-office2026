export interface masterInstansiItem {
    id : string,
    kode : string,
    nama : string,
    kode_cepat : string,
    jenis : string,
    jenis_instansi_id : string,
    jenis_nama? : string,
    jenis_instansi_nama? : string,
    created_by? : string,
    created_at? : string
}

export type masterInstansiListAll = masterInstansiItem[]

export interface masterInstansiList{
    total : number,
    skip : number,
    limit : number,
    data : masterInstansiItem[]
}

export interface masterInstansiCreate {
    id : string,
    kode : string,
    nama : string,
    instansi_id : string,
}