# MiruRecetas · Panel V1 de impresión · ensayo aislado en laboratorio público

**Estado inicial:** desarrollo de interfaz/ensayo TSPL; **multicopia todavía no validada físicamente**. Las tres plantillas de receta/componente aprobadas (V0.6.2 50×80 vertical, V0.7.3 50×80 horizontal, V0.9 50×30 componente) permanecen disponibles en el índice histórico del laboratorio, sin cambios. La cuarta plantilla, V0.8 30×20 ingrediente, permanece en el histórico y **queda fuera de este motor** hasta que exista «Conserva».

**Página nueva independiente:** `https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/panel-v1/` (GitHub Pages main/root, tras fusión y despliegue).

## Contrato visual

- La página contiene **una réplica de ficha real de Pisto** basada en `MiruRecetas/mirurecetas-web-source/main:datos/recetas/pisto.json`: título, descripción, fotografía pública, 6 raciones base, ingredientes reales y nutrición oficial **por ración**: 164,35 kcal; PR 5,69 g; HC 18,58 g; GR 7,84 g. La ficha no sustituye la pública.
- Botón **«Imprimir etiqueta»** dentro de la ficha; panel flotante con patrón visual real de la **ficha diaria compacta**: móvil `max-width:700px` asciende desde abajo con fondo oscurecido y `max-height:89dvh`, escritorio a la derecha. Permite cerrar por X, Escape o fondo, retiene y devuelve el foco; bloquea desplazamiento de fondo y respeta `safe-area-inset-bottom`.
- Selector de **formato** predeterminado **50×80 vertical**; opciones 50×80 horizontal y 50×30 componente. La plantilla de ingrediente 30×20 no aparece.
- **Fecha de envasado obligatoria**, consumo preferente opcional. En blanco se imprime **`--/--/--`**; no se presume vida útil ni se rellena caducidad automáticamente.
- **Copias entre 1 y 20**, predeterminado 1. No se altera el número de raciones impreso (de hecho las tres etiquetas continúan **sin texto de peso/ración**); el selector de raciones en la ficha modifica solo cantidades de ingredientes de la página, no las kcal/macros de la etiqueta ni las copias.
- El botón «Imprimir» permanece deshabilitado salvo que: las fuentes reales y logo BN estén preparados, exista una fecha de envasado válida, el número de copias sea entero permitido y exista **conexión Web Bluetooth CT230B**.
- QR nativo TSPL de **`https://mirurecetas.github.io/#r001`**, identidad corta futura de Pisto. **El resolvedor #r001 puede no estar disponible hasta que se publique la PR #46 del privado**. No utilizar para otra receta; en esta fase se prueba el tamaño de la matriz, no el destino.
- Bajo la ficha, registro persistente durante la sesión con **«Copiar registro» y «Limpiar registro»**; sin telemetría ni persistencia remota.

## Motor y relación con plantillas físicas

`panel-v1/engine.js` contiene una **extracción experimental** (sin dependencias en el DOM histórico) de los renderizadores y comandos de:
- `label-v06.js` y `label-v062.js` → vertical V0.6.2, raster 12 filas, barras nativas iguales y QR nativo.
- `label-v07.js` → horizontal V0.7.3, líneas raster geométricas, alfa recortada del isotipo BN, mapa 945×590 rotado hacia 590×945 para la impresora.
- `label-v09-component.js` → componente V0.9, raster y 2 líneas geométricas; logotipo recortado y QR nativo reservado.
- `label-v05.js` → conversión bitmap monocromática MSB-first/polaridad aprobada y carga de fuentes BN.

El contenido **de los tres renderizadores se adapta a Pisto** para que la ficha y la vista previa siempre muestren la misma receta; el contrato de posición, patrón, fuentes, campos y canal BLE se preserva. **Esta adaptación de contenido a Pisto en 50×80 no equivale a aprobación física independiente de la variación**. Tampoco significa que se haya integrado ya un motor genérico de cualquier receta.

La vista previa **reserva el espacio del QR nativo**, no simula su matriz pixel a pixel. Solo la impresión puede validar la matriz más sencilla producida por `#r001`.

## Multicopia con UN transporte BLE

La generación original de cada etiqueta termina con `PRINT 1,1\r\n`. El nuevo controlador verifica que el trabajo termina **exactamente** en esa instrucción y sustituye **solo el sufijo final** por `PRINT 1,N\r\n` (1 ≤ N ≤ 20). Se envían **una sola vez** el bitmap, las instrucciones TSPL y el QR. La reproducción de las N copias queda a cargo del **firmware de la impresora**. Conserva `SIZE`, `GAP`, `DIRECTION 0`, `CLS`, módulo/ubicación del QR y 20 bytes/75 ms por fragmento BLE, con confirmación previa y **sin reintentos automáticos**.

**Advertencia:** `PRINT 1,N` es sintaxis TSPL prevista para multicopia, pero el comportamiento real de la CT230B con este firmware **NO ha sido probado aún**. La primera prueba física debe usar **2 copias** con papel correcto, seleccionar una fecha, conectar y comprobar si imprime dos etiquetas completas sin añadir una tercera. Si hay problema de alimentación/papel, parar y enviar registro antes de repetir. El estado final de envío BLE **no certifica** cuántas etiquetas salieron.

## Verificaciones realizadas antes de publicar

- Comprobación sintáctica de `engine.js` y `app.js`, referencias a 27 IDs DOM sin duplicados.
- Mock JS de los tres renderizadores y carga de fuentes/isotipo, con fechas obligatoria/opcional y rechazo de caducidad anterior.
- Construcción de **12 trabajos TSPL simulados**: 3 formatos × 1, 2, 5 y 20 copias, exactamente un comando `PRINT 1,N`, un `QRCODE` que incluye `#r001`, tamaños correctos y límites de 35.000/36.000 bytes; **los mocks no miden el tamaño real de raster** y no sustituyen pruebas en Chrome Android/CT230B.
- La prueba de interfaz visual y el hardware Bluetooth real se comprobarán **tras Pages** con el usuario, antes de promover al repositorio privado.

## Lista de pruebas para Chrome Android

1. Abrir la página independiente por HTTPS. Verificar foto y datos reales de Pisto, botón, ausencia de alteraciones en la antigua página raíz del laboratorio.
2. Abrir/cerrar la hoja varias veces (X, toque en fondo, Escape si se usa teclado), observar el desplazamiento y foco en Android vertical y horizontal.
3. Abrir el panel sin fecha y sin conexión: Imprimir deshabilitado. Seleccionar fecha de envasado; Imprimir sigue deshabilitado hasta conectar la CT230B.
4. Dejar **vacío** Consumo preferente: vista previa muestra `--/--/--`, seleccionar 50×80 vertical, 50×80 horizontal y 50×30; verificar que el texto encaja y no tapa el QR.
5. Cambiar «Cantidad a preparar» de 6 a 8: cambian solo las cantidades de la ficha, **no** la nutrición por ración de etiqueta ni su número de copias.
6. Conectar CT230B desde Chrome Android; comprobar canal GATT y notificaciones sin imprimir automáticamente.
7. Imprimir **una sola copia** de cada formato para validar la integración. Después **dos copias** de un formato, con un único trabajo TSPL.
8. Escanear QR: leer `https://mirurecetas.github.io/#r001` y comparar tamaño/legibilidad con URL larga. No exigir redirección hasta desplegar acortador.
9. Copiar y limpiar el registro; aportar log, foto de 1 etiqueta y foto de 2 etiquetas, indicando formato, fecha opcional en blanco y número de copias.

**No modifica:** repositorios de MiruRecetas privados, la app/PWA pública, el índice QR pendiente, Airtable, las recetas canónicas, inventario, costes, fotografías aprobadas, orquestación Actions ni los mecanismos de publicación.
