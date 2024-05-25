import { cardsInfo } from "../../data/home"
import InfoCard from "./info-card"
import style from "./info-cards.module.css"

const InfoCards = () => {

    return (
        <div className={style.container}>
            {
                cardsInfo.map(
                    (card, index) => (
                        <InfoCard
                            key={index}
                            className={style.card}
                            {...card}
                        />
                    )
                )
            }
        </div>
    )
}

export default InfoCards;