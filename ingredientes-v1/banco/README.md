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

## Contrato aprobado para el catálogo derivado

1. Crear **un JSON nuevo, distinto del original**, con nuestras categorías, subcategorías y elementos; conservar identificadores o trazas hacia los `Product.ID` de FoodKeeper. No reescribir el original para adaptar su traducción o estructura.
2. Buscar **plazos de calidad** pertinentes para **refrigeración/congelación** de cada producto y condición, siguiendo el selector de conservación ya implementado en Pequeña 30×20. Los campos `Refrigerate_*`, `DOP_Refrigerate_*`, `Refrigerate_After_Opening_*`, `Refrigerate_After_Thawing_*`, `Freeze_*` y `DOP_Freeze_*` describen **contextos distintos**, no plazos intercambiables. Hay que decidir cuál es aplicable antes de calcular fechas desde el envasado.
3. Cuando FoodKeeper aporte un **intervalo válido y aplicable**, usar **siempre su extremo mínimo**, preservando valor/unidad original y la referencia al registro fuente para la información mostrada y el cálculo. Si el dato es `No Recomendado`, `Fecha de Uso`, `Indefinido`, está ausente o no corresponde a la condición real, no convertirlo en meses ficticios.
4. La fecha de consumo preferente es una **orientación para conservar la calidad** y seguirá siendo editable: en modo sugerido se recalcula al cambiar fecha de envasado; una edición manual se respeta hasta usar explícitamente `Restablecer recomendación`. Bajo las fechas, una nota breve `Tiempo recomendado: XX meses` (o unidad de origen). Estas recomendaciones no acreditan inocuidad.
5. El banco derivado, panel de chips y selección solo afectarán a **Pequeña**; Compacta, Amplia, el motor, BLE y la web de producción no se tocan. AESAN puede emplearse para contraste, nunca para sustituir o inventar un plazo específico de FoodKeeper sin una decisión explícita.

Este README documenta únicamente el **archivo de referencia y las decisiones**, no da por hecho que el catálogo derivado exista o esté aprobado. Véase el [protocolo canónico](../MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
