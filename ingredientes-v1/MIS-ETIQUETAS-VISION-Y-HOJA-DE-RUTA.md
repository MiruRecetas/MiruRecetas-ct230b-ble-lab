# MiruRecetas · «Mis etiquetas» · visión, decisiones y hoja de ruta

## Banco · incorporación de pollo y pavo (08/11/2026, vigente)

**Decisión de la usuaria:** incorporar seis variantes de carne de ave
cruda y a granel, basadas en cinco entradas del FoodKeeper ES original
(`Product.ID 113, 117, 118, 115 y 120`):

| ID MiruRecetas | Subcategoría | Nombre visible | Presentación | Fuente original | Refrigeración | Congelación |
|---|---|---|---|---|---:|---:|
| `CAR-POL-001` | Pollo | Pollo | Pieza entera | 113 | 2 días | 360 días |
| `CAR-POL-002` | Pollo | Pechuga de pollo | Pieza entera | 117 | 2 días | 270 días |
| `CAR-POL-003` | Pollo | Pechuga de pollo | Filetes | 117 (derivado) | 2 días | 270 días |
| `CAR-POL-004` | Pollo | Muslo de pollo | Pieza entera | 118 | 2 días | 270 días |
| `CAR-POL-005` | Pollo | Carne picada de pollo | Picada | 115 | 2 días | 90 días |
| `CAR-PAV-001` | Pavo | Pechuga de pavo | Pieza entera | 120 | 2 días | 270 días |

**Contraste:** los cinco registros conservan `Category.ID=15`.
FoodKeeper declara **1–2 días** de refrigeración y **12 meses**
de congelación para pollo entero, **9 meses** para piezas y
**3–4 meses** para carne picada de pollo o pavo. El criterio
MiruRecetas toma el máximo refrigerado y el mínimo congelado;
mes = 30 días. Los mismos rangos figuran en
[FoodSafety.gov, Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts)
y en [USDA FSIS, congelación del pollo](https://ask.fsis.usda.gov/article/How-long-can-you-freeze-chicken).
Los meses congelados son referencias de **calidad**, no garantía
de inocuidad.

**Dos pechugas de pollo sin duplicación de identidad:** la usuaria
ha solicitado **dos fichas independientes con el mismo nombre**
pero con `presentacion` distinta. El ID **117** describe la
media pechuga deshuesada; no existe en el original una ficha aparte
de filetes de pechuga. Por eso `CAR-POL-002` conserva
`fuente: "FoodKeeper"`, `id_fuente: "117"` y
`CAR-POL-003` se registra con `fuente: "agregación"` e
`id_fuente: null`, aplicando los intervalos oficiales a
filetes crudos obtenidos de la pechuga. La trazabilidad de
FoodKeeper 117 queda expresamente en este documento y sin
duplicar el `id_fuente` de dos fichas. El panel ya identifica
la presentación junto al nombre; **no se modifica** su lógica,
diseño ni la plantilla de impresión.

**Muslo:** FoodKeeper 118 comprende muslos y contramuslos, pero
solo se incluye **«Muslo de pollo»**, tal como se aprobó;
«contramuslo» no se añade como alias ni se registra otra ficha.

**Modalidades:** únicamente refrigeración y congelación.
No se ofrece despensa ni conserva casera para carne de ave cruda.
`false` implica tiempo/tip `null`; las modalidades disponibles
llevan `tips_refrigeracion: ""` y `tips_descongelacion: ""`,
para usar los presets editoriales editables ya existentes
«Conservar en nevera» y «Descongelar en nevera»; no atribuir
estos textos al archivo original. `tips_preparacion_conservacion: null`.
Conservar en nevera a ≤4 °C, congelar a ≤−18 °C, sin
prolongar el plazo por envasado al vacío ni por reenvasar.
Fecha base compra/preparación en el flujo aprobado.

**Estado del banco:** **23 fichas**: 5 Vacuno, 2 Ovino,
5 Porcino, 5 Pollo, 1 Pavo y 5 de otras familias.
No se han incorporado las variantes de ave no seleccionadas.
**Publicación de datos acordada:** commit directo a `main`,
validación ligera de JSON, identidad/taxonomía, fuente y plazos,
GitHub Pages automático; sin PR ni nuevas pruebas integrales.
No se modifica la web de producción, HTML/CSS, banco-ui.js,
plantillas, motor de impresión, TSPL, BLE, PWA o Airtable.

## Normalización editorial vigente · lechazo y cerdo (08/11/2026)

**Procedimiento acordado para el laboratorio público:** las incorporaciones
y correcciones exclusivamente de datos se integran mediante **commit directo
a `main`**, validación ligera de catálogo y documentación, sin PR por lote.
Pages se despliega automáticamente; no ejecutar una auditoría completa
de interfaz o impresión para simples cambios de nombre.

**Ovino.** `CAR-OVI-001` se llama **Paletilla de lechazo**
(`presentacion: "Pieza entera"`) y `CAR-OVI-002` **Chuletillas
de lechazo** (`presentacion: null`). Mantienen los ID FoodKeeper
**48** y **51** y plazos **5 días refrigerados / 120 congelados**.
La fuente describe *cordero/lamb* genérico, no certifica la condición de
*lechazo* (cordero lechal) ni su origen geográfico/IGP: el nombre
se refiere solamente a carne que efectivamente sea de lechazo.
El FoodKeeper 48 comprende paletilla y media pierna, pero la ficha
editorial queda restringida a paletilla; no se mantiene media pierna
como sinónimo de paletilla. Referencia para el significado del término:
[pliego Lechazo de Castilla y León](https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32018D1130%2801%29).

**Porcino.** `CAR-POR-001`: **Lomo de cerdo**, `null`,
comprende la pieza entera y filetes frescos, adobados domésticamente
o sin adobar; `CAR-POR-002`: **Solomillo de cerdo**, `null`;
`CAR-POR-003`: **Costillas de cerdo**, `null`;
`CAR-POR-004`: **Carne picada de cerdo**, `"Picada"`;
`CAR-POR-005`: **Cerdo para guisar**, `"Dados"`.
Se preservan los tiempos previos y los identificadores: 5/120
para lomo/solomillo/costillas; 2/90 para picada/dados.

**Filetes de lomo sin duplicación:** el FoodKeeper 61 (lomo sin hueso
en pieza) y los registros 63/64 (chuletas de lomo, con/sin hueso)
presentan **3–5 días refrigerados** y **4–12 meses congelados**.
También lo confirma la [tabla oficial FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts):
asados y filetes/chuletas frescos de cerdo comparten rango.
Por eso **una sola ficha Lomo de cerdo con `presentacion: null`**
mantiene los plazos editoriales **5/120** de la pieza entera y
añade sinónimos de filetes. No se crea una ficha nueva ni se
modifica su `id_fuente: "61"`.

**Adobo:** según [USDA FSIS](https://ask.fsis.usda.gov/article/Cu%C3%A1nto-tiempo-se-pueden-marinar-carnes-y-aves),
se marina siempre en nevera y un marinado prolongado puede deteriorar
la textura, aunque no equivale por sí mismo a un proceso de conservación.
El adobo casero **no prolonga ni reinicia** los plazos desde la
compra/preparación. **Adobados comerciales o marinadas con otros
ingredientes/condiciones**: respetar siempre las instrucciones y
fecha del fabricante o cualquier límite más restrictivo; no asumir
automáticamente los 5/120 de la carne fresca del banco.
Los periodos de congelación son orientativos de calidad a −18 °C.

**Cerdo para guisar:** la denominación es editorial; el FoodKeeper
original **75** describe específicamente *lomo en cubos*. La ficha
sigue referida a **dados de carne de cerdo cruda**, con el plazo
prudente previamente contrastado **2 días / 90 días**, fuente global
`"agregación"` e `id_fuente: null`; no extrapolar a mezclas ya
adobadas, elaboradas o comerciales.

**Invariantes:** siete ID internos, estados, fuentes, plazos y
modalidades del banco intactos. Sin modificar HTML, CSS,
`banco-ui.js`, etiquetas, TSPL, motor BLE, PWA ni producción.
Los nombres históricos permanecen documentados en secciones
anteriores y los sinónimos permiten búsquedas compatibles.

## Ampliación del banco · Ovino y Porcino seleccionados (08/11/2026, histórico)

La usuaria eligió ocho entradas del FoodKeeper ES original:
**cordero 48 y 51; cerdo 61, 67, 69, 72, 73 y 75**.
Son ingredientes **crudos, comprados a granel**. Se crean solo **7
fichas** de MiruRecetas, al unificar `Product.ID 67`
(solomillo de cerdo entero) y `69` (medallones de ese mismo
solomillo) en la única ficha `CAR-POR-002` con
`presentacion: null`, búsqueda por ambos nombres, una
fuente global FoodKeeper y `id_fuente: "67"`. El ID **69**
queda trazado explícitamente en
[`banco/README.md`](banco/README.md), sin introducir
nuevos campos en el esquema.

**Nuevos ID y nombres:** `CAR-OVI-001`
Paletilla o media pierna de cordero para asar;
`CAR-OVI-002` Chuletas de cordero;
`CAR-POR-001` Lomo de cerdo sin hueso;
`CAR-POR-002` Solomillo de cerdo;
`CAR-POR-003` Costillas de cerdo;
`CAR-POR-004` Carne picada de cerdo;
`CAR-POR-005` Lomo de cerdo en dados.

**Métodos y plazos:** para todos, únicamente refrigeración
y congelación (`true`); **despensa y conserva casera
no se ofrecen** (`false`, días/tips `null`).
Se usan **5 días / 120 días** para los cortes enteros,
chuletas, costillas, solomillo y sus medallones: FoodKeeper
`3–5 días` / `4–12 meses`, con conversión canónica
de 30 días por mes. Carne picada de cerdo `73`:
FoodKeeper `1–2 días` / `3–4 meses` → **2/90**.
**Lomo de cerdo crudo en dados `75`:** FoodKeeper
le atribuye `3–5 días` / `4–12 meses`,
pero la tabla general específica de **carnes crudas troceadas
para guisar** recomienda `1–2 días` / `3–4 meses`;
se adoptan **2/90** para esta presentación, igual que
para la ternera en dados. Se registra origen global
`agregación`, `id_fuente: null`; la discrepancia y el
ID 75 quedan documentados, sin reescribir el original.

Los seis registros restantes usan `fuente: FoodKeeper` y
su ID original; el solomillo unificado mantiene el ID 67
y el 69 queda documentado. El estado de recomendación
`verificado` no es una certificación de inocuidad.
No hay notas FoodKeeper individuales; las cadenas vacías
de tips permiten que la interfaz use sus presets editoriales
editables «Conservar en nevera» y «Descongelar en nevera».
La fecha base sigue siendo compra/preparación y el vacío
doméstico no prolonga plazos; congelación a −18 °C
sostiene calidad, y refrigeración requiere ≤4 °C.

**Estado:** banco actualizado de **10 a 17 fichas**
(5 Vacuno, 2 Ovino, 5 Porcino y 5 de otras familias).
**Alcance:** exclusivamente
`ingredientes-v1/banco/catalogo.json`, pruebas y
documentación. Permanecen intactos el diseño,
`banco-ui.js`, HTML, CSS, plantillas de impresión,
motor compartido, raster, TSPL, BLE, web de producción,
PWA, Airtable y demás repositorios.
Referencia técnica y de fuentes:
[`banco/README.md`](banco/README.md).

## Banco · normalización de nombres y presentaciones de ternera (08/11/2026)

**Decisión expresa posterior a la PR #73:** en las cuatro fichas
`CAR-VAC-002…005`, los nombres visibles pasan a **Redondo de ternera,
Solomillo de ternera, Filetes de ternera y Ternera para guisar**.
Las presentaciones son respectivamente `"Pieza entera"`, `null`,
`"Filetes"` y `"Dados"`. No añadir diferenciación artificial de
«entero» cuando el solomillo también se compra en **medallones crudos
de 3–4 cm**: FoodSafety.gov confirma iguales intervalos para
`steaks` y `roasts` frescos tanto de `beef` como de `veal`;
se aplican los mismos **5 días refrigerados / 120 días congelados**
ya registrados para el solomillo. Los 2/90 días de dados para guisar
siguen siendo distintos. Tampoco cambia la carne picada.

**Trazabilidad:** se conservan los IDs FoodKeeper 36/37/40/41 y sus
valores; el original clasifica esos cuatro como `Carne de Res (beef)`
y otros productos como `Ternera (veal)`. «Ternera» es una adaptación
editorial española solicitada y **no una reasignación de las categorías
del original ni una certificación de la edad del animal**. Las
denominaciones anteriores pasan a sinónimos de búsqueda. El
[expediente en el README del banco](banco/README.md) detalla la
comparación oficial de plazos, límite de interpretación y las
presentaciones aprobadas.

**Alcance:** solo editar `nombre`, `presentacion` y
`sinonimos` en las cuatro fichas, junto a documentación y pruebas.
Preservar exactamente los cuatro métodos, los plazos, las fuentes
globales, los IDs estables, el diseño, la UI y el BLE.

## Banco de ingredientes · ampliación inicial de vacuno (08/11/2026)

La usuaria confirmó cuatro entradas del archivo FoodKeeper ES original:
`Product.ID 36` (Asado redondo), `37` (Lomillo entero), `40`
(Filetes) y `41` (Carne para guisar), todas de **carne de res cruda
y fresca**, no elaboraciones cocinadas. Se incorporan exclusivamente a
`ingredientes-v1/banco/catalogo.json`, en **Carnes y Aves → Vacuno**,
con IDs `CAR-VAC-002` a `CAR-VAC-005`. Nombres visibles españoles:
Redondo de vacuno, Solomillo de vacuno entero, Filetes de vacuno y
Carne de vacuno para guisar; las denominaciones elegidas de FoodKeeper
se conservan como sinónimos para la búsqueda.

**Revisión de conservación:** los cuatro registros originales del
FoodKeeper ES v128 dan refrigeración `3–5 días` y congelación
`4–12 meses` (campos `DOP_*`). **Para Redondo, Solomillo entero
y Filetes** se usan `5 días` refrigerados y `120 días` congelados,
aplicando la regla de máximo refrigerado, mínimo congelado y
mes = 30 días. **Para Carne de vacuno para guisar cruda, cortada en
dados**, una segunda comprobación reveló discrepancia con la
recomendación específica de carne para guisar: las tablas de
[Universidad de Nebraska](https://food.unl.edu/free-resource/food-storage/)
y [NSF](https://www.nsf.org/consumer-resources/articles/cold-frozen-food-storage)
señalan `1–2 días` y `3–4 meses`. Para no extender indebidamente
el plazo de carne troceada, la ficha se fija en `2 días` refrigerados
y `90 días` congelados, documentando sin sobrescribir el origen
FoodKeeper ID `41`.

En las cuatro fichas **Despensa y Conserva doméstica no se ofrecen**
(`false`, días/tips `null`); eso no equivale a una prohibición
de cualquier proceso profesional validado. Estado global
`verificado` por modalidades editoriales cerradas, no certificación
sanitaria. `fuente: "FoodKeeper"` e ID original para los tres
primeros; `fuente: "agregación"` e `id_fuente: null` para guisar,
con trazabilidad de FoodKeeper 41 y fuentes adicionales en el
[expediente del banco](banco/README.md). Los cuatro FoodKeeper no
traen consejos particulares: `tips_refrigeracion` y
`tips_descongelacion` son cadenas vacías y el panel existente
utiliza sus notas editoriales editables «Conservar en nevera» y
«Descongelar en nevera». `tips_preparacion_conservacion` es `null`.

Las fechas se cuentan desde la compra o preparación, coincidente con
la fecha de envasado del flujo doméstico aprobado, **sin prolongarlas
por el uso de bolsas al vacío ni por un reenvasado posterior**.
Los tiempos de congelación son referencias de calidad bajo frío
continuado, no garantías de inocuidad. Original FoodKeeper intacto.

**Alcance estricto:** añadir cuatro registros y pruebas de
búsqueda/filtrado, notas y fechas; no tocar las tres plantillas,
la vista previa, CSS, HTML, interfaz del panel del banco,
`banco-ui.js`, `motor-libre.js`, raster, BLE, PWA, web
productiva, Airtable ni inventario. El conjunto pasa de **6 a
10 fichas**, cinco de ellas en la subcategoría Vacuno.
Las futuras incorporaciones seguirán por subcategoría con
selección explícita de la usuaria. Ver
[banco/README.md](banco/README.md) para la trazabilidad de
los datos originales.

## Cierre visual del panel del banco · 08/11/2026

Tras la aprobación funcional del banco de ingredientes, la usuaria solicita
solo dos ajustes visuales: **barra gris corta centrada en la parte superior**
y **botón de cierre exclusivamente «×» circular en la esquina derecha**,
sin el antiguo botón rectangular verde «Cerrar». El fondo del panel debe
coincidir exactamente con el panel oficial **«Preparar etiqueta»**.

**Referencia canónica contrastada en** `MiruRecetas/mirurecetas-web-source/main`:
`assets/estilo.css` define `--paper: #fffcf7`; el panel oficial
`assets/etiquetas.css` utiliza `background: var(--paper)`,
`.p1-mobile-handle` (46 × 5 px, fondo `#c1c9bf`, bordes redondeados)
y `.p1-close` (44 × 44 px, borde circular, blanco, color `#29352e`,
borde `#e4dfd5`, fuente 1.6rem). Su HTML canónico está en
`plantillas/etiquetas-panel.html`.

**Implementación exclusiva en el laboratorio:** `.bank-sheet` usa
`background: #fffcf7` (sin alterar la variable de papel del resto
de la página); se incorpora `.bank-mobile-handle` solo en móvil y se
convierte `#bank-close` a botón circular con el carácter «×» y su
`aria-label` existente. Se reserva espacio superior para que la
barra no tape el encabezado. **Sin cambios** en filtros, categorías,
búsqueda, selección, botón «Aplicar a etiqueta», fechas, notas,
borradores, datos JSON, etiquetas, motor, TSPL o BLE. El evento de
cierre existente permanece intacto. El CSS lleva versión nueva para
evitar caché de Chrome Android.

La validación visual real en Chrome Android sigue siendo posterior al
despliegue; el resto del banco está aprobado funcionalmente. Tras la
validación de este último ajuste, **siguiente fase: poblar el banco
de ingredientes** con fichas verificadas según las reglas vigentes,
no ampliar funciones de esta pantalla.

## Corrección del centrado horizontal de la nota · Pequeña 30 × 20 (08/11/2026)

Tras validar la cantidad en la PR #70, la usuaria detecta el mismo
problema de alineación en las notas: `M.fit` forzaba la alineación
izquierda y las dibujaba desde `x=60` hacia el isotipo.

**Decisión expresa:** la nota **mantiene exactamente su altura y línea
base anteriores, `y=227`**; no desplazarla arriba ni abajo.
Se centra únicamente en el eje horizontal, **en el mismo espacio que
los gramos**: centro `x=128`, ancho máximo `240` puntos
(zona `x=8…248`), `align="center"` explícito y separación mínima
de `20` puntos antes del isotipo (comienza en `x=268`).
Se conserva el tamaño inicial de fuente Geist itálica `16 px` y
el mínimo `12 px`, el texto editable de hasta 32 caracteres y
la posibilidad de ocultar la nota. El isotipo no se mueve.

No modificar otras coordenadas, márgenes, la cantidad ya corregida,
las fechas, las etiquetas Compacta/Amplia, el motor común,
el raster TSPL ni Bluetooth. Invalidar caché del script de la
plantilla para Chrome Android. Añadir pruebas para nota corta, texto
largo (hasta 32 caracteres) y nota oculta, comprobando además que
**la posición vertical sigue siendo exactamente `227`**.
La verificación real en Android y la prueba física son
independientes de las simulaciones.

## Corrección de cantidad frente al isotipo · 08/11/2026

La usuaria confirma después del despliegue de la PR #69 que «500 g» sigue
solapándose con el isotipo en **Pequeña 30 × 20**. La causa queda localizada:
`motor-libre.js::fit` establece `textAlign="left"` si no recibe una
alineación explícita; la plantilla histórica preparaba
`c.textAlign="center"` pero la llamada a `fit` lo anulaba.

**Corrección mínima autorizada por incidencia:** la única línea de cantidad
pasa a `align: "center"` con el centro original `x=128`; su ancho máximo
se ajusta a 240 puntos. Por tanto su zona está siempre en `x=8…248` y
el isotipo empieza en `x=268`: **mínimo 20 puntos de separación**
independientemente del texto o de la tipografía real, dado que `fit`
mide con Canvas y adapta el tamaño de 55 a mínimo 32 px si hace falta.
No cambiar coordenadas, tamaños predeterminados, isotipo, fechas, notas,
motor común, raster, TSPL ni Bluetooth. Los pesos se mantienen
opcionales y entre 1 y 9999 g; cuando no se indica peso no se dibuja.
Se versiona la referencia del JS para evitar caché en Chrome Android.

**Verificación:** regresión automatizable con tamaños 1 g, 500 g y
9999 g y límite geométrico del texto; comprobar después en Pages el
raster real en Chrome Android y finalmente en CT230B cuando se retomen
las impresiones físicas acordadas. Una PR fusionada o un despliegue
Pages exitoso **no equivalen** a validación visual ni física.

## Corrección del banco y preservación del diseño (08/11/2026)

Tras la revisión visual de la usuaria, se corrige la PR #68 **solo en el
laboratorio**. Se restaura **byte a byte** `plantilla-pequena.js` de antes de
#68: ninguna coordenada, tipografía, raster, geometría ni BLE de la etiqueta
aprobada cambia. Los modos nuevos Despensa/Conserva se interpretan en el
controlador como el rótulo gráfico histórico «Conservación», sin tocar la
plantilla. Refrigeración y Congelación mantienen sus rótulos anteriores.

**Banco ≠ ingrediente libre.** Al seleccionar una ficha del banco, el selector
ofrece únicamente las conservaciones respaldadas para esa presentación;
«Otro tipo» y las modalidades no aplicables desaparecen. El modo
**Ingrediente libre** recupera todas las opciones originales, el borrador
manual y la edición completa. El banco no restringe las etiquetas libres.

- Carne picada de ternera cruda: **Refrigeración (2 días)** y **Congelación
  (90 días)**. No se ofrece Despensa ni Conserva doméstica para esta ficha.
- Lechuga iceberg o romana fresca: **solo Refrigeración (14 días)**.
  Congelación no recomendada por FoodKeeper; Despensa y Conserva doméstica
  excluidas de esta ficha.
- Patata entera: Refrigeración (14 días) y Despensa (**sin plazo elegido**).
  La congelación citada por FoodKeeper corresponde a patata cocida y machacada,
  no a la ficha de patata entera. Conserva doméstica no ofrecida.
- Orejones: solo Despensa (180 días) en la presentación del banco.
- Pulpo y salsa de tomate: se preservan como borradores `sin_datos` en
  el JSON, **no aparecen como fichas seleccionables** hasta disponer de
  una conservación aplicable y suficientemente definida. En modo libre pueden
  etiquetarse manualmente.

En estas fichas, `true` **significa modalidad ofrecida en el banco** y
`false` **no ofrecida para este ingrediente/presentación**, no una prohibición
universal de cualquier proceso industrial o doméstico especializado. Un
`null` de días nunca genera fecha. El estado global `verificado` de carne
y lechuga refleja un conjunto cerrado editorialmente de modos de esta ficha,
**no una certificación de seguridad**; `fuente: "agregación"` y
`id_fuente: null` distinguen los plazos originales de FoodKeeper
(**Product.ID 59 y 290**) de las exclusiones solicitadas por la usuaria.
La ficha de patata sigue parcial porque su intervalo de despensa no tiene
criterio de selección aprobado. Fuente original preservada.

**Notas**: si FoodKeeper no trae un consejo específico, se recuperan los
textos predeterminados de MiruRecetas: «Conservar en nevera»,
«Descongelar en nevera» o «Guardar en lugar fresco y seco» según el modo.
Son **textos editoriales**, no citas de FoodKeeper. Si existe un consejo
específico adecuado, prevalece (p. ej. patata refrigerada puede oscurecerse
al cocinar). La nota sigue editable y puede ocultarse voluntariamente.

Se elimina del panel el bloque «Fuente · ID · Consultar fuente» y el vínculo
directo al JSON original (no aprobado y no legible para uso doméstico).
La trazabilidad permanece en catálogo/documentación interna. Se separa el
ingrediente **seleccionado en el panel** del último **aplicado al formulario**;
explorar no cambia fechas, notas ni conservaciones aplicadas. Las fechas
introducidas manualmente tienen prioridad y el cálculo sugerido conserva su
restablecimiento explícito.

**Pendiente:** revisión visual real de esta corrección y prueba física final
de los formatos libres. No se edita producción, PWA, catálogo nutricional,
Airtable, impresora histórica ni inventario; este cambio no acredita
ninguna impresión física.

**Consolidación de decisiones de producto: 06/11/2026 (Europe/Madrid).**
**Ámbito:** laboratorio público `MiruRecetas/MiruRecetas-ct230b-ble-lab`, página [Mis etiquetas](https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/ingredientes-v1/). **No es integración productiva ni autorización para alterar el recetario, Airtable o la PWA.**

## 0. Convenciones de estado y precedencia
- **APROBADO (producto/diseño):** decisión expresa de la usuaria. El diseño del selector de formatos (PR #40) está **aprobado expresamente el 06/11/2026**.
- **IMPLEMENTADO EN LABORATORIO:** existe código en el laboratorio y, cuando proceda, publicado con GitHub Pages. No implica validación física de cada variante ni publicación en producción.
- **REFERENCIA FÍSICA APROBADA:** composición histórica contrastada con CT230B, que no debe sobrescribirse para construir variantes libres.
- **PROPUESTA / FUTURO:** concepto discutido, sin aprobación de su detalle técnico ni autorización de desarrollo o despliegue.
- Precedencia: nueva instrucción expresa de la usuaria > código y ensayos actuales > este documento > antecedentes históricos. Antes de cada actuación verificar `main` y los protocolos de los repositorios afectados.
- Conservar la separación: **laboratorio público** para desarrollar/verificar la herramienta; **web productiva privada** `mirurecetas-web-source` sin modificación ni migración sin autorización explícita. Publicar laboratorio con ramas/PR y Pages; no realizar escritura directa en `main` ni usar el laboratorio como publicador de producción.

## 1. Propósito y ubicación futura — APROBADO COMO VISIÓN
«Mis etiquetas» será una **herramienta universal de creación, personalización e impresión de etiquetas de conservación doméstica**, independientes del recetario. El usuario puede escribir nombre, fechas, notas y —en formatos que lo contemplen— kcal y macros aunque su receta o ingrediente **no exista** en MiruRecetas. No obliga a crear registros en Airtable ni a publicar recetas.

Navegación futura aprobada conceptualmente: menú **Conserva → Listas de la compra → Mis etiquetas → Mis reservas (Próximamente)**. La ubicación en la web oficial es una decisión de producto, **no una integración ya ejecutada**. Mantener la cabecera oficial de interiores (no la variante Hero) y no insertar enlaces de laboratorio en la web de producción.

**Límite arquitectónico fundamental:** «Mis etiquetas» *imprime*, **no registra inventario**. «Mis reservas», ya contemplado por la arquitectura futura, será el inventario privado real de ingredientes, componentes, lotes, raciones, ubicaciones, reservas y consumos. Imprimir o reimprimir no equivale a dar de alta stock; una futura operación «Registrar en Mis reservas» será voluntaria y posterior a P10. La autenticación y persistencia de los datos personales requieren **base remota durable por usuario, autorización/aislamiento, sincronización, copias y restauración**, no almacenamiento local como única fuente. Proveedor no seleccionado (Supabase/Firebase/Appwrite/Cloudflare estudiados, no aprobados). Historial y favoritos sincronizados dependerán de ese sistema; cualquier caché local será auxiliar, nunca inventario canónico.

## 2. Modelos y alcance — APROBADO
«Mis etiquetas» tendrá inicialmente **tres formatos libres sin QR ni anillo**:
1. **Amplia — 50 × 80 mm, horizontal.** Derivada de la composición horizontal aprobada de recetas **V0.7.3**. Campos libres configurables, especialmente nombre, kcal, proteínas, hidratos, grasas, fechas, instrucciones y notas. No incorporar la variante 50 × 80 vertical con anillo a este generador.
2. **Compacta — 50 × 30 mm.** Derivada de la composición aprobada de componentes **V0.9**, con campos de receta/componente libres y control de visibilidad. Sin QR.
3. **Pequeña — 30 × 20 mm.** Derivada de la etiqueta de ingrediente **V0.8**. Nombre, cantidad opcional en **gramos enteros solo aquí**, fechas y nota editable. Sin macros ni QR.

**Gramos exclusivamente en la Pequeña**: no añadir campo de gramos a 50 × 30 ni 50 × 80. Los nombres «receta», «componente» e «ingrediente» son **internos**; en el selector público se usan solamente **Amplia / Compacta / Pequeña** con las dimensiones.

**Principio de composición aprobado:** no crear tres motores independientes ni un editor libre de arrastrar elementos. Evolucionar hacia **un motor común** de validación, ajuste tipográfico progresivo, raster, TSPL y BLE, con plantillas/bloques de geometría propia que **respeten las reglas originales de composición y límites de caracteres/anchura**. Se muestran/ocultan bloques permitidos sin redistribuciones arbitrarias ni etiquetas visualmente falsas. Un formato parcialmente vacío puede imprimirse; no rellenar con números falsos ni forzar bloques. Las líneas/separadores dependientes de secciones requieren verificar el diseño de cada variante.

**Fechas para todos los modelos libres (regla aprobada):**
- Primera fecha (envasado/congelación/conservación según formato): **obligatoria, siempre visible**, fecha actual precargada editable.
- **Consumo preferente siempre visible**, pero **valor opcional**; ausencia `--/--/--`. Si se indica, debe respetar la validación de calendario y no ser anterior a la primera fecha.
- Ni la ausencia de macros ni la ausencia de un plazo permite inventar una fecha. Una recomendación de conservación **no se aplica sin confirmación** del usuario.
- Los campos libres/manuales no se presentan como valores nutricionales oficiales de MiruRecetas. No representar `null` como cero, no hacer anillos a partir de macros incompletos.

## 3. Selector de formatos — DISEÑO EXPRESAMENTE APROBADO
**Estado: APROBADO, LAB PUBLICADO.** Última corrección visual: PR [#40](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/40), commit de fusión `30da6446b368f2a64c2c95411fb45087a8029ab1`.

- Una **tarjeta fija y no desplegable** reúne el selector aprobado de **cuatro opciones en una sola fila** y, justo debajo, el lienzo de **vista previa real** del formato activo. Conserva el selector 4×1 y sus iconos, sin matriz 2×2 ni textos adicionales en la vista previa. El título es exclusivamente **«Elige un formato»** y el subtítulo **«Selecciona el diseño que quieres imprimir»**.
- Las tres primeras son **radios de selección única**, no enlaces. La cuarta es futura, no seleccionable.
- SVGs modulares, sencillos, verde/salvia, sin miniaturas fotográficas; mantener **exactamente los iconos actuales aprobados**:
  - **Amplia, 50 × 80 mm:** composición horizontal de barra superior y bloques inferiores; **sin fondo de icono**.
  - **Compacta, 50 × 30 mm:** barra horizontal superior y dos bloques simétricos debajo.
  - **Pequeña, 30 × 20 mm:** bloque vertical principal y dos bloques pequeños apilados; **no modificar el icono aprobado**.
  - **Más formatos, Próximamente:** icono de formatos superpuestos y signo +, tarjeta de borde discontinuo no seleccionable.
- **No mostrar** «receta horizontal», «componente», «ingrediente», «Disponible», «En desarrollo», chips de estado ni una banda «formato seleccionado». La disponibilidad se comunica visualmente, y solo «Más formatos» muestra «Próximamente».
- Mantener la selección con **borde verde y fondo salvia**, sin necesidad de check circular; no introducir fondos diferentes detrás de SVG individuales.
- **Nueva disposición aprobada 08/11/2026:** el selector/vista previa es una tarjeta fija, sin número de paso, y solo quedan **dos pasos desplegables**: **1. Datos de la etiqueta** y **2. Imprime tu etiqueta**. Se excluyen mutuamente: abrir uno cierra el otro; inicio con Datos abierto e Impresión cerrado. El formulario sigue cambiando según Pequeña, Compacta o Amplia, con motores y raster comunes ya implementados y con impresión BLE de los tres formatos disponible en laboratorio, sin certificación física de sus variantes libres.
- Durante un trabajo BLE se bloquean los radios a nivel DOM y se impide cambiar de formato efectivo. Los cambios de panel no envían comandos ni implican registro de existencias.
- El diseño actual de los formatos libres Compacta y Amplia está aprobado visualmente en sus PR específicas; esta nueva disposición de página **no cambia ni los lienzos ni las fuentes oficiales**. Los ensayos físicos y la multicopia quedan para la fase final acordada.

## 4. Pequeña 30 × 20: estado actual — IMPLEMENTADO EN LAB
Código: `ingredientes-v1/motor-libre.js`, `plantilla-pequena.js`, `app.js`, `index.html`, `style.css`; protocolos y pruebas `ingredientes-v1/README.md`, `tests/ingredientes-v1.test.cjs` y `tests/motor-libre.test.cjs`. La plantilla libre replica la geometría V0.8 de 354 × 236 puntos; la referencia histórica `label-v08-ingredient.js` no debe editarse.

**Campos/validación actual:**
- Nombre manual ajustado progresivamente a anchura, entrada máxima actual 55 caracteres pero el motor rechaza nombres que no caben; gramos **opcionales**, 1–9999 enteros cuando se introducen.
- Modo de conservación:
  - **Refrigeración:** rótulo `Envasado`; nota precargada **«Conservar en nevera»**.
  - **Congelación:** rótulo `Envasado y congelación`; nota precargada **«Descongelar en nevera»**.
  - **Otro tipo:** rótulo `Conservación`; nota **vacía y editable**.
- Nota de pie: campo libre, máximo 32 caracteres y además límite de **anchura real** con reducción de fuente; casilla «Mostrar nota» independiente, permite ocultarla. Dejarla vacía es válido y **no bloquea** imprimir. Cambiar tipo vuelve a precargar el texto correspondiente, sustituyendo una edición previa.
- Fechas: primera obligatoria; consumo preferente opcional con guiones cuando falta; nunca se ocultan.
- Vista previa monocroma, cabecera de MiruRecetas aprobada para interiores, conexión BLE voluntaria con CT230B, confirmación de papel, multicopia **1–20** mediante **un único trabajo TSPL `PRINT 1,n`**, 20 B/fragmento con pausa de 75 ms, sin reintentos automáticos, barra de progreso terracota con enviados/restantes y registro de diagnóstico.
- El contador del progreso mide **transmisión BLE, no número de etiquetas físicamente impresas**. Historial de consola: seis envíos de 5919 B, 296 fragmentos cada uno (05/11); eso no certifica por sí solo la salida física. La V0.8 de referencia histórica sí fue ensayada físicamente; **no atribuir esa validación a todas las variantes libres** ni a tiradas 3–20.
- Un fallo real descubierto al elegir «Otro tipo» se corrigió en PR #37; la selección de formatos se añadió en PR #38 y el diseño definitivo del selector en #39/#40.

## 4 bis. Compacta libre 50 × 30 — DISEÑO APROBADO Y VALIDADO VISUALMENTE (08/11/2026)

Nueva plantilla **`ingredientes-v1/plantilla-compacta.js`**, registrada en el motor común e independiente de
`label-v09-component.js` (ensayo histórico) y del motor productivo de
`mirurecetas-web-source`. Se ha transcrito la geometría V0.9 como referencia
**sin importar ningún módulo ni mantener enlace operativo** entre ambas
versiones. Una modificación posterior del diseño libre **no podrá alterar**
la etiqueta existente de recetas. La V0.9 original con QR permanece aprobada
e inmutable. El diseño libre sin QR se desarrolló en PR [#45](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/45), se corrigió en PR [#46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46) y quedó **aprobado y validado visualmente por la usuaria el 08/11/2026 sobre GitHub Pages**. Esta confirmación no especifica que se haya realizado una **impresión física CT230B** de la nueva variante; mantener ese ensayo como verificación independiente pendiente de evidencia.

- Lienzo 590 × 354. **Corrección 08/11/2026 tras comparar capturas Android**:
  cabecera idéntica a V0.9, título Bricolage Grotesque (x=11, y=46, 46 px),
  isotipo BN grande (x=525, y=5, 53 × 48) y banda negra completa y=60, alto 12.
  **No añadir** «MiruRecetas» bajo el isotipo ni reducirlo. Con macros activos,
  dos filas de rótulos/fechas alineados verticalmente sin divisores internos;
  nutrición más espaciada a derecha, kcal en caja redondeada negra. Con macros
  ocultos, dos columnas de fechas y rótulos **centrados**, sin divisor vertical.
  Se elimina la línea horizontal adicional antes de «CONSERVACIÓN Y CONSUMO».
  Encabezados negros de conservación y nota conservan posiciones (y≈191 y
  y≈274), líneas laterales, textos opcionales y huecos fijos aunque estén vacíos.
- El espacio inferior derecho antes ocupado por el QR se aprovecha en el
  diseño aprobado: las secciones inferiores ocupan el ancho disponible. No
  copiar QR, URL de receta, raciones ni gramaje.
- Formulario propio editable: título, tipo de conservación, fecha primaria
  obligatoria, consumo preferente opcional, kcal y tres macros independientes
  (todos opcionales), instrucciones y nota manuales. Las reglas aprobadas de
  Pequeña se heredan **sin importar su motor**: congelación → «Envasado y
  congelación»/«Descongelar en nevera»; refrigeración → «Envasado»/«Conservar
  en nevera»; otro → «Conservación»/texto vacío. El segundo rótulo
  «Consumo preferente» es constante y su fecha opcional. Al cambiar de modo
  se precarga la instrucción correspondiente y se limpia la nota antigua;
  ambas se pueden editar y ninguno de los tres modos infiere una duración.
- Control de visibilidad del **bloque nutricional** y del **texto** de
  instrucciones y nota. Con nutrición activa, las fechas van en filas a la
  izquierda y los macros a la derecha. Al desactivarla, las dos fechas
  ocupan columnas de igual anchura, sin conservar el hueco nutricional.
  Los encabezados «CONSERVACIÓN Y CONSUMO» y «NOTA» **se imprimen siempre**,
  incluso cuando el contenido opcional está en blanco u oculto; sus posiciones
  y espacios no se desplazan. Campos nutricionales vacíos se omiten sin ceros
  ficticios. Los textos que no caben bloquean la impresión.
- Vista previa del raster **real**, TSPL 50 × 30 sin QR, multicopia 1–20 y
  transporte BLE compartido con la herramienta de laboratorio. La salida
  real y la alineación requieren ensayo físico en CT230B antes de calificar
  esta variante como validada.
- **Sin enlace, import, dependencia, actualización cruzada, metadatos de
  receta o sistema de publicación conjunto** con el motor de producción.
  Comparar con V0.9 se permite únicamente para QA visual.

La composición visual libre de Compacta fue elegida el 08/11/2026 utilizando
la imagen de referencia aportada por la usuaria. El isotipo de esa ilustración
**no sustituye** al isotipo oficial BN ni a las fuentes oficiales Bricolage
Grotesque y Geist, que se cargan de los recursos del laboratorio. El diseño
está implementado en [PR #46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46), y la **usuaria confirmó expresamente su aceptación y validación visual en la página publicada el 08/11/2026**. Solo resta distinguir esta aceptación de la prueba de impresión física y su registro; no inventar evidencia de papel.

## 5. Motor único de etiquetas libres — IMPLEMENTADO EN LABORATORIO (07/11/2026)
La arquitectura **ya está unificada**: `ingredientes-v1/motor-libre.js` centraliza carga de isotipo, fechas y validaciones comunes, ajuste progresivo de texto, composición Canvas, raster 1 bit por bandas, ensamblado TSPL y multicopia. `plantilla-pequena.js` (30 × 20) y `plantilla-compacta.js` (50 × 30) registran únicamente reglas de campos y coordenadas visuales; **no existen motores TSPL completos separados**. `app.js` mantiene un único transporte BLE compartido y la vista por formato, con seguimiento de fragmentos. El contrato interno es formato + datos + visibilidad; Amplia futura se añadirá como una tercera plantilla sin replicar motor. No se importa, enlaza ni modifica código de V0.9 histórica, V0.8 histórica o etiquetas de producción.

La refactorización reemplaza los archivos `engine.js` y `compacta-engine.js` (retirados de esta página). Las **19 pruebas de contrato** y la comparación de cuatro casos equivalentes de render y TSPL respaldan la ausencia de cambios intencionados en los diseños actuales; no equivalen a ensayo físico con CT230B. La geometría libre de Compacta recoge la decisión de diseño del 08/11/2026;
la vista previa publicada **ya ha sido aprobada y validada visualmente por la usuaria**; la validación física CT230B no está acreditada en este registro.
Los cambios de composición pertenecen **exclusivamente a su plantilla**.

### Optimización del raster disperso heredada de V0.6.2 (08/11/2026)

**Decisión autorizada:** adaptar al **motor único de etiquetas libres** la estrategia histórica `label-v062.js::v62SparseRegion()` para reducir tiempos BLE, sin heredar motores, QR ni formatos históricos. Aplicar la misma optimización **a los tres formatos**, Pequeña 30 × 20, Compacta 50 × 30 y Amplia 50 × 80, sin modificar sus plantillas ni un solo píxel del raster. La cabecera, isotipo, Bricolage Grotesque/Geist, fechas, líneas y valores impresos permanecen iguales.

**Algoritmo implementado en `motor-libre.js`:** conservar umbral 1 bpp y bandas de **12 filas**; saltar bandas enteramente blancas; obtener columnas de bytes de 8 píxeles que contienen tinta; para cada banda calcular una partición óptima por regiones horizontales **no solapadas** (máximo seis), incluyendo los bytes de cada cabecera `BITMAP`, el raster y `CRLF`, con penalización conservadora de 12 B por comando para evitar una explosión de órdenes. Cada región recorta también sus filas blancas exteriores y mantiene coordenadas TSPL absolutas. Si dividir no compensa, emitir la banda original. A diferencia de la V0.6.2 histórica, **las regiones se detectan automáticamente por banda** y no se fijan a coordenadas de un formato concreto. Nunca se omiten píxeles blancos internos que sean necesarios para dibujar rectángulos completos.

**Comparativa verificable:** para un mismo raster, `build()` devuelve `baselineBytes`, `baselineTiles`, `bytes`, `tiles` y `savedBytes`; el valor anterior se calcula reproduciendo exactamente el algoritmo sin regiones, **sin lanzar otro render ni alterar datos**. `app.js` refleja los tres formatos en el **registro técnico ya existente**, colapsado, sin añadir textos a la tarjeta de vista previa. Los atributos `data-baseline-bytes` y `data-optimized-bytes` del canvas permiten auditar la cifra real en navegador. **Medición real del navegador Android, comunicada por la usuaria el 08/11/2026**, después de publicar la PR #55: Pequeña **4.048 → 3.226 B** (−822 B; **20,3 %**; 16→23 sub-bandas), Compacta **14.176 → 9.476 B** (−4.700 B; **33,2 %**; 27→56 sub-bandas) y Amplia «Pisto casero» **44.334 → 27.505 B** (−16.829 B; **38,0 %**; 79→280 sub-bandas). Las tres medidas proceden del diagnóstico del navegador, no de los patrones sintéticos. Amplia pasa a estar bajo el umbral de 35.000 B, sin elevarlo. El mayor número de sub-bandas es esperado: son recortes más pequeños y transmiten menos bytes. No confundir reducción del tamaño enviado con tiempo físico de impresión medido o ensayo de la CT230B.

**Controles y límites sin cambios:** `MAX_BYTES=35000`, fragmentos UART BLE de 20 B, pausa y confirmación, `PRINT 1,n`, protección de límites y sin reintentos automáticos. Se rechaza un trabajo que siga superando el máximo, mostrando también su tamaño previo. Las pruebas automatizadas reconstruyen los `BITMAP` bit a bit (incluidos huecos, bordes y cruces de banda), comprueban equivalencia y tamaño sin aumento en los tres formatos y demuestran con un **raster sintético** que puede desbloquearse una Amplia que antes superaba el umbral. **Ese caso sintético no acredita el tamaño final del diseño Pisto ni su impresión física CT230B.** Mantener las pruebas de papel para el cierre acordado.

### Desarrollo posterior de Amplia y ajustes visuales

Para 50 × 30 y 50 × 80 horizontal:
- Formularios adaptativos al formato para nombre, kcal, proteínas, hidratos, grasas, fechas, instrucciones y notas disponibles en la composición original.
- Bloques opcionales de nutrición/instrucciones/notas según capacidad; **fechas siempre visibles**; no introducir gramos.
- Ocultar nutrición = redistribuir las fechas en dos columnas; no imprimir sus valores ni ceros de relleno. Ocultar instrucciones/nota = preservar títulos y huecos sin imprimir texto. Mantener geometría aprobada, reglas de nombres largos, ajuste progresivo y tamaños mínimos.
- Valor incompleto de macro: no inventar, no usar `0` salvo que se haya indicado expresamente; kcal independientes de reparto macro manual. **Sin anillo y sin QR** para las etiquetas libres.
- Vista previa debe reflejar exactamente el raster que se va a enviar; impedir imprimir formatos en desarrollo hasta motor, pruebas automatizadas y comprobación física CT230B.

**Orden de trabajo acordado:** 1) selector/interfaz global (**hecho**); 2) Pequeña y Compacta integradas en motor común (**hecho**, regresiones físicas independientes pendientes cuando proceda); 3) diseño libre Compacta corregido y aprobado visualmente (**hecho, 08/11/2026**); 4) **siguiente fase: Amplia horizontal 50 × 80**, referenciada en V0.7.3, pendiente de validación del diseño de la variante libre antes de desarrollarla; 5) banco de ingredientes JSON; 6) ampliar funcionalidades. No demorar la interfaz general hasta completar el banco.

### Siguiente hito — preparación de Amplia libre 50 × 80 horizontal (08/11/2026)

**Referencia visual y técnica histórica, exclusivamente de consulta:** `label-v07.js` (V0.7.3), `V07-HORIZONTAL-PURE-CALABAZA-CALABACIN.md` y el SVG original documentado. La composición editorial se organiza sobre **945 × 590 puntos horizontales** y se gira para un papel físico 50 × 80 (raster **590 × 945**), con nombre grande, isotipo BN, banda superior, fechas, kcal/PR/HC/GR, instrucciones y nota. La V0.7.3 histórica contiene un QR y un límite preventivo propio de 36.000 B: **no trasladar QR, URL, código ni excepciones de tamaño** al nuevo motor libre.

**Decisiones ya aprobadas aplicables a Amplia:** formato horizontal 50 × 80, etiqueta libre autónoma, **sin QR ni anillo**, sin gramos/raciones, campos introducidos manualmente, fechas siempre visibles (primera obligatoria, segunda opcional), macros opcionales sin imputaciones, plantilla específica registrada en el **único `motor-libre.js`**, render fiel al raster transmitido, transporte BLE existente y sin escritura en inventario. No cambiar el selector de cuatro tarjetas.

**Dirección de exploración visual aprobada el 08/11/2026:** partir de la cabecera, isotipo y estructura general de V0.7.3; eliminar el QR y aprovechar su superficie para ampliar conservación, instrucciones y nota. Al desactivar la nutrición, redistribuir ambas fechas para evitar huecos vacíos (sin copiar automáticamente la geometría de Compacta). La usuaria autorizó **preparar propuestas visuales antes de implementar**. Las maquetas de consulta presentadas en el chat son **A · bloques inferiores apilados a todo el ancho**, con una regla fina parcial, y **B · conservación/consumo a la izquierda y nota a la derecha**, sin separador adicional. Ambas se mostraron con macros activos y desactivados, sin QR y con isotipo procedente del paquete oficial. Los PNG conceptuales emplean sustitutos tipográficos locales: el código final deberá usar Bricolage Grotesque y Geist. **La usuaria seleccionó expresamente la propuesta B el 08/11/2026, y aprobó y validó visualmente su versión definitiva tras la corrección de PR #50.**

**Decisión expresa de diseño para implementar (08/11/2026):** la opción **B** queda elegida. «CONSERVACIÓN Y CONSUMO» y «NOTA» se sitúan en paralelo; los títulos llevan **texto invertido en cápsulas negras de esquinas redondeadas**, con una línea que enlaza ambos y llega a los extremos de la etiqueta. Las **kcal aparecen en una caja negra redondeada**, igual que Compacta; **PR/HC/GR** se colocan debajo con el mismo lenguaje tipográfico. Con macros activos, primer rótulo, fecha, «Consumo preferente» y su fecha ocupan **cuatro filas** separadas, para ganar legibilidad. Sin macros, se **mantienen las dos columnas centradas** de la maqueta B aprobada. Instrucciones y nota son opcionales, pero ambos encabezados y sus huecos se conservan. Conservación (congelación/refrigeración/otro) adapta el primer título y texto predeterminado como Pequeña; no calcula fechas.

**Implementación laboratorio y revisión visual de la usuaria (08/11/2026):** la composición B fue calificada de «perfecta», quedando autorizadas dos optimizaciones sin modificar su diseño. `ingredientes-v1/plantilla-amplia.js` registrada en el **único motor libre**. Arte de **945×590** puntos girado a raster físico **590×945**; vista previa web girada de nuevo a horizontal a partir de **ese mismo raster**, sin simulación ni otro motor. Formulario editable y controles de nutrición, instrucciones y nota. Durante la validación visual inicial, el envío BLE de Amplia **permaneció deshabilitado**; el motor generaba vista previa y métricas sin transmitir. La decisión posterior de la usuaria del 08/11/2026 autoriza ahora el botón de impresión antes del cierre de ensayos físicos. No heredar QR, URL, motor, código ni límite especial V0.7.3; no tocar etiquetas históricas, web de producción, Airtable, PWA o inventario.

**Corrección posterior a la revisión Android (08/11/2026):** ambos campos de escritura («Conservación y consumo» y «Nota») usan exactamente la tipografía Geist, pesos y apariencia de las áreas de texto de Compacta. En Amplia, únicamente la normalización local de estos campos **conserva los saltos de línea introducidos con Enter, también CRLF, y las líneas vacías internas**. Cada línea explícita se imprime en una línea nueva; el ajuste automático por anchura sigue disponible dentro de cada línea. Los límites preexistentes de altura son **hasta 5 líneas de conservación y hasta 6 de nota**, reduciendo tipografía dentro de los mínimos si hace falta y bloqueando el trabajo si no cabe, sin truncar. Ningún salto de línea ni valor de los otros formatos se modifica. En la etapa de la PR #50 se mantuvo la impresión de Amplia deshabilitada mientras se cerraba la aceptación visual. La versión corregida fue **revisada, aprobada y validada expresamente por la usuaria** el 08/11/2026 sobre la vista previa publicada tras [PR #50](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/50). Esa aceptación acreditó exclusivamente el diseño visual; la **habilitación de impresión se autoriza después, por decisión expresa independiente**. Ninguna de estas decisiones constituye ensayo físico ni certifica salida, orientación, alineación, multicopia o calidad en papel.

**Habilitación BLE de Amplia autorizada el 08/11/2026 — nuevo estado vigente.** La usuaria ordena habilitar la impresión de Amplia B inmediatamente y **posponer las pruebas físicas de impresión hasta la fase final** de la hoja de ruta. Se comparte el único transporte UART/BLE y el mismo `motor-libre.js` (raster físico **590 × 945**, TSPL `SIZE 50 mm,80 mm`, `PRINT 1,n`), con comprobación del raster/35.000 bytes, conexión previa a CT230B, selección y confirmación explícita del papel 50 × 80 mm, confirmación del trabajo y 1–20 copias sin reintentos automáticos. El botón solo queda disponible con datos válidos y trabajo construible, impresora conectada y casilla de confirmación marcada. Las métricas son estimaciones de transmisión, **no equivalen a prueba física**. La validación física de orientación, avance de papel, legibilidad y multicopia queda para el cierre; tampoco se registra inventario ni se escribe en Airtable, web de producción o PWA.

## 6. Banco de ingredientes — PATRÓN UX APROBADO (08/11/2026); CATÁLOGO Y DESARROLLO PENDIENTES

**Principio funcional: herramienta doméstica, sin controles añadidos (08/11/2026).** El objetivo es sustituir la escritura manual de algunas etiquetas por una precarga opcional. El **modo libre siempre está disponible**; la selección desde banco sirve únicamente para rellenar campos, que **siguen totalmente editables** (incluidos nombre, tipo de conservación, fecha propuesta y nota). **Los estados del JSON (`verificado`, `parcial`, `sin_datos`) clasifican la información del banco, no autorizan ni prohíben crear o imprimir una etiqueta libre o una etiqueta modificada tras la precarga.** Un plazo `null` significa únicamente que **no se propone fecha automática**: la usuaria puede introducirla manualmente. Mantener las comprobaciones técnicas reales de tamaño, calendario y BLE de la etiquetadora, **sin inventar controles adicionales de procedencia, aprobación, contenido ni conservación** en el flujo de impresión. Las preferencias sobre qué ingredientes incorporamos al banco son **criterios editoriales del catálogo**, no limitaciones de lo que la usuaria puede escribir o imprimir libremente.

**Alcance estricto: solo Pequeña 30 × 20.** El banco será un **JSON autónomo, versionado y verificable**, distinto del catálogo nutricional/comercial de Airtable. No afecta a Compacta ni Amplia; las tres plantillas, el raster, el motor de impresión y el flujo BLE conservan sus contratos.

### Selección aprobada: alternativa D · dos chips y panel reutilizando el patrón de MiruRecetas

- Inmediatamente **debajo de la vista previa** de Pequeña, antes del paso **1. Datos de la etiqueta**, presentar dos chips: **«Ingrediente libre»** (estado inicial) y **«Cargar del banco»**. No añadir una tarjeta ni un «paso 0» numerado; no mostrar chips en Compacta/Amplia.
- «Ingrediente libre» mantiene el formulario manual actual, sin buscar ni aplicar datos del banco. «Cargar del banco» abre un **panel modal temporal**: **inferior tipo bottom sheet en vertical** y **lateral en horizontal**; seguir el patrón visual/accesible existente de vista diaria compacta y del panel de impresión en las fichas de recetas de la web oficial, **adaptado dentro del laboratorio** (sin importar código productivo como dependencia).
- El panel contiene buscador de nombre/alias, exploración por categorías, variantes/presentaciones y **chips de filtrado** cuando aporten valor, además de información de conservación y **fuentes consultables**. **Ocultar los chips de categorías que no tengan ingredientes en el banco; nunca mostrar categorías vacías.** El botón final **«Aplicar a etiqueta»** permanece deshabilitado hasta seleccionar un ingrediente concreto y, cuando corresponda, su presentación. Admitir alternativa de escribir libremente sin contaminar los resultados del banco.
- **Separar explorar de aplicar**: abrir, filtrar, comparar y seleccionar dentro del panel **no cambia** los campos del paso 1. Solo «Aplicar a etiqueta» confirma la elección, precarga sus datos, cierra el panel y abre el paso **1. Datos de la etiqueta** para revisión. Al volver a pulsar «Cargar del banco», se reabre el panel con selección/filtros previos para revisar o cambiar y aplicar de nuevo.
- **Conservar dos estados diferenciados**: formulario libre y formulario con datos aplicados del banco. Al pulsar «Ingrediente libre», recuperar sus valores escritos, sin sobrescribirlos ni borrar la última selección del banco. Cambiar de formato a Compacta/Amplia no debe cargar datos del banco en esos formatos.
- **Permitir editar lo precargado**: el paso 1 sigue siendo editable (nombre, cantidad, fechas, conservación y nota, según el contrato vigente de Pequeña). La cantidad y la fecha real de envasado son datos del usuario, no se inventan ni se reemplazan al elegir ingrediente. La selección del banco no crea ni modifica inventario, receta, Airtable ni datos comerciales.
- El panel se gestiona **independientemente del acordeón** de los pasos 1 y 2. Se conservarán cierre explícito/Escape/fondo, devolución del foco, bloqueo de scroll del documento y comportamiento con teclado; en pantalla estrecha se controla el espacio de resultados y se mantiene accesible el botón de aplicar.

### Fechas derivadas · decisión posterior aprobada el 08/11/2026

- Si el registro seleccionado ofrece un **plazo orientativo aplicable y con fuente identificada (o fijado expresamente por la usuaria)** al tipo de conservación y a la presentación concreta, el banco puede **calcular automáticamente** la fecha de consumo preferente usando la **fecha de envasado que realmente introdujo el usuario**. Este comportamiento es una actualización expresa de la propuesta anterior «jamás automática sin confirmación»: el usuario confirma la propuesta al pulsar **«Aplicar a etiqueta»**, el campo resultante queda visible y **siempre editable**; no hay impresión ni aplicación silenciosa de una etiqueta.
- **Mientras la fecha de consumo preferente permanezca calculada automáticamente**, modificar la fecha de envasado recalcula la primera. Si el usuario **edita directamente** la fecha de consumo preferente, esa edición se respeta y **se detiene el recálculo automático** para evitar sobrescribir decisiones propias. Se puede ofrecer una acción discreta **«Restablecer recomendación»** que recupere explícitamente el cálculo. Nunca alterar una fecha manual sin aviso ni consentimiento.
- Mostrar **una única nota breve bajo el conjunto de las fechas**, exclusivamente cuando exista un plazo aplicable: **«Tiempo recomendado: N días»** (todos los tiempos del catálogo están convertidos a días). La nota es informativa y **no se imprime**. La fuente puede identificarse de forma concisa en el selector, sin fichas extensas.
- **Sin plazo aplicable y con origen identificable**, no sugerir fecha ni inventar días; consumo preferente permanece editable sin autocompletar. No inferir fechas a partir del nombre del ingrediente ni de la categoría. Distinguir plazos de calidad de seguridad/caducidad; nunca prometer inocuidad.
- **Cálculo exclusivamente por días enteros:** sumar el número de días guardado en el catálogo a la fecha de envasado sin conversiones locales por meses naturales ni efectos de UTC/DST. Los meses originales ya se convierten a **30 días** y las semanas a **7 días** al preparar el JSON propio. Las pruebas cubrirán fin de mes, años bisiestos, fechas manuales y cambios repetidos.
- Cualquier cambio de ingrediente/presentación/condición que altere el plazo debe actualizar la sugerencia **al aplicar** el nuevo registro, sin destruir los valores del formulario libre; mantener visible la recomendación que se está aplicando.

### FoodKeeper ES original y catálogo derivado · criterios actualizados (08/11/2026)

**Fuente de referencia inalterada:** [`banco/fuentes/foodkeeper-es-original.json`](banco/fuentes/foodkeeper-es-original.json), idéntica al archivo aportado por la usuaria (716.677 bytes, SHA-256 `2a25209edc1d578f1f0002a0a896c54c26611a4d986c46ebcdc156554190687b`, Git blob `2bb80fb602690984e5218a69e0f5411f4370ddcc`). Es el archivo de procedencia `FMA-Data-v128.xlsx`, con 662 registros `Product`, 25 grupos y 14 categorías principales. No afirmar que la versión recibida sea la última publicada; consultar [inventario](banco/README.md).

**Catálogo MIRURECETAS separado y mínimo:** se **poblará editorialmente** con los ingredientes reales que la usuaria quiera tener precargados (principalmente a granel) y conservas elaboradas en casa en una fase futura; según su selección actual, **no incorporar fichas de productos comerciales** al banco. **Esto no limita en absoluto la etiqueta libre ni impide cambiar los datos después de aplicarlos desde el banco.** Crear un JSON **nuevo**, con nuestras categorías, subcategorías y nombres es-ES. No copiar los 662 registros ni duplicar campos de FoodKeeper (rangos, unidades, contexto, títulos y sugerencias originales). El JSON original sigue **sin alterar** para consulta; el derivado guarda solo tiempos operativos y **una pareja de campos globales de la ficha**: `fuente` (p. ej. `FoodKeeper`, `usuario` o `agregación`) e `id_fuente` (p. ej. `"59"` o `null`). AESAN puede contrastar sin reemplazar automáticamente los valores específicos.

**Fecha canónica para este flujo:** `fecha de envasado = fecha de compra / fecha de preparación`. El usuario etiqueta **una sola vez** su ingrediente real, no gestionamos sucesivas aperturas, descongelaciones o cambios de estado en Pequeña. El selector de **tipo de conservación existente** determina qué plazo cargar; no añadir al JSON «condiciones del plazo» ni etapas comerciales o estados de compra/apertura. Si no hay un plazo razonablemente aplicable del origen, dejarlo sin fecha automática; no trasplantar el dato de un producto comercial a ingredientes frescos.

**Plazos orientativos de calidad, siempre días en el JSON derivado:**
- **Refrigeración:** seleccionar el **máximo** del intervalo FoodKeeper aplicable, para reducir desperdicio.
- **Congelación:** seleccionar el **mínimo** del intervalo FoodKeeper aplicable, para priorizar la calidad.
- **Conversión fija antes de registrar:** `1 semana = 7 días`; `1 mes = 30 días`; valores derivados enteros **solo en días**, sin guardar en el catálogo los valores/unidades originales. El archivo original conserva toda la referencia. El cálculo de consumo preferente usa **sumar días** a fecha de envasado (no sumar meses naturales). La nota bajo las fechas indica `Tiempo recomendado: N días`; no se imprime y el campo de consumo preferente sigue siendo editable, con las reglas de recálculo y restauración acordadas.
- **Envasado al vacío:** situación habitual del usuario, **no incremento automático** de plazos FoodKeeper por utilizar vacío. La selección del máximo para refrigeración **no equivale a garantía de seguridad**: correcta refrigeración e higiene siguen siendo imprescindibles. Una recomendación de calidad no sustituye condiciones seguras de manipulación.
- **Despensa y conserva casera:** se mantienen como familias de metadatos pensadas para futuras etiquetas; no extrapolar a conservas domésticas los tiempos de conservas comerciales. Un consejo como «Una vez abierto, consumir en 5 días» puede ser solo un **texto corto**, sin añadir por ahora campos de seguimiento de apertura.

### Clasificación editorial vigente · 4 categorías y subcategorías (08/11/2026)

**Solo cuatro categorías principales y 26 subcategorías aprobadas** para organizar el banco MiruRecetas, independientes del catálogo original de FoodKeeper. El listado sustituye la clasificación anterior de 11 categorías:

| Categoría | Subcategorías aprobadas |
|---|---|
| **Carnes y Aves** | Vacuno; Porcino; Ovino; Pollo; Pavo; Otras aves; Caza |
| **Pescados y Mariscos** | Pescado blanco; Pescado azul; Crustáceos y moluscos; Cefalópodos |
| **Frutas y Verduras** | Frutas; Hortalizas; Verduras de hoja; Tubérculos; Hongos; Algas |
| **Despensa** | Arroz; Pasta; Cereales; Legumbres; Harinas; Frutos secos; Semillas; Especias y hierbas; Conservas |

**Regla de los chips de categorías:** mostrar **solo las categorías con al menos un ingrediente registrado en el banco disponible para buscar/seleccionar**. Si una categoría aún no contiene ingredientes, **no se muestra su chip en el panel**. No crear ingredientes ficticios para hacer visible una categoría. La interfaz no debe mostrar obligatoriamente los cuatro chips ni chips vacíos.

**Ámbito estricto:** ingredientes reales comprados a granel, y conservas caseras en una fase futura. No productos comerciales envasados ni ingredientes comerciales que no se vayan a etiquetar. Se **descarta «Lácteos y huevos»**; las antiguas categorías «Condimentos», «Conservas», «Cereales y Legumbres» y «Frutos secos y semillas» se absorben editorialmente en **Despensa**, cuyas **nueve subcategorías ya están aprobadas**. En la interfaz, la subcategoría se llama únicamente **«Conservas»**, sin el calificativo «caseras»; la regla de contenido mantiene que solo se incluirán conservas elaboradas en casa, nunca productos comerciales. «Hongos y algas» pasa a las subcategorías de **Frutas y Verduras**; no se crea categoría independiente. El pulpo pertenece a **Cefalópodos** dentro de Pescados y Mariscos. No se altera el original FoodKeeper, ni el esquema aún pendiente, ni la UI existente.

### Metadatos implementados en el JSON Schema (08/11/2026)

La relación siguiente recoge los **campos aprobados** y ya definidos en el [JSON Schema del catálogo](banco/catalogo.schema.json). **El esquema es un contrato para guardar fichas, no una validación de lo que puede escribirse o imprimirse libremente.** El catálogo real aún no se ha creado:

| Grupo | Campo | `null` | Regla |
|---|---|---|---|
| Identidad | ID, categoría, subcategoría, nombre | No | ID estable `CAR-VAC-001`, clasificación editorial propia |
| Identidad | Presentación | Sí | **Único** descriptor opcional: «Picada»; eliminar «Preparación» duplicado |
| Búsqueda (aprobado) | `sinonimos` | No: `[]` si no hay | Array de términos de búsqueda, incluidos alias o equivalencias es-ES; no requiere datos extra de FoodKeeper |
| Por método | Refrigeración, congelación, despensa, conserva | No en ficha aprobada | Booleanos true/false; **independientes del estado global** de la ficha |
| Por método | Tiempo en días | Sí | Entero positivo, `null` si falta plazo aplicable |
| Por método | Tip breve | Sí | `null` si modo no disponible; `""` cuando está habilitado pero no hay tip; texto si existe |
| Congelación | Tip descongelación | Sí | Nota breve que sí puede precargarse en Pequeña |
| Preparación para conservar (aprobado; reservado) | `tips_preparacion_conservacion` | Sí | Un único texto corto opcional previo al almacenamiento (escaldar antes de congelar, secar antes de embolsar, consejos de envasado al vacío). **No se muestra en el panel actual ni se imprime** |
| **Ficha global** (aprobado) | `estado_recomendacion` | No | **`verificado`, `parcial`, `sin_datos`**; uno por ingrediente, nunca por método |
| **Ficha global** (aprobado) | `fuente` | Sí | Una única fuente textual por ficha: `FoodKeeper`, otra institución, `usuario` o `agregación`. Obligatoria para `verificado`/`parcial`, `null` para `sin_datos` |
| **Ficha global** (aprobado) | `id_fuente` | Sí | Texto único opcional: ID original en esa fuente, `null` para `usuario`/`agregación`/`sin_datos` global; literal `"sin_datos"` si hay una fuente externa única sin IDs |

### Implementación experimental del banco de seis ingredientes y panel de Pequeña (08/11/2026)

**En el laboratorio, pendiente de revisión visual de la usuaria y sin prueba física de impresión:** [`banco/catalogo.json`](banco/catalogo.json) contiene **seis fichas** conformes al [JSON Schema](banco/catalogo.schema.json). Se ha incorporado [`banco-ui.js`](banco-ui.js) a [`index.html`](index.html) con los dos chips **«Ingrediente libre»** y **«Cargar del banco»** exclusivamente para Pequeña, debajo del selector y la vista previa.

- El panel es inferior en vertical y lateral en horizontal, con búsqueda normalizada por nombre/**sinónimos**, filtros de categorías (sin chips para categorías sin registros), selector de subcategoría, selección explícita y botón **«Aplicar a etiqueta»**. Filtrar o elegir no modifica el formulario; solo aplicar precarga. La fuente corta y el ID de FoodKeeper pueden consultarse desde el panel sin fichas extensas.
- El modo libre es el predeterminado; los borradores **libre** y **banco** se mantienen separados al alternar. La cantidad y fecha de envasado que haya escrito la usuaria no se sustituyen. Todos los datos del paso 1 permanecen editables; las fichas y su estado global **no bloquean la impresión manual**.
- El selector **existente de Pequeña** incorpora **Despensa** y **Conserva** como opciones adicionales a Refrigeración, Congelación y Otro tipo. La plantilla Pequeña muestra para esos nuevos modos el mismo rótulo genérico de conservación, sin cambiar el raster de los tres modos anteriores; las plantillas Compacta y Amplia no se modifican, ni el motor BLE.
- Si el modo elegido tiene un plazo positivo, se propone consumo preferente sumando **días enteros** al envasado y se indica **«Tiempo recomendado: N días»** solo en pantalla. Si se cambia el envasado se recalcula hasta que la usuaria edite manualmente el consumo; **«Restablecer recomendación»** recupera el automático. Si falta plazo, no se inventa fecha ni se borra una fecha ya introducida manualmente.
- Las seis fichas: **Carne picada de ternera** (`CAR-VAC-001`, FoodKeeper 59, frío **2 días**, congelación **90 días**); **Pulpo** (`PES-CEF-001`, `sin_datos`); **Patata** (`FRV-TUB-001`, FoodKeeper 297, frigorífico **14 días**, despensa **sin plazo fijado** (FoodKeeper indica 1–2 meses para patata entera, pero no se ha decidido qué extremo usar para despensa), presentación entera); **Lechuga** (`FRV-HOJ-001`, FoodKeeper 290, presentación iceberg o romana, refrigeración **14 días**); **Orejones** (`FRV-FRU-001`, alias **Albaricoques deshidratados**, FoodKeeper 379, despensa **180 días**); **Salsa de tomate** (`DES-CON-001`, `sin_datos`). Todos los plazos no sustentados permanecen `null`.
- Atención a la correspondencia: FoodKeeper 297 solo da un plazo de congelación para **patata cocida y machacada**, no para patata entera, por eso esta última **no recibe plazo de congelación**; FoodKeeper 290 se aplica específicamente a **lechuga iceberg o romana**; el archivo no aporta una ficha específica de **pulpo** ni un plazo aplicable a una **salsa de tomate genérica** sin precisar preparación, por lo que estas fichas empiezan `sin_datos`. El original [FoodKeeper ES](banco/fuentes/foodkeeper-es-original.json) no se ha alterado.
- QA previa a PR: prueba sintética de **16 interacciones del panel** (búsqueda, filtros, estado, fechas, borradores, edición manual) y comprobación del motor para sus cinco modos; test de regresión [`tests/banco-ingredientes.test.cjs`](../tests/banco-ingredientes.test.cjs) incorporado. **No equivale a ensayo visual en navegador real ni a impresión física CT230B.**

El catálogo es **mínimo y experimental**, no se ha completado ni realizado importación masiva. No hay escrituras en Airtable o repositorios productivos.

### Alcance del esquema de almacenamiento

- Archivo: [`ingredientes-v1/banco/catalogo.schema.json`](banco/catalogo.schema.json), JSON Schema **Draft 2020-12**.
- Estructura mínima del futuro archivo de catálogo: `{"ingredientes":[]}`. La lista puede estar vacía; cada ficha incluye identidad, clasificación, origen global y metadatos de conservación.
- La categoría/subcategoría debe corresponder a las **4 categorías y 26 subcategorías aprobadas**. El ID adopta el formato de siglas de categoría, siglas de subcategoría y numeración, p. ej. `CAR-VAC-001` (sin imponer todavía una tabla de códigos específicos).
- En fichas `verificado` y `parcial` se almacenan **los 4 booleanos, sus plazos (días enteros positivos o `null`) y tips (`null` o texto)**. Si un booleano es `false`, el plazo y consejo de ese modo son `null`. En `parcial`, un método desconocido se representa con **`true` + plazo y consejos `null`**, según decisión de la usuaria.
- Una ficha `sin_datos` se puede crear **sin los métodos**, para no rellenar 12 campos vacíos artificialmente; conserva `fuente: null` e `id_fuente: null`. Los `sinonimos` siempre son lista (aunque esté vacía) y `tips_preparacion_conservacion` puede ser `null`.
- El esquema **no valida ni limita etiquetas libres ni precargas editadas**; tampoco calcula fechas, no impone un plazo máximo, no exige criterios de inocuidad ni registra ningún producto. La UI añadirá el cálculo solo cuando exista un plazo numérico aplicable.

### Estados globales y modos de conservación · contrato corregido (08/11/2026)

- **`estado_recomendacion: "verificado"`:** los datos de los métodos de conservación de **toda la ficha** están fijados y aprobados, procedan de una fuente externa o de los que aporte la usuaria. `fuente` es obligatoria. Si la usuaria completa y aprueba personalmente una ficha que antes estaba `parcial`, el valor será **`fuente: "usuario"`**. Si se completa combinando varias fuentes, será **`fuente: "agregación"`**.
- **`estado_recomendacion: "parcial"`:** una **fuente externa** ofrece datos de **algunos** métodos pero no de todos. `fuente` identifica esa fuente externa. Para cada método **sin información**, consignar explícitamente su **booleano `true`** y tanto **el plazo `null` como todos sus consejos `null`**, como ha decidido la usuaria. Esto permite seleccionar el método en la etiqueta, pero **no debe calcular fecha ni mostrar recomendación de plazo/nota inexistente**. Un método con `false` solo se usa si esa negativa es un dato conocido de la fuente, no para representar falta de información.
- **`estado_recomendacion: "sin_datos"`:** ficha creada sin información fijada/aprobada, con **`fuente: null` e `id_fuente: null`**. No generar fechas automáticas a partir de un borrador. **El esquema ya permite crearla solo con identidad, estado, fuente y campos opcionales básicos, sin exigir todavía los cuatro métodos**; no se atribuye significado a métodos que no estén presentes.
- **No hay estado ni fuente por método.** Los cuatro booleanos originales (`refrigeracion`, `congelacion`, `despensa`, `conserva`) y sus plazos y consejos siguen siendo los únicos metadatos específicos de cada modalidad.
- **`fuente` e `id_fuente` son campos separados**, globales y mínimos: con `FoodKeeper` + `"59"` se puede localizar el registro original; con `usuario` o `agregación` usar `id_fuente: null`. Para una única fuente externa reconocible que **no publique IDs únicos**, la usuaria ha definido `id_fuente: "sin_datos"`. Ese literal significa **ausencia de identificador de esa fuente**, no el estado global `sin_datos`; no confundirlos. No incorporar arrays de fuentes ni duplicar campos de FoodKeeper.
- En la etiqueta, el selector del modo con booleano `true` sigue disponible. **Solo si hay plazo positivo aplicable en días se calcula consumo preferente y se muestra «Tiempo recomendado: N días»**; si es `null`, no hacerlo. Los campos siguen editables y los cambios manuales conservan prioridad.

**Ejemplos de metadatos globales:** `CAR-VAC-001` puede tener `estado_recomendacion: "verificado"`, `fuente: "FoodKeeper"`, `id_fuente: "59"`, refrigeración y congelación `true`, despensa y conserva `false`. Una ficha `parcial` con fuente FoodKeeper puede tener un método no descrito con **`true`, días `null` y tips `null`**. Una ficha `sin_datos` usa `fuente: null` y `id_fuente: null`. Las recomendaciones buscan preservar calidad, no garantizan seguridad. `sinonimos` se guarda como lista (aunque vacía) y `tips_preparacion_conservacion` queda reservado para futura web.

**Ejemplo de tiempo derivado, pendiente de cerrar el resto de la ficha:** `CAR-VAC-001` «Carne picada de ternera», presentación «Picada», referencia [FoodKeeper `Product.ID=59`](banco/fuentes/foodkeeper-es-original.json): refrigeración original **1–2 días** → `refrigeracion_dias=2`; congelación original **3–4 meses** → `congelacion_dias=90`. Esos son los únicos números que aparecerían en nuestro catálogo; el JSON de procedencia conserva los intervalos originales. No atribuir un tip redactado por MiruRecetas a FoodKeeper si su registro no lo incluye.

**Estado:** están aprobados el **patrón de visualización, las reglas de cálculo/editabilidad, FoodKeeper como fuente, la selección/conversión de plazos y los tres estados globales `verificado`/`parcial`/`sin_datos`**, con `fuente`, `id_fuente`, `sinonimos` y `tips_preparacion_conservacion` implementados en el **[JSON Schema](banco/catalogo.schema.json)**. El original está preservado; el **catálogo experimental de 6 fichas, chips y panel ya están implementados en el laboratorio**, pendiente de revisión visual y ampliación del catálogo, **sin afectar la web de producción**. Las pruebas físicas de impresión continúan aplazadas al cierre.

## 7. Otras capacidades consideradas — FUTURAS, SIN IMPLEMENTACIÓN
- **Etiquetado por lotes/sesiones**: cola de etiquetas distintas de una sesión de compras o batch cooking, compartir primera fecha de la sesión sin forzar consumos preferentes iguales, envío secuencial controlado y confirmación; distinto de multicopia `PRINT 1,n` de *una misma* etiqueta. Sin reenvío automático al fallar BLE.
- **Reimpresión** de un trabajo reciente; diagnóstico y prueba de alineación/papel con advertencias de transmisión frente a impresión real.
- **Favoritos / plantillas reutilizables** y **etiquetas recientes**: diseños y campos repetibles sin arrastrar fechas obsoletas; decidir persistencia con P10 para sincronización real, evitar vender `localStorage` como solución definitiva.
- **Modo de conservación** más amplio (congelación / refrigeración / despensa), notas y referencias contextuales; ya existe elección de tipo en Pequeña, pero no un clasificador completo para todos los formatos.
- **Identificación doméstica de lotes o porciones**, instrucciones según envase (bolsa, recipiente rígido, tarro, vacío) y ayuda informativa; nunca inferir por sí solo duración a partir de usar vacío o tarro.
- **Cuarta plantilla futura para tarros/conservas** (quizá redonda o adaptada al cristal), con nombre, elaboración, consumo preferente y condiciones. Distinguir elaboración refrigerada de conserva estable en despensa; **no atribuir seguridad o fecha sin proceso y receta validados**. Ensayar papel térmico/adhesivo para humedad y tarros fríos; no aplicar una etiqueta antes de un tratamiento térmico si el material no está autorizado.
- **Desde MiruRecetas** como posible entrada alternativa futura al modo libre: aprovechar datos oficiales de fichas sin convertir entradas manuales en datos oficiales; no sustituir impresión QR actual desde las recetas.
- **Relación opcional con «Mis reservas»**, solo tras P10 y un contrato de lotes y consumos. **No inventar «Mi congelador» como sección aparte**: ese nombre se usó como ejemplo y se descartó al aclarar que el inventario previsto es «Mis reservas».

### Reorganización visual de «Mis etiquetas» — decisión aprobada 08/11/2026

- **Tarjeta de formato y vista previa**: unión de dos tarjetas antes separadas, siempre visible y sin posibilidad de plegarse; conserva cuatro tarjetas de selección de formato aprobadas (tres radios y futuro inactivo). Debajo se muestra **solo la ventana del canvas** correspondiente, sin metadatos, notas de desarrollo o nuevos encabezados de vista previa. Los mensajes de error se muestran únicamente si falla su generación.
- **Panel 1 · Datos de la etiqueta**: desplegable e inicialmente abierto. Cambia el formulario dinámicamente, pero se eliminan subtítulos, notas auxiliares bajo campos, aclaraciones entre paréntesis y textos de desarrollo. Las casillas opcionales se sitúan **después** de los campos que controlan (nota Pequeña, nutrición/instrucciones/nota de Compacta y Amplia). Se mantienen intactos campos, opciones, valores, reglas y validaciones del motor.
- **Panel 2 · Imprime tu etiqueta**: desplegable e inicialmente cerrado, nunca abierto simultáneamente con el panel 1. Mantiene conexión BLE, confirmación de papel, botón, 1–20 copias, progreso y diagnóstico técnico plegado; retira subtítulos y notas informativas de multicopia y de impresión.
- **Vertical/móvil estrecho**: selector + vista previa, luego Datos y luego Impresión. **Horizontal/escritorio**: dos columnas; **derecha** tarjeta fija de selector + preview y **izquierda** los paneles 1 y 2. En paisaje se conservan dos columnas con anchura suficiente (≥680 px); en portrait estrecho se apila.
- Implementar solo en `ingredientes-v1/index.html`, `style.css` y `app.js`, sin alterar diseño de etiquetas, `motor-libre.js`, plantillas, etiquetas históricas o integración en producción. Añadir pruebas de estructura, acordeón y regresión BLE y publicar mediante PR/Pages. La revisión visual del nuevo layout corresponde a la usuaria.

### Cabecera editorial de Mis etiquetas e incidencia de cabecera interior — 08/11/2026

**Nuevo ajuste de página autorizado:** situar **«Conserva»** sobre el título **«Mis etiquetas»**, con la tipografía Geist, el color terracota `#b96c4a`, tamaño `0.7rem`, negrita 700, espaciado `0.16em` y mayúsculas de la ceja **«Todas tus recetas»** del recetario oficial. Referencia contrastada **en lectura** con `MiruRecetas/mirurecetas-web-source/main:assets/estilo.css` y `recetario/index.html`. Añadir debajo de «Mis etiquetas» el subtítulo breve **«Crea e imprime tus etiquetas de conservación.»**, en Geist 16 px y color apagado `#67756b`. Solo afectan a `ingredientes-v1/index.html` y `style.css`; no cambiar los títulos de las tarjetas ni el diseño térmico.

**Incidencia visual comunicada por la usuaria:** la **cabecera interior aparenta aproximadamente el doble de altura prevista**, con exceso de espacio vertical, **tanto en el recetario de la web oficial como en la página del laboratorio** (captura Android aportada el 08/11/2026). Se registra como **pendiente de análisis del responsable técnico Web/PWA** sobre el componente y los estilos **canónicos** de cabecera interior. Causa, fecha de introducción y alcance técnico **no verificados**; evitar asignar una causa sin auditoría. La usuaria indica que **no requiere solución ahora** y la encargará al agente web. **Prohibido modificar en esta actuación la cabecera interior de producción, las copias `ingredientes-v1/cabecera.css` / `cabecera.js`, la PWA o su despliegue.** Esta incidencia no invalida las etiquetas ni sus vistas previas.

## 8. Protección de diseños aprobados y QA
Referencias históricas aprobadas: 50 × 80 vertical **V0.6.2** (solo producción, **excluida del generador libre**), 50 × 80 horizontal **V0.7.3**, 50 × 30 **V0.9**, 30 × 20 ingrediente **V0.8**. No sobrescribir los diseños fuente, QR/rutas de recetas o motores productivos; las variantes libres deben validarse como tales.

Para todo cambio:
1. Confirmar la fuente canónica `main`, alcance, estado de ramas/PR y conflictos. Documentar qué es aprobado, implementado, experimental o pendiente.
2. Mantener regresión JS: geometría, nombres, fechas y notas, papel, QR ausente, formato visible y formato enviado coincidentes, BLE y multicopia.
3. Revisar responsive real Android (aprox. 320/360/390 px), desktop, teclado, selectores y bloqueos de envío; respetar cabecera interior oficial y navegación.
4. Comprobar la **salida física** y alineación de cada nuevo formato libre y variante importante; 1 copia antes de 2 y series largas. `enviados N/N` solo certifica API de transporte.
5. Publicar cambios del laboratorio mediante rama y PR fusionada, comprobar GitHub Pages/Actions y URL real **antes de pedir revisión**; la usuaria revisa la **página publicada**, nunca la PR como sustituto visual.
6. No tocar Airtable, recetas, nutrientes, compras Bring!, imagen de marca, web privada de producción o PWA sin autorización expresa.
7. Los cambios documentales no constituyen autorización implícita para desarrollar, integrar o desplegar las fases futuras.

## 9. Registro de decisiones
| Fecha | Decisión | Estado |
| --- | --- | --- |
| Oct. 2026 | Cuatro referencias CT230B históricas (V0.6.2, V0.7.3, V0.9, V0.8) | Referencias físicas aprobadas |
| 05–06/11/2026 | Etiquetas libres sin QR ni anillo; excluir vertical 50 × 80; gramos solo en 30 × 20 | Aprobado como alcance |
| 05–06/11/2026 | Fechas siempre visibles; primera obligatoria; consumo preferente opcional con guiones | Aprobado e implementado en Pequeña |
| 05–06/11/2026 | Notas de Pequeña editables/ocultables; «Otro tipo» → «Conservación» y nota vacía | Implementado en laboratorio |
| 06/11/2026 | Interfaz general con selector que gobierna los tres pasos; en aquel momento Compacta y Amplia estaban pendientes | Hito histórico superado: Compacta implementada en PR #42 y unificada con Pequeña en el motor común mediante PR #43; Amplia sigue pendiente. La Compacta libre sin QR continúa pendiente de revisión visual y física. |
| 06/11/2026 | **Selector de cuatro tarjetas en una fila, SVG definitivos de PR #40, títulos y tamaños sin disponibilidad** | **Diseño aprobado expresamente** |
| 06/11/2026 | Banco JSON con filtros guiados; después de los dos modelos de etiquetas libres | Dirección aceptada, pendiente de desarrollo |
| 06/11/2026 | «Mis reservas» como futuro inventario remoto autenticado; no usar caché local como BD | Requisito arquitectónico futuro |
| 08/11/2026 | Compacta libre: diseño de la imagen aportada; isotipo oficial BN y Bricolage Grotesque/Geist; macros activos = fechas izquierda/nutrición derecha; macros ocultos = fechas a dos columnas; títulos inferiores siempre, contenidos opcionales y huecos preservados | Diseño autorizado; primera implementación PR #45, sustituida por las correcciones visuales de PR #46; pendiente validación física |
| 08/11/2026 | Comparativa con etiqueta V0.9 y capturas Android: restaurar exactamente título/isotipo/banda; suprimir separadores extra; centrar dos columnas sin macros; alinear rótulos/fechas con macros; redondear kcal y airear nutrientes; aplicar títulos y presets aprobados de Pequeña al cambiar conservación | Autorizado, implementado en PR [#46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46), pendiente de revisión visual publicada y ensayo físico CT230B |
| 08/11/2026 | La usuaria confirma «Está perfecta, aprobada y validada» tras revisar la versión publicada de la Compacta libre corregida en PR #46 | **Aprobación y validación visual final de Compacta en laboratorio**; evidencia de impresión física CT230B de esta variante no aportada. Se pasa a **Amplia 50 × 80 horizontal**, sin autorizar todavía un diseño libre nuevo. |
| 08/11/2026 | Amplia horizontal: aprobación de la **dirección para explorar propuestas**, conservando la cabecera V0.7.3, sin QR y reaprovechando el espacio para instrucciones/nota; macros desactivados sin hueco nutricional | **Dos maquetas conceptuales A/B presentadas en conversación; ninguna aprobada todavía como diseño definitivo.** No se implementa plantilla ni modifica el runtime. |
| 08/11/2026 | La usuaria elige **Amplia · propuesta B**: títulos inversos redondeados con línea continua al borde, kcal inversa redondeada y macros debajo, cuatro filas de fechas con macros, dos columnas centradas sin macros | **Autorizada su implementación y publicación de vista previa real** en el laboratorio. No supone validación visual definitiva ni permiso de impresión CT230B. |
| 08/11/2026 | Revisión Android de Amplia B: la usuaria confirma que la etiqueta y el diseño están perfectos, pide que los textarea igualen los de Compacta y que el Enter se refleje en las líneas impresas de instrucciones y nota | Implementar sin modificar geometría, cabecera, fechas ni nutrición. Pruebas de tres líneas explícitas, CRLF, líneas vacías, ajuste automático y desbordamiento; republicar vista previa. Ensayo físico y habilitación de impresión, pendientes. |
| 08/11/2026 | La usuaria confirma «Perfecto, validada y aprobada» tras revisar la versión de Amplia B publicada con las correcciones de tipografía y saltos de línea de PR #50 | **Diseño visual definitivo de Amplia 50 × 80 cerrado y aprobado en laboratorio.** Pendiente prueba física CT230B y autorización separada para habilitar impresión. Siguiente hito de hoja de ruta: banco JSON de ingredientes. |
| 08/11/2026 | «No tienes habilitada la impresión en la versión amplia… habilítala. Las pruebas de impresión las dejaremos para el final» | **Autorizada e implementada la impresión CT230B de Amplia en el laboratorio**, reutilizando BLE/TSPL de Pequeña y Compacta y controles de confirmación. Se posponen **solo los ensayos físicos**, no las comprobaciones automáticas. La transmisión no implica registro de existencias ni certificación física. |
| 08/11/2026 | Unificar selector y vista previa, dejar solo dos paneles 1/2 mutuamente excluyentes, limpiar formularios y textos accesorios y definir orden vertical y dos columnas horizontales | **Autorizada implementación y publicación en laboratorio para revisión visual**. No cambia plantillas ni motor; ensayo físico de etiquetas al final. |
| 08/11/2026 | Cabecera editorial de «Mis etiquetas» como «Todas tus recetas», y subtítulo corto; documentar posible duplicación vertical de cabecera interior en laboratorio y web oficial | **Aprobado para página de laboratorio y documentado**. Incidencia visual transversal pendiente de agente web; en esta PR no se toca cabecera real ni sus copias. |
| 08/11/2026 | Incorporar al motor libre raster disperso de la V0.6.2 y aplicarlo también a los tres formatos para ahorrar bytes y tiempo BLE, midiendo el trabajo Amplia que aparecía como 44.334 B | **Autorizado para implementación en laboratorio**. Parcelación automática no solapada por bandas, comparación exacta antes/después en el mismo raster y pruebas bit a bit; el peso real definitivo se confirma en el navegador publicado. **Sin cambiar el límite de 35.000 B ni las plantillas**. Ensayo físico al final. |
| 08/11/2026 | Aprobar opción D para banco JSON solo en Pequeña, con chips libre/banco, panel inferior vertical o lateral horizontal, filtros y «Aplicar a etiqueta» | **Aprobado diseño y comportamiento**, sin implementar: explorar ≠ aplicar, conservar dos formularios, editar precargados, modal independiente de los pasos; catálogo y fuentes pendientes. |
| 08/11/2026 | Fecha de consumo preferente dependiente de fecha de envasado y nota informativa (texto original «Tiempo recomendado: XX meses») | **Decisión histórica, actualizada el mismo 08/11:** el catálogo y la nota emplearán únicamente **días**; recálculo hasta edición manual, restablecimiento explícito y nota sin imprimir. |
| 08/11/2026 | Establecer FoodKeeper como origen del banco, conservar JSON ES íntegro y definir categorías propias, subcategorías, datos y plazos de calidad | **Fuente recibida y preservada sin alterar** (662 productos, 25 grupos, 14 categorías principales). **Catálogo derivado pendiente**. Regla inicial de mínimo en ambos modos **sustituida el mismo 08/11**: refrigeración **máximo** y congelación **mínimo** del rango; fuente archivada en `ingredientes-v1/banco/fuentes/`. |
| 08/11/2026 | Refinar el catálogo de Pequeña a ingredientes a granel y conservas caseras futuras; metadatos mínimos sin duplicar FoodKeeper | **Aprobado:** presentación única; envasado = compra/preparación; refrigeración máximo del rango, congelación mínimo; 1 semana=7 días y 1 mes=30 días; almacenar únicamente días; vacío no añade días; sin comerciales ni panel largo. La mención histórica a fuente/estado «por modo» queda **anulada por la corrección posterior: son globales de la ficha**. **Esquema y catálogo pendientes.** |
| 08/11/2026 | Cerrar enum y metadatos futuros de búsqueda/preparación | **Aprobado:** `verificado` y `sin_datos`, `sinonimos` y `tips_preparacion_conservacion`; la interpretación inicial «por modo» y la combinación de estados/fuentes por cada método **fueron corregidas**: estado y fuente son **globales de la ficha**. **JSON Schema y catálogo pendientes.** |
| 08/11/2026 | Aclaración expresa: `estado_recomendacion` y `fuente` pertenecen a **toda la ficha**, no a cada conservación | **Decisión vigente en su ámbito global**: no existen estados/fuentes por método. La enumeración histórica de dos estados queda **ampliada posteriormente** a tres mediante `parcial`; `fuente: null` sigue obligatoria para `sin_datos`. |
| 08/11/2026 | Añadir `parcial` y el ID global de fuente sin duplicar FoodKeeper | **Aprobado**: `estado_recomendacion` global `verificado`/`parcial`/`sin_datos`; en `parcial` (fuente externa incompleta), modos sin datos con booleano `true` pero tiempo/tips `null` y sin fecha sugerida; al completar, fuente `usuario` o `agregación`; `id_fuente` único opcional (ID como texto / `null` usuario-agregación-sin datos / `"sin_datos"` si fuente externa sin ID único). JSON Schema, catálogo y app pendientes. |
| 08/11/2026 | Aprobar clasificación editorial inicial del banco | **11 categorías**, unificando Cereales y Legumbres; Condimentos como nombre definitivo; aves→Carne, tubérculos→Verduras y pulpo/cefalópodos→Marisco. «Lácteos y huevos» se conserva aunque vacía; conservas solo caseras futuras. No crear registros comerciales; **subcategorías y esquema aún por definir**. |
| 08/11/2026 | Sustituir la clasificación editorial de 11 categorías por 4 y definir tres grupos de subcategorías | **Aprobado:** Carnes y Aves (7 subcategorías), Pescados y Mariscos (4), Frutas y Verduras (6), Despensa (**subcategorías pendientes**); «Lácteos y huevos» eliminada; hongos/algas dentro de Frutas y Verduras. En el panel **no mostrar chips de categorías sin ingredientes**. La clasificación anterior queda sustituida; no crear catálogo/esquema ni cambiar app en esta PR. |
| 08/11/2026 | Aprobar las nueve subcategorías de Despensa y su nombre visible | **Aprobado:** Arroz, Pasta, Cereales, Legumbres, Harinas, Frutos secos, Semillas, Especias y hierbas, **Conservas** (sin «caseras» en el nombre visible). El alcance sigue siendo exclusivamente conservas caseras; no productos comerciales. **Total aprobado: 4 categorías y 26 subcategorías.** Esquema, catálogo y panel pendientes. |
| 08/11/2026 | Simplificación expresa del banco doméstico: no añadir controles ajenos al uso real | **Aprobado:** el banco solo precarga información opcional; modo libre permanente; cualquier dato precargado editable. `verificado`/`parcial`/`sin_datos` son **metadatos informativos**, nunca permisos de etiquetado o impresión. Sin plazo no hay fecha sugerida pero se admite edición manual. Los criterios de selección editorial del banco no limitan el formulario libre; no inventar nuevos bloqueos. |
| 08/11/2026 | Implementar JSON Schema mínimo del banco, sin poblarlo | **Creado** `ingredientes-v1/banco/catalogo.schema.json`, Draft 2020-12, con raíz `ingredientes[]`, 4 categorías y 26 subcategorías, 22 campos de ficha y tres estados globales. Una ficha `sin_datos` no requiere rellenar métodos; fichas `parcial`/`verificado` conservan los cuatro métodos y tiempos solo en días. No aplica restricciones a las etiquetas libres ni al formulario editable; catálogo y UI siguen pendientes. |
| 08/11/2026 | Banco inicial de seis ingredientes y UX de Pequeña | **Implementado en laboratorio:** `catalogo.json` con carne picada de ternera, pulpo, patata, lechuga, orejones (alias albaricoques deshidratados) y salsa de tomate. Chips libre/banco, panel inferior/lateral, filtros, precarga editable, estados separados, fecha sugerida y restitución; selector de Pequeña ampliado a Despensa y Conserva. QA sintética; pendiente revisión visual y física. |
| Futuro | Etiquetas de tarros, sesiones, favoritos, reimpresión, datos de cuenta | Propuestas por concretar |

**Este documento debe actualizarse en la misma PR que cambie el alcance o acepte nuevas decisiones; no esperar a recordar el contexto conversacional.**
