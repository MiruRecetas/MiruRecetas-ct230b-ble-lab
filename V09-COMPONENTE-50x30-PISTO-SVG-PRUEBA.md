# V0.9 · Componente cocinado 50 × 30 · Pisto — prueba SVG Canva

> **ACTUALIZACIÓN DEL QR · 31/10/2026:** la etiqueta gráfica V0.9 de Pisto continúa aprobada como diseño histórico; su QR largo de **4 puntos**, difícil de leer, permanece **sin cambios** en label-v09-component.js. El **QR de 5 puntos con ECC M para 50×30** ha sido **probado y aprobado** en el nuevo panel V1 para Ragú con URL corta **#r047**. **No afirmar que se reescribió el módulo V0.9 histórico**. Ver [acta vigente](VALIDACION-ETIQUETAS-CT230B-2026-10-31.md). Las observaciones previas sobre lectura difícil son historia de la versión anterior.


**Estado vigente (31/10/2026): V0.9 FÍSICAMENTE VALIDADA Y APROBADA POR LA USUARIA.** El QR **se puede leer, pero requiere varios intentos**; esta limitación se acepta como incidencia abierta para estudiar enlaces cortos sin alterar el diseño. La versión aprobada incorpora la PR #20 (`d621dbc1aefc`). Las menciones a «pendiente» y «QR no verificado» en párrafos previos son **históricas y quedan superadas** por esta decisión explícita. **No sustituye ni modifica** las versiones V0.6.2 vertical, V0.7.3 horizontal y V0.8 ingrediente aprobadas.

## Autoridad del diseño

Archivo SVG facilitado expresamente por la usuaria: **«MiruRecetas · Etiqueta 50x80 · v1_20261030_233831_0000.svg»** (el nombre de exportación dice 50×80, pero su lienzo medido es de **189×113 px**, equivalente a **50×30 mm**). El SVG fue inspeccionado y renderizado a escala para fijar la composición: título *Pisto* grande arriba a la izquierda, isotipo BN grande arriba a la derecha, **banda negra gruesa completa** debajo de la cabecera, información de fechas a la izquierda, nutrición a la derecha, segunda **línea fina y parcial** debajo de fechas, instrucciones y nota a la izquierda, QR en la zona inferior derecha.

No reutilizar el renderizador P15 anterior, cuyos cambios no autorizados desplazaron QR, logo, macros y líneas. Los diseños aprobados de las demás familias son inmutables sin autorización. Se utiliza `v7GetVisibleLogo()` para dibujar el isotipo oficial **sin márgenes transparentes**, como corrigió el otro agente tras las pruebas de V0.7.1–V0.7.3. No se intenta copiar el SVG de Canva al repo público porque contiene metadatos de exportación, un QR rasterizado y otros activos; la salida es una reconstrucción tipográfica y geométrica destinada a contrastarse físicamente con el SVG original.

### Composición raster a 590 × 354 puntos (300 dpi)

- Título: Bricolage Grotesque 700, margen superior izquierdo.
- Logo visible oficial recortado: `(525,5), 53×48` puntos.
- **Solo dos separadores, ambos bitmap, como en V0.7.3**: superior `(0,60), 590×12`; secundario `(0,149), 392×4`. La segunda línea **NO cruza** por debajo de las kcal ni del QR.
- Fechas: columna izquierda, en `y=100` y `y=135`.
- Nutrición canónica de Pisto, en la columna derecha: **164,35 kcal**, **PR 5,69 g**, **HC 18,58 g**, **GR 7,84 g**. La energía oficial no se recalcula a partir de los macronutrientes.
- Instrucción completa del SVG: **«En nevera · Recalentar tapado o / en sartén a fuego suave»**.
- Nota completa del SVG: **«El calabacín puede variar / de textura al congelar.»**
- QR real nativo TSPL con URL canónica `https://mirurecetas.github.io/menu-anual-recetas/recetas/pisto/`, módulo 4 a `(420,187)`. La vista previa **señala** el área del QR, no simula una matriz. Reservada zona blanca para evitar bitmap sobre el QR.
- No figura ni gramaje ni número de raciones en ninguna parte de la etiqueta, porque Pisto es receta componente y cada bolsa contiene internamente una ración.

## Entrada y uso

**Solo dos campos editables:** fecha de envasado/congelación y consumo preferente. El resto de datos, nota, título, nutrición y QR son **fijos para la prueba Pisto**, sin selector de receta ni integración con Airtable ni web principal. El calendario de envasado se inicia en la fecha local; el consumo preferente se deja sin valor hasta elección consciente. Se comprueba que sean fechas válidas y que el consumo no preceda al envasado; **no se infiere ni certifica una vida útil en congelación**.

La nueva sección **6G** de `index.html` muestra la vista previa aun sin fechas completas. Solo con fechas válidas, fuentes e isotipo cargados, CT230B conectada, casilla del papel **50×30** y confirmación modal se envía **una** etiqueta; no hay reintentos automáticos.

## Contrato TSPL/BLE preservado

- `SIZE 50 mm,30 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n`
- Bricolage Grotesque, Geist, logo y las **dos líneas rasterizados** juntos, 1 bit mediante `v5ToTsplBitmap` a través de `v62SparseRegion`, **bandas de hasta 12 filas** y recorte de blanco. Regiones de raster divididas para mantener el área del QR libre.
- Un solo `QRCODE 420,187,M,4,A,0,M2,S7,"https://mirurecetas.github.io/menu-anual-recetas/recetas/pisto/"` y un solo `PRINT 1,1`; QR no duplicado en BITMAP.
- Motor `transmitDiagnostic` **sin modificar**: UART BLE previamente comprobado, fragmentos de **20 bytes**, pausa **75 ms**; sin reintentos. Límite preventivo del trabajo **35.000 bytes**. No inferir de la transmisión completa que el QR haya sido leído o la impresión resulte conforme.

## QA y validación

Se comprobó: sintaxis JavaScript de V0.9; **sintaxis concatenada de los scripts del laboratorio** para detectar colisiones globales que fallaron en V0.7; presencia de único nuevo botón; carga después de V0.7 para acceder al logo recortado; mock TSPL de **un QR nativo, un PRINT, SIZE 50×30, raster, ubicación/quiet-zone reservada y validación de fechas**. No se han ejecutado pruebas físicas desde el agente. El peso real debe calcularse en Chrome Android al rasterizar con las fuentes oficiales.

**Pendiente de aprobación V0.9:** fotografía real 50×30, legibilidad, coincidencia del tamaño de logo con el SVG, barra gruesa, línea parcial, alineación entre kcal/macros, QR situado correctamente y escaneable. El área libre restante del QR debe verificarse sobre papel. La aprobación de V0.7.3 y V0.8 no se extiende automáticamente a V0.9.

**Ámbito estricto:** solo `MiruRecetas/MiruRecetas-ct230b-ble-lab`, sin PR/edición de arquitectura privada, web/PWA principal, Airtable, productos, recetas, nutrición, inventario, Canva o mecanismos de publicación ajenos.

## Ensayo físico posterior — 31/10/2026, 10:13–10:17 (hora de España)

**Evidencia recibida:** dos fotografías de la etiqueta Pisto 50×30 sobre la CLABEL CT230B, una general y otra de detalle del QR, y el log BLE completo facilitado por la usuaria. El aspecto en ambas imágenes corresponde a la **V0.9 con ampliación de títulos e instrucciones de la PR #20**, no a la anterior.

| Hito | Primer envío | Segundo envío |
| --- | --- | --- |
| Inicio | 10:14:34 | 10:16:04 |
| Mensaje «Datos ... enviados» | 10:15:43 | 10:17:16 |
| Trabajo TSPL | **12.352 B** | **12.352 B** |
| Fragmentos BLE | **618** | **618** |
| Bandas raster | **27** | **27** |
| QR nativo | URL pública `.../recetas/pisto/` | La misma |

Conexión GATT confirmada a las 10:13:59 (canal de notificaciones activo, `WRITE=true` y `WRITE_NO_RESPONSE=true`). Desconexión a las 10:17:25. **Ambos envíos BLE completaron sin que el log notificara errores**. La fotografía acredita salida física real de al menos una etiqueta, pero **el log por sí solo no certifica dos etiquetas distintas físicamente revisadas**.

### Inspección visual frente al SVG

- **Título «Pisto» e isotipo oficial:** aparecen impresos y reconocibles en la cabecera; el isotipo conserva tamaño apreciable y está a la derecha.
- **Separadores:** banda superior gruesa de ancho completo; segundo separador más fino que termina antes del área nutricional; no se ve la línea adicional errónea de reconstrucciones anteriores.
- **Nutrición:** 164,35 kcal, PR 5,69 g, HC 18,58 g y GR 7,84 g claramente separados de las líneas en la imagen, sin solapamiento visible.
- **Fechas:** «20/09/26» y «20/03/27» en la muestra impresa. **Son valores de prueba proporcionados por la usuaria, no plazos de conservación validados.**
- **Bloque inferior:** cabecera «DESCONGELACIÓN Y CONSUMO», instrucciones y NOTA completas y legibles; tamaño aumentado conforme PR #20. La última línea de nota queda visualmente cerca del borde inferior, pero **no parece cortada**.
- **QR:** la imagen muestra el símbolo completo y dentro de su área blanca; **no hay confirmación de escaneo correcto ni del destino decodificado**. No marcarlo como «escaneado» hasta prueba expresa.

**Conclusión del ensayo:** el transporte BLE/TSPL y la impresión física de esta versión **sí están comprobados** con la evidencia aportada. La revisión visual es favorable. **V0.9 no se clasifica todavía como «aprobada físicamente»**, porque no se ha expresado esa aprobación ni se ha confirmado escaneabilidad del QR. Mantener V0.6.2, V0.7.3 y V0.8 aprobadas sin cambios; no modificar código de V0.9 por observaciones menores sin autorización. La adhesión de etiquetas sobre bolsa PA/PE congelada a −18 °C es una validación aparte, no realizada aquí.

**Alcance documental:** solo esta bitácora del laboratorio; no se modifica el código de impresión, las fechas oficiales de ninguna receta, Canva, Airtable, la web/PWA de MiruRecetas ni los mecanismos de publicación.


## Cierre de aprobación V0.9 — decisión expresa de la usuaria · 31/10/2026

La usuaria confirma **«Esta plantilla de etiqueta 50x30 está validada y aprobada»**, tras dos impresiones realizadas con la CLABEL CT230B y fotografiadas, con dos transmisiones exitosas de **12.352 bytes, 618 fragmentos BLE y 27 bandas raster** (10:14:34–10:15:43 y 10:16:04–10:17:16, hora peninsular). Las imágenes confirman legibilidad, isotipo auténtico, separadores, alineación de kcal y macros, texto de nota completo y QR nativo bien situado.

**Observación de QR aprobada con reserva de mejora:** la usuaria comunica que el QR **sí se lee, pero le cuesta bastante**, a menudo sin conseguir lectura a la primera. Es una observación funcional real, no una hipótesis sobre el dispositivo; su posible causa por alta densidad debida a URL larga está **por comprobar**. No atribuir el problema exclusivamente a la longitud ni afirmar que los QR no se leen. La revisión futura debe probar **enlaces cortos propios** con la misma impresión, posición y geometría aprobada para aislar la variable de datos QR; conservar la URL canónica de la ficha al abrirse en el navegador.

**Con esta aprobación se completan cuatro plantillas distintas:**
- **50×80 vertical:** V0.6.2, receta completa, aprobada.
- **50×80 horizontal:** V0.7.3, receta completa, aprobada.
- **50×30:** V0.9, receta componente, **aprobada con incidencia de lectura QR**.
- **30×20:** V0.8, ingrediente en gramos variables, aprobada.

**Regla de congelación editorial:** no retocar composiciones, logotipos, fuentes, instrucciones genéricas ni motor BLE/TSPL de las cuatro versiones aprobadas sin autorización. La personalización de instrucciones/nota de descongelación se estudiará **solo al trasladar el producto a MiruRecetas**, no durante el cierre de laboratorio. Las etiquetas de receta contienen **una ración por bolsa** sin mostrar peso ni número de raciones; la de ingrediente sí muestra gramaje.

No se han probado adhesión del consumible PA/PE a −18 °C, vida útil alimentaria, alta de bolsa/inventario ni integración PWA. La incidencia QR queda abierta a diseño técnico (alternativas de URL corta), **sin cambios de código** en esta aprobación.
