export interface masterSatkerItem {
    id : string,
    kode : string,
    nama : string,
    instansi_id : string,
    instansi_nama? : string,
    created_by? : string,
    created_at? : string
}

export type masterSatkerListAll = masterSatkerItem[]

export interface masterSatkerList{
    total : number,
    skip : number,
    limit : number,
    data : masterSatkerItem[]
}

export interface masterSatkerCreate {
    id : string,
    kode : string,
    nama : string,
    instansi_id : string,
}
