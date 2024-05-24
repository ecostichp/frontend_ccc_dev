import { NavLink, useLocation } from 'react-router-dom';
import style from './button.module.css';

const LinkButton = ({icon, text, link, target= "_self"}) => {

    const { pathname } = useLocation();
    
    if (!link) {
        link = pathname
    }
    
    return (
        <NavLink to={link} target={target}>
            <button className={style.button}>
                <div>{icon ? <div>{icon}</div> : ""}{text} </div>
            </button>
        </NavLink>
    )
}

export default LinkButton;