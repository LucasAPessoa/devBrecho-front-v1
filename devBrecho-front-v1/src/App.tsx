import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/Login";
import { AuthLayout } from "./components/layouts/auth-layout";
// import { Setores } from "./pages/Setores";
// import { Fornecedoras } from "./pages/Fornecedoras";
// import { Bolsas } from "./pages/Bolsas";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                {/* <Route path="/setores" element={<Setores />} />
                <Route path="/fornecedoras" element={<Fornecedoras />} />
                <Route path="/bolsas" element={<Bolsas />} /> */}
            </Route>
            <Route path="/app"></Route>
        </Routes>
    );
}

export default App;
