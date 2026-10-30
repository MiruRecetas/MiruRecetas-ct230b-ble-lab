# V0.8 · Ingrediente 30 × 20 · Primera impresión de prueba (30/10/2026)

**Estado vigente al 30/10/2026, 23:29:** **APROBADA FÍSICAMENTE POR LA USUARIA** tras cinco impresiones. Los apartados originales describen el estado PREVIO y se conservan como historial. No cambia el arte de Canva.

## Autoridad de diseño

- Referencia real Canva **DAHZfxOJgfA** («03 · Ingrediente (30 x 20 mm) • MiruRecetas»). Se consultaron elementos editables, contenido y distribución del proyecto sin modificarlo. El diseño de Canva se mantiene como fuente visual de verdad; **el laboratorio es una reconstrucción gráfica dinámica, no una conversión exacta del SVG ni una sincronización de Canva**.
- Contenido aprobado: título de ingrediente en Bricolage Grotesque, barras negras tras el título y las fechas, fechas con etiquetas «Envasado y congelación» y «Consumo preferente», cantidad destacada en gramos, isotipo oficial BN de seis piezas a la derecha, pie «Descongelar en nevera» en Geist cursiva.
- Geometría **354 × 236 puntos (~300 dpi)**, **30 × 20 mm** físicos, lectura horizontal. No hay QR en ingrediente.
- El diseño P15 anterior para ingrediente es una recreación experimental **no autorizada como modelo definitivo**; la V0.8 independiente lo sustituye como candidata a prueba, sin borrar pruebas anteriores.
- Se conserva sin modificar **V0.7.3 de 50×80 horizontal**, aprobada expresamente por la usuaria y documentada en privado: `mirurecetas-arquitectura/docs/CT230B-ETIQUETA-50X80-HORIZONTAL-APROBADA-30X20-INGREDIENTE-2026-10-30.md`.

## Entradas

1. **Nombre** libre de ingrediente (una línea, con tamaño mínimo legible y control de longitud).
2. **Fecha de envasado y congelación** elegida por el usuario; por comodidad el calendario se inicia con la fecha local, sin emitir impresión al cargar.
3. **Fecha de consumo preferente** elegida por el usuario (sin generación automática de plazo; no anterior a fecha envasado).
4. **Cantidad** entera de **1 a 9999 gramos**.

La muestra por defecto para diseño es «Carne Picada», 500 g; fechas seleccionables. No se añaden etiquetas de datos nutricionales ni fechas inferidas.

## Contrato BLE/TSPL conservado

- `SIZE 30 mm,20 mm\r\nGAP 2 mm,0 mm\r\nDIRECTION 0\r\nCLS\r\n` seguido de `BITMAP` dispersos y **una sola** `PRINT 1,1`.
- Se reutiliza exactamente `v62SparseRegion`, regiones de hasta 12 filas, limpieza de blanco y coordenadas absolutas; no se transmite `BAR` nativa ni se modifica el tratamiento aprobado de líneas V0.7.3.
- Cuatro campos con validación, vista previa independiente, selección del rollo correcta, casilla de autorización y confirmación modal; sin impresiones por carga de página ni reintentos.
- Mismo GATT UART de la CT230B, `transmitDiagnostic` de 20 B por fragmento y espera 75 ms; trabajo bloqueado por encima de 35.000 B.
- Dependencias: `label-v05.js` para fuentes/activos, `label-v062.js` para raster disperso, `label-v07.js` para extraer sin márgenes el isotipo oficial. Se cargan en ese orden desde `index.html`.

## Protocolo original de prueba física (histórico, ya superado)

Abrir [laboratorio HTTPS](https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/) en Chrome Android, conectar CT230B y rollo **30 × 20 mm**. Introducir los cuatro campos, inspeccionar la vista previa, marcar la casilla y confirmar **una etiqueta**. Registrar fotografía y log; comprobar líneas negras, composición, marca, textos, recorte, la concordancia con Canva y funcionamiento de fechas. Hasta que la usuaria lo confirme, **no publicar como función validada ni integrarla en la web principal o en Conserva**.

No se modifica Airtable, GitHub Actions de la web principal, datos de recetas, identidad visual aprobada, Canva ni la PWA MiruRecetas.


## Validación física posterior — 30/10/2026, 23:17–23:25 (hora española)

**ESTADO VIGENTE V0.8: PROBADA Y APROBADA FÍSICAMENTE por la usuaria**, según su declaración expresa y registro íntegro facilitado después de fusionar la [PR #17](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/17). Prevalece sobre todas las menciones históricas anteriores a «pendiente de impresión» o «no aprobada» relativas a V0.8.

**Prueba directa:** Chrome Android → GATT UART de CT230B → TSPL sobre rollo **30×20 mm**, sin QR, con diseño Canva DAHZfxOJgfA, tipografías Bricolage Grotesque/Geist, isotipo oficial, dos separadores raster y datos variables. Cinco trabajos **enviados por completo y declarados impresos/aprobados** por la usuaria:

| Hora de envío | Contenido | Bytes | Fragmentos BLE | Bandas raster | Mensaje de finalización |
| --- | --- | ---: | ---: | ---: | --- |
| 23:17:45 | Carne Picada · 500 g | 5.042 | 253 | 17 | 23:18:14 |
| 23:21:04 | Bonito del norte · 150 g | 5.109 | 256 | 17 | 23:21:33 |
| 23:21:44 | Bonito del norte · 150 g | 5.109 | 256 | 17 | 23:22:14 |
| 23:24:03 | Bacalao · 300 g | 4.843 | 243 | 17 | 23:24:32 |
| 23:24:40 | Bacalao · 300 g | 4.843 | 243 | 17 | 23:25:08 |

En los cinco trabajos, el laboratorio registró «Datos ... enviados» sin error de transporte; el resultado físico **lo confirma expresamente la usuaria**, no el propio mensaje BLE. Los cambios de nombre y cantidad muestran que V0.8 funciona con varios ingredientes. El registro indica **20 B/fragmento, 75 ms de pausa, 17 bandas raster, sin QR**; no se ha modificado el motor BLE.

**Controles de entrada:** se observaron tres mensajes de rechazo de datos **sin orden de impresión**: nombre inválido a las **23:18:38** y cantidad inválida a las **23:18:46** y **23:23:53**. Corresponden a validaciones de entrada, **no a fallos de impresión ni desconexiones BLE**.

**Cierre del ensayo:** a las 23:26:51 se copió el registro, y a las 23:29:42 se desconectó la impresora. No se ha adjuntado aquí una fotografía de cada etiqueta; por tanto, no atribuir métricas no observadas de contraste, durabilidad, posición exacta o fidelidad píxel a píxel. La aprobación declarada es la de funcionalidad/diseño físico en las pruebas realizadas. Se mantiene fuera de alcance la prueba de adhesión sobre bolsas PA/PE a −18 °C, la acreditación de plazos de conservación, la PWA principal y la persistencia de inventario. **Imprimir no equivale a registrar bolsa/lote.**

**Inmovilización editorial:** no alterar la V0.8 de ingredientes aprobada, ni la V0.7.3 horizontal 50×80 ya aprobada, sin autorización expresa. Cualquier otra receta, materiales o variación necesitará las comprobaciones correspondientes. Esta actualización es exclusivamente documental.
