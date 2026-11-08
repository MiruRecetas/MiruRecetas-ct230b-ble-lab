# FoodKeeper ES · archivo fuente original (solo consulta)

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

No hay todavía **`catalogo.json`** ni registros creados por esta operación. Tampoco se cambia el original [FoodKeeper](fuentes/foodkeeper-es-original.json).

## Catálogo mínimo experimental: seis ingredientes (08/11/2026)

El archivo [**`catalogo.json`**](catalogo.json) ya está creado y contiene **seis fichas**. Es un conjunto inicial para probar la interfaz, no el banco definitivo ni una obligación de registrar nuevos alimentos.

| Ingrediente | Clasificación | Estado y fuente | Plazos actualmente disponibles |
|---|---|---|---|
| Carne picada de ternera | Carnes y Aves / Vacuno | `parcial`, FoodKeeper `59` | Refrigeración **2 días**; congelación **90 días** |
| Pulpo | Pescados y Mariscos / Cefalópodos | `sin_datos` | Ninguno, `null` |
| Patata | Frutas y Verduras / Tubérculos | `parcial`, FoodKeeper `297` | Refrigeración **14 días**; despensa **sin plazo fijado** (rango 1–2 meses en la fuente) |
| Lechuga | Frutas y Verduras / Verduras de hoja | `parcial`, FoodKeeper `290` | Refrigeración **14 días** (iceberg o romana) |
| Orejones | Frutas y Verduras / Frutas | `parcial`, FoodKeeper `379` | Despensa **180 días**; sinónimo «Albaricoques deshidratados» |
| Salsa de tomate | Despensa / Conservas | `sin_datos` | Ninguno, `null` |

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

**Estado:** el [JSON Schema](catalogo.schema.json) y el [catálogo mínimo de seis fichas](catalogo.json) existen; chips y panel están **implementados en laboratorio, pendientes de revisión visual**, y el catálogo definitivo aún no está poblado. Véase el [protocolo canónico](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
