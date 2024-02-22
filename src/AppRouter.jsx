import { Routes, Route } from "react-router-dom"
import { NewProductPage } from "./user/pages/NewProductPage/NewProductPage"

export function AppRouter() {
  return (
    <Routes>
        <Route path="/" element={<NewProductPage />} />
    </Routes>
  )
}
