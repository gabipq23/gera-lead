import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import SubHeader from "./components/subHeader";

import { useAuthContext } from "./pages/login/context";
import { Login } from "./pages/login/login";

import { IUser } from "@/interfaces/login";
import OrdersBandaLargaPJ from "./pages/orders/ordersBandaLargaPJ/ordersBandaLargaPJ";
import OrdersBandaLargaPF from "./pages/orders/ordersBandaLargaPF/ordersBandaLargaPF";
import ResultAvailability from "./pages/backoffice/components/consultAvailability/resultAvailability";
import ResultSearchAvailability from "./pages/backoffice/components/searchAvailability/resultSearchAvailability";
import ResultBulkAvailability from "./pages/backoffice/components/bulkAvailability/resultBulkAvailability";
import Availability from "./pages/backoffice/consultAvailability/availability";

export default function App() {
  const { user, checkAuth } = useAuthContext();

  useEffect(() => {
    if (!user) return;
  }, [user]);
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Router>
      <Content user={user} />
    </Router>
  );
}

function Content({ user }: { user: IUser | null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicPath = location.pathname.startsWith("/painel-faturas/cliente");
  const isLogin = location.pathname === "/admin";

  const effectiveUser = isPublicPath ? null : user;

  useEffect(() => {
    if (effectiveUser && isLogin) {
      navigate("/admin/leads-pj", { replace: true });
    }
  }, [effectiveUser, isLogin, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      {!isLogin && <Header />}
      {effectiveUser && <SubHeader />}
      <div className="flex-1">
        <Routes>
          {effectiveUser ? (
            <>
              <Route path="/admin/leads-pj" element={<OrdersBandaLargaPJ />} />
              <Route path="/admin/leads-pf" element={<OrdersBandaLargaPF />} />
              <Route
                path="/admin/consulta-disponibilidade"
                element={<Availability />}
              />{" "}
              <Route
                path="/admin/consulta-disponibilidade/:cep"
                element={<ResultAvailability />}
              />
              <Route
                path="/admin/consulta-disponibilidade/:cep/:numero"
                element={<ResultAvailability />}
              />
              <Route
                path="/admin/resultado-disponibilidade"
                element={<ResultSearchAvailability />}
              />
              <Route
                path="/admin/resultado-disponibilidade-massa"
                element={<ResultBulkAvailability />}
              />
              {/* <Route
                path="/admin/estoque-equipamento"
                element={<EquipamentsStock />}
              />
              <Route
                path="/admin/planos-banda-larga-pj"
                element={<BLPJStock />}
              />
              <Route
                path="/admin/planos-banda-larga-pf"
                element={<BLPFStock />}
              />
              <Route
                path="/admin/produtos-office365"
                element={<OfficeStock />}
              />
              <Route
                path="/admin/produtos-workspace"
                element={<WorkSpaceStock />}
              />

              <Route path="/admin/usuarios" element={<Users />} />
              <Route
                path="/admin/perfil-usuario/:id"
                element={<UserProfile />}
              /> */}
            </>
          ) : (
            <>
              <Route path="/admin" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
      {!isLogin && <Footer />}

      {/* componente do Toast. Só aparece quando da import no lugar desejado: "import { toast } from "sonner";" */}
      <Toaster
        duration={5000}
        position="bottom-right"
        richColors
        expand={true}
        visibleToasts={6}
        toastOptions={{
          style: {
            pointerEvents: "auto",
          },
        }}
      />
    </div>
  );
}
