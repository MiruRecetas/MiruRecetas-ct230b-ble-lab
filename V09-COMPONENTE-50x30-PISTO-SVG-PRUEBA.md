# V0.9 · Componente cocinado 50 × 30 · Pisto — prueba SVG Canva

**Estado:** implementada en el laboratorio, pendiente de impresión y aprobación física de la usuaria. **No sustituye ni modifica** las versiones V0.6.2 vertical, V0.7.3 horizontal y V0.8 ingrediente aprobadas.

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