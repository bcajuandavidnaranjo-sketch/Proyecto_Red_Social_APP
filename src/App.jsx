import { Routes, Route, Navigate } from "react-router-dom";
import { SocialProvider } from "./components/SocialContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas de la carpeta pages
import HomePage from "./pages/HomePage";
import PerfilPage from "./pages/PerfilPage";
import ChatPage from "./pages/ChatPage";
import GruposPage from "./pages/GruposPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <SocialProvider>
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* =======================================================
              RUTAS PÚBLICAS
              ======================================================= */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/register" element={<Navigate to="/registro" replace />} />

          {/* =======================================================
              RUTAS RESTRINGIDAS / PROTEGIDAS
              (Requieren tener sesión iniciada)
              ======================================================= */}
          <Route element={<ProtectedRoute />}>
            {/* Inicio / Muro (plantilla-RedSocial.html) */}
            <Route path="/" element={<HomePage />} />

            {/* Perfil (perfil.html) */}
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/profile" element={<Navigate to="/perfil" replace />} />

            {/* Chat / Mensajes (chat.html) */}
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mensajes" element={<Navigate to="/chat" replace />} />
            <Route path="/messages" element={<Navigate to="/chat" replace />} />

            {/* Grupos (grupos.html) */}
            <Route path="/grupos" element={<GruposPage />} />
            <Route path="/groups" element={<Navigate to="/grupos" replace />} />

            {/* Configuración (configuracion.html) */}
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/settings" element={<Navigate to="/configuracion" replace />} />
          </Route>

          {/* Ruta 404 para cualquier URL no encontrada */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <br />
      <Footer />
    </SocialProvider>
  );
}
