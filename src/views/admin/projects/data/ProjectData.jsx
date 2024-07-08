import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaUserLockSolid, LiaUsersSolid } from "react-icons/lia";
import { MdBarChart } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

export const Cards = [
    {
        amount: "₹20k",
        title: "Total Visitors",
        message: "+9% from yesterday",
        bgColor: "#D7E9FD",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #C0DEFF",
        icon: <TbMoneybag />,
        iconBackgroundColor: "#407BFF"
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
        amount: "120",
        title: "Converted",
        message: "-9% from yesterday",
        bgColor: "#FFEEF8",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #FFABDC",
        icon: <AiOutlineUsergroupAdd />,
        iconBackgroundColor: "#CF9DBB"
    },
    {
        amount: "658",
        title: "Ongoing",
        message: "+9% from yesterday",
        bgColor: "#FFF9EA",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #FCEECA",
        icon: <LiaUserLockSolid />,
        iconBackgroundColor: "#EAD39C"
    },
    {
        amount: "10",
        title: "Rejected",
        message: "+9% from yesterday",
        bgColor: "#E5E6F9",
        messageColor: "#1C6ED0",
        shadow: "2px 4px 14px 0px #B7BAEA",
        icon: <LiaUsersSolid />,
        iconBackgroundColor: "#A0A3D8"
    },

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
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        progress: 70,
        backgroundColor: "#C6DBF3",
        textColor: "#3965FF"

    },
    {
        category: "SEO",
        subCategory: "Digital Marketing",
        progress: 20,
        backgroundColor: "#C6DBF3",
        textColor: "#3965FF"
    },
    {
        category: "Marketing",
        subCategory: "Advertising",
        progress: 70,
        backgroundColor: "#C6DBF3",
        textColor: "#3965FF"
    },
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
