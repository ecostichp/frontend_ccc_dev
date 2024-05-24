import { useLoaderData } from "react-router-dom";
import LinkButton from "../../ui-kit/buttons/link-button";
import IconCellphone from "../../ui-kit/icons/icon-cellphone";
import IconPhone from "../../ui-kit/icons/icon-phone";
import IconWhatsApp from "../../ui-kit/icons/icon-whatsapp";
import style from './store-info.module.css';

const StoreInfo = () => {
    const location = useLoaderData();

    return (
        <main>
            <section>
                <h1>Suc. {location.name}</h1>
            </section>
            <section className={style.info}>
                <div className={style.details}>
                    <h2>{location.address}</h2>
                    <div  className={style.contact}>
                        <p>{location.businessHours}</p>
                        <div>
                        <p>Teléfonos:</p>
                        {
                            location.phones.map(
                                (phone, index) => (
                                    <p key={index}>{phone}</p>
                                )
                            )
                        }
                        </div>
                        <p>WhatsApp: {location.whatsapp}</p>
                    </div>
                    <div className={style.buttons}>
                    <LinkButton icon={<IconPhone />} text={location.phones[0]} link={`tel:${location.phones[0]}`} />
                    <LinkButton icon={<IconCellphone />} text={location.phones[0]} link={`tel:${location.phones[1]}`} />
                        <LinkButton icon={<IconWhatsApp />} text={"WhatsApp"} />
                    </div>
                </div>
                <iframe className={style.map}
                    src={location.map}
                    loading="lazy"
                />
            </section>
        </main>
    )
}

export default StoreInfo;