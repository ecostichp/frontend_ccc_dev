import style from './logo-main.module.css';

const LogoMain = () => {

    return (
        <section className={style.container}>
            <img
                className={`${style.base} nav-logo-color`}
                src="logo-color.png"
                alt="Logo de La Casa Del Carpintero"
            />
            <img
                className={`${style.logo} nav-logo-color`}
                src="logo-color.png"
                alt="Logo de La Casa Del Carpintero"
            />
            <img
                className={`${style.logo} nav-logo-white`}
                src="logo-white.png"
                alt="Logo de La Casa Del Carpintero"
            />
        </section>
    )
}

export default LogoMain;