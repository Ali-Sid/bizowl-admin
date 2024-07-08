import React from "react";

import { Icon } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdBusiness,
  MdFormatQuote,
} from "react-icons/md";

// Admin Imports

import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import UserManagement from "views/admin/users/UserManagement";
import PartnerManagement from "views/admin/partners/PartnerManagement";
import QuoteManagement from "views/admin/quote";
import { GoProject } from "react-icons/go";
import Projects from "views/admin/projects";
import Dashboard from "views/admin/dashboards";
import AssignedPartners from "views/admin/assigned";
import Test from "views/admin/test";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/home",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Dashboard,
  },
  {
    name: "Projects",
    layout: "/admin",
    path: "/projects",
    icon: <Icon as={GoProject} width='20px' height='20px' color='inherit' />,
    component: Projects,
  },
  {
    name: "Assigned Partners",
    layout: "/admin",
    path: "/assigned-partners",
    icon: <Icon as={GoProject} width='20px' height='20px' color='inherit' />,
    component: AssignedPartners,
  },
  {
    name: "Service Requests",
    layout: "/admin",
    path: "/services",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: (<Icon as={MdPerson} width='20px' height='20px' color='inherit' />),
    component: UserManagement
  },
  {
    name: "Partners",
    layout: "/admin",
    path: "/partners",
    icon: (<Icon as={MdBusiness} width='20px' height='20px' color='inherit' />),
    component: PartnerManagement
  },
  {
    name: "Quotes",
    layout: "/admin",
    path: "/quote",
    icon: (<Icon as={MdFormatQuote} width='20px' height='20px' color='inherit' />),
    component: QuoteManagement
  },
  {
    name: "Test Data",
    layout: "/admin",
    path: "/test",
    icon: (<Icon as={MdFormatQuote} width='20px' height='20px' color='inherit' />),
    component: Test
  },

  // {
  //   name: "User Data",
  //   childrens: [
  //     {
  //       name:"Partners",
  //       layout: "/admin",
  //       path: "/partners",
  //       icon:(<Icon as={FaUsers} width='20px' height='20px' color='inherit'/>),
  //       component: PartnerManagement
  //     },
  //     {
  //       name:"Users",
  //       layout: "/admin",
  //       path: "/users",
  //       icon:(<Icon as={FaUsers} width='20px' height='20px' color='inherit'/>),
  //       component: UserManagement
  //     },
  //     {
  //       name:"Project",
  //       layout: "/admin",
  //       path: "/project",
  //       icon:(<Icon as={GrProjects} width='20px' height='20px' color='inherit'/>),
  //       //component: UserManagement
  //     },
  //   ]
  // },

  // {
  //   name: "Bookings and Reservations",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
