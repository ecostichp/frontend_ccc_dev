import { useEffect, useRef, useState } from "react";
import style from "./dealer-logo.module.css";

const DealerLogo = ({src, alt}) => {
    const logo = useRef(null);
    const [atts, setAtts] = useState();

    const maxWidth = (aspectRatio) => {
        setAtts({
            aspectRatio: `${aspectRatio}`,
            width: "5em",
        })
    }

    const maxHeight = (aspectRatio) => {
        setAtts({
            aspectRatio: `${aspectRatio}`,
            height: "2.5em",
        })
    }

    useEffect(
        () => {
            const width = logo.current.offsetWidth;
            const height = logo.current.offsetHeight;
            const aspectRatio = width / height
            if (aspectRatio > 80/48) {
                maxWidth(aspectRatio)
            } else {
                maxHeight(aspectRatio)
            }
        }, []
    )

    return (
        <img ref={logo} className={style.img} src={src} alt={alt} style={atts} />
    )
}

export default DealerLogo;