# P15 · Horizontal 50×80 · SVG original Canva → Puré de calabaza y calabacín

**Implementación:** `label-p15-horizontal-svg.js` y sección 6D de `index.html`; prueba experimental independiente. No sustituye ni modifica 6C o V0.6.2.

## Referencia exacta de diseño

SVG aportado por la usuaria: `MiruRecetas · Etiqueta 50x80 · v1_20261030_200122_0000.svg`, lienzo Canva de 189×302 (orientación retrato con composición horizontal girada). Se ha inspeccionado y renderizado para tomar **sus posiciones y distribución**, sin publicar el archivo original porque contiene metadatos C2PA y un QR de otra receta. La nueva versión usa composiciones y espacios vacíos equivalentes, **no el renderizador horizontal anterior `p15Landscape`**.

La geometría editorial se define sobre 945×590 puntos, y se gira 90 grados en sentido antihorario para imprimirse en un rollo físico de **50×80 mm** sobre un cabezal de 50 mm. En la cabecera el título crece y se adapta a su zona sin comprimir letras; el isotipo oficial conserva su tamaño grande y posición superior derecha. Nutrientes y QR permanecen en el bloque derecho, fechas e instrucciones a la izquierda. No se imprime ni gramaje ni número de raciones.

### Únicos separadores — nativos de TSPL

Se utilizan **solo** estos comandos nativos `BAR` después del raster, no líneas rasterizadas, siguiendo la geometría del SVG:

- `BAR 109,0,21,945`: separador superior **grueso** y continuo.
- `BAR 251,427,7,518`: separador **más fino, parcial** entre fechas e instrucciones. Ningún separador adicional.

El QR real se genera nativamente mediante `QRCODE 345,58,M,5,A,0,M2,S7,...`. La caja blanca correspondiente queda fuera de las bandas de raster para que no se superponga tinta previa. Es una posición ajustada a la caja QR del SVG original, no una imagen ni el QR antiguo de Cebollas.

## Prueba con la receta oficial «Puré de calabaza y calabacín»

Datos contrastados con `MiruRecetas/mirurecetas-web-source/main:datos/recetas/pure-de-calabaza-y-calabacin.json`:

- Nombre: **Puré de calabaza y calabacín**.
- Nutrición **por una ración** (sin rotular «1 ración»): **215,56 kcal**, proteínas **4,44 g**, hidratos **22,31 g**, grasas **12,92 g**. No recalcular las kcal.
- QR: `https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/`.
- Instrucción de muestra: «Descongelar en nevera · Recalentar removiendo». Descongelación en nevera es recomendación prudencial de trabajo, no afirmación de que la receta tenga congelabilidad validada.
- Nota: «Refrigerar pronto; máximo 48 h en nevera» deriva de las notas oficiales de **refrigeración**. **NO constituye garantía ni plazo de conservación de un alimento congelado**. La ficha no tiene etiqueta `congelable`.

**Todos los campos quedan editables en la interfaz** (nombre, cuatro valores oficiales, fechas, título y cuerpo de instrucciones, título y cuerpo de nota y URL QR) para reutilizar esta geometría con otras recetas. Las fechas no se autocalculan y se exige que consumo preferente no sea anterior al envasado.

## BLE inalterado, comprobaciones y validación pendiente

Se reutilizan exactamente `v62SparseRegion` (bandas raster 1 bpp de hasta 12 filas) y `transmitDiagnostic` (escritura GATT validada, fragmentación 20 bytes y pausa 75 ms); no hay reintentos automáticos ni cambios de UUID. `SIZE 50 mm,80 mm`, `GAP 2 mm,0 mm`, `DIRECTION 0`, `CLS`, **dos BAR**, **un QR TSPL**, **un `PRINT 1,1`**. Límite de trabajo preventivo 35.000 bytes, calculado antes de mostrar permiso de impresión.

**QA realizado:** parseo de JavaScript nuevo y existente, controles presentes, trabajo TSPL simulado con dos `BAR`, un QR canónico, un `PRINT`, tamaño físico correcto, rechazo de URL de QR ajena/insegura y fechas en orden incorrecto. El raster simulado no equivale a impresión física. Sigue pendiente comprobar por Chrome Android el peso exacto del raster, márgenes, longitud del título, QR y salida física real.

**Ámbito:** solo laboratorio CT230B, sin modificar recetas, nutrición canónica, Airtable, web principal, identidad, publicaciones o inventario.