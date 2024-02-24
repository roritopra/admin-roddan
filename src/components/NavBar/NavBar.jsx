import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuLinks } from "./menuLinks";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
} from "@material-tailwind/react";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
export function NavBar() {
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <nav className="flex">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-5 flex items-center px-4">
          <img src="/icons/logo-navbar.png" alt="brand" />
        </div>
        <List className="font-poppins">
          {menuLinks.map((menu, index) => (
            <NavLink
            key={index}
            to={menu.url}
            className={({ isActive }) => {
              return `font-poppins flex items-center mb-2 p-3 rounded-xl ${
                isActive ? "text-white bg-[#0081FE]" : "text-[#737791] hover:bg-[#D4EAFF]"
              }`;
            }}
          >
            <ListItemPrefix>{menu.icon}</ListItemPrefix>
            {menu.text}
          </NavLink>
          ))}
        </List>
        <Alert
          open={openAlert}
          className="mt-auto"
          onClose={() => setOpenAlert(false)}
        >
          <CubeTransparentIcon className="mb-4 h-12 w-12" />
          <Typography variant="h6" className="mb-1">
            Upgrade to PRO
          </Typography>
          <Typography variant="small" className="font-normal opacity-80">
            Upgrade to Material Tailwind PRO and get even more components,
            plugins, advanced features and premium.
          </Typography>
          <div className="mt-4 flex gap-3">
            <Typography
              as="a"
              href="#"
              variant="small"
              className="font-medium opacity-80"
              onClick={() => setOpenAlert(false)}
            >
              Dismiss
            </Typography>
            <Typography as="a" href="#" variant="small" className="font-medium">
              Upgrade Now
            </Typography>
          </div>
        </Alert>
      </Card>
      <Outlet />
    </nav>
  );
}
