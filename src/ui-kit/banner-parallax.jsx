import style from './banner-parallax.module.css';
import VerticalParallaxImg from './image-parallax-template/vertical-parallax-img';

const BannerParallax = ({src}) => {
    return (
        <VerticalParallaxImg src={src} className={style.banner}/>
    )
}

export default BannerParallax;