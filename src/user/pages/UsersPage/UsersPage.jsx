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
} from "@nextui-org/react";
import { useCallback, useState, useMemo, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { Header } from "../../../components/Header/Header"
import { database } from "../../../firebase/firebase";
import { columnsClients } from "../../../data/columns";
import { DeleteIcon } from "../../../components/Icons/DeleteIcon";

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  
  const rowsPerPage = 6;
  const pages = Math.ceil(users.length / rowsPerPage);

  useEffect(() => {
    (async () => {
      const usersCollection = collection(database, "Clients");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = [];
      usersSnapshot.forEach((user) => {
        usersList.push({ key: user.id, ...user.data() });
      });
      setUsers(usersList);
    })();
  }, []);

  const deleteProduct = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const userRef = doc(database, "Admins", userId);
      await deleteDoc(userRef);
    } else {
      return;
    }
  };

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize font-satoshi">
              {cellValue}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize font-satoshi">
              {cellValue}
            </p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-[#11181C] capitalize font-satoshi">
              {cellValue}
            </p>
          </div>
        );
      case "status":
        return <Switch defaultSelected aria-label="Status" />;
      case "actions":
        return (
          <div className="relative flex items-center">
            <Tooltip
              className="font-satoshi"
              color="danger"
              content="Delete user"
            >
              <span
                onClick={() => deleteProduct(product.key)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
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
      <Header pageName={"Users"} />
      <h1 className="font-satoshi text-3xl text-[#151D48] mb-10">
        Hello, <span className="font-semibold">Daniel Caicedo</span>
      </h1>

      <Table
        aria-label="users table"
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
        <TableHeader columns={columnsClients}>
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
  )
}
