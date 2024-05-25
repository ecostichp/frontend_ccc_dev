import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './image-parallax-template.module.css';

const ImageParallaxTemplate = ({src, className}) => {
    // Estado para el valor de posición de la imagen
    const [imgTop, setImgTop] = useState(0);
    // Estado para la posición Y del componente en el documento
    const [divYPosition, setDivYPosition] = useState();
    // Altura del componente
    const [imgHeight, setImgHeight] = useState();
    // Velocidad de desplazamiento de la imagen
    const [verticalVelocity, setVerticalVelocity] = useState();
    // Constante para alinear la imagen al centro en el eje Y en caso de requerirse
    const [initTop, setInitTop] = useState(0);
    // ID para el componente
    const [selfId, setSelfId] = useState();
    // Elemento de tamaño 100vh para tomar como referencia
    const heightReference = useRef(null);
    // Altura del documento
    const [docHeight, setDocHeight] = useState(0);

    // Efecto para asignar la ID al componente
    useEffect(
        () => {
            setSelfId(uuidv4());
        }, []
    )

    // Efecto para obtener la posición Y y altura del elemento tras la renderización
    useEffect(
        () => {
            if (!selfId) return;
            // Posición Y
            setDivYPosition(document.getElementById(selfId).offsetTop);
            // Altura del elemento
            setImgHeight(document.getElementById(selfId).offsetHeight);

            // Altura de la ventana
            setDocHeight(heightReference.current.offsetHeight+1);
        }, [selfId]
    )

    // Efecto para obtener el cálculo de velocidad tras la renderización
    useEffect(
        () => {
            if (!selfId || !imgHeight) return;

            // Altura remanente de la imagen
            const remHeight = imgHeight/3

            // Altura del contenedor div
            const divHeight = remHeight*2

            // Altura no utilizada por el contenedor div
            const remVH = docHeight - divHeight

            // marginTop 
            const imgVertM = remHeight / 2
            
            // Comparación de la altura de la imagen con la altura de la ventana del navegador
            if (imgHeight <= docHeight){
                // Si la altura de la imagen no es mayor a la altura de la ventana del navegador
                setVerticalVelocity(remHeight / remVH);
            } else {
                // Valor de desplazamiento por defecto
                setVerticalVelocity(0.5);
                // Se resta el margen superior
                setInitTop(imgVertM);
            }

            // Se establece la velocidad vertical en el valor calculado
            
        }, [selfId, imgHeight, docHeight]
    )

    // Efecto para calcular la posición inicial de la imagen dentro del contenedor
    useEffect(
        () => {
            if (!divYPosition || !verticalVelocity) return;

            setImgTop(-(divYPosition*verticalVelocity)-initTop)
        }, [divYPosition, verticalVelocity, initTop]
    )

    // Efecto para establecer la posición inicial del paralaje de la imagen
    useEffect(
        () => {
            if (!selfId || !divYPosition || !imgHeight || !verticalVelocity) return;
            // Escuchador del evento de deslizamiento
            window.addEventListener('scroll', function(){
                // Posición actual del desplazamiento vertical (Comienza en 0)
                const scroll = this.window.scrollY;

                // Valor top negativo (Mayor mientras más abajo se encuentre el div en el documento)
                const offsetTop = -(divYPosition*verticalVelocity)

                // Cambio dinámico de posición de la imagen
                setImgTop(offsetTop + (scroll*verticalVelocity) - initTop);
            })

            return (
                () => {window.removeEventListener("scroll", function(){})}
            );
        }, [selfId, divYPosition, imgHeight, verticalVelocity, initTop]
    )

    return (
        // Contenedor de la imagen
        <div
            // Se asigna la clase 'container' del módulo CSS y la clase provista en el uso del componente.
            className={`${style.container} ${className}`}
        >
            <div ref={heightReference} className={style.heightReference}>{docHeight}</div>
            {/* Imagen con efecto de paralaje */}
            <img
                // Se asigna la clase 'imageParallax' del módulo CSS
                className={style.imageParallax}
                // ID única provista por useEffect
                id={selfId}
                // URL de la imagen a renderizar
                src={src}
                // Alt genérico
                alt="Imagen"
                // Estilo utilizado para asignar el valor top de forma dinámica en base
                //      al cálculo de las funciones contenidas en este componente
                style={
                    {
                        top: `${imgTop}px`,
                    }
                }
            />
        </div>
    )
}

export default ImageParallaxTemplate;