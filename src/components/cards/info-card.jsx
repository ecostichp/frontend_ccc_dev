import LinkButton from "../../ui-kit/buttons/link-button";
import ImageParallaxTemplate from "../../ui-kit/image-parallax-template/image-parallax-template";
import style from './info-card.module.css';

const InfoCard = ({src, title, description, button, className, link}) => {

    return (
        <div className={`${style.container} ${className}`}>
            <ImageParallaxTemplate src={src} className={style.infoCard} />
            <div className={style.description}>
                <div className={style.info}>
                    <h3>{title}</h3>
                    <p>
                        {description}
                    </p>
                </div>
                <LinkButton text={button} link={link} />
            </div>
        </div>
    )
}

export default InfoCard;