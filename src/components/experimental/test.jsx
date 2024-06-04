import { useEffect, useRef, useState } from 'react';
import style from './test.module.css';

const TestComp = () => {
    const contElement = useRef(null);
    const [selfHeight, setSelfHeight] = useState(0);
    const [big, setBig] = useState(false)
    let className = `${style.container} ${big ? style.big : style.small}`

    // Inicialización del apuntador al componente
    useEffect(
        () => {
            setSelfHeight(contElement.current.offsetHeight)
        }, []
    )

    useEffect(
        () => {
            // Asignación del componente a variable local
            const element = contElement.current;

            // Observador de cambios
            const observer = new ResizeObserver(
                (elements) => {
                    // Mostrar nuevas dimensiones del componente
                    for (const i in elements) {
                        console.log(`${elements[i].contentRect.width} × ${elements[i].contentRect.height}`);
                    }
                }
            )

            // Observar al componente
            observer.observe(element);

            return (
                () => {
                    // Dejar de observar al componente cuando el useEffect se reinicia
                    observer.unobserve(element)
                }
            )
        }, []
    )

    return (
        <div className={className} ref={contElement}>
            Hola {selfHeight}
            <button onClick={() => setBig(!big)}>Cambiar</button>
        </div>
    )
}

export default TestComp;