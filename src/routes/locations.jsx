import LocationCard from '../components/location-card';
import locations from '../data/locations';
import style from './locations.module.css';

const Locations = () => {

    return(
        <main>
            <section className={style.main}>
                <h1>Sucursales</h1>
                <h2>Encuentra tu sucursal más cercana.</h2>
            </section>
            <section className={style.locations}>
                {
                    locations.map(
                        (location, index) => (
                            <LocationCard
                                key={index}
                                place={location.name}
                                src={location.src}
                                link={location.id}
                            />
                        )
                    )
                }
            </section>
        </main>
    )
}

export default Locations;