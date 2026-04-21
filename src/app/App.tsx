import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Basket } from "../pages/basket";
import { Login } from "../pages/login/index";
import { Catalog } from "../pages/catalog/index";
import { ProductPage } from "../pages/productPage/index";
import { MainLayout } from "../pages/mainLayout";
import ProtectedRole from "./provider/ProtectedRole";
import { AuthComponent } from "./provider/Auth";

function App(): React.ReactElement {
  console.log("app render ");

  return (
    <AuthComponent>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path=":role" element={<MainLayout />}>
          <Route path="catalog" element={<Catalog />} />
          <Route path="productCard/:id" element={<ProductPage />} />
          <Route
            path="basket"
            element={
              <ProtectedRole role="user">
                <Basket />
              </ProtectedRole>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthComponent>

  );
}

export default App;
