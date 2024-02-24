import { Routes, Route } from "react-router-dom"
import { NewProductPage } from "./user/pages/NewProductPage/NewProductPage"
import { NavBar } from "./components/NavBar/NavBar"

export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<NavBar />} >
          <Route index element={<NewProductPage />} />
        </Route>
    </Routes>
  )
}
