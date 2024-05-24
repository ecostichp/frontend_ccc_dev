import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './image-parallax-template.module.css';

const ImageParallaxTemplate = ({src, className}) => {
    // Estado para el valor de posición de la imagen
    const [imgTop, setImgTop] = useState(0);
    // Estado para la posición Y del componente en el documento
    const [divYPosition, setDivYPosition] = useState();
    // Altura del componente
    const [imgHeight, setSelfHeight] = useState();
    // Velocidad de desplazamiento de la imagen
    const [verticalVelocity, setVerticalVelocity] = useState();
    // ID para el componente
    const [selfId, setSelfId] = useState();
    // Tamaño de la pantalla de visualización del documento
    const vh = window.visualViewport.height;

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
            setSelfHeight(document.getElementById(selfId).offsetHeight);
        }, [selfId]
    )

    // Efecto para obtener el cálculo de velocidad tras la renderización
    useEffect(
        () => {
            if (!selfId || !imgHeight) return;
            // Inicialización del valor de velocidad
            let value = 0.5;

            // Altura remanente de la imagen
            const remHeight = imgHeight/3

            // Altura del contenedor div
            const divHeight = remHeight*2

            // Altura no utilizada por el contenedor div
            const remVH = vh - divHeight 
            
            // Comparación de la altura de la imagen con la altura de la ventana del navegador
            if (imgHeight <= vh){
                // Si la altura de la imagen no es mayor a la altura de la ventana del navegador
                value = remHeight / remVH;
            }

            // Se establece la velocidad vertical en el valor calculado
            setVerticalVelocity(value);
        }, [selfId, imgHeight, vh]
    )

    // Efecto para calcular la posición inicial de la imagen dentro del contenedor
    useEffect(
        () => {
            if (!divYPosition || !verticalVelocity) return;

            setImgTop(-(divYPosition*verticalVelocity))
        }, [divYPosition, verticalVelocity]
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
                setImgTop(offsetTop + (scroll*verticalVelocity));
            })

            return (
                () => {window.removeEventListener("scroll", function(){})}
            );
        }, [selfId, divYPosition, vh, imgHeight, verticalVelocity]
    )

    return (
        // Contenedor de la imagen
        <div
            // Se asigna la clase 'container' del módulo CSS y la clase provista en el uso del componente.
            className={`${style.container} ${className}`}
        >
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