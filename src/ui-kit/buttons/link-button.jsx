import { NavLink, useLocation } from 'react-router-dom';
import style from './button.module.css';

const LinkButton = ({icon, text, link}) => {

    const { pathname } = useLocation();
    
    if (!link) {
        link = pathname
    }
    
    return (
        <NavLink to={link}>
            <button className={style.button}>
                <div>{icon ? <div>{icon}</div> : ""}{text} </div>
            </button>
        </NavLink>
    )
}

export default LinkButton;