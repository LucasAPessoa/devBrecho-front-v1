import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/Login";
import { AuthLayout } from "./components/layouts/auth-layout";
import { AppLayout } from "./components/layouts/app-layout";
// import { Setores } from "./pages/Setores";
// import { Fornecedoras } from "./pages/Fornecedoras";
import { Bags } from "./pages/Bags/Bags";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                {/* <Route path="/setores" element={<Setores />} />
                <Route path="/fornecedoras" element={<Fornecedoras />} />*/}
            </Route>
            <Route path="/" element={<AppLayout />}>
                <Route path="/bolsas" element={<Bags />} />
            </Route>
        </Routes>
    );
}

export default App;
