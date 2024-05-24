# Plantilla de imagen con efecto `parallax-scroll`

**Importante**: La imagen que el componente renderizará tendrá una altura del 150% de la altura de éste. Leer `Parámetros de la imagen` para más información.

## Declaración

Este componente recibe 2 argumentos de entrada:
- `src`: Ruta de la imagen a renderizar.
- `className`: Clase CSS para configurar las dimensiones de la imagen.

Ejemplo de uso
```jsx
<ImageParallaxTemplate src={"imagen.jpg"} className={"card-image"} />
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
| 100vh                 | 150vh               | 50vh                |

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
### Módulo `uuid`
- `v4` con alias `uuidv4` 
### Módulo CSS `./image-parallax-template.module.css`
- `style`

## Variables
Las variables utilizadas en el componente son las listadas a continuación:
- `[top, setTop]`: Estado utilizado para asignar el valor de posición vertical de la imagen, calculado a partir del tamaño de la ventana del navegador, la posición $Y$ del componente en el documento, la altura de su imagen y el desplazamiento vertical que realice el usuario en tiempo real. El valor del estado comienza en `0`.
- `[selfYPosition, setSelfYPosition]`: Estado utilizado para determinar la posición $Y$ del componente en el documento. Su estado inicial es `undefined` debido a que se requiere la renderización del componente antes de poder determinar su posición en el eje Y.
- `[selfHeight, setSelfHeight]`: Estado utilizado para determinar la altura de la imagen del componente. Su estado inicial es `undefined` debido a que se requiere la renderización del componente antes de poder determinar la altura de su imagen.
- `[verticalVelocity, setVerticalVelocity]`: Estado utilizado para determinar la velocidad de desplazamiento vertical de la imagen. Su estado inicial es `undefined` debido a que se requiere la renderización del componente para poder determinar la altura de su imagen con la que se calcula este estado.
- `[selfId, setSelfId]`: Estado utilizado para asignar el ID único al componente. Su estado inicial es `undefined` ya que la inicialización definitiva de este se realiza por medio del hook `useEffect()` de una sola ejecución (posterior a la renderización del componente) para evitar reasignaciones inesperadas de ID que harán que el componente deje de funcionar.
- `vh`: Altura de la la ventana del navegador en donde se visualiza el documento.

```jsx
// Estado para el valor de posición de la imagen
const [top, setTop] = useState(0);
// Estado para la posición Y del componente en el documento
const [selfYPosition, setSelfYPosition] = useState();
// Altura del componente
const [selfHeight, setSelfHeight] = useState();
// Velocidad de desplazamiento de la imagen
const [verticalVelocity, setVerticalVelocity] = useState();
// ID para el componente
const [selfId, setSelfId] = useState();
// Tamaño de la pantalla de visualización del documento
const vh = window.visualViewport.height;
```

El componente renderizado será un `div`

```jsx
return (
    <div
        className={`${style.container} ${className}`}
    >
        <img
            className={style.imageParallax}
            id={selfId}
            src={src}
            alt="Imagen"
            style={
                {
                    top: `${top}px`,
                }
            }
        />
    </div>
)
```

>   - El elemento `div` contenedor contiene la clase de módulo CSS `container` en donde se declaran los atributos globales de éste que deberán ser iguales para todos los componentes de tipo imagen con efecto de paralaje vertical. Seguido de esto, el contenedor también recibe una propiedad `className` provista como argumento del componente. Esto para declarar las dimensiones propias éste. Las propiedades CSS de este elemento son las siguientes: 
>   
>   ```css
>   .container {
>       overflow: hidden;
>       justify-content: center;
>   }
>   ```
>   
>   >   - `overflow: hidden`: Esto le indica al contenedor que deberá esconder el contenido desbordado dentro de éste.
>   >   - `justify-content: center`: El justificado del contenido será centrado para poder centrar la imagen que éste contenga.
>   
>   - Por su parte, el elemento `img` en el interior contiene la clase de módulo CSS `imageParallax`. Este elemento es el principal en el componente. Se utiliza una ID única en cada instancia del componente para calcular la posición vertical dentro del elemento padre (`div`), por lo cual, este elemento `img` recibe una ID única inicialmente con valor `undefined`. Como argumento de recurso de imagen, este elemento recibe la propiedad `src` provista como argumento del componente, esto para indicarle al elemento la imagen que deberá renderizar. Finalmente se declara el valor `top` en pixeles como estilo en línea, inicialmente con valor de `0`, esto, para poder hacer un cálculo en tiempo real cuando el usuario se deslice verticalmente por el documento. Las propiedades CSS de este elemento son las siguientes:
>   
>   ```css
>   .imageParallax {
>       position: relative;
>       width: 100%;
>       height: 150%;
>       background-size: cover;
>       background-repeat: no-repeat;
>   }
>   ```
>   
>   >   - `position: relative`: La posición del elemento `img` debe ser relativa para permitir a la declaración de la propiedad en línea `top` surtir efecto en la posición $Y$ de éste.
>   >   - `width: 100%`: La longitud horizontal debe ser del `100%` ya que la clase provista como argumento en la variable `className` del componente afecta directamente a las dimensiones componente, no de la imagen.
>   >   - `height: 150%`: La altura debe ser del `150%` ya que la clase provista como argumento en la variable `className` del componente afecta directamente a las dimensiones componente, no de la imagen. El componente sólo podrá mostrar un 100% de la imagen dentro del `div`. El 50% restante será el que se use para desplazar el elemento `img` en el eje $Y$ dentro del elemento `div` mientras el usuario se desplaza verticalmente por el documento.

Tras el renderizado, se ejecuta el primer hook `useEffect` que genera un valor aleatorio tipo uuid con ayuda de la función `uuidv4()` de la librería `uuid`. Este valor es asignado a la ID del elemento `img` descrito en el bloque de código anterior:

```jsx
// Efecto para asignar la ID al componente
useEffect(
    () => {
        setSelfId(uuidv4());
    }, []
)
```

Una vez asignada la ID única al elemento `img` se ejecuta otro hook `useEffect` para obtener la posición $Y$ del elemento `img` (que inicialmente es la misma que el contenedor `div`) y su altura, todo esto, si la variable de estado `selfId` ya tiene algún valor.

```jsx
// Efecto para obtener la posición Y y altura del elemento tras la renderización
useEffect(
    () => {
        if (!selfId) return;
        // Posición Y
        setSelfYPosition(document.getElementById(selfId).offsetTop);
        // Altura del elemento
        setSelfHeight(document.getElementById(selfId).offsetHeight);
    // Ejecución del hook cuando se asigne valor a la ID del componente
    }, [selfId]
)
```

Tras la ejecución del anterior hook `useEffect` se procede a ejecutar el siguiente hook `useEffect` que realizará el cálculo de la velocidad con la cual el elemento `img` se desplazará en el eje $Y$ dentro del contenedor `div` cuando el usuario se desplace verticalmente por el documento, todo esto, si los estados `selfId` y `selfHeight` ya están definidos:

```jsx
// Efecto para obtener el cálculo de velocidad tras la renderización
useEffect(
    () => {
        if (!selfId || !selfHeight) return;
        // Inicialización del valor de velocidad
        let value = 0.5;
        
        // Comparación de la altura de la imagen con la altura de la ventana del navegador
        if (selfHeight <= vh){
            // Si la altura de la imagen no es mayor a la altura de la ventana del navegador
            value = (selfHeight/3)/(vh-selfHeight/3*2);
        }

        // Se establece la velocidad vertical en el valor calculado
        setVerticalVelocity(value);
    }, [selfId, selfHeight, vh]
)
```

>   Para calcular la velocidad de desplazamiento vertical de la imagen se toma en cuenta la altura de la imagen (que es del 150% de la altura del componente) y se compara con la altura de la ventana del navegador. Dependiendo de cuál sea mayor el cálculo será distinto:
>   
>   ### Altura de la imagen mayor a la altura de la ventana del navegador
>   - El cálculo de la velocidad de desplazamiento será de `0.5` ya que, tomando el cálculo a continuación el componente toma un comportamiento extraño y provoca que la imagen se desplace en el eje $Y$ a valores superiores o inferiores al rango deseado para lograr el efecto. Tomar en cuenta que este cálculo provocará que la parte inferior de la imagen jamás se visualice.
>   
>   ### Altura de la ventana del navegador mayor a la altura de la imagen
>   - El cálculo de la velocidad de desplazamiento toma el valor sobrante de la altura del elemento `img` dentro del elemento `div` contenedor (es decir, 50% del 150% o $ \frac{1}{3} $) dividido entre el rango vertical de la ventana del navegador no utilizado por el componente (es decir, la altura de la ventana del navegador menos la altura del componente).
>   
>   $$ \frac{\left(\frac{\text{Altura de la imagen}}{3}\right)}{\left[\text{Altura de ventana de navegador}×\left(2\frac{(\text{Altura de la imagen})}{3}\right)\right]} $$
>   
>   $$ \frac{\left(\frac{selfHeight}{3}\right)}{\left[vh-\left(2\frac{(selfHeight)}{3}\right)\right]} $$

Una vez hecho esto se ejecuta el siguiente hook `useEffect` para calcular la posición inicial del elemento `img` dentro del elemento `div` contenedor tomando el valor de la posición $Y$ inicial del componente multiplicado por la velocidad de desplazamiento vertical calculada en el hook `useEffect` anterior.

```jsx
// Efecto para calcular la posición inicial de la imagen dentro del contenedor
useEffect(
    () => {
        if (!selfYPosition || !verticalVelocity) return;

        setTop(-(selfYPosition*verticalVelocity))
    }, [selfYPosition, verticalVelocity]
)
```

>   Mientras el componente se encuentre fuera de la vista inicial del navegador el elemento `img` >   dentro del elemento `div` contenedor seguramente estará fuera del rango de visión del componente, es decir, que el componente podría lucir parcial o totalmente vacío. Sin embargo, gracias a que se ha calculado la velocidad de desplazamiento, el valor del estado `top` tendrá un valor negativo que se calculará con la posición $Y$ del componente multiplicada por la velocidad de desplazamiento, todo esto como valor negativo. Esto es, por ejemplo, que si la posición $Y$ del componente dentro del documento es de 3,500 px y la velocidad de desplazamiento es de 0.5 px, el valor `top` del elemento `img` será de -1,750 px lo cual seguramente hará que éste se encuentre totalmente fuera del rango de visión dentro del elemento `div` contenedor. Sin embargo, el valor de desplazamiento (explicado más abajo) irá disminuyendo este valor negativo al punto de establecerlo en 0 cuando el componente entre en el campo de visión de la ventana del navegador.
>   
>   $$ -(\text{Posición $Y$ del componente} * \text{Velocidad vertical}) \to -(selfPosition*verticalVelocity) $$

Finalmente se ejecuta un último hook `useEffect` para calcular la posición en tiempo real del elemento `img` dentro del elemento `div` contenedor mientras el usuario se desplaza verticalmente dentro del documento. Para esto, se quiere que los estados `selfId`, `selfYPosition`, `selfHeight` y `verticalVelocity` ya se encuentren definidos.

```jsx
// Efecto para calcular la posición en tiempo real de la imagen dentro del contenedor
useEffect(
    () => {
        if (!selfId || !selfYPosition || !selfHeight || !verticalVelocity) return;

        // Escuchador del evento de deslizamiento
        window.addEventListener('scroll', function(){
            // Posición actual del desplazamiento vertical (Comienza en 0)
            const scroll = this.window.scrollY;

            // Cambio dinámico de posición de la imagen
            setTop(-(selfYPosition*verticalVelocity)+(scroll*verticalVelocity));
        })

        return (
            () => {window.removeEventListener("scroll", function(){})}
        );
    }, [selfId, selfYPosition, vh, selfHeight, verticalVelocity]
)
```

>   - Primeramente se añade un escuchador de evento *scroll* a la ventana del navegador, esto es, que cada vez que el usuario se desplace verticalmente por el documento se ejecutará el código al interior de este bloque.
>   - Se guarda en la variable `scroll` el valor en pixeles del desplazamiento vertical del usuario en el documento.
>   - Se calcula la posición en tiempo real del elemento `img` dentro del elemento `div` contenedor con la siguiente fórmula:
>   
>   >   Tomando en cuenta que la posición vertical inicial de la imagen ya se calculó en el efecto anterior, se vuelve a utilizar esta misma fórmula para calcular la posición en tiempo real una vez que el usuario comienza a desplazarse verticalmente dentro del documento. A este valor que será negativo si el componente se encuentra por debajo del campo de visión de la ventana del navegador se le suma la multiplicación del valor de desplazamiento vertical del usuario por la velocidad de desplazamiento del elemento `img`, así que, cuando el componente entra al campo de visión de la ventana desde abajo significa que el usuario se ha desplazado el equivalente al valor de desplazamiento $Y$ mas el valor de la altura de la ventana del navegador que será igual al valor de la posición $Y$ del componente.
>   >   
>   >   $$ \text{Desplazamiento vertical} + \text{Altura de ventana de navegación} = \text{Posición Y del componente} $$
>   >   $$ scrollY - vh = selfYPosition $$
>   >   
>   >   Por ejemplo si la altura de la ventana del navegador es de 600 px y la posición $Y$ del componente es de 1,500 px éste comenzará a aparecer en la ventana de visualización del navegador cuando el usuario se haya desplazado 1500 px - 600 px, es decir, 900 px.
>   >   
>   >   $$ 1500px - 600px = 900px $$
>   >   
>   >   Así que cuando el componente entre totalmente al campo de visualización de la ventana del navegador mientras el usuario se desplaza hacia abajo el valor `top` del elemento `img` será de $ -\frac{1}{3} $ como se desea para que la parte inferior del elemento `img` ya se encuentre cubriendo la totalidad del elemento `div` contenedor.
>   >   
>   >   $$ \text{Cuando $ scrollY+vh = selfYPosition $: } top = -\frac{1}{3}selfHeight $$
>   >   
>   >   Finalmente cuando el usuario se desplaza lo suficientemente hacia abajo del documento para que el valor de desplazamiento vertical sea igual a la posición $Y$ del componente, es decir, cuando el componente ya está por comenzar a ocultarse por la parte superior de la ventana del navegador el valor `top` ya será igual a `0` y comenzará a tomar valores positivos mientras el elemento se oculta cada vez más por la parte superior del navegador.
>   >   
>   >   $$ \text{Cuando $ scrollY = selfYPosition $: } top = 0 $$
