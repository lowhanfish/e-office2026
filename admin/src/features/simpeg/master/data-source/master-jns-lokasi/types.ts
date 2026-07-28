export interface MasterJnsLokasiItem {
    id : string,
    kode : string,
    nama : string,
    created_by? : string,
    created_at? : string
}

export interface MasterJnsLokasiList {
    total : number,
    skip : number,
    limit : number,
    data : MasterJnsLokasiItem[]
}

export interface MasterJnsLokasiCreate {
    id : string,
    kode : string,
    nama : string,
}

