import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/solid";
import { useState, createElement, useEffect, useContext } from "react";

import { getDoc, doc } from "firebase/firestore";
import { auth, database } from "../../firebase/firebase";
import { authContext } from "../../auth/AuthContext";

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const { logout } = useContext(authContext);

  const profileMenuItems = [
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    logout();
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(database, "Admins", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-xl py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <div className="flex items-center gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                variant="rounded"
              />
              <div className="font-satoshi">
                <h6 className="text-[12px] text-[#151D48] font-medium">
                  {userDetails?.name} {userDetails?.lastName}
                </h6>
                <p className="text-[10px] text-[#151D48] font-normal">Admin</p>
              </div>
            </div>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1 font-satoshi">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  onClick={handleLogout}
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
}
