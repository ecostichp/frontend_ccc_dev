# Plantilla de componente de imagen con efecto de paralaje vertical

**Importante**: La imagen que el componente renderizará tendrá una altura del 150% de la altura de éste. Leer [Parámetros de la imagen](#parámetros-de-la-imagen) para más información.

### Índice
Inicialización

- [Declaración](#declaración)
- [Parámetros de la imagen](#parámetros-de-la-imagen)
- [Dependencias](#dependencias)
- [Variables](#variables)

Filosofía
- [Cálculo de altura de la ventana del navegador](#cálculo-de-altura-de-la-ventana-del-navegador)
- [Velocidad de desplazamiento de la imagen](#cálculo-de-velocidad-de-desplazamiento-de-la-imagen)
- [Posición de la imagen dentro del contenedor](#posición-de-la-imagen-dentro-del-contenedor)

Funcionamiento
- [Estructura del componete renderizado](#estructura-del-componente-renderizado)
- [Valores iniciales tras la renderización](#valores-iniciales-tras-la-renderización)


## Declaración

Este componente recibe 2 argumentos de entrada:
- `src`: Ruta de la imagen a renderizar.
- `className`: Clase CSS para configurar las dimensiones de la imagen.

Ejemplo de uso

```jsx
<VerticalParallaxImg src={"imagen.jpg"} className={"card-image"} />
```

**Nota**: También se pueden asignar clases CSS de módulos en formato `module.css`.

Para el archivo CSS a usar, se requieren 2 de los siguientes 3 parámetros en las propiedades de la clase:
- `width`: Determina la longitud horizontal de la imagen.
- `height`: Determina la altura de la imagen.
- `aspect-ratio`: Determina la relación de aspecto de la imagen, basado en la longitud horizontal o la altura de ésta.

Ejemplo de uso
```css
.card-image {
    width: 450px;
    aspect-ratio: 4/3;
}
```

## Parámetros de la imagen
Para poder lograr el efecto de paralaje vertical de la imagen el componente renderiza la imagen al 150% de su altura, contenida dentro de éste. A continuación se muestran algunos ejemplos:

| Altura del componente | Altura de la imagen | Rango de movimiento |
|-----------------------|---------------------|---------------------|
| 300px                 | 450px               | 150px               |
| 8rem                  | 12rem               | 4rem                |
| 10vh                  | 15vh                | 5vh                 |

Esto significa que altura declarada en la clase CSS asignada al componente es propia de éste y la imagen que renderizará tendrá una altura del 150% de la altura de éste. Así, por ejemplo, si se requiere mostrar una imagen de 600px de longitud × 450px de altura, el componente deberá medir 600px × 300px. En cambio, si se desera que el componente tenga una dimensión de 600px de longitud × 450px de altura, la imagen provista en el argumento `src` deberá tener una dimensión de 600px de longitud × 675px de altura.

Para referencia rápida, se puede tomar la siguiente tabla como guía:

| Dimensiones requeridas | Longitud    | Altura                                                   |
|------------------------|-------------|----------------------------------------------------------|
| En base a la imagen    | Se mantiene | El componente sólo mostrará $ \frac{2}{3} $ de la imagen |
| En base al componente  | Se mantiene | La imagen deberá tener el 150% de altura del componente  |

## Dependencias
Para el funcionamiento de este componente se utilizan las siguientes dependencias:

### Módulo `react`:
- `useState`
- `useEffect`
- `useRef`
- `useCallback`

### Módulo CSS `./vertical-parallax-img.module.css`
- `style`

## Variables
- `imgRef`: Apuntador del elemento `img` del cual se tomará la posición en el $Y$ dentro del documento y su altura para poder calcular los valores necesarios usados en el efecto de paralaje vertical de la imagen del componente. Tiene que comenzar con valor `null` ya que el elemento en cuestión aún no existe y se asigna en el retorno del componente.
- `vhRef`: Apuntador del elemento `div` vacío dentro del elemento contendor `div` que tiene la propiedad de altura con un valor de `100vh`, del cual se tomará el valor de altura para calcular la altura de la ventana del navegador (leer [Cálculo de altura de la ventana del navegador](#cálculo-de-altura-de-la-ventana-del-navegador) para mayor información). Tiene que comenzar con valor `null` ya que el elemento en cuestión aún no existe y se asigna en el retorno del componente. 
- `[divYPos, setDivYPos]`: Estado para determinar la posición del elemento contenedor `div` en el eje $Y$ dentro del documento. Su valor inicial es `0` ya que se requiere la renderización del elemento contenedor `div` antes de poder determinar la posición de este.
- `[imgTop, setImgTop]`: Estado para terminar el valor `top` del elemento `img` dentro del elemento contenedor `div`. Su valor inicial es `0` ya que se requiere la renderización del componente antes de poder determinar la posición de este.
- `[imgHeight, setImgHeight]`: Estado para terminar el la altura del elemento `img`. Su valor inicial es `0` ya que se requiere la renderización del componente antes de poder determinar la posición de este.
- `[imgOffsetTop, setImgOffsetTop]`: Estado para determinar un valor top de desfase en casos en los que la altura de la imagen supere la altura de la ventana del navegador. Este estado es útil para centrar el elemento `img` verticalmente dentro del elemento contenedor `div` y mantener un comportamiento coherente en el uso del efecto de paralaje vertical. Su valor inicial es `0` y en la mayor parte de los casos se mantiene así durante todo el ciclo de vida del componente.
- `[verticalSpeed, setVerticalSpeed]`: Estado para determinar la velocidad de desplazamiento vertical del elemento `img` dentro del elemento contenedor `div` en base a la altura de la ventana del navegador, la altura del elemento contenedor `div` y el elemento `img`. Su valor inicial es `0.5` y sólo se mantendrá con este valor cuando la altura del elemento `img` supere la altura de la ventana del navegador. El valor inicial es útil para mantener un comportamiento coherente en el uso de efecto de paralaje vertical en estos casos.
- `[windowHeight, setWindowHeight]`: Estado para determinar la altura de la ventana del navegador. Su valor inicial es `0` ya que el valor se toma de un elemento `div` vacío dentro del elemento contendor `div` y que tiene la propiedad de altura con un valor de `100vh`. Leer [Cálculo de altura de la ventana del navegador](#cálculo-de-altura-de-la-ventana-del-navegador) para mayor información.

```jsx
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
```

## Cálculo de altura de la ventana del navegador
Para obtener el cálculo de la altura de la ventana del navegador no se utiliza el atributo `visualViewport.height` del objeto `window` sino que se toma como referencia la altura de un elemento `div` invisible renderizado en el componente. Este elemento `div` tiene una altura preestablecida de `100vh` que es totalmente útil para tomar el valor de la altura de la ventana del navegador. Sería más sencillo si en vez de renderizar un elemento invisible, configurarlo con una altura de `100vh` y luego usar una referencia para tomar su altura simplemente tomásemos el valor `window.visualViewport.height`. Sin embargo, no así. Pero, ¿por qué?

La razón es más sencilla de lo que parece. Y es que, si el componente estuviese dedicado a ser visualizado simple y exclusivamente en una interfaz de escritorio, todo este cálculo hecho de esta forma no tendría ningún sentido pero cuando hablamos de renderizar el componente en un navegador móvil, usar el valor `window.visualViewport.height` sería problemático.

En los navegadores móviles el valor `window.visualViewport.height` no siempre es el mismo durante el ciclo de vida de una página web. La barra superior de direcciones, es decir, aquella que muestra el sitio como `www.google.com` altera el valor `window.visualViewport.height` cuando está visible y cuando no lo está. Al desplazarse hacia abajo, esta barra de direcciones se oculta y aumenta el valor de `window.visualViewport.height` mientras que cuando se vuelve a mostrar, generalmente cuando el usuario se desplaza hacia arriba, este valor disminuye.

Para calcular un efecto correcto de paralaje vertical en el componente de esta documentación se considera la altura de la ventana de navegación y el problema de que su valor cambie en la vista móvil generaría un _glitch_ en el efecto de paralaje vertical del componente cada vez que la barra de direcciones se muestra o se oculta. Sin embargo, el valor `vh` utilizado para estilización toma en cuenta el espacio vertical en la ventana del navegador incluyendo el espacio que la barra de direcciones utiliza. Esto significa que, aunque la barra de direcciones se muestre o se oculte, el valor `vh` no cambiará y no habrá ningún efecto de _glitch_ indeseado.

## Cálculo de velocidad de desplazamiento de la imagen
El valor calculado en esta función será el valor con el que se multiplicará el valor de deslizamiento en el eje $Y$ hecho por el usuario a lo largo del documento. Por ende, la velocidad de desplazamiento tiene que permitir que la altura sobrante del elemento `img` dentro del elemento contenedor `div` pueda mostrarse completamente desde que el componente termina de ingresar a la ventana del navegador por la parte inferior hasta que comienza a desaparecer por la parte superior de ésta. Eso significa que el valor que se busca se calcula con la siguiente fórmula:

$$ \frac{\text{Altura sobrante del elemento img}}{\text{Proporción de la altura de la ventana no usada por el componente}} $$

Para una interpretación más corta, usaríamos los nombres de variables a continuación:

$$ \frac{imgRemHeight}{remVH} $$

El valor obtenido de esta función se multiplicará por el valor de deslizamiento vertical del usuario a lo largo del documento en pixeles. Por ejemplo, si la altura sobrante del elemento `img` es de `150px` y la altura de la ventana del navegador es de `600px`, significa que la velocidad de desplazamiento calculada será de:

$$ \frac{imgRemHeight}{remVH} = \frac{150}{600} = 0.25 $$

De esta manera, por cada `1px` que el usuario se desplace verticalmente a lo largo del documento, el elemento `img` se desplazará `0.25px`, siendo el total del sobrante de la altura de éste (`150px`) cuando el usuario se desplace los `600px` verticalmente (`150px` × `0.25px` = `600px`) que es el rango de altura en la que el componente mantiene el efecto funcional.

Para obtener el valor de las variables $imgRemHeight$ y $remVH$ usadas en la fórmula se utiliza la función a continuación dentro de un hook `useEffect`:

```jsx
// Función para calcular y establecer la velocidad de paralaje vertical
const setParallaxSpeed = useCallback(
    () => {
        if (!imgHeight || !windowHeight) return;

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
            setImgOffsetTop(imgRemHeight / 2)
        }
    }, [imgHeight, windowHeight]
)
```

>   - La función se declara usando el hook `useCallback` junto con la matriz de dependencias que incluye las variables `imgHeight` y `windowHeight` ya que se declara al nivel más alto dentro del componente y se usa en varios hooks `useEffect`. Esta es la forma predeterminada dictada por React en este tipo de escenarios. Para más información, puedes revisar la documentación del hook [useCallback](https://react.dev/reference/react/useCallback) en la página de React.js
>   
>   ```jsx
>   const setParallaxSpeed = useCallback(
>       () => {
>           // [...lógica de la función aquí]
>       }, [imgHeight, windowHeight]
>   )
>   ```
>   
>   - Primeramente se comprueba que las variables `imgHeight` y `windowHeight` contengan valores asignados o de lo contrario se termina la ejecución de la función.
>   ```jsx
>   if (!imgHeight || !windowHeight) return;
>   ```
>   
>   - Posterior a ello se procede a calcular el valor de $imgRemHeight$, la primera variable para el cálculo de la función de velocidad vertical, esto es, obtener $\frac{1}{3}$ de la altura del elemento `img` dentro del elemento `div`.
>   ```jsx
>   // Altura remanente de la imagen (Porporción oculta)
>   const imgRemHeight = imgHeight / 3
>   ```
>   
>   - Después se obtiene la altura del elemento contenedor `div` que es $\frac{2}{3}$ de la altura del elemento `img` dentro de éste.
>   ```jsx
>   // Altura del contenedor
>   const divHeight = imgHeight / 2
>   ```
>   
>   - Una vez hecho esto, se procede a calcular el espacio vertical no utilizado por el componente dentro de la ventana del navegador, esto es, la altura de la ventana del navegador menos la altura del componente. Con esto obtenemos el valor de la segunda variable para el cálculo de la función de velocidad vertical.
>   ```jsx
>   // Proporción de altura no ocupada por el componente dentro de la ventana del navegador
>   const remVH = windowHeight - divHeight
>   ```
>   
>   - Ya obtenidos los valores de las dos variables a utilizar para el cálculo de la velocidad de desplazamiento vertical del elemento `img` dentro del elemento contenedor `div`, se procede a realizar una comparación de tamaño
>       - Si la altura del elemento `img` multiplicada por `1.25` es menor a la altura de la ventana del navegador, el cálculo de la velocidad de desplazamiento se hará con la fórmula antes mencionada.
>       - De lo contrario, no se altera su valor inicial (Que es de `0.5`) y se establece un valor de desfase del valor `top` del elemento `img` obtenido de la fórmula $imgRemHeight - (remVH * 0.5)$ para mantener un comportamiento coherente en el efecto del componente y poder mostrar la parte más relevante de la imagen.
>   ```jsx
>   // Evaluación de la altura de la imagen con la altura de la ventana del navegador
>   if (imgHeight * 1.25 <= windowHeight) {
>       // Se establece la velocidad ideal de desplazamiento vertical de la imagen
>       setVerticalSpeed(imgRemHeight / remVH);
>   } else {
>       // Se asigna la mitad del valor imgRemHeight para centrar la imagen verticalmente
>       setImgOffsetTop(imgRemHeight - (remVH * 0.5));
>   }
>   ```

## Posición de la imagen dentro del contenedor
Una vez calculada la velocidad de desplazamiento vertical del elemento `img` dentro del elemento contenedor `div`, podemos entender cómo funciona el cálculo de la posición del elemento `img` en tiempo real en base a la posición $Y$ del componente dentro del documento y el valor de deslizamiento del usuario a lo largo éste. 

Lo primero que se debe considerar es que el elemento `img` se desplazará dentro del elemento contenedor `div` mientras el usuario se desplace verticalmente a lo largo del documento, **sin importar que el componente se encuentre dentro del campo de visión de la ventana o no**. Si no se considera esto, al colocar el componente en posiciones $Y$ cada vez más abajo en el documento ocasionará que el elemento `img` incluso salga del campo de visión dentro del elemento `div` cuando entre al campo de visión de la ventana del navegador ya que el valor de deslizamiento vertical del usuario a lo largo del documento sería lo suficientemente grande para dar un valor de cálculo de valor `top` suficiente para ésto.

A lo que se busca llegar es que, cuando el componente entra en el campo de visión, específicamente cuando la parte inferior de éste está exactamente alineada con la parte inferior de la ventana del navegador, se busca que el valor `top` del elemento `img` sea igual a $-\frac{1}{3}$ de la altura de éste. De igual forma, cuando la parte superior del componente se alinea con la parte superior de la ventana del navegador y el componente va a comenzar a salir del campo de visión por esta parte de la ventana, se busca que el valor `top` del elemento `img` sea igual a `0` de la altura de éste.

Primeramente, cuando la parte inferior del componente se alinea con la parte inferior de la ventana del navegador, significa que el usuario se ha desplazado una cantidad `scrollY` que es igual a la posición $Y$ del componente menos la altura de la ventana del navegador no usada por el componente en sí:

$$ scrollY = divYPos - remVH $$

Cuando esta condición se cumple, el valor `top` del componente va a ser igual a $-\frac{imgHeight}{3}$:

$$ \text{Cuando } scrollY = divYPos - remVH \text{ entonces } imgTop = -\frac{imgHeight}{3} $$

Cuando la parte superior del componente se alinea con la parte superior de la ventana del navegador, significa que el usuario se ha desplazado una cantidad `\Delta scrollY` adicional a la cantidad `scrollY` ya desplazada, esta suma siendo igual a la posición $Y$ del componente:

$$ scrollY + \Delta scrollY = divYPos $$

Cuando esta condición se cumple, el valor `top` del componente va a ser igual a `0`:

$$ \text{Cuando } scrollY + \Delta scrollY = divYPos \text{ entonces } imgTop = 0 $$

Lo expuesto anteriormente se puede representar junto de la siguiente forma:

$$
\begin{cases}
\text{Cuando } scrollY = divYPos - remVH \text{ entonces } imgTop = -\frac{imgHeight}{3} \\
\text{Cuando } scrollY + \Delta scrollY = divYPos \text{ entonces } imgTop = 0
\end{cases}
$$

Podemos notar que, si sumamos el valor $remVH$ a la izquierda de la primera ecuación, todo esto va a ser igual a $divYPos$, mismo valor que se encuentra a la derecha de la segunda ecuación cuando se le suma $\Delta scrollY$. Significa entonces que $\Delta scrollY$ y $remVH$ tienen el mismo valor. Entonces, cuando la razón de cambio entre ambas ecuaciones es igual a $remVH$, el cambio en `imgTop` será igual a $\frac{imgHeight}{3}$, que esto es igual al valor $imgRemHeight$ usado en el cálculo de la velocidad:

$$ \frac{imgHeight}{3} = imgRemHeight $$

Podemos comprobar que, entonces, la conversión de esa razón de cambio de $remVH$ al valor $imgRemHeight$ que se requiere para posicionar el elemento `img` dentro del elemento contenedor `div` se calcularía con la función $f(scrollY) = scrollY \cdot \frac{remVH}{imgRemHeight}$, eso es, la velocidad de desplazamiento calculada en la función anterior $verticalSpeed$ .

Sin embargo, se menciona que el valor `top` del elemento `img` dentro del elemento contenedor `div` debe ser igual a $-imgRemHeight$ cuando el valor de desplazamiento vertical $scrollY$ es igual a la posición $Y$ del elemento contenedor `div` mas altura sobrante de la ventana del navegador no utilizada por el componente $remVH$ y que el valor `top` del elemento `img` dentro del elemento contenedor `div` debe ser igual a `0` cuando el valor de desplazamiento vertical $scrollY + remVH$ es igual a la posición $Y$ del componente $divYPos$.

$$ f(scrollY, divYPosition - remVH) = [scrollY - (divYPosition - remVH)] \cdot verticalSpeed = -imgRemHeight $$
$$ f(scrollY + remVH, divYPosition) = [(scrollY + remVH) - divYPosition] \cdot verticalSpeed = 0 $$

En pocas palabras, mientras el valor $scrollY$ sea menor a $divYPos$, $imgTop$ será negativo. Sólo cuando $scrollY$ y $divYPos$ sean iguales (Que es cuando la parte superior tanto del componente como de la ventana del navegador intersectan), $imgTop$ será igual a cero, es decir, podemos simplemente restar el valor de $scrollY$ multiplicado por $verticalSpeed$ menos el valor de $scrollY$ multiplicado por $verticalSpeed$ lo que será igual a un valor negativo cuando $scrollY$ es menor, igual a `0` cuando $scrollY$ y $divYPos$ son iguales y un valor positivo cuando $scrollY$ es mayor.

$$ f(scrollY, divPosition) = (scrollY × verticalSpeed) - (divYPos × verticalSpeed) $$

Finalmente, en los casos en los que el elemento `img` supera a la altura de la ventana del navegador en altura, la velocidad vertical se mantiene con un valor de `0.5` y se tiene que restar el la variable $imgOffsetTop$ para centrar, en este caso, una imagen tan alta a la que no le es posible mostrar los bordes superior e inferior sin superar una velocidad vertical de 1px ya que eso provocaría que el elemento `img` parezca desplazarse verticalmente en sentido contrario al deslizamiento vertical que el usuario haga.

```jsx
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
```

>   - La función se declara usando el hook `useCallback` junto con la matriz de dependencias que incluye las variables `divYPos`, `verticalSpeed` e `imgOffsetTop` ya que se declara al nivel más alto dentro del componente y se usa en varios hooks `useEffect`. Esta es la forma predeterminada dictada por React en este tipo de escenarios. Para más información, puedes revisar la documentación del hook [useCallback](https://react.dev/reference/react/useCallback) en la página de React.js
>   
>   - Se calcula la primera parte de la fórmula que dará como resultado un valor negativo para el atributo `top` del elemento `img` dentro del elemento contenedor `div` cada vez mayor hacia el negativo mientras el componente se encuentre en una posición $Y$ cada vez más abajo:
>   
>   ```jsx
>   // Cálculo de desfase negativo inicial en base a la posición Y del componente
>   const negativeOffsetTop = (divYPos * verticalSpeed);
>   ```
>   
>   - Se calcula la segunda parte de la fórmula que dará como resultado el aumento del valor `top` del elemento `img` dentro del elemento contenedor `div` hacia un valor positivo cada vez mayor mientras el usuario se desplace verticalmente cada vez más hacia abajo:
>   
>   ```jsx
>   // Cálculo de valor top positivo mientras el usuario se desplaza hacia abajo
>   const scrollTop = scrollY * verticalSpeed
>   ```
>   
>   - Finalmente se unen ambas fórmulas y se hace la resta correspondiente, restando también el valor del estado `imgOffsetTop` calculado en la función de cálculo de velocidad vertical:
>   
>   ```jsx
>   // Actualización de posición top
>   setImgTop(scrollTop - negativeOffsetTop - imgOffsetTop);
>   ```

----

## Estructura del componente renderizado
Una vez declaradas las funciones, se retorna el componente para renderizar, en formato `jsx`.

```jsx
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
```

----

## Valores iniciales tras la renderización
Después de haber declarado las funciones y de la renderización inicial del componente, comienza la ejecución de los hooks `useEffect`. Primeramente se deben obtener los valores iniciales del componente renderizado ya que, materializado en el documento ya tiene propiedades de medida y posición. Para esto, se ejecuta el hook `useEffect` a continuación:

```jsx
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
```

>   - Si los apuntadores a los elementos `img` y `div` de referencia de altura están indefinidos se interrumpe la ejecución del hook para evitar errores.
>   
>   ```jsx
>       if (!imgRef || !vhRef) return;
>   ```
>   
>   - Se obtiene la posición $Y$ del componente dentro del documento que es la misma que el elemento `div` contenedor:
>   
>   ```jsx
>   // Posición Y del contenedor div
>   setDivYPos(imgRef.current.offsetTop);
>   ```
>   
>   - Se obtiene la altura del elemento `img`
>   
>   ```jsx
>   // Altura del elemento img
>   setImgHeight(imgRef.current.offsetHeight);
>   ```
>   
>   - Finalmente se obtiene la altura de la ventana del navegador tomando la altura del elemento `div` invisible al que se le estableció una altura de `100vh`. Para más información consultar el apartado [Cálculo de la altura de la ventana del navegador](#cálculo-de-altura-de-la-ventana-del-navegador):
>   
>   ```jsx
>   // Altura de la ventana del navegador
>   setWindowHeight(vhRef.current.offsetHeight + 1);
>   ```

## Inicialización de velocidad de la imagen
Una vez que se calcularon los parámetros iniciales del componente, se procede a llamar a la función `setParallaxSpeed()` que calcula la velocidad de desplazamiento vertical del elemento `img` dentro del elemento contenedor `div` en base a la posición $Y$ de éste último y el desplazamiento vertical del usuario a lo largo del documento. Para más información consultar el apartado [Velocidad de desplazamiento de la imagen](#cálculo-de-velocidad-de-desplazamiento-de-la-imagen):

```jsx
// Efecto para calcular la velocidad de desplazamiento del elemento img
useEffect(
    () => {
        setParallaxSpeed()
    }, [setParallaxSpeed]
)
```

## Inicialización del efecto de paralaje vertical
Tras calculada la velocidad de desplazamiento de la imagen, se calcula la posición inicial del elemento `img` dentro del elemento contenedor `div`. Para eso se ejecuta el siguiente hook `useEffect`:

```jsx
// Efecto para calcular el valor top inicial de la imagen dentro del contenedor
useEffect(
    () => {
        if (!divYPos || !verticalSpeed) return;

        updateImgTop();
    }, [divYPos, verticalSpeed, updateImgTop]
)
```

>   - Si los estados $divYPos$ o $verticalSpeed$ no tienen un valor definido se interrumpe la ejecución de la función para evitar errores.
>   
>   ```jsx
>   if (!divYPos || !verticalSpeed) return;
>   ```
>   
>   - Se hace el llamado de la función `updateImgTop()` para establecer la posición inicial del elemento `img` dentro del elemento contenedor `div`. Para más información consultar el apartado [Posición de la imagen dentro del contenedor](#posición-de-la-imagen-dentro-del-contenedor)
>   
>   ```jsx
>   updateImgTop();
>   ```

## Actualizción de posición de imagen en tiempo real
Para conseguir que la posición del elemento `img` dentro del elemento contenedor `div` se actualice cada vez que el usuario se desplaza verticalmente a lo largo del documento, se ejecuta el hook `useEffect` a continuación que añade un escuchador del evento `scroll` en la ventana del navegador, es decir, cada vez que se detecte un movimiento de desplazamiento vertical por parte del usuario, una función provista al método se ejecutará, en este caso, la función `updateImgTop` descrita en el apartado [Posición de la imagen dentro del contenedor](#posición-de-la-imagen-dentro-del-contenedor):

```jsx
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
```

- Se añade el escuchador del evento `scroll` al objeto `window` que es la ventana del navegador. Como función a ejecutar se le provee la referencia de la función `updateImgTop`, no la ejecución de ésta, es decir, el escuchador del evento ejecutará esta función cada que se detecte un movimiento de desplazamiento vertical dentro de la ventana del navegador.

```jsx
window.addEventListener("scroll", updateImgTop)
```

- Para efectos de optimización se retorna una función flecha que ejecuta la remoción de este escuchador de eventos. Esto se usa como una función de limpieza del hook `useEffect` tal como lo establece React.js. Para más información consultar [Understanding React useEffect cleanup function](https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/).

```jsx
return (
    () => {window.removeEventListener("scroll", updateImgTop)}
)
```

