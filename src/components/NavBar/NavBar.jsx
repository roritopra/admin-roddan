import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { menuLinks } from "./menuLinks";
import { Card, List } from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import './NavBar.css';

export function NavBar() {
  return (
    <nav className="flex">
      <Card className="h-full w-full max-w-[18rem] p-4 shadow-xl shadow-white">
        <div className="mb-5 flex items-center px-4">
          <img src="/icons/logo-navbar.png" alt="brand" />
        </div>
        <List className="font-poppins">
          {menuLinks.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.url}
              className={({ isActive }) => {
                return `font-poppins flex items-center mb-2 p-3 rounded-xl transition-all ${
                  isActive
                    ? "text-white bg-[#0081FE] [&>div>svg]:stroke-white"
                    : "text-[#737791] hover:bg-[#D4EAFF]"
                }`;
              }}
            >
              <div className="grid place-items-center mr-4">{menu.icon}</div>
              {menu.text}
            </NavLink>
          ))}
        </List>
        <section className="relative mt-36 flex flex-col items-center justify-center bg-gradient rounded-2xl p-10">
          <img
            className="absolute top-[-50px]"
            src="/icons/solo-logo.png"
            alt="Brand"
          />
          <h2 className="font-poppins text-white font-semibold mb-5 text-xl">Roddan</h2>
          <p className="font-poppins text-white text-center px-4 mb-7 text-sm">
            Dont forget save the tasks when is completed
          </p>
          <Button className="bg-white text-[#0081FE] font-semibold font-poppins px-10 text-lg">Orders</Button>
        </section>
      </Card>
      <Outlet />
    </nav>
  );
}
