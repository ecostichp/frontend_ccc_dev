import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarDisplayContext from '../../contexts/sidebar-display';
import style from './side-button.module.css';

const SideButton = ({content, link}) => {
    const { setSidebarDisplay } = useContext(SidebarDisplayContext);

    return (
        <NavLink to={link}>
            <button onClick={() => {setSidebarDisplay(false)}} className={`${style.button} bar-button`}>
                <div>{content}</div>
            </button>
        </NavLink>
    )
}

export default SideButton;