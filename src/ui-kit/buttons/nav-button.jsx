import { NavLink, useLocation } from "react-router-dom";
import style from './nav-button.module.css';

const NavButton = ({content, func=null, link=null}) => {
    const buttonType = typeof(content) === "string" ? style.buttonText : style.buttonIcon

    const { pathname } = useLocation();
    
    if (!link) {
        link = pathname
    }

    return (
        <NavLink className={style.navlink} to={link} >
            <button onClick={func} className={`${buttonType} bar-button`}>
                <div>{content}</div>
            </button>
        </NavLink>
    )

    // const BaseNavButton = () => {

    //     return (
    //         <NavLink className={style.navlink} to={link} >
    //             <button onClick={func} className={`${buttonType} bar-button`}>
    //                 <div>{content}</div>
    //             </button>
    //         </NavLink>
    //     )
    // };

    // if (link) {
    //     return (
    //         <NavLink className={style.navlink} to={link} >
    //             <button onClick={func} className={`${buttonType} bar-button`}>
    //                 <div>{content}</div>
    //             </button>
    //         </NavLink>
    //     )
    // } else {
    //     return (
    //         <BaseNavButton />
    //     )
    // }
}

export default NavButton;