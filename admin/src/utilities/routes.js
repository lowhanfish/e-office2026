import { BsFillHouseFill, BsPlayFill, BsGrid, BsBuildings, BsRobot, BsGear } from "react-icons/bs";

const routex = [
    {
        title : "Home",
        path:"/home",
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
                        path:"/master/access_management/route_list",
                        children : []
                    },
                    {
                        title : "Group Role Database",
                        path:"/master/access_management/group_role_database",
                        children : []
                    },
                    {
                        title : "Group Role Management",
                        path:"/master/access_management/group_role_management",
                        children : []
                    },
                    {
                        title : "User Authorization",
                        path:"/master/access_management/user_authorization",
                        children : []
                    },
                    {
                        title : "User Register",
                        path:"/master/access_management/user_register",
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
                        path:"/master/template_management/component_template",
                        children : []
                    },
                    {
                        title : "Example Template",
                        path:"/master/template_management/example_template",
                        children : []
                    },
                ]
            },
            {
                title : "Data Source",
                path:"/",
                children : [
                    {
                        title : "Master Golongan",
                        path:"/master/data_source/master-golongan",
                        children : []
                    },
                   
                ]
            },
        ]
    },



]


export default routex;