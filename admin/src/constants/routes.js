import { BsFillHouseFill, BsGrid, BsBuildings, BsGear } from "react-icons/bs";

const routex = [
    {
        title : "Home",
        path:"/simpeg/home",
        icon : <BsFillHouseFill />,
        children : []
    },
    {
        title : "Profile",
        path:"/",
        icon : <BsBuildings />,
        children : []
    },
    {
        title : "Riwayat Pegawai",
        path:"/",
        icon : <BsGrid />,
        children : [
            {
                title : "Biodata Pegawai",
                path:"/",
                children : []
            },
            {
                title : "Kartu Pegawai",
                path:"/",
                children : []
            },
            {
                title : "Riwayat Kinerja Periodik",
                path:"/",
                children : []
            },
            {
                title : "Data Keluarga",
                path:"/",
                children : [
                    {
                        title : "Data Anak",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Data Pasangan",
                        path:"/",
                        children : []
                    },
                ]
            },
        ]
    },
    {
        title : "Monitoring",
        path:"/",
        icon : <BsBuildings />,
        children : [
            {
                title : "Daftar Urut Kepangkatan",
                path:"/",
                children : []
            },
            {
                title : "Struktur Organisasi",
                path:"/",
                children : []
            },
        ]
    },
    
    {
        title : "Data Mastering",
        path:"/",
        icon : <BsGear />,
        children : [
            {
                title : "Access Management",
                path:"/",
                children : [
                    {
                        title : "Route List",
                        path:"/simpeg/master/access_management/route_list",
                        children : []
                    },
                    {
                        title : "Group Role Database",
                        path:"/simpeg/master/access_management/group_role_database",
                        children : []
                    },
                    {
                        title : "Group Role Management",
                        path:"/simpeg/master/access_management/group_role_management",
                        children : []
                    },
                    {
                        title : "User Authorization",
                        path:"/simpeg/master/access_management/user_authorization",
                        children : []
                    },
                    {
                        title : "User Register",
                        path:"/simpeg/master/access_management/user_register",
                        children : []
                    },
                ]
            },
            {
                title : "Template Management",
                path:"/",
                children : [
                    {
                        title : "Component Template",
                        path:"/simpeg/master/template_management/component_template",
                        children : []
                    },
                    {
                        title : "Example Template",
                        path:"/simpeg/master/template_management/example_template",
                        children : []
                    },
                    {
                        title : "Example Template Admin",
                        path:"/simpeg/master/template_management/master-template",
                        children : []
                    },
                ]
            },
            {
                title : "Data Source",
                path:"/",
                children : [
                    {
                        title : "Master Jenis Riwayat",
                        path:"/simpeg/master/data_source/master-jenis-riwayat",
                        children : []
                    },
                    {
                        title : "Master Jenis Pegawai",
                        path:"/simpeg/master/data_source/master-jenis-pegawai",
                        children : []
                    },
                    {
                        title : "Master Status Hidup",
                        path:"/simpeg/master/data_source/master-status-hidup",
                        children : []
                    },
                    {
                        title : "Master Agama",
                        path:"/simpeg/master/data_source/master-agama",
                        children : []
                    },
                    {
                        title : "Master Esselon",
                        path:"/simpeg/master/data_source/master-esselon",
                        children : []
                    },
                    {
                        title : "Master Jenis Kawin",
                        path:"/simpeg/master/data_source/master-jenis-kawin",
                        children : []
                    },
                    {
                        title : "Master Jenis Instansi",
                        path:"/simpeg/master/data_source/master-jenis-instansi",
                        children : []
                    },
                    {
                        title : "Master Jenis Instansi Id",
                        path:"/simpeg/master/data_source/master-jenis-instansi-id",
                        children : []
                    },
                    {
                        title : "Master Instansi",
                        path:"/simpeg/master/data_source/master-instansi",
                        children : []
                    },
                    {
                        title : "Master Satker",
                        path:"/simpeg/master/data_source/master-satker",
                        children : []
                    },
                    {
                        title : "Master Jenis Lokasi",
                        path:"/simpeg/master/data_source/master-jns-lokasi",
                        children : []
                    },
                    {
                        title : "Master Referensi Lokasi",
                        path:"/simpeg/master/data_source/master-ref-lokasi",
                        children : []
                    },
                    {
                        title : "Master Referensi ASN Jenis Jabatan",
                        path:"/simpeg/master/data_source/master-ref-asn-jenis-jabatan",
                        children : []
                    },
                    {
                        title : "Master Referensi Level Kompetensi ASN",
                        path:"/simpeg/master/data_source/master-ref-level-kompetensi-asn",
                        children : []
                    },
                    {
                        title : "Master Referensi Jenjang Jabatan",
                        path:"/simpeg/master/data_source/master-ref-jenjang-jabatan",
                        children : []
                    },
                    {
                        title : "Master Referensi Jenis Jabatan Umum",
                        path:"/simpeg/master/data_source/master-jenis-jabatan-umum",
                        children : []
                    },
                    {
                        title : "Master Golongan",
                        path:"/simpeg/master/data_source/master-golongan",
                        children : []
                    },
                   
                ]
            },
        ]
    },



]


export default routex;
