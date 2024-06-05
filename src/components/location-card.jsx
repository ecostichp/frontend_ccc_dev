import { NavLink } from "react-router-dom";
import LinkButton from "../ui-kit/buttons/link-button";
import style from './location-card.module.css';

const LocationCard = ({src, place, link}) => {

    return (
        <NavLink to={`/${link}`}>
            <div className={style.container}>
                <img src={src}/>
                <div className={style.content}>
                    <p>{place}</p>
                    <LinkButton text={"Explorar"} link={`/${link}`} />
                </div>
            </div>
        </NavLink>
    )
}

export default LocationCard;