import image1 from "../assets/62b32a768fc657321f1193070e9c28b5.png";
import image2 from "../assets/f8b27b8c0731d7059064526ecd8a4eab.png";
import image3 from "../assets/7ceb7095b026a3f59d044b8b26d0bf95.png";
import image4 from "../assets/4f48d1b3f074ff499871d0a5fc488b83.png";
import resource1 from "../assets/65ba30d1d05c102577d13d0dd4fcbc2e.png";
import resource2 from "../assets/93c3cb5621a0ba3251cd3673e94d00df.jpg"
import { TbMoneybag } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdBarChart } from "react-icons/md";
import { LiaUsersSolid } from "react-icons/lia";
import { LiaUserLockSolid } from "react-icons/lia";
import seoImage from "../assets/img/53ab0bd58a3bb491860d7b77a1a2cb09.png";
import digiImage from "../assets/img/e5f56c271528d5613ef4575c09317626.png";
import webImage from "../assets/img/648e53bbe2a8178100efe2cbf1e8009d.png";
import brandImage from "../assets/img/25f3c1bc6c0992d943a695b3c9a00e5b.png";
import markImage from "../assets/img/28dccb07c6b23b0857c1cc073e37083f.png"
export const Cards = [
    {
        amount: "₹20k",
        title: "Total Revenue",
        message: "+9% from yesterday",
        bgColor: "#D7E9FD",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #C0DEFF",
        icon: <TbMoneybag />,
        iconBackgroundColor: "#407BFF"
    },
    {
        amount: "120",
        title: "Total Booking",
        message: "-9% from yesterday",
        bgColor: "#FFEEF8",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #FFABDC",
        icon: <AiOutlineUsergroupAdd />,
        iconBackgroundColor: "#CF9DBB"
    },
    {
        amount: "985",
        title: "Total Enquires",
        message: "+9% from yesterday",
        bgColor: "#E1F3EF",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #ACF1E2",
        icon: <MdBarChart />,
        iconBackgroundColor: "#A1D4C9"
    },
    {
        amount: "658",
        title: "Total Customers",
        message: "+9% from yesterday",
        bgColor: "#FFF9EA",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #FCEECA",
        icon: <LiaUserLockSolid />,
        iconBackgroundColor: "#EAD39C"
    },
    {
        amount: "10",
        title: "Total Partners",
        message: "+9% from yesterday",
        bgColor: "#E5E6F9",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #B7BAEA",
        icon: <LiaUsersSolid />,
        iconBackgroundColor: "#A0A3D8"
    },

];
export const ServiceCards = [
    {
        name: "Fundamental Services",
        message: "Services that makes your basics strong. Market research, startup consulting.",
        color: "#1B2559",
        backgroundColor: "#D7E9FD",
        img: image1
    },
    {
        name: "Web Development",
        message: "How well you perform on internet depends on digital marketing services.",
        color: "#1B2559",
        backgroundColor: "#FFF1CB",
        img: image2
    },
    {
        name: "Digital Marketing",
        message: "How well you perform on internet depends on digital marketing services.",
        color: "#1B2559",
        backgroundColor: "#FFCFE9",
        img: image3
    },
    {
        name: "Design Services",
        message: "Services that makes your basics strong. Market research, startup consulting.",
        color: "#1B2559",
        backgroundColor: "#C4E8E2",
        img: image4
    },


];

export const ResourceCards = [
    {
        name: "Digital Marketing",
        title: "Top 5 benefits of using digital marketing as a tool in your business",
        message: "Digital marketing is a key factor when it comes to rank your business online. This is very import",
        img: resource1
    },
    {
        name: "Web Development",
        message: "How well you perform on internet depends on digital marketing services.",
        color: "#1B2559",
        backgroundColor: "#FFF1CB",
        img: resource2
    },
    {
        name: "Digital Marketing",
        message: "How well you perform on internet depends on digital marketing services.",
        color: "#1B2559",
        backgroundColor: "#FFCFE9",
        img: image3
    },
    {
        name: "Design Services",
        message: "Services that makes your basics strong. Market research, startup consulting.",
        color: "#1B2559",
        backgroundColor: "#C4E8E2",
        img: image4
    },


];
export const RowData = [
    {
        "no": "1",
        "name": "SEO",
        "image": seoImage,
        "sales": "10",
        "leads": "500",
        "partners": "60",
    },
    {
        "no": "1",
        "name": "Digital Marketing",
        "image": digiImage,
        "sales": "10",
        "leads": "500",
        "partners": "60",
    },
    {
        "no": "1",
        "name": "Web Development",
        "image": webImage,
        "sales": "10",
        "leads": "500",
        "partners": "60",
    },
    {
        "no": "1",
        "name": "Brand Identity",
        "image": brandImage,
        "sales": "10",
        "leads": "500",
        "partners": "60",
    },
    {
        "no": "1",
        "name": "Content Marketing",
        "image": markImage,
        "sales": "10",
        "leads": "500",
        "partners": "60",
    },
];
export const ColumnData = [
    {
        Header: "No ",
        accessor: "no",
    },
    {
        Header: "Product Name ",
        accessor: "name",
    },
    {
        Header: "Sales",
        accessor: "sales",
    },
    {
        Header: "Leads",
        accessor: "leads",
    },
    {
        Header: "Partners",
        accessor: "partners"
    }
];

export const OngoingProjects = [
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        progress: 90,
        progressBarColor: "blue",
        backgroundColor: "#D7E9FD",
        textColor: "#3965FF"
    },
    {
        category: "Website Design",
        subCategory: "Design",
        progress: 50,
        progressBarColor: "pink",
        backgroundColor: "#FFEEF8",
        textColor: "#D53F8C"
    },
    {
        category: "Development",
        subCategory: "Web Development",
        progress: 60,
        progressBarColor: "purple",
        backgroundColor: "#E5E6F9",
        textColor: "#805AD5"
    },
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        progress: 60,
        progressBarColor: "teal",
        backgroundColor: "#E1F3EF",
        textColor: "#319795"
    },
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        progress: 45,
        progressBarColor: "yellow",
        backgroundColor: "#FFF9EA",
        textColor: "#D69E2E"
    },
    {
        category: "Website Design",
        subCategory: "Design",
        progress: 55,
        progressBarColor: "blue",
        backgroundColor: "#C6DBF3",
        textColor: "#3965FF"
    },

];
export const EnquiryColumn = ["Details", "Date", "Name", "Budget", "Industry", "Timeline", "Status", "Engage"];
export const EnquiryRow = [
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        date: "24 Jan 2024",
        time: "8:05 AM",
        name: "Client 1",
        budget: "5-7K",
        industry: "Banking",
        timeline: "2 Week",
        status: "Available",
    },
    {
        category: "Design",
        subCategory: "Website Design",
        date: "24 Jan 2024",
        time: "8:05 AM",
        name: "Client 2",
        budget: "5-7K",
        industry: "IT",
        timeline: "10 Week",
        status: "Available",
    },
    {
        category: "Web Development",
        subCategory: "Web Application",
        date: "24 Jan 2024",
        time: "8:05 AM",
        name: "Client 3",
        budget: "50-70K",
        industry: "E-Commerce",
        timeline: "6 months",
        status: "Available",
    },
    {
        category: "Marketing",
        subCategory: "Social Media Marketing",
        date: "24 Jan 2024",
        time: "8:05 AM",
        name: "Client 4",
        budget: "15-27K",
        industry: "E-commerce",
        timeline: "5 Week",
        status: "Available",
    },
];

export const PaymentHistoryColumn = ["Project Name", "Date", "Invoice", "Amount", "TDS (2%)", "Commission", "Final ₹", "Status"];
export const PaymentHistoryRow = [
    {
        projectName: "Project 1",
        clientName: "Client 1",
        date: "24 Jan 2024",
        time: "8:05 AM",
        invoice: "BIZ3008001",
        amount: "₹25000",
        tds: "₹500",
        commission: "₹2000",
        final: "₹22500",
        status: "Received"
    },
    {
        projectName: "Project 2",
        clientName: "Client 2",
        date: "24 Jan 2024",
        time: "8:05 AM",
        invoice: "BIZ3008001",
        amount: "₹25000",
        tds: "₹500",
        commission: "₹2000",
        final: "₹22500",
        status: "Pending"
    },
    {
        projectName: "Project 3",
        clientName: "Client 3",
        date: "24 Jan 2024",
        time: "8:05 AM",
        invoice: "BIZ3008001",
        amount: "₹25000",
        tds: "₹500",
        commission: "₹2000",
        final: "₹22500",
        status: "Received"
    },
    {
        projectName: "Project 4",
        clientName: "Client 4",
        date: "24 Jan 2024",
        time: "8:05 AM",
        invoice: "BIZ3008001",
        amount: "₹25000",
        tds: "₹500",
        commission: "₹2000",
        final: "₹22500",
        status: "Received"
    },
];
export const ChatData = [
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
];
export const DashboardData = [
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
    },
];
export const EventData = [
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
        time: '10.30AM',
    },
    {
        clientName: 'Prashant Sirohi',
        message: 'What would be your price for the service ?',
        time: '10.30AM',
    },

];
export const LineChartData = [
    {
        name: "Project 1",
        data: ["0", "1M", "2M", "3M", "4M", "1M", "2M", "3M", "4M", "3M", "2M", "2M"]
    },
    {
        name: "Project 2",
        data: ["0", "2M", "1M", "3M", "4M", "2M", "1M", "3M", "4M", "2M", "2M", "1M"]
    }
];
export const LineChartOptionsData = {
    chart: {
        id: "rangeBar-line"
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    // tooltip: {
    //     enabled: false // Disabling tooltips
    // },
    dataLabels: {
        enabled: false // Disabling data labels
    },
    chart: {
        zoom: {
            enabled: false // Disabling zooming
        },
        toolbar: {
            show: false // Hiding toolbar
        },
        selection: {
            enabled: false // Disabling selection
        }
    }
};
export const ColumnChartData = [
    {
        name: "Total Sales",
        data: ["0", "5K", "10K", "15K", "20K"]
    },
    {
        name: "Total Lead",
        data: ["0", "5K", "10K", "15K", "20K"]
    }
];
export const ColumnChartOptionsData = {
    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    // tooltip: {
    //     enabled: false // Disabling tooltips
    // },
    dataLabels: {
        enabled: false // Disabling data labels
    },
    chart: {
        zoom: {
            enabled: false // Disabling zooming
        },
        toolbar: {
            show: false // Hiding toolbar
        },
        selection: {
            enabled: false // Disabling selection
        }
    }
};
export const PieChartData = [44, 55, 41, 17, 15];
export const PieChartOptionsData = {
    labels: ['A', 'B', 'C', 'D', 'E']
};
