import { BsFillHouseFill, BsPlayFill, BsGrid, BsBuildings, BsRobot, BsGear } from "react-icons/bs";

const routex = [
    {
        title : "Home",
        path:"/home",
        icon : <BsFillHouseFill />,
        children : []
    },
    {
        title : "Core",
        path:"/",
        icon : <BsGrid />,
        children : [
            {
                title : "Asset Management",
                path:"/",
                children : [
                    {
                        title : "Asset Depreciation",
                        path:"/core/asset_management/asset_depreciation",
                        children : []
                    },
                    {
                        title : "Company Asset Tracking",
                        path:"/core/asset_management/company_asset_tracking",
                        children : []
                    },
                    {
                        title : "Maintenance Scheduling",
                        path:"/core/asset_management/maintenance_scheduling",
                        children : []
                    },
                ]
            },
            {
                title : "Customer Management",
                path:"/",
                children : [
                    {
                        title : "AI-Lead SCorring",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Customer Database",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Follow-Up Management",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Interaction History",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Lead Pipeline",
                        path:"/",
                        children : []
                    },
                ]
            },
            {
                title : "Employee Management",
                path:"/",
                children : []
            },
            {
                title : "Financial Management",
                path:"/",
                children : [
                    {
                        title : "AI-Anomaly Detection",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Budget Planning",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Cashflow Tracking",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Expense Management",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Financial Reporting",
                        path:"/",
                        children : []
                    },
                    {
                        title : "Invoice",
                        path:"/",
                        children : []
                    },
                ]
            },
            {
                title : "Sales Management",
                path:"/",
                children : []
            },
        ]
    },
    {
        title : "Property",
        path:"/",
        icon : <BsBuildings />,
        children : []
    },
    {
        title : "AI Assistant",
        path:"/",
        icon : <BsRobot />,
        children : []
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
                        title : "Master Cluster Age",
                        path:"/master/data_source/master_cluster_age",
                        children : []
                    },
                    {
                        title : "Master Gender",
                        path:"/master/data_source/master_gender",
                        children : []
                    },
                ]
            },
        ]
    },



]


export default routex;