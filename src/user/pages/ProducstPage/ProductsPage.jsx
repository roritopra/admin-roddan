import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Tooltip,
  Image,
  Pagination,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { ArrowLongLeftIcon } from "../NewProductPage/ArrowLongLeftIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { PlusIcon } from "./PlusIcon";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { database } from "../../../firebase/firebase";
import { columns } from "../../../data/columns";
import { useCallback, useState, useMemo, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { Modal } from "../../../components/Modal/Modal";

export function ProductsPage() {
  const [showDetailsList, setShowDetailsList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const pages = Math.ceil(products.length / rowsPerPage);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    showProductsDetails();
  };

  const showProductsDetails = () => {
    setShowDetailsList(!showDetailsList);
  };

  useEffect(() => {
    (async () => {
      const productsCollection = collection(database, "products");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = [];
      productsSnapshot.forEach((project) => {
        productsList.push({ key: project.id, ...project.data() });
      });
      setProducts(productsList);
    })();
  }, []);

  const deleteProduct = async (productId) => {
    const productRef = doc(database, "products", productId);
    await deleteDoc(productRef);
    setIsDeleted(true);
  };

  console.log(products);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return products.slice(start, end);
  }, [page, products]);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div>
            <Image width={35} radius="none" alt="Image" src={product.cover} />
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize font-poppins">
              {cellValue}
            </p>
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="font-semibold text-sm text-[#11181C] capitalize font-poppins">
              $ {cellValue}
            </p>
          </div>
        );
      case "status":
        return <Switch defaultSelected aria-label="Status" />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip className="font-poppins" content="Details">
              <span
                onClick={() => handleProductClick(product)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip className="font-poppins" content="Edit product">
            <Link to={`/edit-product/${product.key}`}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Link>
            </Tooltip>
            <Tooltip
              className="font-poppins"
              color="danger"
              content="Delete product"
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
    <main className="flex flex-col w-full h-full px-6 bg-[#F9FAFB]">
      <Header pageName="Products" />

      <Modal
        key={selectedProduct?.key}
        show={isDeleted}
        onClose={() => setIsDeleted(false)}
      >
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="font-poppins text-[#151D48] text-2xl font-semibold mb-8">
            Product Deleted
          </h1>
          <NavLink to={"/products"}>
            <Button
              className="bg-[#0081FE] font-poppins text-white font-medium"
              size="lg"
              endContent={<ArrowLongLeftIcon />}
            >
              Check it
            </Button>
          </NavLink>
        </div>
      </Modal>

      <Modal
        key={products.key}
        show={showDetailsList}
        onClose={showProductsDetails}
      >
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="font-poppins text-[#151D48] text-2xl font-semibold mb-8">
            Product Details
          </h1>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col w-full gap-2">
                <p className="font-poppins text-[#151D48] text-lg font-semibold">
                  Product Name
                </p>
                <p className="font-poppins text-[#151D48] text-lg font-normal">
                  {selectedProduct?.title}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="font-poppins text-[#151D48] text-lg font-semibold">
                  Product Price
                </p>
                <p className="font-poppins text-[#151D48] text-lg font-normal">
                  ${selectedProduct?.price}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="font-poppins text-[#151D48] text-lg font-semibold">
                  Product Description
                </p>
                <p className="font-poppins text-[#151D48] text-lg max-w-sm font-normal">
                  {selectedProduct?.description === null
                    ? "No description"
                    : selectedProduct?.description.length > 50
                    ? selectedProduct?.description.substring(0, 50) + "..."
                    : selectedProduct?.description}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="font-poppins text-[#151D48] text-lg font-semibold">
                  Product Category
                </p>
                <p className="font-poppins text-[#151D48] text-lg font-normal">
                  {selectedProduct?.category}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="font-poppins text-[#151D48] text-lg font-semibold">
                  Product Color
                </p>
                <p className="font-poppins text-[#151D48] text-lg font-normal">
                  {selectedProduct?.colors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        <NavLink to={"new-product"}>
          <Button
            className="bg-[#0081FE] mb-6 font-poppins text-white"
            endContent={<PlusIcon />}
          >
            Add New Product
          </Button>
        </NavLink>
      </div>

      <Table
        aria-label="Products table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              className="font-poppins"
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
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="font-poppins"
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
