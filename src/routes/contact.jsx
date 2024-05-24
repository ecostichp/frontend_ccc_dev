import contact from '../data/contact';
import locations from '../data/locations';
import LinkButton from '../ui-kit/buttons/link-button';
import IconCellphone from '../ui-kit/icons/icon-cellphone';
import IconEmail from '../ui-kit/icons/icon-mail';
import IconPhone from '../ui-kit/icons/icon-phone';
import IconWhatsApp from '../ui-kit/icons/icon-whatsapp';
import style from './contact.module.css';

const Contact = () => {

    return(
        <main>
            <section className={style.main}>
                <h1>Contacto</h1>
            </section>
            <section className={style.container}>
                <div>
                    <h2>Atención al cliente</h2>
                    <p>{contact.email}</p>
                    <LinkButton icon={<IconEmail />} text={contact.email} link={`mailto:${contact.email}`} />
                </div>
                {
                    locations.map(
                        (location, index) => (
                            <div key={index}>
                                <h2>Suc. {location.name}</h2>
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
                                <div className={style.buttons}>
                                    <LinkButton icon={<IconPhone />} text={location.phones[0]} link={`tel:${location.phones[0]}`} />
                                    <LinkButton icon={<IconCellphone />} text={location.phones[0]} link={`tel:${location.phones[1]}`} />
                                    <LinkButton icon={<IconWhatsApp />} text={"WhatsApp"} />
                                </div>
                            </div>
                        )
                    )
                }
            </section>
        </main>
    )
}

export default Contact