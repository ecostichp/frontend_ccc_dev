import { useCallback, useEffect, useRef, useState } from 'react';
import style from './vertical-parallax-img.module.css';

const VerticalParallaxImg = ({ src, className }) => {
    // Referencia del componente
    const imgRef = useRef(null);

    // Referencia de elemento que toma la altura de 100vh para saber la altura de la ventana
    const vhRef = useRef(null);

    // Posición Y del componente
    const [divYPos, setDivYPos] = useState(0);

    // Valor top del componente img
    const [imgTop, setImgTop] = useState(0);
    // Valor height del componente img
    const [imgHeight, setImgHeight] = useState(0);
    // Valor offset top del componente img para desfasar el top en imágenes muy grandes
    const [imgOffsetTop, setImgOffsetTop] = useState(0);

    // Valor de velocidad vertical de desplazamiento del componente img
    const [verticalSpeed, setVerticalSpeed] = useState(0.5);

    // Valor de la altura de la ventana del navegador
    const [windowHeight, setWindowHeight] = useState(0);

    // ------------------------------------------------------------------------

    // Función para calcular y establecer la velocidad de paralaje vertical
    const setParallaxSpeed = useCallback(
        () => {
            if (!imgHeight || !windowHeight) return;

            console.log("imgHeight", imgHeight)

            // Altura remanente de la imagen (Porporción oculta)
            const imgRemHeight = imgHeight / 3

            // Altura del contenedor
            const divHeight = imgHeight / 2

            // Proporción de altura no ocupada por el componente dentro de la ventana del navegador
            const remVH = windowHeight - divHeight

            // Evaluación de la altura de la imagen con la altura de la ventana del navegador
            if (imgHeight * 1.25 <= windowHeight) {
                // Se establece la velocidad ideal de desplazamiento vertical de la imagen
                setVerticalSpeed(imgRemHeight / remVH);
            } else {
                // Se asigna la mitad del valor imgRemHeight para centrar la imagen verticalmente
                setImgOffsetTop(imgRemHeight - (remVH * 0.5));
            }
        }, [imgHeight, windowHeight]
    )

    // Función para actualizar el valor top del elemento img dentro del contenedor
    const updateImgTop = useCallback(
        () => {
            // Cálculo de desfase negativo inicial en base a la posición Y del componente
            const negativeOffsetTop = (divYPos * verticalSpeed);
    
            // Cálculo de valor top positivo mientras el usuario se desplaza hacia abajo
            const scrollTop = scrollY * verticalSpeed
    
            // Actualización de posición top
            setImgTop(scrollTop - negativeOffsetTop - imgOffsetTop);

        }, [divYPos, verticalSpeed, imgOffsetTop]
    )

    // Efecto para calcular los valores iniciales necesarios de tamaño y posición
    useEffect(
        () => {
            if (!imgRef || !vhRef) return;

            // Posición Y del contenedor div
            setDivYPos(imgRef.current.offsetTop);

            // Altura del elemento img
            setImgHeight(imgRef.current.offsetHeight);

            // Altura de la ventana del navegador
            setWindowHeight(vhRef.current.offsetHeight + 1);
        }, [imgRef, vhRef]
    )

    // Efecto para calcular la velocidad de desplazamiento del elemento img
    useEffect(
        () => {
            setParallaxSpeed()
        }, [setParallaxSpeed]
    )

    // Efecto para calcular el valor top inicial de la imagen dentro del contenedor
    useEffect(
        () => {
            if (!divYPos || !verticalSpeed) return;

            updateImgTop();
        }, [divYPos, verticalSpeed, updateImgTop]
    )

    // Efecto para actualización de valor top de imagen con evento de scroll
    useEffect(
        () => {
            // Escuchador de evento de scroll
            window.addEventListener("scroll", updateImgTop)

            return (
                () => {window.removeEventListener("scroll", updateImgTop)}
            )
        }, [updateImgTop]
    )

    // Efecto para recalcular el efecto de paralaje vertical en redimensionamiento
    useEffect(
        () => {
            // Asignación del componente a una referencia local
            const imgElement = imgRef.current

            // Asignación del div invisible a una referencia local
            // const vhRefElement = vhRef.current

            // Observador de cambios
            const observer = new ResizeObserver(
                (elements) => {
                    // Mostrar nuevas dimensiones del componente
                    for (const i in elements) {

                        // Altura del elemento img
                        setImgHeight(elements[i].contentRect.height);

                        // Altura de la ventana del navegador
                        setWindowHeight(vhRef.current.offsetHeight + 1);
                        console.log("vh", vhRef.current.offsetHeight + 1);
                    }
                }
            )

            // Observar al elemento img
            observer.observe(imgElement);
            // Observar la ventana del navegador
            // observer.observe(vhRefElement);

            // Función de cleanup
            return (
                () => {
                    // Dejar de observar al componente al desmontarse
                    observer.unobserve(imgElement);
                    // observer.unobserve(vhRefElement);
                }
            )
        }, []
    )

    return (
        <div
            // Se asigna la clase CSS modular y la provista por el desarrollador
            className={`${style.container} ${className}`}
        >
            <div
                ref={vhRef}
                className={style.heightReference}
            >
                {/* Elemento vacío */}
            </div>
            <img
                style={
                    {top: `${imgTop}px`}
                }
                className={style.imgParallax}
                ref={imgRef}
                src={src}
                alt="Imagen"
            />
        </div>
    );
};

export default VerticalParallaxImg;