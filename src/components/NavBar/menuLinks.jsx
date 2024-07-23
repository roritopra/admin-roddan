import { DashboardIcon } from "../Icons/DashboardIcon";
import { ProductIcon } from "../Icons/ProductIcon"; 
import { OrderIcon } from "../Icons/OrderIcon";
import { UserIcon } from "../Icons/UserIcon";
import { AdminIcon } from "../Icons/AdminIcon";

export const menuLinks = [
  {
    id: 1,
    icon: <DashboardIcon />,
    text: "Dashboard",
    url: "/",
  },
  {
    id: 2,
    icon: <ProductIcon />,
    text: "Products",
    url: "/products",
  },
  {
    id: 3,
    icon: <OrderIcon />,
    text: "Orders",
    url: "/orders",
  },
  {
    id: 4,
    icon: <UserIcon />,
    text: "Users",
    url: "/users",
  },
  {
    id: 5,
    icon: <AdminIcon />,
    text: "Admins",
    url: "/admins",
  },
];
