import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import RequireAuth from "./routes/RequireAuth";

import { useAuthContext } from "./pages/login/context";
import { Login } from "./pages/login/login";

import OrdersBandaLargaPJ from "./pages/orders/ordersBandaLargaPJ/ordersBandaLargaPJ";
import OrdersBandaLargaPF from "./pages/orders/ordersBandaLargaPF/ordersBandaLargaPF";
import ResultAvailability from "./pages/backoffice/components/consultAvailability/resultAvailability";
import ResultSearchAvailability from "./pages/backoffice/components/searchAvailability/resultSearchAvailability";
import ResultBulkAvailability from "./pages/backoffice/components/bulkAvailability/resultBulkAvailability";
import Availability from "./pages/backoffice/consultAvailability/availability";
import { Chats } from "./pages/chats/chats";
import CheckOperadora from "./pages/tools/checkOperadora/checkOperadora";
import CheckAnatel from "./pages/tools/checkAnatel/checkAnatel";
import ZapChecker from "./pages/tools/zapChecker/zapChecker";
import PJChecker from "./pages/tools/pjChecker/pjChecker";
import Base2bSocio from "./pages/tools/base2bSocio/base2bSocio";
import Base2bEmpresa from "./pages/tools/base2bEmpresa/base2bEmpresa";
// import { Chat } from "./pages/chat/chat";

export default function App() {
  const { user, checkAuth } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={user ? <Navigate to="/admin/leads-pf" replace /> : <Login />}
        />

        <Route element={<PublicLayout />} />

        <Route element={<RequireAuth user={user} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/check-operadora" element={<CheckOperadora />} />
            <Route path="/admin/check-anatel" element={<CheckAnatel />} />
            <Route path="/admin/zap-checker" element={<ZapChecker />} />
            <Route path="/admin/pj-checker" element={<PJChecker />} />
            <Route path="/admin/base2b-socio" element={<Base2bSocio />} />
            <Route path="/admin/base2b-empresa" element={<Base2bEmpresa />} />
            <Route path="/admin/chats" element={<Chats />} />
            <Route path="/admin/leads-pj" element={<OrdersBandaLargaPJ />} />
            <Route path="/admin/leads-pf" element={<OrdersBandaLargaPF />} />
            <Route
              path="/admin/consulta-disponibilidade"
              element={<Availability />}
            />
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
          </Route>
        </Route>

        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/admin/leads-pf" replace />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
      </Routes>

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
    </Router>
  );
}
