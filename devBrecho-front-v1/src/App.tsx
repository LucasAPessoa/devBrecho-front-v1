import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/Login";
import { AuthLayout } from "./components/layouts/auth-layout";
import { AppLayout } from "./components/layouts/app-layout";
import { Sectors } from "./pages/Sectors/Sectors";
import { Suppliers } from "./pages/Suppliers/Suppliers";
import { Bags } from "./pages/Bags/Bags";
import { Dashboard } from "./pages/Dashboard/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
            </Route>
            <Route path="/" element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bolsas" element={<Bags />} />
                <Route path="/setores" element={<Sectors />} />
                <Route path="/fornecedoras" element={<Suppliers />} />
            </Route>
        </Routes>
    );
}

export default App;
