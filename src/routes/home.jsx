import InfoCards from "../components/cards/info-cards";
import LogoMain from "../components/logo-main";
import BannerParallax from "../ui-kit/banner-parallax";
import BrandRibbon from "../ui-kit/brands/brands-ribbon";
import LinkButton from "../ui-kit/buttons/link-button";
import style from "./home.module.css";

const Home = () => {
    
    return (
        <main>
            <section className={style.main}>
                <h1>Tu experto en carpintería.</h1>
                <h2>Explora nuestras sucursales y encuentra la más cercana a ti.</h2>
                <LinkButton text={"Ubícanos"} link={"sucursales"} />
            </section>
            <BannerParallax src={"banner.jpg"} index={10}/>
            <BrandRibbon />
            <InfoCards />
            <section className={style.main}>
                <LogoMain />
                <h1>Somos tu mejor opción en ferretería y carpintería.</h1>
                <LinkButton text={"Cotiza con nosotros"} link={"/contacto"} />
            </section>
        </main>
    )
}

export default Home;