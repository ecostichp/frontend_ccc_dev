import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/bars/navbar";
import SideBar from "./components/bars/sidebar";
import DarkModeContext from "./contexts/dark-mode";
import SidebarDisplayContext from "./contexts/sidebar-display";
import PageContainer from "./ui-kit/page-container";

const App = () => {
    // Modo oscuro
    const [darkMode, setDarkMode] = useState(
        () => {
            // Búsqueda de preferencia predeterminada para el sitio
            const savedPreference = localStorage.getItem("darkmode");
            return (
                // Preferencia predeterminada es verdadera o...
                savedPreference === "true" || (
                    // No hay preferencia predeterminada y la configuración del usuario está en modo oscuro
                    !savedPreference && window.matchMedia("(prefers-color-scheme: dark)").matches
                )
            );
        }
    );

    // Estado para mostrar y ocultar el sidebar en interfaz móvil
    const [sidebarDisplay, setSidebarDisplay] = useState(false);

    // Nombre de la dirección después del dominio
    const { pathname } = useLocation();

    // Elemento body para su manipulación fuera de React.js
    const bodyElement = document.body;

    // Activación o desactivación del modo oscuro manipulando el elemento body directamente
    useEffect(
        () => {
            localStorage.setItem('darkmode', darkMode)
            if (darkMode) {
                bodyElement.classList.add("dark-mode")
            } else {
                bodyElement.classList.remove("dark-mode")
            }
        }, [darkMode, bodyElement]
    )

    // Reestablecer la posición de deslizamiento vertical cuando cambia el nombre de la dirección con React Router
    useEffect(
        () => {
            window.scrollTo(0, 0);
        }, [pathname]
    )

    // Bloquear el deslizamiento vertical mientras el sidebar se muestra
    useEffect(
        () => {
            if (sidebarDisplay) {
                bodyElement.classList.add("body-overflow-y")
            } else {
                bodyElement.classList.remove("body-overflow-y")
            }
        }
    )

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <SidebarDisplayContext.Provider value={{ sidebarDisplay, setSidebarDisplay }}>
                <PageContainer class="page-container">
                <Navbar />
                <SideBar />
                    <Outlet />
                </PageContainer>
            </SidebarDisplayContext.Provider>
        </DarkModeContext.Provider>
    )
}

export default App
