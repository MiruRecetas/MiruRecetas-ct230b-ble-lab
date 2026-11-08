# Conserva · «Mis etiquetas» (laboratorio · interfaz experimental)

**Estado: desarrollo experimental exclusivamente en la rama de laboratorio.**
Este directorio contiene la página autónoma **«Mis etiquetas»**, con
selector de formatos aprobado y con **Pequeña 30 × 20** operativa en laboratorio.
**Compacta libre 50 × 30** está implementada con las correcciones visuales
de la [PR #46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46),
a raíz de la revisión de la PR #45. **Aprobada y validada visualmente por la usuaria
el 08/11/2026 en la página publicada**; no consta todavía ensayo físico CT230B
para esta variante libre. **Amplia 50 × 80 horizontal** es la siguiente fase,
pendiente de concretar el diseño libre basado en V0.7.3. No se ha integrado ni migrado
ningún archivo a `MiruRecetas/mirurecetas-web-source`; no está publicado como
página productiva ni registra existencias.

## Contrato de producto y diseño aprobado (06/11/2026)

**Documento rector:** [MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
Contiene las decisiones de la usuaria y diferencia entre diseños aprobados,
motor actual, formatos futuros, banco JSON, «Mis reservas» y requisitos P10.

El **selector visual de cuatro tarjetas en una sola fila** fue aprobado
expresamente por la usuaria, con iconos SVG actuales de **Amplia 50 × 80**,
**Compacta 50 × 30**, **Pequeña 30 × 20** y **Más formatos · Próximamente**.
No añadir textos de disponibilidad a las tres primeras ni alterar sus iconos
sin nueva aprobación; registro final en [PR #40](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/40).
Sus radios controlan los tres pasos. Pequeña y Compacta generan e imprimen
etiquetas libres; Compacta tiene diseño **aceptado y validado visualmente**, y
su eventual prueba física sigue siendo una comprobación separada.

El término «receta/componente/ingrediente» se reserva para documentación y
formulario específico, no como subtítulo del selector de formatos.

## Compacta libre 50 × 30 · variante experimental independiente (07/11/2026)

La geometría de la **V0.9** se conserva en `plantilla-compacta.js` como
**plantilla de composición**, sin QR. Se registra en el motor único
`motor-libre.js`, completamente independiente de `label-v09-component.js`,
del motor web privado y de las etiquetas productivas. **No modificar la V0.9
original**: la plantilla libre tiene ciclo de vida y futuras revisiones propias.

El formulario compacto admite nutrición manual opcional, instrucciones y
nota libre con casillas que controlan **solo el texto** inferior, nombre y ambas
fechas (primera obligatoria; segunda opcional con `--/--/--`). La composición
aprobada el 08/11/2026 conserva ambos encabezados inferiores y su espacio,
aunque el texto esté vacío u oculto. Con nutrientes presentes, fechas y
rótulos comparten línea a la izquierda sin separadores verticales;
la nutrición ocupa la derecha con kcal en caja negra redondeada y macros
separados. Con nutrición apagada, fechas y rótulos se centran en
**dos columnas de igual anchura**, sin separador y sin hueco de macros.
Se retira la raya horizontal adicional antes del encabezado de conservación.
El título, el isotipo BN y la banda negra superiores conservan exactamente
las coordenadas y tamaños V0.9, sin texto añadido bajo el isotipo. El preview usa el raster de 590 × 354
que genera el mismo motor de TSPL; la impresión CT230B usa los controles BLE
ya existentes y multicopia `PRINT 1,n`. El espacio del antiguo QR se ha aprovechado para extender las secciones de
texto a todo el ancho según el diseño elegido. La geometría sin QR **está aprobada visualmente por la usuaria**;
las variantes sin texto y las series multicopia **no adquieren aprobación física
por herencia** de la V0.9 original. Ver
[MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).

Al cambiar el tipo de conservación de Compacta se reutiliza la regla de
Pequeña: congelación → rótulo «Envasado y congelación» e instrucción editable
«Descongelar en nevera»; refrigeración → «Envasado» y «Conservar en nevera»;
otro → «Conservación» e instrucción vacía. La nota personal anterior se
limpia para evitar mensajes contradictorios; puede volver a editarse.
«Consumo preferente» permanece siempre visible con ese nombre. Ningún modo
calcula automáticamente la fecha ni un plazo.

**Arquitectura unificada (07/11/2026):** `motor-libre.js` contiene una única
implementación de fechas y utilidades de validación, carga del isotipo, ajuste
tipográfico, salto de líneas, renderización Canvas, raster 1 bit en bandas,
construcción TSPL y validación de multicopia. `plantilla-pequena.js` y
`plantilla-compacta.js` **solo** registran reglas particulares de datos y
coordenadas gráficas. `app.js` gestiona una única conexión/transporte BLE.
No importar ni modificar los motores históricos o productivos. La unificación
no constituye aprobación física de las nuevas variantes.

## Cabecera aprobada · variante interior

La cabecera provisional del primer prototipo ha sido reemplazada por el
**componente oficial de interiores** de MiruRecetas, reutilizando el marcado
de `mirurecetas-web-source/main:plantillas/cabecera.html`, el isotipo
vectorial de `assets/marca/isotipo.svg` (seis piezas, recorte oficial) y copias
idénticas de `assets/cabecera.css` y `assets/cabecera.js` en este directorio.

Se conserva exactamente la navegación vigente: Cocina → recetario;
Disfruta → planificador; Conserva → listas de la compra del planificador.
Los apartados futuros no tienen enlaces inventados. El botón «Instalar»
permanece oculto en el laboratorio porque aquí no está habilitado el
controlador PWA productivo. **No se ha modificado ni re-publicado**
`mirurecetas-web-source`, ni se ha añadido aún un enlace nuevo de
«Etiquetas de ingredientes» al menú oficial.

Para futuras actualizaciones debe contrastarse la cabecera del laboratorio
con los tres archivos canónicos de `main` y conservar el modo
`miru-header--interior`; nunca usar la variante Hero.

## Qué contiene

- `index.html`: página completa, responsive y revisable editorialmente. No es
  el `index.html` histórico de experimentos CT230B.
- `style.css`: presentación separada del motor, con crema/salvia/terracota,
  Bricolage Grotesque para titulares y Geist para texto.
- `motor-libre.js`: **motor único de etiquetas libres** (raster, TSPL, tipografía,
  fechas, ajuste de textos y carga del isotipo).
- `plantilla-pequena.js`: composición y reglas de datos de 30 × 20, sin motor
  TSPL propio y sin modificar el diseño de referencia V0.8.
- `plantilla-compacta.js`: composición y reglas de datos de 50 × 30, sin QR,
  aislada de la V0.9 original, con diseño libre todavía experimental.
- `app.js`: interacción, carga estricta de tipografías/isotipo oficial,
  previsualización, conexión voluntaria, confirmación, transporte BLE, barra de
  progreso y registro local.

La fuente de referencia experimental aprobada está en
`../label-v08-ingredient.js` y
`../V08-INGREDIENTE-30x20-CANVA-ENSAYO.md`. **No modificarla.** La V0.8
fue impresa y aprobada en cinco ensayos (30/10/2026). La usuaria ha
utilizado posteriormente este panel V1 para seis transmisiones BLE consecutivas
de 5919 B / 296 fragmentos cada una (05/11/2026), pero la evidencia de consola
**no acredita por sí sola la salida ni alineación física**. Las variantes
nuevas con gramos o pie vacíos y multicopia no han sido contrastadas físicamente
con la V0.8; no dar por validada esta modificación sin pruebas específicas.

## Contrato congelado de la etiqueta

- Papel **30 × 20 mm**, lienzo **354 × 236 puntos**; lectura horizontal.
- Nombre editable; gramos **opcionales** enteros entre **1 y 9999** si se indican.
- Fecha de envasado **obligatoria y visible siempre**, con rótulo adaptado al
  tipo de conservación elegido (congelación o envasado genérico).
- Consumo preferente **opcional y visible siempre**: en blanco se imprime
  `--/--/--`; si se fija no puede ser anterior al envasado.
- Tipografía Bricolage Grotesque / Geist, separadores raster, isotipo oficial
  monocromo y pie editable de hasta 32 caracteres (sujeto además a la anchura
  física del pie: 285 puntos, tipografía Geist itálica 16–12 px).
  «Refrigeración» precarga «Conservar en nevera»; «Congelación» precarga
  «Descongelar en nevera»; «Otro tipo» cambia el rótulo de la fecha a «Conservación» y deja el texto de la nota vacío y editable, sin bloquear la vista previa ni la impresión.
  «Mostrar nota» permite ocultar el pie sin perder lo escrito mientras se edita.
  Cambiar el tipo de conservación sustituye la nota por el texto predeterminado.
  Las variantes sin peso/pie o con texto personalizado necesitan verificación
  física; no alteran la V0.8 histórica.
- **Sin QR**, sin valores nutricionales, sin inventario ni lote.
- TSPL `SIZE 30 mm,20 mm`, `GAP 2 mm,0 mm`, `DIRECTION 0`, `CLS`,
  `BITMAP` disperso de bandas ≤12 filas y **un solo `PRINT 1,n`**,
  con selector de **1–20 copias**. No se generan múltiples trabajos BLE.
- Máximo 35.000 bytes, BLE UART CT230B, fragmentos de 20 bytes con pausa
  de 75 ms y sin reintentos automáticos. Los controles bloquean envíos
  incompletos o con datos inválidos. Barra terracota con fragmentos
  enviados/restantes y porcentaje de transporte (no certifica impresión física).
- Antes de enviar varias copias, verificar alineación en papel real;
  una transmisión correcta no garantiza el número de copias impresas.

## Límites de la pantalla

La página es un **candidato de producto** y evita lenguaje o controles de
experimentos históricos. Durante su estancia en el laboratorio conserva un
aviso de alcance en el pie. El selector incluye los **tres formatos libres previstos** (no incorpora
50 × 80 vertical con anillo) y una tarjeta futura. La selección de Amplia muestra el estado pendiente dentro de los pasos, sin motor
imprimible ni previsualización inventada; Compacta sí presenta el raster
compartido del formato seleccionado y puede enviar a CT230B bajo confirmación,
pero aún no dispone de aceptación física de su nuevo diseño. El nombre y, cuando se indique, el peso en
Pequeña son introducidos manualmente; todavía no hay un catálogo de ingredientes
para esta sección. El peso no forma parte de Compacta ni Amplia.
Las fechas no se deducen de pautas generales de conservación.

Se utiliza la ruta relativa `../assets/isotipo-bn.svg`, disponible
en el laboratorio. Cualquier futura migración deberá revisar rutas y
dependencias **tras autorización expresa**, sin copiar código experimental
innecesario ni crear transportistas de publicación alternativos.

## QA antes de cualquier fusión

1. Ejecutar `node --test tests/ingredientes-v1.test.cjs` en una copia del
   laboratorio y revisar validaciones, límites, bitmap, TSPL y enlaces.
2. Comprobar visualmente en Chromium Android o equivalente los anchos 360,
   390, 768 y 1280 px, el orden móvil **datos → vista previa → impresión**,
   el teclado, los calendarios, el texto largo y los estados de error.
3. Conectar voluntariamente CT230B en Chrome Android HTTPS y verificar
   que conectar no imprime nada; con campos inválidos o sin aceptar papel
   no debe poder imprimirse.
4. Cuando se acuerde probar el nuevo motor, imprimir primero **una** etiqueta
   en papel estándar 30 × 20, comparar con la V0.8 aprobada (texto, isotipo,
   posiciones y márgenes), guardar fotografía y registro; no repetir ante
   anomalías. La aprobación física histórica no sustituye esta regresión.
5. Nunca fusionar ni integrar en `mirurecetas-web-source`, ni privatizar
   el laboratorio, sin autorización específica.

El tipo de conservación (refrigeración, congelación u otro) determina
el rótulo de envasado y el texto inicial de la nota, pero la nota es siempre
editable. La casilla «Mostrar nota» es independiente. Estas opciones
no infieren caducidades ni seguridad de conservación. La fecha del fabricante se introduce sin alterar su validez.

El laboratorio actual es **público**. Las ramas y PR también pueden ser
visibles. No introducir credenciales, lotes reales o información privada.
