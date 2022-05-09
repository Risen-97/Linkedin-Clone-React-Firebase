import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import {
  BsBagFill,
  BsFillChatDotsFill,
  BsPersonCircle,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
export const navLinks = [
  {
    icon: <AiFillHome size={24} />,
    name: "Home",
    path: "/",
  },
  {
    icon: <HiUserGroup size={24} />,
    name: "Network",
    path: "/network",
  },
  {
    icon: <BsBagFill size={24} />,
    name: "Job",
    path: "/job",
  },
  {
    icon: <BsFillChatDotsFill size={24} />,
    name: "Messaging",
    path: "/messages",
    badge: () => {
      return (
        <span className="absolute top-0 -right-6 w-8 h-4 bg-red-600 rounded-lg flex items-center justify-center  text-xs text-white">
          12
        </span>
      );
    },
  },
  {
    icon: <IoMdNotifications size={24} />,
    badge: () => {
      return (
        <span className="absolute top-0 -right-6 w-8 h-4 bg-red-600 rounded-lg flex items-center justify-center  text-xs text-white">
          99+
        </span>
      );
    },
    name: "Notifications",
    path: "/notifications",
  },
  {
    icon: <BsPersonCircle size={24} />,
    name: "Me",
    path: "/profile",
  },
  {
    icon: <BsFillGrid3X3GapFill size={24} />,
    name: "Work",
    path: "/work",
  },
];

export const feedUsers = [
  {
    name: "mark zuckerberg",
    photo: "/images/mark.jpg",
    title: "Co-founder and CEO of Meta Platforms",
  },
  {
    name: "bill gates",
    photo: "/images/bill.jpg",
    title: "Co-founder of Microsoft and Bill & Melinda Gates Foundation",
  },
  {
    name: "denzel washington",
    photo: "/images/denzel.jpg",
    title: "Actor | director | producer",
  },
];
