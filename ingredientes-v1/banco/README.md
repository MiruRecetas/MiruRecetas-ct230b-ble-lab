# FoodKeeper ES · archivo fuente original (solo consulta)

> **Decisión posterior 08/11/2026:** la UI del banco muestra únicamente
> conservaciones aplicables a cada ficha. Ya no se ofrecen métodos desconocidos
> por el mero hecho de tener un booleano, y `false` expresa «no ofrecido
> para esta presentación en el banco». Carne (FoodKeeper 59) y lechuga
> (FoodKeeper 290) quedan `verificado` con fuente global `agregación` por
> combinar plazos originales con exclusiones editoriales aprobadas; sus IDs
> se preservan aquí aunque `id_fuente` en el derivado sea `null`.
> Pulpo y salsa de tomate siguen archivados `sin_datos`, pero no son
> seleccionables sin una modalidad documentada. Fuente FoodKeeper original
> inalterada. La interfaz no enlaza el JSON bruto; la documentación mantiene
> su procedencia. Véase [contrato corregido](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
>

**Estado (08/11/2026):** archivo español facilitado por la usuaria, conservado **sin alteraciones** como referencia para construir un banco **derivado y editorialmente propio de MiruRecetas**. No es todavía el catálogo de búsqueda ni se usa para imprimir etiquetas.

- Archivo original: [`fuentes/foodkeeper-es-original.json`](fuentes/foodkeeper-es-original.json).
- Tamaño de los bytes originales: **716.677 bytes**.
- SHA-256 original: `2a25209edc1d578f1f0002a0a896c54c26611a4d986c46ebcdc156554190687b`.
- Git blob SHA original verificado: `2bb80fb602690984e5218a69e0f5411f4370ddcc`.
- Nombre del XLSX de procedencia incluido en el JSON: `FMA-Data-v128.xlsx`; hoja de versiones, entrada `128` fechada `09-06-2018`. Este dato describe **la versión del archivo aportado**, no una afirmación de vigencia actual de FoodKeeper.
- Enlaces de procedencia facilitados por la usuaria: https://www.foodsafety.gov/keep-food-safe/foodkeeper-app , https://catalog.data.gov/dataset/fsis-foodkeeper-data y http://www.fsis.usda.gov/shared/data/ES/foodkeeper.json .
- Estructura del archivo: `Version` (21 registros), `Category` (25), `Product` (662, IDs únicos), `CookingTips` (93), `CookingMethods` (89), `Data Dictionary` (62).
- Los `Product` enlazan con las categorías mediante `Category_ID`, que refiere a `Category.ID`. El documento original representa cada fila como **array de diccionarios de una sola clave**: el importador del catálogo derivado tendrá que aplanarlos antes de interpretarlos.

## Clasificación original de FoodKeeper (sin trasladar a la UI)

| Categoría principal original | Grupos con ID propio y registros | Total |
|---|---|---:|
| Comida para Bebés | General 7 | 7 |
| Productos Horneados | Pastelería/Repostrería 23; Hornear y Cocinar 53; Masas Refrigeradas 7 | 83 |
| Bebidas | General 34 | 34 |
| Salsas y Condimentos | General 53 | 53 |
| Productos Lácteos y Huevos | General 46 | 46 |
| Alimentos Comerciales Congelados | General 25 | 25 |
| Granos, Frijoles y Pastas | General 30 | 30 |
| Carnes | Frescos 49; Productos No Perecederos 6; Ahumado o Procesado 31; Rellenos o Alimentos Ensamblados 2 | 88 |
| Aves | Cocinado o Procesado 6; Frescos 16; Productos No Perecederos 2; Rellenos o Alimentos Ensamblados 3 | 27 |
| Productos Frescos | Frutas Frescas 33; Vegetales Frescos 68 | 101 |
| Mariscos y Pescados | Frescos 6; Mariscos 13; Ahumado 5 | 24 |
| Alimentos No Perecederos | General 104 | 104 |
| Proteínas Vegetarianas | General 5 | 5 |
| Fiambres y Comidas Preparadas | General 35 | 35 |
| **Total** | **25 grupos (Category.ID)** | **662** |

La tabla conserva los nombres de categorías de origen, incluidas las expresiones no habituales en español de España. La clasificación, denominaciones y número de registros que aparezcan en el **catálogo derivado** serán decisiones editoriales propias de MiruRecetas.

## Clasificación vigente: cuatro categorías (08/11/2026)

La tabla que figura más arriba con 14 categorías es únicamente **FoodKeeper original**. MiruRecetas ha sustituido su clasificación previa de 11 categorías por **cuatro categorías y 26 subcategorías aprobadas**:

| Categoría | Subcategorías aprobadas |
|---|---|
| **Carnes y Aves** | Vacuno; Porcino; Ovino; Pollo; Pavo; Otras aves; Caza |
| **Pescados y Mariscos** | Pescado blanco; Pescado azul; Crustáceos y moluscos; Cefalópodos |
| **Frutas y Verduras** | Frutas; Hortalizas; Verduras de hoja; Tubérculos; Hongos; Algas |
| **Despensa** | Arroz; Pasta; Cereales; Legumbres; Harinas; Frutos secos; Semillas; Especias y hierbas; Conservas |

**Panel de selección:** **los chips de categorías sin ningún ingrediente registrado seleccionable no aparecen**, aun cuando esas categorías existan en la taxonomía. No crear alimentos de relleno; presentar solo chips con contenido.

Aves quedan dentro de Carnes y Aves; pulpo dentro de Cefalópodos; hongos y algas dentro de Frutas y Verduras. Se **elimina Lácteos y huevos** del banco, por no utilizarse con ingredientes a granel para etiquetar. La antigua clasificación de Cereales y Legumbres, Frutos secos y semillas, Condimentos y Conservas queda sustituida por **Despensa**, con **nueve subcategorías aprobadas**. La denominación visible será simplemente **«Conservas»**; su contenido se limitará exclusivamente a conservas caseras en una fase futura, no a conservas comerciales. No incorporar productos comerciales envasados (incluidos sal, vinagre, grasas/aceites o proteínas vegetales comerciales); las masas/preparaciones de otros formatos tampoco pertenecen aquí. Aún no se ha creado el JSON derivado ni implementado la UI.

## Uso doméstico: el banco solo ayuda a rellenar etiquetas (08/11/2026)

**No añadir restricciones funcionales que la usuaria no haya pedido.** El etiquetado libre de Pequeña sigue disponible siempre; seleccionar un ingrediente del banco **solo precarga campos editables**. El banco es una colección sencilla de datos para evitar escribir a mano, **no un sistema de aprobación de lo que se puede etiquetar**. Los estados globales `verificado`, `parcial` y `sin_datos` son **metadatos del catálogo, no permisos de impresión**. Si falta plazo (`null`), no hay sugerencia automática de fecha, pero la usuaria puede completar los datos manualmente y utilizar la etiqueta. Las reglas sobre qué fichas se añaden al banco (como no poblarlo con productos comerciales) son solo **selección editorial del banco** y no restringen las etiquetas libres. Conservar las validaciones técnicas existentes de impresión, sin crear controles adicionales de contenido, procedencia o seguridad alimentaria.

## JSON Schema del catálogo (creado 08/11/2026)

[**`catalogo.schema.json`**](catalogo.schema.json) define el almacenamiento mínimo en **JSON Schema Draft 2020-12**. El catálogo que se creará después tiene raíz `{"ingredientes":[]}` y puede empezar vacío. **Crear el esquema no significa que exista ya un catálogo poblado ni que el panel esté implementado.**

- Contiene las **4 categorías y 26 subcategorías aprobadas** y el ID tipo `CAR-VAC-001` (siglas de categoría, siglas de subcategoría y número).
- Incluye identidad, `presentacion` opcional como `null`, `sinonimos` como lista, estado/fuente/ID de fuente **globales**, cuatro modos de conservación y tips, y `tips_preparacion_conservacion` para posible uso futuro.
- Para fichas `verificado`/`parcial` pide los cuatro métodos con sus tiempos en **días** y consejos. Método no disponible (`false`) → tiempo y tip `null`; método pendiente en ficha `parcial` → `true`, días y tips `null`. En `sin_datos` **no obliga a inventar valores de conservación**: los modos todavía pueden omitirse.
- `fuente` e `id_fuente` son una pareja única por ficha, no por método. En `sin_datos`, ambos `null`; cuando `fuente` es `usuario` o `agregación`, `id_fuente` es `null`.
- **No modifica ni gobierna el uso de las etiquetas libres**: el banco solo precarga campos editables y un plazo desconocido no genera fecha automática. Los criterios editoriales de selección del banco no son prohibiciones de etiquetado.

Esta frase describía la fase histórica de diseño del esquema. **Estado vigente:** `catalogo.json` existe y contiene **17 fichas** (5 Vacuno, 2 Ovino, 5 Porcino y 5 en otras subcategorías). El original [FoodKeeper](fuentes/foodkeeper-es-original.json) permanece sin cambios.

## Catálogo inicial de seis ingredientes (histórico, 08/11/2026)

El archivo [**`catalogo.json`**](catalogo.json) se creó inicialmente con **seis fichas**. Esta tabla documenta la primera fase experimental; el catálogo alcanzó **diez fichas** con la primera ampliación de vacuno y ahora contiene **17**, tras incorporar también cordero y cerdo.

| Ingrediente | Clasificación | Estado y fuente | Plazos actualmente disponibles |
|---|---|---|---|
| Carne picada de ternera | Carnes y Aves / Vacuno | `verificado`, `agregación` (plazos FoodKeeper `59` y exclusiones editoriales) | Refrigeración **2 días**; congelación **90 días** |
| Pulpo | Pescados y Mariscos / Cefalópodos | `sin_datos` | Ninguno, `null` |
| Patata | Frutas y Verduras / Tubérculos | `parcial`, FoodKeeper `297` | Refrigeración **14 días**; despensa **sin plazo fijado** (rango 1–2 meses en la fuente) |
| Lechuga | Frutas y Verduras / Verduras de hoja | `verificado`, `agregación` (plazo FoodKeeper `290` y exclusiones editoriales) | Refrigeración **14 días** (iceberg o romana) |
| Orejones | Frutas y Verduras / Frutas | `parcial`, FoodKeeper `379` | Despensa **180 días**; sinónimo «Albaricoques deshidratados» |
| Salsa de tomate | Despensa / Conservas | `sin_datos` | Ninguno, `null` |

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

## Ampliación autorizada · cordero y cerdo (08/11/2026, histórico)

La usuaria confirmó **8 Product.ID originales de FoodKeeper ES** en
`Category.ID=10` (Carnes → Frescos). Se incorporan como **7 fichas
de carne cruda a granel** en las subcategorías ya aprobadas **Ovino**
y **Porcino**. No se importan elaboraciones cocinadas ni productos
comerciales. **Fuente canónica original:** el archivo
[`foodkeeper-es-original.json`](fuentes/foodkeeper-es-original.json)
(v128), que permanece sin alteraciones.

| ID MiruRecetas | Subcategoría | Nombre visible | Presentación | Product.ID originales | Nevera | Congelación |
|---|---|---|---|---|---:|---:|
| `CAR-OVI-001` | Ovino | Paletilla de lechazo | Pieza entera | 48 | 5 días | 120 días |
| `CAR-OVI-002` | Ovino | Chuletillas de lechazo | `null` | 51 | 5 días | 120 días |
| `CAR-POR-001` | Porcino | Lomo de cerdo | `null` | 61 | 5 días | 120 días |
| `CAR-POR-002` | Porcino | Solomillo de cerdo | `null` | **67 y 69, unificados** | 5 días | 120 días |
| `CAR-POR-003` | Porcino | Costillas de cerdo | `null` | 72 | 5 días | 120 días |
| `CAR-POR-004` | Porcino | Carne picada de cerdo | Picada | 73 | **2 días** | **90 días** |
| `CAR-POR-005` | Porcino | Cerdo para guisar | Dados | 75 | **2 días** | **90 días** |

**Contraste del FoodKeeper original:**

- ID **48, 51, 61, 67, 69 y 72**: `DOP_Refrigerate`
  **3–5 días**; `DOP_Freeze` **4–12 meses**. Conforme al protocolo
  editorial del banco (máximo de frío y mínimo de congelación,
  1 mes = 30 días), se registran **5 y 120 días**.
- ID **73** (cerdo molido/picado): refrigeración **1–2 días**,
  congelación **3–4 meses**: se registran **2 y 90 días**. La
  [tabla oficial de FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts)
  confirma que la carne picada de cerdo comparte estos intervalos
  con otras carnes molidas.
- ID **75**, `Cerdo — Lomo, cubos`: el original afirma **3–5 días**
  y **4–12 meses**, pero las guías específicas para **carne cruda
  troceada para guisar** de
  [University of Nebraska Extension](https://food.unl.edu/free-resource/food-storage/)
  y de la [USDA, Refrigeration and Food Safety](https://irp.cdn-website.com/946d72ef/files/uploaded/USDA-Meat-Poultry-Guidelines.pdf)
  establecen **1–2 días** de refrigeración y **3–4 meses** de
  congelación. Se adopta el extremo operativo **2 y 90 días** para
  los **dados de carne cruda**, como ya se hizo para la ternera en
  dados. No se reescriben ni atribuyen estos números al ID 75.

**Solomillo de cerdo, IDs 67 y 69:** son el mismo músculo
(`Pork, tenderloin`), el segundo cortado en medallones.
Los dos registros tienen **exactamente los mismos rangos** de
refrigeración y congelación. Se crea **una única ficha**
`CAR-POR-002` con `presentacion: null` y sinónimos para
«solomillo entero» y «medallones de solomillo de cerdo»;
no se duplica por el formato de corte. Dado que el esquema propio
admite **una sola fuente y un solo ID por ficha**, la fuente global
es `"FoodKeeper"` y el ID principal del registro es `"67"`;
el **ID 69 queda conservado explícitamente aquí** como
correspondencia del segundo original. Los rangos no se extrapolan
a carne picada ni a pequeños dados para guisar.

**Fuente y estado globales:** `verificado` en las siete fichas,
que significa únicamente que sus modalidades editoriales se han
revisado, no una certificación alimentaria. Para las seis fichas
con intervalo directamente derivado de FoodKeeper se usa
`fuente: "FoodKeeper"` e ID como texto (48, 51, 61, 67, 72, 73).
Para **dados de lomo** (`CAR-POR-005`) se guarda
`fuente: "agregación"` e `id_fuente: null`,
con ID **75** y las otras guías registrados en este expediente;
ningún origen múltiple se improvisa en el esquema.

**Modalidades:** todas habilitan exclusivamente refrigeración y
congelación; despensa y conserva casera llevan `false` y
sus días y consejos `null`. Los originales no aportan notas
específicas para estos cortes, por lo que los `tips` activos
se almacenan como `""` y la UI existente aplica las notas
editoriales editables «Conservar en nevera» y «Descongelar en nevera».
`tips_preparacion_conservacion` es `null`. Estas exclusiones son
para la **presentación de carne fresca y cruda** de estas fichas,
no para conservas con tratamiento y método validados.

**Condiciones:** conservar en nevera a **4 °C o menos** y congelar a
**−18 °C o menos**. Los límites de congelación son orientativos de
**calidad**, no garantías de inocuidad; no se añaden días por
envasado doméstico al vacío ni se reinicia el plazo al reenvasar.
La fecha base sigue siendo compra o preparación, según el contrato
doméstico. Solo se añadieron datos, pruebas y documentación:
**ninguna plantilla, modal, motor, raster, TSPL ni BLE cambia**.

**Estado actual del catálogo:** **17 fichas**, con 5 Vacuno, 2 Ovino,
5 Porcino y 5 de otras subcategorías (algunas aún en borrador).
Siguiente fase: nuevas selecciones explícitas por subcategoría.

## Ampliación autorizada · cuatro cortes de vacuno (08/11/2026)

La usuaria ha confirmado expresamente la incorporación de **FoodKeeper Product.ID 36, 37, 40 y 41** a la categoría **Carnes y Aves → Vacuno**. Son **cortes frescos y crudos**, no asados preparados, estofados cocinados ni conservas. Se registran como ingredientes a granel; no corresponden a productos comerciales. Se mantiene intacto el archivo [FoodKeeper ES original](fuentes/foodkeeper-es-original.json).

| ID MiruRecetas | Nombre visible (es-ES) | Denominación fuente / alias | FoodKeeper Product.ID |
|---|---|---|---:|
| `CAR-VAC-002` | **Redondo de ternera** | Asado redondo | 36 |
| `CAR-VAC-003` | **Solomillo de ternera** | Lomillo, entero (beef tenderloin, whole) | 37 |
| `CAR-VAC-004` | **Filetes de ternera** | Filetes | 40 |
| `CAR-VAC-005` | **Ternera para guisar** | Carne para guisar (stew cubes) | 41 |

**Normalización editorial posterior, autorizada por la usuaria (08/11/2026):**
los nombres visibles usan «ternera» de forma uniforme en la subcategoría
Vacuno, manteniendo inalterados los ID y el origen real de FoodKeeper.
Las presentaciones aprobadas quedan exactamente así:

| Ficha | `presentacion` | Interpretación editorial |
|---|---|---|
| Redondo de ternera | `"Pieza entera"` | Pieza cruda entera |
| Solomillo de ternera | `null` | Una sola ficha tanto para pieza entera como para **medallones crudos de 3–4 cm**; no crear duplicado |
| Filetes de ternera | `"Filetes"` | Filetes crudos |
| Ternera para guisar | `"Dados"` | Carne cruda troceada en dados para guiso |

**Contraste de solomillo:** la tabla oficial de [FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts)
incluye vacuno/ternera frescos tanto en filetes como en piezas para asar
en los mismos intervalos (**3–5 días** de refrigeración y **4–12 meses**
de congelación). Así, los medallones que siguen siendo **cortes
musculares enteros, sin picar** pueden compartir los **5/120 días**
operativos del solomillo entero; el grosor de 3–4 cm no exige un
registro distinto. Esto no se extrapola a carne picada, guiso en dados
ni carne previamente manipulada o reenvasada con tiempos consumidos.
La refrigeración requiere 4 °C o menos y los plazos congelados son
orientativos de calidad a −18 °C.

**Precisión sobre los nombres de origen:** FoodKeeper ES conserva
`Name: "Carne de Res"` (`beef`) para los ID 36/37/40/41;
`"Ternera"` (`veal`) figura en otros registros del archivo.
La traducción «ternera» es **la etiqueta editorial elegida** en el banco
doméstico, **no una afirmación de que FoodKeeper clasifique esos cuatro
IDs como `veal`**, ni sustituye la denominación legal de venta de una
pieza concreta en España. La procedencia permanece trazable y los
intervalos frescos de filetes/asados son comunes a `beef` y `veal`
en FoodSafety.gov. Se mantienen los sinónimos anteriores para buscar
sin duplicar fichas.

**Datos originales contrastados:** para cada producto, `DOP_Refrigerate_Min=3`, `DOP_Refrigerate_Max=5`, unidad `Días`; `DOP_Freeze_Min=4`, `DOP_Freeze_Max=12`, unidad `Meses`. En todos están vacíos los consejos propios de refrigeración/congelación y los campos de despensa. El origen `DOP` remite a fecha de compra; en el flujo doméstico aprobado **envasado = compra o preparación** (no reiniciar plazos al reenvasar).

**Selección canónica de plazos:** en **Redondo, Solomillo y Filetes (IDs 36, 37, 40)**, refrigeración = **5 días** (máximo de 3–5) y congelación = **120 días** (mínimo de 4–12 meses; 4 × 30 días). **Carne para guisar cruda en dados (ID 41)** presenta una discrepancia importante entre el dato tabular FoodKeeper ES (`3–5 días`/`4–12 meses`) y las guías específicas de **carne para guisar troceada** (`1–2 días`/`3–4 meses`). Se elige la recomendación más específica **2 días refrigerada y 90 días congelada**. Contraste documental: [Universidad de Nebraska, tabla de almacenamiento doméstico](https://food.unl.edu/free-resource/food-storage/), [NSF, tabla de conservación](https://www.nsf.org/consumer-resources/articles/cold-frozen-food-storage) y [FoodKeeper, tabla de carne fresca](https://ifdaonline.org/wp-content/uploads/2024/02/food-keeper-2015-pdf.pdf). No silenciar ni reemplazar en el archivo original el dato divergente del ID 41.

Solo **refrigeración y congelación** aparecen en las cuatro fichas. **Despensa** y **Conserva casera** quedan `false` y con días/tips `null`: no se ofrecen para carne cruda en esta presentación, sin extender esta exclusión a un proceso industrial o a una receta transformada con método validado.

**Metadatos:** estado `verificado` para el conjunto editorial de modos ya decidido; en IDs 36, 37 y 40, `fuente: "FoodKeeper"` e `id_fuente` como texto (`"36"`, `"37"`, `"40"`). Para ID 41, por la combinación contrastada de fuentes, `fuente: "agregación"` e `id_fuente: null`; el **ID FoodKeeper 41** queda documentado en esta tabla, sin añadir más campos al JSON. Las modalidades habilitadas llevan `tips_refrigeracion: ""` y `tips_descongelacion: ""`, porque el FoodKeeper original no aporta consejos individuales para estos cuatro productos: la UI aplica las notas editoriales existentes «Conservar en nevera» y «Descongelar en nevera» (no atribuirlas a FoodKeeper). La recomendación de descongelar en nevera es coherente con [AESAN](https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/seguridad_alimentaria/congelar_descongelar.pdf). `tips_preparacion_conservacion` continúa `null` por ausencia de consejo específico de esos productos.

Los plazos de congelación indican principalmente **calidad a −18 °C**, no fecha garantizada de seguridad. La conservación en frío requiere cadena de frío adecuada; **el envasado doméstico al vacío no amplía por sí mismo ningún plazo**. El modo **Ingrediente libre** sigue completamente independiente. La ampliación solo afecta a `catalogo.json`, pruebas y documentación: no modifica el panel, fichas visuales, JS de impresión ni otros repositorios.

**Sin extrapolaciones:** la fuente FoodKeeper 297 solo aporta congelación para patatas cocidas y machacadas (no patatas enteras). Para lechuga se concreta la presentación iceberg/romana. Pulpo no tiene ficha propia en el archivo y «Salsa de tomate» no implica automáticamente una conserva procesada concreta: no asignar plazos que no corresponden. Se conserva el [original de FoodKeeper](fuentes/foodkeeper-es-original.json) sin alteraciones. El campo fuente es **global de la ficha**.

**Interfaz ya implementada en laboratorio:** [`../banco-ui.js`](../banco-ui.js) + chips bajo el selector de Pequeña, buscador por nombre/sinónimos, chips solo de categorías con datos, filtro de subcategoría y panel inferior vertical/lateral horizontal. Solo «Aplicar a etiqueta» modifica los campos, todos editables. Hay dos borradores recuperables: libre/banco. El selector existente de Pequeña admite Despensa y Conserva. Recalcula días desde envasado mientras la fecha sugerida no haya sido modificada manualmente; se puede restablecer. Sin plazo, no inventar fecha ni impedir introducirla a mano. **Pendiente de revisión visual de la usuaria y ensayos físicos; no afecta a Compacta/Amplia ni producción.**

## Contrato vigente para el catálogo derivado (08/11/2026)

La clasificación de la tabla anterior es **solo original FoodKeeper**; no forma parte de la UI ni se importará completa. El futuro JSON **MiruRecetas** tendrá categorías/subcategorías/nombres es-ES y se limita a **ingredientes reales comprados a granel**, como carnes, pescados, mariscos, verduras, frutas o frutos secos; también contempla, más adelante, **conservas caseras**. **Según la selección editorial aprobada, el banco no incluirá fichas de productos comerciales envasados**; esto no restringe lo que puede escribirse en modo libre. Compacta y Amplia conservan sus usos independientes.

**Sin duplicación de FoodKeeper:** este archivo original se mantiene intacto para referencia; el catálogo derivado guardará solo el ID estable MiruRecetas, categoría, subcategoría, nombre, una **presentación** opcional (no «preparación» duplicada) y datos mínimos de los modos de conservación. Sin intervalos originales, unidades de origen, campos de FoodKeeper, condiciones comerciales, fichas largas ni estado separado del alimento. **Se incluyen desde el principio** `sinonimos` (array de texto; `[]` si no hay alias) y `tips_preparacion_conservacion` (texto corto o `null`; consejo anterior al almacenamiento, congelación o envasado). Este último se **reserva para la web futura** y no se muestra en el panel ni se imprime por ahora.

**Fecha base canónica:** envasado = compra o preparación, en el flujo doméstico de una sola etiqueta por ingrediente. El selector de tipo de conservación existente decide si se usa refrigeración o congelación; no se registra un historial de apertura, descongelación o estados sucesivos.

**Selección del plazo FoodKeeper aplicable:**
- Refrigeración: **valor máximo** del rango publicado (objetivo reducir desperdicio).
- Congelación: **valor mínimo** del rango publicado (objetivo preservar calidad).
- Convertir al incorporar: **semana = 7 días; mes = 30 días**. Todos los valores del JSON derivado se expresarán en **días enteros**; no almacenar ni el rango ni su unidad en el catálogo propio.
- El **envasado al vacío** es habitual en MiruRecetas, pero **no añade automáticamente días** sobre FoodKeeper. Los periodos son orientativos para calidad y no garantías de seguridad; preservar correctamente la cadena de frío sigue siendo necesario.
- Si el registro fuente no ofrece un dato aplicable, mantener el plazo `null`. No interpretar la ausencia de datos como «no recomendado» ni inventar valores. Una sola fuente **global por ficha** y, cuando exista, un único `id_fuente`: p. ej. `fuente: "FoodKeeper"`, `id_fuente: "59"`; no registrar procedencia por método. AESAN puede usarse para contrastar.
- Para el futuro modo **conserva casera**, no aplicar plazos de conservas industriales a procesos domésticos sin instrucciones validadas.

**Metadatos de la ficha global, NO por conservación:**
- `estado_recomendacion`: exactamente **`verificado` / `parcial` / `sin_datos`**, **una vez por ingrediente**. `verificado` significa información de todos los métodos fijada y aprobada; `parcial` significa que una fuente externa aporta datos de algunos métodos, no de todos; `sin_datos` significa ficha nueva aún sin información aprobada.
- `fuente`: **una sola por ficha** y no una por método. Obligatoria si `verificado` o `parcial`; `null` si `sin_datos`. Si la usuaria completa una ficha previamente parcial por instrucciones propias, cambiar a `fuente: "usuario"`; si combina varias fuentes, usar `fuente: "agregación"`.
- `id_fuente`: **un único texto o `null`**. Con fuente `FoodKeeper`, su `Product.ID` original, por ejemplo `"59"`; con `usuario`, `agregación` o ficha `sin_datos` global, `null`; con una fuente externa única sin IDs propios, usar el **literal `"sin_datos"`**, que *solo* indica falta de identificador en esa fuente y no cambia `estado_recomendacion`. Sin listas de fuentes, ni IDs por método, ni copia de campos originales.

**Metadatos de los métodos:** los cuatro booleanos de refrigeración, congelación, despensa y conserva mantienen su propia información de tiempo en días y tips cortos. En una ficha **`parcial`**, para cada método sin información de la fuente externa, el booleano debe ser **`true`** y sus tiempo/tips deben ser **`null`** (todos los consejos correspondientes), conforme a la decisión de la usuaria. Así el modo puede seleccionarse en la etiqueta, **pero sin cálculo de fecha ni recomendación informativa** hasta fijar un plazo. `false` únicamente cuando la ficha contiene esa decisión conocida para el método; no usarlo como sustituto de falta de datos. Para `verificado`, todos los métodos tienen datos fijados/aprobados, incluida la posibilidad de `false`. Las fichas `sin_datos` no generan fechas ni recomendaciones y el futuro JSON Schema definirá cómo guardar sus booleanos de borrador sin darles validez aparente.

Para congelación, `tip_descongelacion` puede aplicarse a la nota de etiqueta; el previo `tips_preparacion_conservacion` está reservado para una sección futura de la web. `null` en tips que no proceden; `""` solo si la recomendación de un método habilitado está completa pero no necesita consejo. **No hay estados ni fuentes particulares por conservación**.

**Fecha y nota:** tras «Aplicar a etiqueta», la fecha de consumo preferente se propone sumando `tiempo_dias` a la fecha de envasado; cambia cuando se modifica el envasado **hasta que el usuario edite manualmente el consumo preferente**, y podrá restablecerse a la sugerencia. Nota breve: `Tiempo recomendado: N días`, no impresa. No añadir explicaciones extensas al panel de selección.

**Ejemplo del original:** `FoodKeeper Product.ID=59` («Ternera — Carne molida») tiene `DOP_Refrigerate=1–2 días` y `DOP_Freeze=3–4 meses`. La futura ficha `CAR-VAC-001` usará **2 días** de refrigeración y **90 días** de congelación; la referencia fuente bastará para consultar de nuevo los campos originales.

**Estado vigente:** el [JSON Schema](catalogo.schema.json) y el [catálogo de diecisiete fichas](catalogo.json) existen; hay cinco registros de Vacuno, dos de Ovino y cinco de Porcino. Los chips y el panel están implementados en laboratorio, sin alteraciones durante los lotes de carne. La población de las restantes subcategorías sigue pendiente. Véase el [protocolo canónico](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
