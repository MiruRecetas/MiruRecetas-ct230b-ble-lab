# V0.7 · Ensayo horizontal 50×80 · Puré de calabaza y calabacín

**Fecha:** 30 de octubre de 2026.  
**Estado:** corregido tras fallo real de carga comunicado a las 21:36 del 30/10/2026; pendiente de validación física (Chrome Android + CT230B). No afirmar que se ha impreso ni que el QR ya se ha escaneado en V0.7.

## 1. Diseño aprobado y limitación de alcance

La usuaria aportó el SVG Canva **`MiruRecetas · Etiqueta 50x80 · v1_20261030_200122_0000.svg`**, con el contenido girado 90° antihorario. V0.7 **no introduce una nueva dirección de diseño**: usa la geometría horizontal de `label-p15-horizontal-svg.js`, existente en el laboratorio, que reconstruye editorialmente la referencia SVG. Es una implementación de la composición, no un enlace automático al proyecto Canva ni la transferencia literal de cada path vectorial.

* Formato físico: 50 × 80 mm, ancho de cabezal 50 mm, composición horizontal girada 90° antihorario.
* Nombre, nutrición, fechas, título de descongelación, instrucciones, nota, QR y marca, sin bloques adicionales. **El SVG horizontal no lleva anillo nutricional**; no añadirlo.
* Fuentes web oficiales: Bricolage Grotesque y Geist; isotipo oficial BN del laboratorio. Si no se cargan, se bloquea la impresión; sin fuentes de sustitución.
* Dos únicos separadores conforme a geometría ya establecida: `BAR 109,0,21,945` y `BAR 251,427,7,518`. No rasterizar esas líneas.
* QR nativo: `QRCODE 345,58,M,5,A,0,M2,S7`. El arte **no incluye** QR rasterizado ni copia el QR original de Canva.

## 2. Fuente de la receta y datos inalterables del ensayo

Fuente canónica: `MiruRecetas/mirurecetas-web-source/main:datos/recetas/pure-de-calabaza-y-calabacin.json`.

| Campo por ración | Valor |
| --- | ---: |
| Nombre | Puré de calabaza y calabacín |
| kcal oficiales | 215,56 |
| PR | 4,44 g |
| HC | 22,31 g |
| GR | 12,92 g |

Instrucción literal aportada por la usuaria: **«Descongelar en nevera y remover mientras se calienta enérgicamente o volver a batir»**. Puede envolverse en hasta cuatro líneas **dentro del mismo bloque**; no se trunca ni se sustituye por el texto anterior del laboratorio. Nota descriptiva para la maqueta: «La textura puede variar al descongelar». Esta nota no es un dato oficial de conservación y se podrá revisar editorialmente.

URL canónica completa del QR, sin URL corta, repositorio extra ni redirecciones intencionadas:
`https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/`.

Las fechas de envasado y consumo preferente se introducen a mano. No generar un plazo predeterminado: **la ficha oficial no contiene una validación de conservación congelada**.

## 3. Implementación técnica aislada

* Nueva sección de interfaz: **6E · V0.7**, nueva etiqueta y botón independiente.
* Nuevo módulo `label-v07.js` con datos constantes oficiales, fechas dinámicas, vista previa, comprobaciones y un único envío por pulsación.
* Reutilización de `p15hRender(d,4)` y `p15hBuild(d,4)`: la modificación en el módulo existente **solo parametriza** el máximo de líneas de instrucción (por defecto sigue siendo 2 en las pruebas previas), para poder imprimir la frase completa del puré sin tocar geometría ni otros textos.
* `v62SparseRegion`: bandas de un máximo de 12 filas con eliminación de blanco para reducir bytes transmitidos.
* `SIZE 50 mm,80 mm`; `GAP 2 mm,0 mm`; `DIRECTION 0`; `CLS`; `BITMAP` disperso; **2 BAR**; **1 QRCODE nativo**; **1 PRINT 1,1**.
* Se conserva `transmitDiagnostic` del laboratorio: fragmentos BLE de **20 bytes**, pausas de **75 ms**, sin reintentos automáticos, sin comandos persistentes y con límite preventivo de **35.000 bytes**.
* El botón exige CT230B conectada, fechas válidas, aceptación de papel 50×80 y confirmación modal. El registro presenta bytes, bandas y fragmentos previstos.

**Pruebas de código:** parseo de JavaScript del módulo nuevo y del reutilizado; se verificaron los controles, referencias, configuración de línea/QR y que las pruebas previas conservan el máximo de 2 líneas. **Pendiente:** ejecución real en Chrome Android, cálculo de bytes con sus fuentes rasterizadas, impresión física, lectura QR y comparación visual contra SVG aprobado.

**Ámbito:** únicamente laboratorio BLE CT230B. No se modifica Canva, web principal, Airtable, receta oficial, publicación canónica ni PWA.
## Incidencia real y corrección de la V0.7 (30/10/2026)

**Evidencia de la usuaria, 21:36–21:37:** la vista previa estaba vacía; aun indicando fechas, la sección V0.7 repetía `p15hIso is not defined` y no permitía imprimir. **No hubo impresión V0.7**.

**Causa confirmada:** `label-v05.js` y `label-p15-horizontal-svg.js` declaraban ambos `const now` al nivel global de scripts clásicos del mismo documento. La duplicación produce `SyntaxError: Identifier 'now' has already been declared`; por ello la declaración de `p15hIso` dentro del segundo script no existía. La V0.7 antigua usaba esa función y otras del módulo anterior, que además era una reconstrucción de otro agente.

**Corrección:** en la sección antigua 6D solo se renombra el `now` local a `p15hToday`, preservando su comportamiento. **V0.7 deja de llamar a cualquier función `p15h*`** y construye por su cuenta el render, las fechas, las áreas de raster, los dos `BAR`, el QR y el trabajo. Sigue reutilizando exclusivamente los servicios estables de V0.6.2: `v62SparseRegion`, `v5Logo`, carga de fuentes/identidad y `transmitDiagnostic`. La referencia directa es el **SVG realmente adjuntado** `MiruRecetas · Etiqueta 50x80 · v1_20261030_200122_0000.svg` (SHA-256 `15661f972de80d007599fe44a1ce5f08cd397c890feb7bbb32efc2ecc92a1090`). La implementación reproduce sus bloques y cotas de colocación; **no importa automáticamente cada path vectorial del SVG** ni enlaza cambios de Canva.

**Pruebas sin papel:** compilación conjunta de todos los scripts del HTML (sin colisión de identificadores); simulación de Canvas 2D y GATT confirmando vista previa 590×945, fechas válidas, botón habilitable, 2 BAR nativas, 1 QRCODE, 1 PRINT y URL auténtica del puré. Son pruebas programáticas **simuladas**, no ejecución física ni garantía del ajuste real con las fuentes remotas. Validación pendiente en Chrome Android: aspecto geométrico, bytes reales, rotación, títulos largos y lectura QR en papel.

**Instrucción congelación exacta a preservar:** «Descongelar en nevera y remover mientras se calienta enérgicamente o volver a batir». Solo se permite ajustar el salto automático de línea para encajarla en la caja ya existente; prohibido resumirla o reubicarla sin autorización.

## Ensayo físico V0.7 y revisión V0.7.1 (30/10/2026)

**Resultado real aportado por la usuaria, 21:49–21:52:** la V0.7 se imprimió sobre papel 50×80. Registro real: 23.983 bytes, 229 bandas dispersas, 1.200 fragmentos BLE, 2 BAR nativas, QR nativo. La imagen impresa es legible y la vista previa también funciona; la corrección previa del conflicto global `now` ha restablecido asimismo el funcionamiento del módulo 6D y los campos automáticos, según la usuaria. **No se ha informado de un resultado positivo del escaneo del QR de esta V0.7**; no darlo por válido todavía.

**Diferencias detectadas frente a Canva:** el isotipo real aparecía demasiado pequeño al imprimirse; las letras de `DESCONGELACIÓN Y CONSUMO`, de las instrucciones completas, de `NOTA` y de su contenido resultaban más pequeñas que en el diseño aprobado. Las dos reglas impresas con `BAR` nativo, sobre todo la horizontal gruesa tras rotar el papel, muestran irregularidades/ondulaciones o pérdida de definición.

**Corrección limitada V0.7.1:**
- Misma receta, sus 4 datos oficiales, los dos campos de fecha, sus rótulos, mismo título, mismas cajas del diseño horizontal y el mismo QR/URL nativos. No cambiar el SVG de Canva ni su identidad.
- El SVG del isotipo BN contiene un `viewBox` cuadrado con amplios márgenes internos; el trazado visible real ocupa aproximadamente la caja normalizada x=19–81 %, y=24–77 %. En `drawImage` se recorta solo ese margen transparente y se coloca el símbolo visible a 94×80 píxeles, en x=838,y=8 del lienzo horizontal de 945×590. El asset oficial no se modifica. Esta corrección se compara visualmente con el Canva, no supone un nuevo logotipo.
- Título del bloque `DESCONGELACIÓN Y CONSUMO`: Bricolage Grotesque 700 de 23 a 30 px (mínimo 24), ancho disponible de 495 a 550 px; las instrucciones exactas se dibujan con Geist 400 a 27 px (mínimo 24), 555 px máximos, envoltura automática sin truncamiento. `NOTA`: Bricolage Grotesque 700 de 21 a 26 px; contenido en Geist 500 cursiva de 18 a 24 px (mínimo 21), caja de 325 px hasta dos líneas. Posiciones verticales iniciales se preservan.
- **Las líneas no cambian de posición ni grosor:** regla completa: (x=109,y=0,w=21,h=945), regla parcial: (x=251,y=427,w=7,h=518), medidas en el canvas físico ya girado 590×945. En vez de órdenes `BAR` TSPL se añaden en el mismo raster blanco/negro y pasan por `v62SparseRegion` (máximo 12 filas); se añade la región del primer separador que antes estaba reservada para BAR. Solo el `QRCODE` permanece nativo. Conservar esta estrategia como **prueba**: una línea negra tan densa también puede dar problemas térmicos aun siendo raster, y hará falta comprobarlo físicamente antes de concluir nada.

**QA previo sin impresión:** compilación conjunta de todos los scripts clásicos del HTML; prueba de DOM y Canvas 2D simulados que verifica vista previa de 590×945, fecha, botón de impresión habilitado con confirmación, isotipo recortado con origen de imagen, instrucciones literales sin truncar, dos líneas con dimensiones y posiciones preservadas, 0 órdenes `BAR`, 1 `QRCODE` con URL canónica y 1 `PRINT`. Queda **pendiente** comparar vista previa en Chrome Android, imprimir la V0.7.1, comprobar legibilidad y distorsión de reglas, escanear el QR y copiar el registro BLE.


## Vista previa obsoleta tras V0.7.1 — incidencia de caché (30/10/2026)
La usuaria muestra en Chrome Android una vista previa con logo pequeño y texto inferior antiguo. Evidencia inequívoca: debajo del canvas todavía aparece `Vista previa cargada · reconstrucción independiente del SVG original; fuentes y marca oficiales.`, cadena **eliminada en `label-v07.js` de `main`**; el código corregido publica `Vista previa V0.7.1 · isotipo completo sin márgenes, textos ampliados, 2 líneas raster · QR nativo.`. Por tanto, la captura **no es prueba de que V0.7.1 represente la misma gráfica**, sino de que se ejecuta JavaScript obsoleto en navegador o despliegue CDN.

La página incluía `<script src="./label-v07.js"></script>` sin versión. Se cambia **solo** la referencia de la V7 a `label-v07.js?v=753c9df606db70d2ee5bd94066bc3911ba61f930`, usando SHA del blob publicado; se actualiza mensaje de carga. No se cambia el raster ni las fuentes ni el diseño. Enlaces de prueba deben abrirse con parámetro de consulta nuevo también en el HTML para evitar su caché. Condición para validar en móvil: la línea de estado de debajo de la vista previa DEBE contener `V0.7.1`. En caso contrario no imprimir; la impresión todavía no prueba la nueva versión.
