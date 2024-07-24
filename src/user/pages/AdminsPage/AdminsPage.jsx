import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Tooltip,
  Pagination,
  Button,
  User,
} from "@nextui-org/react";
import { useCallback, useState, useMemo, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { NavLink } from "react-router-dom";

import { Header } from "../../../components/Header/Header";
import { database } from "../../../firebase/firebase";
import { columnsAdmins } from "../../../data/columns";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";
import { PlusIcon } from "../../../components/Icons/PlusIcon";

export function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);

  const rowsPerPage = 6;
  const pages = Math.ceil(admins.length / rowsPerPage);

  useEffect(() => {
    (async () => {
      const adminsCollection = collection(database, "Admins");
      const adminsSnapshot = await getDocs(adminsCollection);
      const adminsList = [];
      adminsSnapshot.forEach((admin) => {
        adminsList.push({ key: admin.id, ...admin.data() });
      });
      setAdmins(adminsList);
    })();
  }, []);

  const deleteAdmin = async (adminId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const adminRef = doc(database, "Admins", adminId);
      await deleteDoc(adminRef);
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.key !== adminId));
    } else {
      return;
    }
  };

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return admins.slice(start, end);
  }, [page, admins]);

  const renderCell = useCallback((admin, columnKey) => {
    const cellValue = admin[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            description={admin.email}
            name={
              cellValue && admin.lastName
                ? `${admin.name} ${admin.lastName}`
                : admin.name
            }
          >
            {admin.email}
          </User>
        );
      case "status":
        return <Switch defaultSelected aria-label="Status" />;
      case "actions":
        return (
          <div className="relative flex items-center">
            <Tooltip
              className="font-satoshi"
              color="danger"
              content="Delete admin"
            >
              <span
                onClick={() => deleteAdmin(admin.key)}
                className="text-lg p-3 transition-all hover:transition-all hover:bg-[#FFD3E3] rounded-full text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <main className="flex flex-col w-full px-6 bg-[#F9FAFB]">
      <Header pageName={"Admins"} />
      <div>
        <NavLink to={"/register"}>
          <Button
            className="bg-[#0081FE] mb-6 font-satoshi text-white"
            endContent={<PlusIcon />}
          >
            Add New Admin
          </Button>
        </NavLink>
      </div>

      <Table
        aria-label="admins table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              className="font-satoshi"
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columnsAdmins}>
          {(column) => (
            <TableColumn
              className="font-satoshi"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
}
