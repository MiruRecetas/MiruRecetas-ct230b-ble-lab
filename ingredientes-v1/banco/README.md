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

## Contrato vigente para el catálogo derivado (08/11/2026)

La clasificación de la tabla anterior es **solo original FoodKeeper**; no forma parte de la UI ni se importará completa. El futuro JSON **MiruRecetas** tendrá categorías/subcategorías/nombres es-ES y se limita a **ingredientes reales comprados a granel**, como carnes, pescados, mariscos, verduras, frutas o frutos secos; también contempla, más adelante, **conservas caseras**. **Nunca se etiquetarán productos comerciales envasados** en esta función. Compacta y Amplia conservan sus usos independientes.

**Sin duplicación de FoodKeeper:** este archivo original se mantiene intacto para referencia; el catálogo derivado guardará solo el ID estable MiruRecetas, categoría, subcategoría, nombre, una **presentación** opcional (no «preparación» duplicada) y datos mínimos de los modos de conservación. Sin intervalos originales, unidades de origen, campos de FoodKeeper, condiciones comerciales, fichas largas ni estado separado del alimento. **Se incluyen desde el principio** `sinonimos` (array de texto; `[]` si no hay alias) y `tips_preparacion_conservacion` (texto corto o `null`; consejo anterior al almacenamiento, congelación o envasado). Este último se **reserva para la web futura** y no se muestra en el panel ni se imprime por ahora.

**Fecha base canónica:** envasado = compra o preparación, en el flujo doméstico de una sola etiqueta por ingrediente. El selector de tipo de conservación existente decide si se usa refrigeración o congelación; no se registra un historial de apertura, descongelación o estados sucesivos.

**Selección del plazo FoodKeeper aplicable:**
- Refrigeración: **valor máximo** del rango publicado (objetivo reducir desperdicio).
- Congelación: **valor mínimo** del rango publicado (objetivo preservar calidad).
- Convertir al incorporar: **semana = 7 días; mes = 30 días**. Todos los valores del JSON derivado se expresarán en **días enteros**; no almacenar ni el rango ni su unidad en el catálogo propio.
- El **envasado al vacío** es habitual en MiruRecetas, pero **no añade automáticamente días** sobre FoodKeeper. Los periodos son orientativos para calidad y no garantías de seguridad; preservar correctamente la cadena de frío sigue siendo necesario.
- Si el registro fuente no ofrece un dato aplicable, mantener el plazo `null`. No interpretar la ausencia de datos como «no recomendado» ni inventar valores. Fuente por recomendación, concisa: `FoodKeeper:59`, identificador de otra fuente, o indicación expresa del usuario. AESAN puede usarse para contrastar.
- Para el futuro modo **conserva casera**, no aplicar plazos de conservas industriales a procesos domésticos sin instrucciones validadas.

**Metadatos por conservación:** booleano `disponible`, `tiempo_dias` como entero positivo o `null`, `tip` de texto corto o `null`, `estado_recomendacion` **solo `verificado` / `sin_datos`** y `fuente` breve. Para congelación, `tip_descongelacion` puede usarse en la nota de la etiqueta; el consejo **previo** `tips_preparacion_conservacion` se almacena para uso futuro sin mostrarse ahora. `null` en tips cuando no corresponden; cadena vacía `""` para un modo disponible sin consejo. 

**Interpretación inequívoca de los dos estados:** `disponible=true`, `estado_recomendacion=verificado`, `tiempo_dias>0` y fuente identificada permiten calcular fecha. Una fuente que indique expresamente que no recomienda cierto método se representa con `disponible=false`, `estado_recomendacion=verificado`, `tiempo_dias=null` y la referencia de esa fuente. Ausencia de datos: `disponible=false`, `estado_recomendacion=sin_datos`, `tiempo_dias=null`, `fuente=null`. La fuente identifica quién define la recomendación: FoodKeeper, otra publicación o `usuario` para un dato establecido expresamente por la usuaria, sin presentarlo como validación científica externa. No inventar tiempos ni añadir un tercer estado.

**Fecha y nota:** tras «Aplicar a etiqueta», la fecha de consumo preferente se propone sumando `tiempo_dias` a la fecha de envasado; cambia cuando se modifica el envasado **hasta que el usuario edite manualmente el consumo preferente**, y podrá restablecerse a la sugerencia. Nota breve: `Tiempo recomendado: N días`, no impresa. No añadir explicaciones extensas al panel de selección.

**Ejemplo del original:** `FoodKeeper Product.ID=59` («Ternera — Carne molida») tiene `DOP_Refrigerate=1–2 días` y `DOP_Freeze=3–4 meses`. La futura ficha `CAR-VAC-001` usará **2 días** de refrigeración y **90 días** de congelación; la referencia fuente bastará para consultar de nuevo los campos originales.

**Estado:** estas decisiones están registradas, pero el JSON derivado, el esquema y el panel **no se han creado todavía**. Véase el [protocolo canónico](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
