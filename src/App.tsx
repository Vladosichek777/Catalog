import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Basket from "./pages/Basket";
import MainLayout from "./ui/MainLayout";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import ProtectedRole from "./ui/ProtectedRole";
import SessionProvider from "./ui/SessionProvider";
import "./App.css";

function App(): React.ReactElement {
    console.log("app render ");

    return (
        <SessionProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path=":role" element={<MainLayout />}>
                    <Route path="catalog" element={<MainPage />} />
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
        </SessionProvider>
    );
}

export default App;
