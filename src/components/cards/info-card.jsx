import LinkButton from "../../ui-kit/buttons/link-button";
import ImageParallaxTemplate from "../../ui-kit/image-parallax-template/image-parallax-template";
import style from './info-card.module.css';

const InfoCard = ({src, title, description, button, className, link}) => {

    return (
        <div className={`${style.container} ${className}`}>
            <ImageParallaxTemplate src={src} className={style.infoCard} />
            <div className={style.description}>
                <div className={style.info}>
                    <h2 className="fc-red fw-400">{title}</h2>
                    <p className="fc-gray">
                        {description}
                    </p>
                </div>
                <LinkButton text={button} link={link} />
            </div>
        </div>
    )
}

export default InfoCard;