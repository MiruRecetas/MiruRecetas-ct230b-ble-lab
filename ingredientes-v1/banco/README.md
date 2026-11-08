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

La tabla que figura más arriba con 14 categorías es únicamente **FoodKeeper original**. MiruRecetas ha sustituido su clasificación previa de 11 categorías por **cuatro**:

| Categoría | Subcategorías aprobadas |
|---|---|
| **Carnes y Aves** | Vacuno; Porcino; Ovino; Pollo; Pavo; Otras aves; Caza |
| **Pescados y Mariscos** | Pescado blanco; Pescado azul; Crustáceos y moluscos; Cefalópodos |
| **Frutas y Verduras** | Frutas; Hortalizas; Verduras de hoja; Tubérculos; Hongos; Algas |
| **Despensa** | **Sin subcategorías aprobadas todavía**; presentar propuesta antes de fijarlas |

**Panel de selección:** **los chips de categorías sin ningún ingrediente registrado seleccionable no aparecen**, aun cuando esas categorías existan en la taxonomía. No crear alimentos de relleno; presentar solo chips con contenido.

Aves quedan dentro de Carnes y Aves; pulpo dentro de Cefalópodos; hongos y algas dentro de Frutas y Verduras. Se **elimina Lácteos y huevos** del banco, por no utilizarse con ingredientes a granel para etiquetar. La antigua clasificación de Cereales y Legumbres, Frutos secos y semillas, Condimentos y Conservas queda sustituida por **Despensa** con subcategorías pendientes de aprobación; conservas solo caseras en una fase futura. No incorporar productos comerciales envasados (incluidos sal, vinagre, grasas/aceites o proteínas vegetales comerciales); las masas/preparaciones de otros formatos tampoco pertenecen aquí. Aún no se ha creado el JSON derivado ni implementado la UI.

## Contrato vigente para el catálogo derivado (08/11/2026)

La clasificación de la tabla anterior es **solo original FoodKeeper**; no forma parte de la UI ni se importará completa. El futuro JSON **MiruRecetas** tendrá categorías/subcategorías/nombres es-ES y se limita a **ingredientes reales comprados a granel**, como carnes, pescados, mariscos, verduras, frutas o frutos secos; también contempla, más adelante, **conservas caseras**. **Nunca se etiquetarán productos comerciales envasados** en esta función. Compacta y Amplia conservan sus usos independientes.

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

**Estado:** estas decisiones están registradas, pero el JSON derivado, el esquema y el panel **no se han creado todavía**. Véase el [protocolo canónico](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
