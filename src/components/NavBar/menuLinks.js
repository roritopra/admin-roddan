import { DashboardIcon } from "./NavIcons/DashboardIcon";
import { ProductIcon } from "./NavIcons/ProductIcon"; 
import { OrderIcon } from "./NavIcons/OrderIcon";
import { UserIcon } from "./NavIcons/UserIcon";
import { AdminIcon } from "./NavIcons/AdminIcon";
import { SignOutIcon } from "./NavIcons/SignOutIcon";

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
  {
    id: 6,
    icon: <SignOutIcon />,
    text: "Sign Out",
    url: "/signout",
  },
];
