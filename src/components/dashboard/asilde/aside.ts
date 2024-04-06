import path from 'path';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { IoCreateSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

export const sideBarItem = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: HiArrowSmRight
    },
    {
        title: "Account",
        path: "/dashboard/account",
        icon: HiChartPie
    },
    {
        title: "Setting",
        path: "/dashboard/setting",
        icon: HiViewBoards
    },
    {
        title: "Create Product",
        path: "/dashboard/create-product",
        icon: IoCreateSharp
    },
    {
        title: "Home",
        path: "./",
        icon: AiFillHome 
    },
]