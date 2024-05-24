import { useContext } from "react"
import { NavLink } from "react-router-dom"
import DarkModeContext from "../../contexts/dark-mode"
import SidebarDisplayContext from "../../contexts/sidebar-display"
import NavButton from "../../ui-kit/buttons/nav-button"
import IconMenu from "../../ui-kit/icons/icon-menu"
import IconNightMode from "../../ui-kit/icons/icon-night-mode"
import IconPhone from "../../ui-kit/icons/icon-phone"
import style from "./navbar.module.css"

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const { sidebarDisplay, setSidebarDisplay } = useContext(SidebarDisplayContext);

    return (
        <nav className={`${style.navbar}`}>
            <NavLink to="/">
                <img className={`${style.logo} nav-logo-color`} src="logo-color.png"/>
                <img className={`${style.logo} nav-logo-white`} src="logo-white.png"/>
            </NavLink>
            {/* div vacío para solucionar la alineacion */}
            <div></div>
            <div className={style.menu}>
                <NavButton content={<IconMenu />} func={() => {setSidebarDisplay(!sidebarDisplay)}} />
            </div>
            <div className={style.options}>
                <NavButton content={"Inicio"} link={"/"} />
                <NavButton content={"Sucursales"} link={"/sucursales"} />
                <NavButton content={"Contacto"} link={"/contacto"} />
                <NavButton content={"Galería"} link={"/galería"} />
                <NavButton content={"Sobre nosotros"} link={"/sobre-nosotros"} />
            </div>
            <div className={style.options}>
                <NavButton content={<IconPhone />} link={"/contacto"} />
                <NavButton content={<IconNightMode />} func={() => setDarkMode(!darkMode)} />
            </div>
        </nav>
    )
}

export default Navbar