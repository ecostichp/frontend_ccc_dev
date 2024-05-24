import { useContext } from "react";
import DarkModeContext from "../../contexts/dark-mode";
import SidebarDisplayContext from "../../contexts/sidebar-display";
import NavButton from "../../ui-kit/buttons/nav-button";
import SideButton from "../../ui-kit/buttons/side-button";
import IconNightMode from "../../ui-kit/icons/icon-night-mode";
import IconPhone from "../../ui-kit/icons/icon-phone";
import style from './sidebar.module.css';

const SideBar = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const { sidebarDisplay, setSidebarDisplay } = useContext(SidebarDisplayContext);
    const display = sidebarDisplay ? style.display : ""

    return (
        <aside className={`${style.container} ${display}`}>
            <div className={style.options}>
                <NavButton content={<IconNightMode />} func={() => setDarkMode(!darkMode)} />
                <NavButton content={<IconPhone />} link={"/contacto"} func={() => setSidebarDisplay(false)} />
            </div>
            <div className={style.options}>
                <SideButton content={"Inicio"} link={"/"} />
                <SideButton content={"Sucursales"} link={"/sucursales"} />
                <SideButton content={"Contacto"} link={"/contacto"} />
                <SideButton content={"Galería"} link={"/galería"} />
                <SideButton content={"Sobre nosotros"} link={"/sobre-nosotros"} />
            </div>
            <div
                className={`${style.modal} ${display}`}
                onClick={() => {setSidebarDisplay(false)}}
            >
            </div>
        </aside>
    )
}

export default SideBar;