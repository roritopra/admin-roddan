import { Routes, Route } from "react-router-dom";
import { NewProductPage } from "./user/pages/NewProductPage/NewProductPage";
import { DashboardPage } from "./user/pages/DashboardPage/DashboardPage";
import { AdminsPage } from "./user/pages/AdminsPage/AdminsPage";
import { OrdersPage } from "./user/pages/OrdersPage/OrdersPage";
import { ProductsPage } from "./user/pages/ProducstPage/ProductsPage";
import { UsersPage } from "./user/pages/UsersPage/UsersPage";
import { NavBar } from "./components/NavBar/NavBar";
import { PageNotFound } from "./user/pages/PageNotFound/PageNotFound";
import { EditProductPage } from "./user/pages/EditProductPage/EditProductPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/" element={<NavBar />}>
        <Route index element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new-product" element={<NewProductPage />} />
        <Route path="/products/edit-product/:productId" element={<EditProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/admins" element={<AdminsPage />} />
      </Route>
    </Routes>
  );
}
