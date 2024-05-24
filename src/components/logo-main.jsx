import style from './logo-main.module.css';

const LogoMain = () => {

    return (
        <section className={style.container}>
            <img
                className={style.logo}
                src="logo-color.png"
                alt="Logo de La Casa Del Carpintero"
            />
        </section>
    )
}

export default LogoMain;