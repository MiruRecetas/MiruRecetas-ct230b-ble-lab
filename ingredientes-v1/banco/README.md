# FoodKeeper ES · archivo fuente original (solo consulta)

## Actualización de taxonomía: «Cereales y harinas» (10/11/2026)

Por decisión expresa de la usuaria, **Despensa > Cereales** y **Despensa > Harinas** se unifican en la única subcategoría **«Cereales y harinas»**. La clasificación vigente pasa de **28 a 27 subcategorías** (cuatro categorías principales). Se trasladan las **7 fichas de Cereales** a la subcategoría unificada; todavía no hay fichas de harinas. Ninguna ficha se elimina, se duplica ni cambia de ID, nombre, presentación, fuente o conservación. El cuscús sigue en **Pasta**.

El filtro de subcategorías se genera automáticamente a partir del catálogo: mostrará solo «Cereales y harinas» y no los dos nombres anteriores. El schema se actualiza para que los registros futuros de harinas pertenezcan a esta misma subcategoría. Las secciones previas de este README documentan las decisiones y estados de su fecha, no la taxonomía actual.

## Cereales y cuscús · selección aprobada (10/11/2026)

Se añaden **ocho fichas**: siete en **Despensa > Cereales** y una de **Cuscús seco en Despensa > Pasta**. Total: **232 fichas** (Cereales 7, Pasta 17). Se mantienen separadas las subcategorías **Cereales** y **Harinas**; no se modifica la taxonomía. No se incorporan otros cereales, harinas, presentaciones ni productos comerciales.

| Nombre | Presentación | Subcategoría | FoodKeeper original | Despensa / Nevera / Congelador (días) |
|---|---|---|---|---|
| Avena | Seca | Cereales | 375 | 365 / — / — |
| Cebada perlada | Seca | Cereales | 577 | 180 / — / 360 |
| Cebada perlada | Cocida | Cereales | Sin ID individual | — / 3 / 60 |
| Quinoa | Seca | Cereales | 425 | 730 / — / — |
| Quinoa | Cocida | Cereales | 426 | — / 6 / 180 |
| Maíz | Mazorca fresca | Cereales | 282 | — / 2 / 240 |
| Maíz | Grano seco | Cereales | 389 | 365 / — / — |
| Cuscús | Seca | Pasta | Sin ID individual | 365 / — / — |

**Nombres aprobados:** las dos fichas se denominan **Maíz**, distinguidas por presentación **Mazorca fresca** y **Grano seco**. «Maíz dulce» y «Maíz para palomitas» quedan como sinónimos, no como nombres principales.

**Correspondencia de fuentes:** FoodKeeper 375 (cereales que requieren cocción, incluye avena; 12 meses sin abrir, 6–12 meses abiertos), 577 (cebada entera, no específica perlada; 6 meses despensa y 12 meses congelación), 425 (quinoa sin cocer, 2–3 años despensa), 426 (quinoa cocida, 6–7 días nevera y 6–12 meses congelación), 282 (mazorca de maíz, 1–2 días nevera y 8 meses congelación), 389 (grano seco para palomitas, 2 años sin abrir y 1 año abierto). La ficha de **cebada perlada cocida** y la de **cuscús seco** no tienen ID específico en el original: sus tiempos son **estimaciones domésticas por analogía**, no plazos FoodKeeper individuales. Para cebada perlada seca se usa 577 solo como referencia de grupo; la presentación perlada no figura individualmente. Los tiempos son precargas editables y no sustituyen las instrucciones del envase. La mazorca fresca requiere refrigeración; no confundir con maíz en conserva o desgranado.

`tips_preparacion_conservacion` solo contiene pasos prácticos previos a almacenar (enfriar porciones cocidas o preparar la mazorca para congelación), o `null`. Los IDs de FoodKeeper no se repiten. Se mantiene intacto el archivo FoodKeeper ES original y permanecen vacías Algas, Otras aves y Caza.

## Pasta · selección y agrupación aprobadas (10/11/2026)

Se incorporan **16 fichas** en **Despensa > Pasta** (catálogo total: **224**). Se agrupan los formatos en nombres genéricos **expresamente aprobados por la usuaria**, sin crear fichas individuales para espaguetis, macarrones, fusilli, raviolis o tortellini. Las variantes cocidas solo existen para Pasta larga, Pasta corta, Pasta integral y Pasta de legumbres. El estado del resto de subcategorías no cambia.

| Nombre | Presentación | Sinónimos agrupados | Despensa / Nevera / Congelación (días) |
|---|---|---|---|
| Placas de pasta | Seca | Placas de lasaña, Placas de canelones, Láminas de lasaña, Láminas de canelones | 365 / — / — |
| Pasta larga | Seca | Espaguetis, Espagueti, Tallarines, Linguine, Fettuccine | 365 / — / — |
| Pasta larga | Cocida | Espaguetis cocidos, Tallarines cocidos | — / 5 / 30 |
| Pasta corta | Seca | Macarrones, Fusilli, Espirales, Penne, Plumas | 365 / — / — |
| Pasta corta | Cocida | Macarrones cocidos, Fusilli cocidos, Espirales cocidas | — / 5 / 30 |
| Pasta rellena | Fresca | Ravioli frescos, Raviolis frescos, Tortellini frescos | — / 2 / 60 |
| Pasta al huevo | Seca | Pasta seca al huevo | 60 / — / — |
| Fideos | Seca | Fideos para sopa, Fideos finos | 365 / — / — |
| Pasta integral | Seca | Pasta integral de trigo | 365 / — / — |
| Pasta integral | Cocida | Pasta integral cocida | — / 5 / 30 |
| Pasta de legumbres | Seca | Pasta de lentejas, Pasta de garbanzos | 365 / — / — |
| Pasta de legumbres | Cocida | Pasta de lentejas cocida, Pasta de garbanzos cocida | — / 5 / 30 |
| Noodles de arroz | Seca | Fideos de arroz secos, Noodles de arroz secos | 365 / — / — |
| Fideos Soba | Seca | Fideos soba secos | 365 / — / — |
| Fideos Udon | Fresca | Udon fresco, Noodles udon frescos | — / 2 / 60 |
| Ñoquis | Fresca | Ñoquis de patata frescos, Gnocchi frescos | — / 2 / 60 |

**FoodKeeper original:** 335 pasta seca sin huevo (2 años sin abrir, 1 año abierta); 336 fideos secos de huevo (2 años sin abrir, 1–2 meses abiertos); 332 pasta fresca (1–2 días en frío, 2 meses congelada); 177 pasta cocida (3–5 días en frío, 1–2 meses congelada). Se adoptan precargas domésticas de 365 días para pasta seca sin huevo, 60 días para pasta seca al huevo, 5 días/30 días para pasta cocida, y 2 días/60 días para pasta fresca. La extrapolación a pasta de legumbres, noodles de arroz, soba, udon y ñoquis es **editorial por semejanza**, no una duración individual declarada en FoodKeeper; revisar la información específica del alimento y fabricante si es más restrictiva. Los plazos de congelación son orientativos de calidad. No aplicar automáticamente a pastas con salsas o rellenos de conservación más corta.

**Trazabilidad:** el esquema solo permite una fuente global por ficha. Los IDs FoodKeeper 335, 336, 332 y 177 se asignan una vez cada uno; las demás fichas usan `fuente: "agregación"` e `id_fuente: null`. No atribuir IDs exclusivos a formatos sin registro individual. `tips_preparacion_conservacion` solo incluye un consejo práctico de enfriamiento en las cuatro fichas cocidas, y es `null` en el resto. Los consejos visibles siguen siendo cortos y editables.

**Alcance:** solo `catalogo.json`, README y prueba ligera de datos; commit directo a `main`, sin PR ni cambios en UI, impresión, BLE, FoodKeeper original ni otras familias. Algas, Otras aves y Caza permanecen vacías y ocultas.

## Arroz · selección aprobada (10/11/2026)

Se incorporan **7 fichas nuevas** en **Despensa > Arroz**: **6 variedades exclusivamente secas** y **1 ficha «Arroz blanco» cocido**. La obligación de crear dos presentaciones por variedad correspondía **solo a Legumbres**; **no se aplica a Arroz**. No se crean fichas genéricas ni versiones cocidas adicionales. Total del banco: **208 fichas**.

| Ficha | Nombre | Presentación | Despensa (d) | Nevera (d) | Congelador (d) | Referencia original |
|---|---|---|---:|---:|---:|---|
| DES-ARR-001 | Arroz redondo | Seco | 365 | — | — | FoodKeeper 338 (grupo) |
| DES-ARR-002 | Arroz bomba | Seco | 365 | — | — | FoodKeeper 338 (grupo) |
| DES-ARR-003 | Arroz basmati | Seco | 365 | — | — | FoodKeeper 338 (grupo) |
| DES-ARR-004 | Arroz vaporizado | Seco | 365 | — | — | FoodKeeper 338 (grupo) |
| DES-ARR-005 | Arroz integral | Seco | 365 | — | — | FoodKeeper 339 (grupo) |
| DES-ARR-006 | Arroz arborio | Seco | 365 | — | — | FoodKeeper 338 (grupo) |
| DES-ARR-007 | Arroz blanco | Cocido | — | 1 | 90 | FoodKeeper 178 (arroz cocido general) |

**Secos:** precarga de **365 días en despensa**, práctica para arroz seco reenvasado en casa. FoodKeeper 338 («Arroz blanco o mixto») registra dos años sin abrir y un año tras abrir; FoodKeeper 339 («Arroz marrón/integral») registra un año. Los IDs grupales no son identificadores exclusivos de cada variedad y se asignan como `id_fuente` una sola vez; las otras variedades son agregaciones, sin duplicación.

**Arroz blanco cocido:** el original FoodKeeper 178 indica **4–6 días refrigerado y 6 meses congelado**. Se adopta una precarga doméstica más breve de **1 día refrigerado** por la pauta específica de [Food Standards Agency](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) (enfriar en aproximadamente una hora, refrigerar y consumir en 24 horas) y **90 días congelado** como plazo práctico de calidad, por debajo de los seis meses del registro original; [USA Rice](https://www.usarice.com/thinkrice/how-to/how-to-store-rice) también describe la congelación del arroz cocido. `tips_preparacion_conservacion` contiene solo «Repartir en porciones y enfriar en 1 hora antes de guardar.» Las notas visibles siguen siendo breves y editables.

**Alcance:** solo `catalogo.json`, este README y comprobaciones ligeras de datos; cambios directos a `main`. No alterar `banco-ui.js`, otros diseños, impresión, BLE, FoodKeeper original, ni Algas, Otras aves o Caza (vacías y ocultas). El banco solo precarga etiquetas, sin restricciones funcionales.

## Campo de preparación · uso aprobado (10/11/2026)

`tips_preparacion_conservacion` queda reservado **exclusivamente** para un consejo corto y práctico **anterior al almacenamiento, la congelación o el envasado**, como escaldar, enfriar, secar, desgranar o preparar porciones. No es una nota de procedencia, seguimiento, justificación de plazos, decisión editorial, aviso sobre permisos ni descripción del funcionamiento del banco. Si la ficha no necesita preparación específica, el valor es **`null`**. No almacenar ahí IDs FoodKeeper, referencias, citas, comparaciones ni comentarios de agentes. Es un campo reservado para la futura sección de la web, no visible ni impreso en las etiquetas actuales.

Limpieza de 120 fichas del banco: se conservan 22 consejos de preparación concretos; los demás quedan a `null`. No se cambian nombres, métodos, fechas, notas visibles de las etiquetas ni el código. Legumbres conserva **11 variedades × 2 presentaciones (Seca y Cocida) = 22 fichas**, sin registros genéricos. Algas, Otras aves y Caza siguen vacías y ocultas por decisión expresa.

## Legumbres · banco doméstico aprobado (10/11/2026)

**22 fichas nuevas:** 11 variedades, **cada una** con dos registros independientes, **Seca** y **Cocida**. **No se crean entradas genéricas.** Total actualizado del banco: **201 fichas**.

| Variedad | Seca: despensa | Cocida: nevera | Cocida: congelador | Referencia FoodKeeper, si procede |
|---|---:|---:|---:|---|
| Alubia blanca | 365 días | 4 días | 90 días | Grupo 333 |
| Faba asturiana | 365 días | 4 días | 90 días | Grupo 333 |
| Alubia pinta | 365 días | 4 días | 90 días | Grupo 333 |
| Alubia canela | 365 días | 4 días | 90 días | Grupo 333 |
| Alubia verdina | 365 días | 4 días | 90 días | Grupo 333 |
| Judión | 365 días | 4 días | 90 días | Grupo 333 |
| Lenteja pardina | 365 días | 4 días | 90 días | Grupo 334 |
| Lenteja castellana | 365 días | 4 días | 90 días | Grupo 334 |
| Lenteja roja pelada | 365 días | 4 días | 90 días | Grupo 334 |
| Garbanzo pedrosillano | 365 días | 4 días | 90 días | Sin ID individual |
| Garbanzo lechoso | 365 días | 4 días | 90 días | Sin ID individual |

- Las variantes **Seca** solo ofrecen **Despensa (365 días)**. Las variantes **Cocida** solo ofrecen **Nevera (4 días)** y **Congelador (90 días)**. Las legumbres cocidas congeladas mantienen buen uso posterior en guisos y similares. Las tres modalidades son **precargas editables** de etiqueta, no restricciones de lo que puede etiquetarse.
- FoodKeeper **333** agrupa alubias secas y **334** agrupa lentejas secas; cada ID se asigna a una única ficha seca y se deja constancia del grupo en las demás sin inventar IDs individuales. Garbanzos pedrosillanos y lechosos: propuestas domésticas sin FoodKeeper propio.
- **Algas, Otras aves y Caza** permanecen vacías y ocultas por decisión expresa. No se duplican Habas, Guisantes, Judías verdes ni Edamame frescos registrados en Hortalizas.
- Sin cambios de interfaz, impresión, archivo FoodKeeper original ni otros repositorios. Se conservan nombre, presentación y los cuatro métodos como sugerencias independientes para las etiquetas domésticas.

## Norma operativa vigente · precarga doméstica editable (10/11/2026)

Este banco existe **solo para evitar rellenar etiquetas a mano**. Elegir una ficha precarga nombre, conservación, fecha y nota; **todos los valores siguen siendo editables por la persona usuaria en la interfaz**, incluida la fecha. No es un sistema industrial, de auditoría, certificación ni autorización de lo que se puede etiquetar. No añadir restricciones funcionales no solicitadas. Conservar siempre la etiqueta libre.

**Fichas en Despensa > Conservas:**

| Ficha | Nevera | Conserva casera | Congelación |
|---|---:|---:|---|
| Compota de manzana casera (DES-CON-002) | 7 días | 365 días | No |
| Mermeladas caseras (DES-CON-003) | 30 días | 365 días | No |
| Carne de membrillo (DES-CON-004) | **30 días** | **No** | **No** |

**Carne de membrillo**, casera o comprada: se conserva **solo en nevera**, sin tarros de conserva ni congelación en el banco. Se mantiene en `Despensa > Conservas` como agrupación de preparaciones, pero **la única modalidad precargable es Refrigeración**. Los 30 días son un valor inicial doméstico editable, no una imposición.

**Compota y mermeladas** tienen precarga de nevera y conserva casera, con un plazo directo editable. Los modos `congelacion` y `despensa` no se ofrecen para estas tres fichas. Congelación: ofrecer solo cuando sea práctica y conserve una calidad adecuada a la presentación; no ofrecerla indiscriminadamente a fruta fresca o preparaciones cuya textura cambia mucho.

**Interfaz:** mantener campos de etiqueta y fechas editables, además del modo libre. Este cambio afecta únicamente a datos y documentación; no modificar código ni impresión.

## Frutas · lote de incorporación inicial (histórico, 10/11/2026)

**Lote histórico: 40 fichas nuevas, de las cuales 39 están en Frutas y 1 en Despensa > Conservas** (compota de manzana casera). Respetadas **37 frutas distintas**, Granada (entera y desgranada), Piña (entera y cortada) y la ficha previa **Orejones FRV-FRU-001 sin duplicar**. Total del banco al completar aquel lote: **177 fichas**; después se añadieron dos conservas (**179**), y actualmente hay **201** fichas tras las 22 de Legumbres. Frutas conserva 40 fichas. Las 137 fichas preexistentes se preservan sin cambios.

| Ficha | Nombre | Presentación | Subcategoría | Frío (d) | Congelación (d) | Despensa (d) | FoodKeeper ID asignado |
|---|---|---|---|---:|---:|---:|---|
| FRV-FRU-002 | Manzana | — | Frutas | 42 | 240 | 21 | 248 |
| FRV-FRU-003 | Albaricoque fresco | — | Frutas | 5 | — | — | 249 |
| FRV-FRU-004 | Melocotón | — | Frutas | 5 | 60 | — | 266 |
| FRV-FRU-005 | Nectarina | — | Frutas | 5 | 60 | — | agregación |
| FRV-FRU-006 | Ciruela | — | Frutas | 5 | 60 | — | agregación |
| FRV-FRU-007 | Pera | — | Frutas | 5 | 60 | — | agregación |
| FRV-FRU-008 | Cerezas | — | Frutas | 3 | 240 | — | 483 |
| FRV-FRU-009 | Uvas | — | Frutas | 7 | 30 | 1 | 261 |
| FRV-FRU-010 | Granada | Pieza entera | Frutas | 90 | — | 5 | 269 |
| FRV-FRU-011 | Granada | Desgranada | Frutas | 4 | 300 | — | agregación |
| FRV-FRU-012 | Naranja | — | Frutas | 21 | — | 10 | 256 |
| FRV-FRU-013 | Limón | — | Frutas | 21 | — | 10 | agregación |
| FRV-FRU-014 | Lima | — | Frutas | 21 | — | 10 | agregación |
| FRV-FRU-015 | Pomelo | — | Frutas | 21 | — | 10 | agregación |
| FRV-FRU-016 | Mandarina | — | Frutas | 21 | — | 10 | agregación |
| FRV-FRU-017 | Clementina | — | Frutas | 21 | — | 10 | agregación |
| FRV-FRU-018 | Fresas / fresón | — | Frutas | 3 | 240 | — | 481 |
| FRV-FRU-019 | Frambuesas | — | Frutas | 3 | 240 | — | 482 |
| FRV-FRU-020 | Moras | — | Frutas | 6 | 360 | — | 253 |
| FRV-FRU-021 | Grosellas | — | Frutas | 6 | 360 | — | 252 |
| FRV-FRU-022 | Arándanos azules | — | Frutas | 14 | 240 | — | 254 |
| FRV-FRU-023 | Aguacate | — | Frutas | 4 | — | — | 250 |
| FRV-FRU-024 | Chirimoya | — | Frutas | 4 | 300 | — | 255 |
| FRV-FRU-025 | Kiwi | — | Frutas | 6 | — | — | 263 |
| FRV-FRU-026 | Piña | Pieza entera | Frutas | 7 | — | — | 267 |
| FRV-FRU-027 | Piña | Cortada | Frutas | 4 | 300 | — | agregación |
| FRV-FRU-028 | Papaya | — | Frutas | 7 | 180 | 5 | 265 |
| FRV-FRU-029 | Mango fresco | — | Frutas | 7 | 180 | 5 | agregación |
| FRV-FRU-030 | Melón | — | Frutas | 14 | — | — | 264 |
| FRV-FRU-031 | Sandía | — | Frutas | 4 | — | 2 | 495 |
| FRV-FRU-032 | Plátano dulce / banana | — | Frutas | 3 | 60 | — | 251 |
| FRV-FRU-033 | Coco fresco | — | Frutas | 21 | — | 7 | 258 |
| FRV-FRU-034 | Coco rallado | Seco, envase sin abrir | Frutas | — | 365 | 365 | 257 |
| FRV-FRU-035 | Dátiles | — | Frutas | 365 | 365 | 60 | 260 |
| FRV-FRU-036 | Uvas pasas | — | Frutas | — | — | 180 | agregación |
| FRV-FRU-037 | Higos frescos | — | Frutas | 3 | — | — | agregación |
| FRV-FRU-038 | Caqui | — | Frutas | 3 | — | — | agregación |
| FRV-FRU-039 | Nísperos | — | Frutas | 14 | — | — | agregación |
| FRV-FRU-040 | Membrillo fresco | — | Frutas | 28 | — | — | agregación |
| DES-CON-002 | Compota de manzana casera | — | Conservas | 7 | — | — | agregación |

### Fuente y grupos

Base original FoodKeeper ES, categoría de frutas **18**, salvo los especiales siguientes. **266** agrupa melocotón, nectarina, ciruela y pera: solo se asigna el ID 266 a Melocotón, los demás son agregaciones con nota. **256** agrupa 6 cítricos: ID para Naranja, resto agregación. **265** agrupa papaya/mango: ID para Papaya, Mango fresco agregado. **253** es grupo moras/grosellas: ID para Moras; Grosellas citan **252 y 253** pero no reclaman ID exclusivo. **269** Granada y **267** Piña se asignan únicamente a la variante entera; sus variantes desgranada/cortada son derivadas sin duplicar IDs. **379**, ya asignado a Orejones, solo se referencia en notas de Uvas pasas. No se inventan identificadores FoodKeeper individuales.

### Frutas cortadas, conservación y seguridad

Granada desgranada: **4 días frío / 300 días congelación**. Piña cortada: **4 días frío / 300 días congelación**. La refrigeración de cortadas es adaptación doméstica conservadora, no un plazo de FoodKeeper específico. Lavar antes de cortar, mantener en recipientes cerrados a ≤4 °C, no dejar fuera más de dos horas; orientaciones de [USDA sobre fruta cortada](https://ask.fsis.usda.gov/article/How-should-I-store-cut-fruit-and-vegetables), [FDA](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely) y [Comunidad de Madrid](https://www.comunidad.madrid/salud/fruta-cortada-siempre-refrigerada). La congelación se limita a fruta debidamente preparada y es principalmente un plazo de calidad, no garantía de inocuidad ([University of Minnesota Extension](https://extension.umn.edu/food/preparing/cooking-at-home/food-preservation/freezing/freezing-fruit)). Las entradas con «hasta que madure» en FoodKeeper **no se convierten en una fecha fija desde el envasado**.

**Compota casera**: actualmente precargada en Despensa > Conservas con 7 días en nevera o 365 días en conserva casera (véase la norma operativa vigente anterior). Sin congelación; ambas opciones y fechas son editables en la etiqueta.

**Coco rallado**: FoodKeeper **257** contempla coco rallado seco **envasado sin abrir** con 365 días despensa y 365 congelado, no coco fresco recién rallado ni envase abierto. **Dátiles** FoodKeeper 260, fuente original con 2 meses despensa, 12 meses frigorífico y 1–2 años congelación (se adopta 1 año). **Uvas pasas** FoodKeeper **379**: 180 días despensa sin abrir; si se abre, usar indicaciones específicas (el origen indica 1 mes desde apertura).

**Frutas añadidas sin ID de FoodKeeper:** Higos frescos, 3 días frío ([Mississippi State Extension](https://extension.msstate.edu/blogs/extension-for-real-life/overview-figs)); Caqui, 3 días en frío *solo si está maduro* (guía [UF/IFAS 2026](https://ask.ifas.ufl.edu/publication/FY1609), variedad/estado de maduración condicionan el plazo); Nísperos, 14 días en frío de calidad conservadora (fuentes [UF/IFAS](https://ask.ifas.ufl.edu/publication/MG050) y [UC Davis Postharvest](https://postharvest.ucdavis.edu/produce-facts-sheets/loquat), cuyos valores más largos dependen de 0 °C); Membrillo fresco, 28 días en frío ([Royal Horticultural Society](https://www.rhs.org.uk/fruit/fruit-trees/storing), mes máximo de uso para membrillo a 4–7 °C). Estos plazos son adaptaciones domésticas claramente identificadas como tales.

**Alcance:** catálogo JSON, esta sección README y aserciones ligeras del banco. Sin cambios en FoodKeeper original, interfaz, motor, impresión, Bluetooth ni publicación productiva; sin PR ni pruebas integrales.

## Hortalizas · selección doméstica autorizada (10/11/2026)

Se registran **23 nuevas fichas para 21 ingredientes**: 22 presentaciones en **Hortalizas**, Rábano en **Tubérculos**. Cebolla seca y Pimiento cuentan con «Pieza entera» y «Picada». Total **137 fichas**. Se preservan los 114 registros anteriores y el FoodKeeper original.

| Ficha | Nombre | Presentación | Frigorífico (d) | Congelación (d) | Despensa (d) | ID FoodKeeper asignado |
|---|---|---|---:|---:|---:|---|
| FRV-HOR-001 | Alcachofa | — | 14 | — | 2 | 270 |
| FRV-HOR-002 | Espárragos | — | 4 | 150 | — | 271 |
| FRV-HOR-003 | Brócoli | — | 5 | 300 | — | 276 |
| FRV-HOR-004 | Coles de Bruselas | — | 5 | 300 | — | 277 |
| FRV-HOR-005 | Coliflor | — | 5 | 300 | — | 280 |
| FRV-HOR-006 | Puerro | — | 14 | 300 | — | 289 |
| FRV-HOR-007 | Pepino | — | 6 | — | — | 283 |
| FRV-HOR-008 | Berenjena | — | 7 | 180 | 1 | 284 |
| FRV-HOR-009 | Pimiento | Pieza entera | 14 | — | — | 296 |
| FRV-HOR-010 | Pimiento | Picado | 3 | 180 | — | agregación |
| FRV-HOR-011 | Calabaza | Pieza entera | 150 | — | 90 | 298 |
| FRV-HOR-012 | Calabacín | Fresco, entero | 5 | 300 | 5 | 302 |
| FRV-HOR-013 | Tomate | — | — | 60 | — | 306 |
| FRV-HOR-014 | Tomate cherry | — | 5 | — | 10 | 600 |
| FRV-HOR-015 | Ajo | Bulbo entero | — | — | 30 | 285 |
| FRV-HOR-016 | Cebolla seca | Pieza entera | 60 | — | 30 | 294 |
| FRV-HOR-017 | Cebolla seca | Picada | 7 | 90 | — | agregación |
| FRV-HOR-018 | Cebolleta | — | 7 | — | — | 295 |
| FRV-HOR-019 | Judías verdes | — | 5 | 240 | — | 273 |
| FRV-HOR-020 | Habas frescas | — | 5 | 240 | — | agregación |
| FRV-HOR-021 | Guisantes frescos | — | 5 | 240 | — | agregación |
| FRV-HOR-022 | Edamame fresco | — | 5 | — | — | 640 |
| FRV-TUB-013 | Rábano | — | 14 | — | — | 299 |

**Trazabilidad FoodKeeper:** Los IDs corresponden a la categoría 19 «Vegetales Frescos» del archivo original. El **273** es un grupo común a judías, habas y guisantes: solo se asigna una vez, las otras dos fichas son agregaciones sin ID individual. El **276** agrupa brócoli y grelo, pero la selección solo incorpora brócoli. Calabacín usa **302**, y el otro registro original **547** queda documentado sin duplicarlo. Las variantes picadas se derivan del ID de su ingrediente entero sin reutilizarlo como si fuera ID independiente.

**Presentaciones cortadas:** cebolla entera FoodKeeper 294, **60 días frío / 30 días despensa**; cebolla picada, **7 días frío** ([Iowa State](https://blogs.extension.iastate.edu/wellness/2023/08/07/produce-basics/), [Colorado State](https://extension.colostate.edu/resource/colorado-onions-3/)) y **90 días de congelación**, plazo doméstico de calidad conservador a partir de «pocos meses» según [NCHFP](https://nchfp.uga.edu/how/freeze/vegetable/freezing-onions/) y no una copia de los 10–12 meses genéricos FoodKeeper. Pimiento entero, **14 días frío**; picado, **3 días frío** ([UC San Diego](https://communityhealth.ucsd.edu/work/eat-ca/peppers)) y **180 días congelación** (FoodKeeper 296), sin escaldado según [NCHFP](https://nchfp.uga.edu/how/freeze/vegetable/freezing-bell-or-sweet-peppers/).

**Particularidades:** Tomate FoodKeeper **306**: despensa «hasta que madure y 7 días después» es condición, **no plazo desde envasado**; no hay plazo numérico de frigorífico. Solo se habilita congelación de **60 días** para uso cocinado ([NCHFP](https://nchfp.uga.edu/how/freeze/vegetable/freezing-tomatoes/)). Tomate cherry **600**, 5 días frío y 10 despensa. Calabaza **298**, pieza entera: despensa 90 y frío 150 días, sin congelación de pieza entera ([NCHFP](https://nchfp.uga.edu/how/freeze/vegetable/freezing-pumpkin/)). Ajo **285**, bulbo entero, 30 días despensa; no extrapolar días de dientes, evitar ajo en aceite a temperatura ambiente ([NCHFP](https://nchfp.uga.edu/how/freeze/vegetables/freezing-garlic-in-oil/)). Cebolleta **295**, 7 días frío; el plazo de despensa del original no se activa por no ser apropiado para cebolla verde fresca ([Colorado State](https://extension.colostate.edu/docs/covid/HowOnions.pdf)). Edamame fresco **640** solo 5 días frío, sin inventar congelación. Alcachofa **270** entera no equivale a corazones congelables; Rábano **299** va a Tubérculos y no ofrece congelación.

**Congelación:** métodos individuales de escaldado, enfriado y escurrido de [NCHFP](https://nchfp.uga.edu/how/freeze/freeze-general-information/blanching-times/). Plazos orientativos de calidad con congelador a ≤−18 °C y frigorífico ≤4 °C, no garantías automáticas de inocuidad.

**Alcance:** commit directo en main solo para catálogo, tests de datos y este README; sin PR, cambios de interfaz, diseño, BLE, impresión ni repositorios de producción.

## Verduras de hoja · selección doméstica autorizada (09/11/2026)

Se incorporan **13 fichas nuevas** y se conserva íntegra la **Lechuga** existente `FRV-HOJ-001` («Iceberg o romana»), sin duplicarla. Total del banco: **114 fichas**, subcategoría «Verduras de hoja»: **14 fichas para 10 ingredientes**.

| Ficha | Nombre | Presentación | Frigorífico (d) | Congelación (d) | Procedencia |
|---|---|---|---:|---:|---|
| FRV-HOJ-001 | Lechuga | Iceberg o romana | 14 | — | Existente; FoodKeeper 290, sin duplicar |
| FRV-HOJ-002 | Repollo | Crudo | 14 | — | FoodKeeper 278 |
| FRV-HOJ-003 | Repollo | Escaldado | 4 | 300 | FoodKeeper 278 + escaldado NCHFP + vegetales cocinados 174 |
| FRV-HOJ-004 | Espinacas | Crudas | 7 | — | Grupo FoodKeeper 291 (lechuga de hoja, espinacas) |
| FRV-HOJ-005 | Espinacas | Escaldadas | 4 | 240 | Grupo 291 + NCHFP/Extension + 174 |
| FRV-HOJ-006 | Mezcla de hojas para ensalada | Bolsa | 2 (abierta) | — | FoodKeeper 415 (bolsa de vegetales) |
| FRV-HOJ-007 | Acelga | Cruda | 14 | — | FoodKeeper 550 |
| FRV-HOJ-008 | Acelga | Escaldada | 4 | 240 | FoodKeeper 550 + NCHFP/Extension + 174 |
| FRV-HOJ-009 | Rúcula | — | 7 | — | FoodKeeper 678 («Arúgula») |
| FRV-HOJ-010 | Berzas | Crudas | 7 | — | Adaptación doméstica, sin ID individual |
| FRV-HOJ-011 | Berzas | Escaldadas | 4 | 240 | NCHFP/Extension + 174, sin ID individual |
| FRV-HOJ-012 | Escarola | — | 7 | — | Adaptación doméstica, sin ID individual |
| FRV-HOJ-013 | Endivias | — | 7 | — | Adaptación doméstica, sin ID individual |
| FRV-HOJ-014 | Canónigos | — | 5 | — | Adaptación doméstica, sin ID individual |

**Trazabilidad del original:** FoodKeeper ES (archivo suministrado, sin modificaciones) `Product.ID 278` da **1–2 semanas en frío** y **10–12 meses congelado** para repollo; `290` refiere a lechuga iceberg/romana; `291` **agrupa lechuga de hoja y espinacas** (3–7 días y congelación de hoja cruda no recomendada); `415` corresponde a **bolsa de vegetales mixtos** (una vez abierta, **2 días** según su campo de plazo, aunque la nota textual mencione 3; cerrada, seguir fecha de envase); `550` indica **1–2 semanas** para acelga; `678` indica **3–7 días** para arúgula. No asignar 291 a espinacas como producto individual ni los IDs anteriores a especies diferentes. La lechuga existente conserva su origen agregado y sus 14 días. Para los nombres adicionales sin ID, fuente global `agregación` e `id_fuente:null`; las variantes escaldadas también son agregaciones.

**Métodos:** en crudo, se ofrece frigorífico; para congelación de Repollo, Espinacas, Acelga y Berzas se ofrece la **variante escaldada**, destinada a usos cocinados. Escaldado en agua: **Repollo 1½ min; Espinacas 2 min; hojas de Acelga 2 min; Berzas 3 min**; enfriar inmediatamente, escurrir, envasar y congelar. Referencias: [NCHFP, coles](https://nchfp.uga.edu/how/freeze/vegetables/freezing-cabbage-or-chinese-cabbage/), [NCHFP, verduras de hoja](https://nchfp.uga.edu/how/freeze/vegetable/freezing-greens-including-spinach/), [Universidad de New Hampshire, pautas y congelación 8–12 meses](https://extension.unh.edu/resource/freezing-vegetables). El plazo **300 días** del repollo escaldado procede del mínimo de FoodKeeper 278; **240 días** para las otras escaldadas es el mínimo del rango genérico de calidad 8–12 meses. Frigorífico **4 días** para las variantes escaldadas es adaptación del grupo de vegetales cocinados FoodKeeper `174` (3–4 días), condicionada a enfriado inmediato; se prefiere congelarlas pronto. No es una instrucción para conservarlas a temperatura ambiente. Las sugerencias son **orientativas domésticas**, con frigorífico ≤4 °C y congelador ≤−18 °C; no se añaden modos de despensa/conserva ni cambios a impresión, interfaz o FoodKeeper original.

**Alcance de esta operación:** commit único directo en `main` con catálogo, aserciones ligeras del banco y este resumen; sin PR, pruebas integrales, interfaces, BLE, etiquetas ni repositorios de producción.

## Tubérculos y Hongos · incorporación doméstica (09/11/2026, vigente)

La usuaria aprueba **17 fichas nuevas**: **11 en Tubérculos**, **6 en Hongos**. Se **actualiza Patata `FRV-TUB-001` sin duplicarla**. La subcategoría **Algas permanece vacía y oculta**, sin registros.

| ID | Nombre | Presentación | Frigorífico (d) | Congelación (d) | Despensa (d) |
|---|---|---|---:|---:|---:|
| `FRV-TUB-001` | Patata | Pieza entera cruda | 14 | — | 60 |
| `FRV-TUB-002` | Patata | Asada | 4 | 30 | — |
| `FRV-TUB-003` | Patata | Cocida | 4 | 30 | — |
| `FRV-TUB-004` | Boniato | Pieza entera cruda | — | — | 21 |
| `FRV-TUB-005` | Boniato | Asado | 4 | 30 | — |
| `FRV-TUB-006` | Boniato | Cocido | 4 | 30 | — |
| `FRV-TUB-007` | Yuca | — | 3 | 30 | 7 |
| `FRV-TUB-008` | Apionabo | — | 7 | — | — |
| `FRV-TUB-009` | Zanahoria | Pieza entera cruda | 21 | 300 | — |
| `FRV-TUB-010` | Zanahoria | Dados | 3 | 300 | — |
| `FRV-TUB-011` | Remolacha | Cruda | 14 | 180 | — |
| `FRV-TUB-012` | Remolacha | Cocida | 4 | 30 | — |
| `FRV-HON-001` | Champiñón | Fresco | 7 | 300 | — |
| `FRV-HON-002` | Portobello | Fresco | 7 | 300 | — |
| `FRV-HON-003` | Shiitake | Fresco | 7 | 300 | — |
| `FRV-HON-004` | Seta de ostra | Fresca | 7 | 300 | — |
| `FRV-HON-005` | Boletus | Fresco | 7 | 300 | — |
| `FRV-HON-006` | Níscalos | Frescos | 7 | 300 | — |

**FoodKeeper ES original** archivado (sin alterar):
- `Product.ID 297` patata («Papas»): frigorífico 1–2 semanas y despensa 1–2 meses. Se mantiene frigorífico 14 días del registro anterior, se completa despensa con **60 días**, se renombra «Entera» a «Pieza entera cruda», se preserva `id_fuente: "297"` y la ficha pasa de parcial a verificada.
- `Product.ID 422` «Batata dulce»: **2–3 semanas en despensa**; se registra Boniato «Pieza entera cruda» con **21 días**, sin frío ni congelación en esa variante.
- `Product.ID 308` «Yuca/Casabe»: **3 días frigorífico / 1–2 meses congelación / 7 días despensa**; ficha Yuca, Mandioca como sinónimo, 3/30/7 días.
- `Product.ID 661` «Raíz de apio»: una semana de frigorífico → Apionabo, 7 días, sin agregar plazos desconocidos.
- `Product.ID 279` «Zanahorias, chirivía»: 2–3 semanas de frigorífico y 10–12 meses de congelación → Zanahoria «Pieza entera cruda» **21/300 días**. Para la presentación «Dados» (dados crudos), frigorífico **3 días** como adaptación conservadora al corte, congelación **300 días** previo escaldado. Las dos variantes llevan `fuente:"agregación"` e `id_fuente:null` para no duplicar el ID 279.
- `Product.ID 274` «Remolacha»: frigorífico 7–14 días y congelación 6–8 meses → Remolacha «Cruda» **14/180 días**. La presentación «Cocida» es independiente.
- `Product.ID 174` «Comidas para llevar sin carne, pescado ni huevos (vegetales cocinados, arroz o papas)»: refrigeración 3–4 días, congelación 1–2 meses. Se aplica **4/30 días** a Patata (Asada, Cocida), Boniato (Asado, Cocido) y Remolacha Cocida. [USDA: cooked potatoes](https://ask.fsis.usda.gov/article/How-long-can-you-store-cooked-potatoes) también indica 3–4 días frigorífico.
- `Product.ID 292` «Setas» agrupa hongos frescos, refrigeración 3–7 días y congelación 10–12 meses → Champiñón, Portobello, Shiitake, Seta de ostra, Boletus y Níscalos frescos **7/300 días**. El banco aconseja **saltear antes de congelar** como nota editable; las especies no son IDs individuales de FoodKeeper y llevan `fuente:"agregación"`, `id_fuente:null`.

**Clasificación editorial:** se mantienen Zanahoria y Remolacha en «Tubérculos» junto a las raíces de reserva por la decisión de agrupar estas incorporaciones, aunque botánicamente son raíces/hortalizas y no tubérculos estrictos. Las presentaciones no solicitadas de Yuca y Apionabo permanecen `null`. Los modos no ofrecidos son `false`, con plazo y tips `null`; no hay ingredientes ficticios. Son sugerencias editables para el banco **doméstico** y no controles industriales.

**Estado:** 84 → **101 fichas** en total (17 nuevas, Patata modificada), cuatro categorías principales y 28 subcategorías. `main` directo, sin PR ni pruebas integrales; solo actualización de catálogo, aserciones existentes y documentación. No se cambia UI, diseño, impresión, BLE, FoodKeeper original ni ningún repositorio productivo.

## Crustáceos y moluscos y Cefalópodos · lote doméstico (09/11/2026, vigente)

La usuaria aprueba **14 fichas nuevas** para «Crustáceos y moluscos» y **3 nuevas** para «Cefalópodos», además de **completar la ficha de Pulpo existente `PES-CEF-001` sin duplicarla**. Total **84 fichas** (67 anteriores + 17 nuevas), dentro de las cuatro categorías y 28 subcategorías existentes.

**Unificación editorial:** «vivo» y «fresco» de los grupos FoodKeeper `Product.ID 157` y `160` se consideran **una única presentación fresca con concha** para Almejas y Mejillones. No se crean fichas separadas «vivas» y «frescas»: dos registros (Almejas `PES-CRM-001` y Mejillones `PES-CRM-002`), con alias «vivas». En el banco doméstico se usan **2 días de frío** por la pauta corta del grupo 157 y [OCU sobre moluscos vivos](https://www.ocu.org/alimentacion/carnes-pescados/informe/moluscos-guia-de-compra), y **60 días de congelación** tomados del mínimo del grupo 157. Para congelar moluscos en crudo, la preparación y calidad dependen del tipo de marisco; véanse las [recomendaciones de OCU](https://www.ocu.org/electrodomesticos/frigorificos/consejos/ordenar-frigorifico).

| Subcategoría | ID | Ingrediente | Presentación | Nevera (d) | Congelación (d) |
|---|---|---|---|---:|---:|
| Crustáceos y moluscos | `PES-CRM-001` | Almejas | Frescas | 2 | 60 |
| Crustáceos y moluscos | `PES-CRM-002` | Mejillones | Frescos | 2 | 60 |
| Crustáceos y moluscos | `PES-CRM-003` | Langostinos | Crudos | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-004` | Langostinos | Cocidos | 4 | 30 |
| Crustáceos y moluscos | `PES-CRM-005` | Langostinos | Pelados | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-006` | Gambas | Crudas | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-007` | Gambas | Cocidas | 4 | 30 |
| Crustáceos y moluscos | `PES-CRM-008` | Gambas | Peladas | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-009` | Gambón | Crudo | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-010` | Gambón | Cocido | 4 | 30 |
| Crustáceos y moluscos | `PES-CRM-011` | Gambón | Pelado | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-012` | Zamburiñas | Frescas | 3 | 180 |
| Crustáceos y moluscos | `PES-CRM-013` | Bogavante | Pieza entera | 1 | 60 |
| Crustáceos y moluscos | `PES-CRM-014` | Bogavante | Colas | 2 | 60 |
| Cefalópodos | `PES-CEF-002` | Calamar | — | 3 | 180 |
| Cefalópodos | `PES-CEF-003` | Chipirón | Fresco | 3 | 180 |
| Cefalópodos | `PES-CEF-004` | Sepia | Fresca | 3 | 180 |
| Cefalópodos | `PES-CEF-001` | Pulpo | — | 2 | 180 |

**Criterios por grupos:**
- **Gambas, langostinos y gambón:** tres presentaciones cada uno, «Crudas», «Cocidas», «Peladas» (para Gambón: «Crudo», «Cocido», «Pelado»). **Peladas/Pelado = pelado crudo**; las versiones cocidas se mantienen separadas. Crudos y pelados: **3 días refrigeración / 180 congelación**, según grupo FoodKeeper 151 (`Shrimp`, 1–3 días y 6–18 meses). Cocidos: **4 / 30 días** por FoodKeeper 162 (crustáceos cocidos, 3–4 días frío y 1–3 meses congelación) y [USDA, mariscos cocidos 3–4 días](https://ask.fsis.usda.gov/article/Como-preparar-los-pescados-y-los-mariscos). Los rangos se normalizan al máximo de frío y mínimo de congelación de FoodKeeper.
- **Zamburiñas «Frescas»:** **3/180 días**, tomando por semejanza la ficha FoodKeeper 150 (vieiras); no afirmar que son idéntica especie.
- **Bogavante fresco:** **Pieza entera, 1/60 días; Colas, 2/60 días**. FoodKeeper 158 (langosta viva) refiere a **1 día en nevera**, pero no recomienda congelación para langosta viva: no es una ficha directa de bogavante. [OCU sobre mariscos](https://www.ocu.org/alimentacion/carnes-pescados/informe/mariscos-y-crustaceos-comprar-y-degustar) indica expresamente que el bogavante admite congelación crudo o cocido, y [FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) da **2–4 meses para langosta fresca**; se utiliza **60 días** de calidad. FoodKeeper 159 corresponde a **cola cocida de langosta**, y no se atribuye erróneamente a estas colas frescas sin cocinar.
- **Calamar:** **3/180 días**, única correspondencia directa FoodKeeper 152 (`fuente: FoodKeeper`, `id_fuente: "152"`). **Chipirón** fresco y **Sepia** fresca: **3/180**, por la familia cefalópodos a partir de 152, sin simular IDs propios. El **Pulpo** de `PES-CEF-001` se actualiza de `sin_datos` a `verificado` con **2 días en nevera / 180 días en congelador**; para refrigeración se aplica el criterio general de pescado y marisco crudo **1–2 días** de [USDA](https://ask.fsis.usda.gov/article/Como-preparar-los-pescados-y-los-mariscos), y para congelación la familia cefalópodos de FoodKeeper 152.

**Trazabilidad:** las entradas basadas en grupos, adaptaciones de nombres, tipos de gambón/bogavante, o mezcla de referencias quedan `fuente: "agregación"`, `id_fuente: null`; **solo Calamar** es coincidencia directa con `Product.ID 152`. FoodKeeper original no se modifica. Nuevos registros **`PES-CRM-001…014`** y **`PES-CEF-002…004`**; la clave de Pulpo permanece intacta. Modos ofrecidos únicamente refrigeración y congelación, nunca despensa ni conserva, sin inventar aplicaciones de otros modos.

**Operativa:** banco doméstico de precarga de etiquetas, sin nuevos controles ni validaciones de impresión; se conserva la edición manual. Actualización de catálogo, una aserción simple de coherencia y documentación mediante **commit directo a `main`**, sin PR, tests integrales, UI ni cambios BLE.

## Pescado azul · selección autorizada (09/11/2026, vigente)

Incorporadas **10 fichas** de la subcategoría **Pescado azul**, respetando exactamente las presentaciones elegidas por la usuaria:

| Ficha | Nombre | Presentación | Nevera | Congelación |
|---|---|---|---:|---:|
| `PES-AZU-001` | Boquerón | Pieza entera | 2 días | 60 días |
| `PES-AZU-002` | Atún | Lomos | 2 días | 60 días |
| `PES-AZU-003` | Bonito | Lomos | 2 días | 60 días |
| `PES-AZU-004` | Bonito | Rodajas | 2 días | 60 días |
| `PES-AZU-005` | Caballa | Pieza entera | 2 días | 60 días |
| `PES-AZU-006` | Jurel | Lomos | 2 días | 60 días |
| `PES-AZU-007` | Jurel | Pieza entera | 2 días | 60 días |
| `PES-AZU-008` | Pez espada | Rodajas | 2 días | 60 días |
| `PES-AZU-009` | Salmón | Lomos | 2 días | 60 días |
| `PES-AZU-010` | Sardina | Pieza entera | 2 días | 60 días |

**Referencia de origen:** [FoodKeeper ES original](fuentes/foodkeeper-es-original.json), `Product.ID 146`, grupo *Pescado graso*, incluye expresamente **mackerel (caballa/verdel), salmon (salmón) y tuna (atún)**, junto con otros peces no seleccionados. Intervalos: refrigeración **1–2 días**; congelación **2–3 meses**. Se aplica la normalización doméstica del banco: **2 días en nevera y 60 días en congelador** (mes=30 días). [FoodSafety.gov, Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) corrobora aproximadamente la misma categoría y duración de congelación; su rango refrigerado actual 1–3 días no sustituye la regla acordada de FoodKeeper original. Se conservan los tres nombres con la presentación indicada; no se crean fichas adicionales sin selección.

**Extrapolación editorial:** el FoodKeeper original no enumera individualmente boquerón, bonito, jurel, pez espada ni sardina bajo el ID 146. Estos se añaden por petición expresa utilizando la pauta general del grupo, sin atribuirles un ID individual. El [Ministerio de Agricultura](https://www.alimentosdespana.es/es/turismo-agroalimentario-y-gastronomia/gastronomia/bloc/pescados/clasificacion) incluye boquerón, jurel, caballa, sardina y atún entre los azules, pero clasifica el *emperador/pez espada* como semigraso; [material divulgativo de AESAN](https://www.aesan.gob.es/AECOSAN/docs/documentos/nutricion/educanaos/fichas_aula.pdf) lo incluye entre los azules. Se mantiene **Pez espada → Pescado azul** según el criterio editorial de la usuaria, sin crear otra subcategoría.

**Trazabilidad:** `fuente: "agregación"`, `id_fuente: null` en las 10 fichas, porque los intervalos del registro agrupado 146 se aplican a presentaciones y especies seleccionadas editorialmente, sin duplicar el mismo identificador original; se conserva el ID 146 en este documento. Para **Caballa**, se registra el nombre breve y «Verdel» como sinónimo; para **Jurel**, «Chicharro» como alias, sin nuevas fichas. **Bonito** y **Jurel** tienen dos fichas cada uno por sus presentaciones diferenciadas. Para boquerón fresco que vaya a comerse en vinagre, recordar que [AESAN indica congelación preventiva frente al anisakis](https://www.aesan.gob.es/ca/actualidad/campanyas-seguridad-alimentaria/anisakis); el banco no agrega controles ni validaciones adicionales por ello.

**Modos:** refrigeración y congelación habilitadas; despensa y conserva no ofrecidas (`false` y días/tips `null`). Notas activas cortas vacías para conservar los ajustes editables de las etiquetas domésticas. El periodo de congelación es orientativo de calidad. **Total 67 fichas** (7 blanco, 10 azul), 4 categorías y 28 subcategorías. Registro directo en `main` con comprobación de coherencia simple, sin PR ni pruebas integrales. No se modifica UI, plantillas, BLE, FoodKeeper original, Airtable ni producción.

## Pescado blanco · lote seleccionado (09/11/2026)

Se incorporan **7 fichas**: Bacalao (**Lomos desalados**, **En salazón**), Abadejo (**Lomos**), Dorada (**Pieza entera**), Lubina (**Pieza entera**), Merluza (**Lomos**) y Corvina (**Lomos**).

| ID | Nombre | Presentación | Nevera | Congelador | Despensa |
|---|---|---|---:|---:|---:|
| `PES-BLA-001` | Bacalao | Lomos desalados | 2 | 180 | — |
| `PES-BLA-002` | Bacalao | En salazón | — | — | 180 |
| `PES-BLA-003` | Abadejo | Lomos | 2 | 120 | — |
| `PES-BLA-004` | Dorada | Pieza entera | 2 | 180 | — |
| `PES-BLA-005` | Lubina | Pieza entera | 2 | 180 | — |
| `PES-BLA-006` | Merluza | Lomos | 2 | 180 | — |
| `PES-BLA-007` | Corvina | Lomos | 2 | 180 | — |

Días en cada método. Solo se ofrecen los modos indicados; los demás son `false` con datos `null`. Los plazos frescos siguen FoodKeeper `Product.ID 144` (pescado magro, *cod*: 1–2 días frío, 6–8 meses congelado) y `145` (*pollock*: 1–2 días, 4–8 meses), completados con la [referencia general de pescado blanco de OCU](https://www.ocu.org/alimentacion/seguridad-alimentaria/informe/conservacion-alimentos). Se toma **2 días** refrigerados, **180** congelados en blanco genérico y **120** en abadejo.

El original FoodKeeper no tiene fichas por separado para estos peces. **Lubina europea** (*Dicentrarchus labrax*) **no equivale** a *rockfish*, aunque el texto español del ID 145 lo traduzca como «lubina»; se usa el [nombre oficial español del BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2026-12598). El abadejo original es *pollock* y las denominaciones españolas identifican especies concretas según la comercialización. Dorada, merluza y corvina reciben plazos editoriales del grupo blanco, no ID FoodKeeper individual.

La presentación **Bacalao · Lomos desalados** solo permite nevera **2 días** y congelación **180 días**. **Bacalao · En salazón** únicamente ofrece **despensa 180 días** con nota editable «Solo seco-salado; ver envase», **exclusivamente** si se vende como producto seco-salado estable sin frío. La [OCU](https://www.ocu.org/alimentacion/alimentos/noticias/bacalao-guia-de-compra) describe su conservación durante varios meses en lugar seco; productos húmedos, en salmuera, al punto de sal o con exigencia de frío siguen las instrucciones del vendedor y no esa ficha. No son cifras del original FoodKeeper para bacalao salado.

Las siete entradas tienen `fuente:"agregación"`, `id_fuente:null` por la combinación de presentaciones elegidas, FoodKeeper agrupado y fuentes externas; aquí queda la trazabilidad explícita de **144/145**. Son etiquetas caseras editables, **sin nuevos controles**. No cambia `banco-ui.js`, HTML, CSS, impresión, motor, BLE, FoodKeeper original, Airtable ni web de producción. Banco: **50 → 57** fichas, cuatro categorías y 28 subcategorías. Commit directo en `main`, sin PR ni pruebas integrales.

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

## Regla doméstica vigente · Charcutería sin congelación (08/11/2026)

**Uso del banco:** es un **atajo de escritura para etiquetas caseras**, no
un proceso de fábrica, auditoría ni certificación de envasado. Los datos
editoriales aprobados por la usuaria definen los métodos que se ofrecen.
No volver a imponer controles, PR, procesos de laboratorio, comprobaciones
integrales de impresión o largas discusiones de seguridad para simples
cambios de fichas. Procedimiento: editar el JSON en `main`, coherencia
básica de campos y fuentes, documentación breve; Pages automático.
Conservar siempre la opción de etiqueta libre y campos editables.

**Decisión definitiva de la usuaria, apoyada en sus capturas:**
**no ofrecer «Congelación»** para los productos de charcutería curada
**jamón serrano, jamón ibérico, salami, lomo embuchado, salchichón,
chorizo curado y cecina**, en sus siete fichas **«Al corte»**.
Las cinco fichas «Pieza entera» ya ofrecían solo Despensa y no cambian.
Las capturas desaconsejan además congelar **fiambres cocidos al corte**
por la textura; siguiendo ese criterio doméstico también se elimina
Congelación de **Jamón cocido** y **Pechuga de pavo (fiambre)**.
Para las nueve fichas modificadas: `congelacion: false`,
`congelacion_dias: null`, `tips_descongelacion: null`.
**Bacon no cambia**, y conserva su recomendación de congelación.
El resto de ingredientes y recetas tampoco cambian.

Los cinco curados «Al corte» que ya tienen Despensa conservan
**60 días** y nota **«Envasado al vacío»**; se preservan asimismo
sus plazos de refrigeración. Sus correspondientes **«Pieza entera»**
mantienen **solo Despensa 180 días**, sin cambiar su nota.
La recomendación de despensa conserva las condiciones editoriales
documentadas anteriormente. El mensaje «no congelar» es una
**preferencia de calidad/conservación del banco doméstico**, no una
afirmación de que sea técnicamente imposible congelar estos alimentos.

Sin modificar nombre, presentación, identificadores, condiciones
restantes, `banco-ui.js`, plantillas, raster, BLE ni producción.
**50 fichas** y **28 subcategorías** sin cambios. El archivo
FoodKeeper original permanece intacto. Esta decisión **prevalece
sobre menciones históricas a congelación de los curados** en el
expediente anterior.

## Curados · «Al corte» con vacío y «Pieza entera» (08/11/2026, decisión vigente)

La usuaria ha aprobado cinco pares de presentaciones: **Jamón serrano, Jamón ibérico, Lomo de cerdo embuchado, Salchichón y Chorizo curado**.

| Curado | Original «Al corte» | Nuevo «Pieza entera» |
|---|---|---|
| Jamón serrano | `CAR-CHA-002` | `CAR-CHA-011` |
| Jamón ibérico | `CAR-CHA-003` | `CAR-CHA-012` |
| Lomo de cerdo embuchado | `CAR-CHA-006` | `CAR-CHA-013` |
| Salchichón | `CAR-CHA-007` | `CAR-CHA-014` |
| Chorizo curado | `CAR-CHA-008` | `CAR-CHA-015` |

**Al corte:** las cinco fichas anteriores conservan refrigeración y congelación, y añaden `despensa: true`, `despensa_dias: 60`, nota editable `tips_despensa: "Envasado al vacío"`. El plazo de despensa únicamente corresponde a **loncheado al vacío sin abrir** y estable sin refrigeración; sin vacío deben seguirse las condiciones y plazos de nevera.

**Pieza entera:** cinco nuevas fichas diferenciadas con el mismo nombre y `presentacion: "Pieza entera"`, `despensa: true`, `despensa_dias: 180`, nota `"Lugar fresco, seco y oscuro"`. Refrigeración, congelación y conserva se deshabilitan (`false`, días y consejos `null`). Condición: **pieza curada entera sin empezar**. Una vez abierta no se aplica automáticamente este plazo.

**Límites de seguridad y procedencia:** 60 y 180 días son los **criterios editoriales aportados por la usuaria** y no duraciones universalmente validadas por FoodKeeper o AESAN. El vacío doméstico **no acredita** la estabilidad de un alimento a temperatura ambiente. La opción despensa solo debe usarse con un producto curado cuya **estabilidad sin refrigeración esté respaldada por las condiciones de su vendedor o fabricante**; en caso contrario, incluso si está al vacío, debe conservarse refrigerado. El etiquetado y cualquier condición más restrictiva tienen prioridad. Nuevas fichas `fuente: "usuario"`, `id_fuente: null`; las «Al corte» conservan `fuente: "agregación"`. El motor del banco muestra la nota exacta para el método seleccionado, sin cambiar código ni permitir asumir estabilidad por el mero hecho de sellar una bolsa.

**Alcance:** pasan de 45 a **50 fichas**, 15 en Charcutería; no se altera Cecina, Salami, Bacon, Jamón cocido, fiambre de pavo ni otras familias. Se mantienen 4 categorías / 28 subcategorías. Cambios exclusivamente en catálogo, comprobación ligera y documentación. Sin tocar UI, HTML/CSS, plantillas de etiqueta, TSPL/BLE, FoodKeeper original, producción o Airtable. Commit directo en `main`, sin PR y con Pages automático.

## Matización de conservación · morcillas y curados (08/11/2026, histórico)

La usuaria aportó capturas de una respuesta generada en búsquedas de Google
con tablas orientativas y precisó dos condiciones editoriales. Se ha
contrastado con fuentes primarias. **No atribuir a FoodKeeper ni a las
autoridades los números de las capturas sin fuente verificable.**

**Morcilla de Burgos y Morcilla Matachana**
(`CAR-ELA-006`, `CAR-ELA-007`): ambas **requieren refrigeración
obligatoria de 2 a 4 °C**, incluso cuando se elaboran mediante cocción,
por su humedad y composición. Envasarlas al vacío en casa **no
autoriza almacenarlas en despensa**. Se establece **5 días
en refrigeración** como plazo doméstico conservador desde compra o
fraccionamiento fresco, sin reiniciar una fecha ya transcurrida;
se conservan **30 días de congelación** como plazo prudente de
calidad, no se elevan a 90 días solo por la captura. Los
`tips_refrigeracion` pasan a `"Frío obligatorio: 2–4 °C"`,
texto corto que la UI muestra como nota editable sin modificación
de código, y `tips_preparacion_conservacion` documenta la misma
condición. `despensa: false`, `conserva: false`. Apoyo:
[ficha comercial de Morcilla de Burgos La Ribera](https://www.morcillaslaribera.com/morcilla-de-burgos/)
(refrigeración 0–5 °C incluso envasada al vacío),
[productor de Morcilla Matachana](https://morcillamatachana.com/morcilla-matachana/)
(vida en **frío**; varía por formato),
[Embutidos Entrepeñas, morcilla fresca](https://tienda.embutidosentrepenas.es/embutidos/morcilla/morcilla.html)
(1–4 °C) y
[AESAN, vida útil de cárnicos cocidos loncheados](https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/revistas_comite_cientifico/LONCHEADOS.pdf)
(criterio de referencia 5 días a 4 °C para ciertos cocidos
fraccionados; no es estudio específico de morcillas).
Se aplica el criterio más conservador para compra a granel;
prevalece cualquier indicación más restrictiva del vendedor.

**Curados (jamón serrano, jamón ibérico, lomo embuchado,
salchichón, chorizo curado y cecina):** la usuaria plantea
**60 días en despensa para loncheados envasados al vacío** y
**180 días para piezas enteras sin vacío**. Esta distinción
entre **curados secos** y **fiambres cocidos que requieren frío**
es pertinente, pero **los plazos no se pueden aplicar
automáticamente a toda la familia**.
[AESAN, informe sobre productos cárnicos curados cortados/loncheados
y envasados para venta minorista](https://www.aesan.gob.es/AECOSAN/docs/documentos/publicaciones/revistas_comite_cientifico/LONCHEADOS.pdf)
reconoce estabilidad a temperatura ambiente **cuando la actividad
de agua y el pH específicos del producto impiden la proliferación
de peligros microbiológicos**; el tiempo de vida útil no queda
fijado de forma universal por el mero hecho de estar al vacío.
[AESAN, guía de despensa](https://www.aesan.gob.es/AECOSAN/docs/documentos/tema_interes/guia_baja.pdf)
admite piezas enteras curadas como jamón y cecina en despensa
fresca, ventilada, seca y sin luz directa.
En cambio, el
[Consorcio del Jamón Serrano](https://consorcioserrano.es/jamon-consorcio-serrano/sabor-aroma-y-conservacion/)
recomienda **refrigerar loncheados/deshuesados** y respetar
las indicaciones del productor, con **2–3 días** para lonchas
recién compradas al corte.

Por tanto, las seis fichas **`presentacion: "Al corte"`**
registradas hoy **mantienen refrigeración/congelación y
`despensa: false`**, sin generar automáticamente una
fecha de 60 o 180 días que sería inadecuada para
muchos productos cortados y reenvasados en casa.
**No se rechaza despensa como método futuro**: para
incorporar presentaciones específicas de piezas enteras
curadas o loncheados cuya estabilidad esté acreditada,
registrar variantes y plazos contrastados de la presentación,
fabricante/vendedor o evidencia técnica aplicable,
sin confundir envase doméstico con proceso validado.
Ningún fiambre cocido (jamón York, pavo) ni morcilla fresca
se considera estable en despensa por recibir vacío.
El modo libre puede seguir escribiéndose/editándose.

**Alcance del ajuste:** dos fichas de morcilla, aserciones
básicas de datos y actualización de los manuales pertinentes;
se mantienen **45 fichas, 28 subcategorías y los ID**,
FoodKeeper intacto, sin PR, sin cambiar HTML/CSS,
`banco-ui.js`, plantillas, motor, BLE, producción ni PWA.


## Incorporación aprobada · Elaborados y Charcutería (08/11/2026, vigente)

La usuaria ha seleccionado **12 elaborados** y **10 productos de charcutería al corte**; quedan incorporadas como **22 fichas** al catálogo propio (total **45**), manteniendo **4 categorías / 28 subcategorías**.
Este lote **sí admite productos de carnicería y charcutería elaborados vendidos a granel**; sigue excluyendo fichas genéricas de productos **preenvasados de marca**. La subcategoría **Elaborados** incluye carne fresca cruda preparada, productos rellenos sin cocinar **y las dos morcillas que son cocidas**: no afirmar que todos sean crudos. **Chorizo curado** pertenece a **Charcutería**, conforme a la nueva lista, prevaleciendo sobre la anterior mención provisional bajo Elaborados.

| Subcategoría | Fichas registradas | Plazos (frigorífico / congelador) |
|---|---|---|
| **Elaborados** | Hamburguesas de ternera; Hamburguesas de pollo; Salchichas frescas; Chorizo fresco; Chorizo criollo; Morcilla de Burgos; Morcilla Matachana; Filetes rusos; Pincho moruno; Lomo de cerdo adobado; Cachopo; San Jacobo | Hamburguesas y filetes rusos **2/90 días**; embutidos frescos (salchichas y chorizos) **2/30**; morcillas a granel **5/30** (ajuste posterior); pincho moruno crudo **2/90**; lomo adobado **5/120**; cachopo y San Jacobo **2 / sin plazo de congelación contrastado** |
| **Charcutería** | Jamón cocido; Jamón serrano; Jamón ibérico; Pechuga de pavo (fiambre); Salami; Lomo de cerdo embuchado; Salchichón; Chorizo curado; Bacon; Cecina | Jamón cocido y fiambre de pavo **5/30**; jamones curados al corte **3/30**; salami, lomo embuchado, salchichón, chorizo curado, cecina **6/30**; bacon **7/30** |

**Referencias contrastadas y decisiones de origen:**
- [FoodSafety.gov, Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): hamburguesas y carnes molidas 1–2 días/3–4 meses; embutido crudo 1–2 días/1–2 meses; fiambre vendido loncheado en mostrador 3–5 días/1–2 meses; bacon 7 días/1 mes. El frigorífico requiere ≤4 °C y congelador ≤−18 °C. Se almacena el máximo del intervalo refrigerado y el mínimo congelado (mes = 30 días).
- [FoodKeeper ES original](fuentes/foodkeeper-es-original.json): ID **102** embutido crudo → Salchichas frescas (fuente `FoodKeeper`, ID 102); ID **79** Tocineta/Bacon → Bacon (fuente `FoodKeeper`, ID 79); ID **43** picada de vacuno y **115** picada de aves → hamburguesas; ID **630** chorizo fresco **sin duración**, contrastado mediante familia de embutido crudo 102. ID **184** fiambre cortado en supermercado indica 3–5 días refrigerado **sin congelación original**; se completa desde FoodSafety.gov para jamón cocido y fiambre de pavo. IDs **514/515/516** son fiambres preenvasados y **no son aplicables** a las fichas al corte. ID **675** identifica jamón curado, pero no incluye plazos.
- [OCU, conservación de alimentos](https://www.ocu.org/alimentacion/seguridad-alimentaria/informe/conservacion-alimentos): fiambres y embutidos 3–6 días refrigerados, 1–2 meses congelados. Se aplica editorialmente a los elaborados cocidos vendidos sin envase cerrado y a los embutidos/cecina loncheados al corte cuando no hay ficha específica, **no como vida útil industrial del producto entero**. Para las dos morcillas se usa un valor conservador **6/30**, no el plazo de fábrica. El pliego oficial [Morcilla de Burgos](https://www2.new.itacyl.es/web/guest/-/marcas-igp-morcilla-de-burg-1) confirma que se cuece antes de venderse. El [fabricante de Morcilla Matachana](https://morcillamatachana.com/morcilla-matachana/) indica 20 días en frío para sus formatos en tripa, pero no deben extrapolarse a un producto **fraccionado al corte** o reenvasado domésticamente; si el vendedor declara condiciones específicas más restrictivas, prevalecen.
- [Consorcio del Jamón Serrano](https://consorcioserrano.es/jamon-consorcio-serrano/sabor-aroma-y-conservacion/): lonchas cortadas recientemente para la venta, refrigeradas, consumir en no más de **2–3 días**. Se usa **3 días** para jamones curados al corte, incluido ibérico por analogía de presentación; [FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) menciona un mes congelado para jamón tipo Serrano/Parma. La duración de una **pieza entera, deshuesada envasada o lonchas selladas de fábrica** no se extrapola.
- **Cortes crudos y adobados**: filetes rusos y hamburguesas son preparados crudos de carne picada → 2/90, sujeto a composición normal sin otro ingrediente de vida útil más restrictiva; pincho moruno se considera dado de carne cruda adobada → 2/90, sin permitir que el adobo amplíe plazos; lomo de cerdo adobado como corte fresco crudo → 5/120, igual que lomo fresco, pero **el adobo no reinicia los días**.
- **Cachopo y San Jacobo** se registran como `estado_recomendacion: "parcial"`: **2 días refrigerados** como criterio conservador de elaboraciones rellenas no cocinadas, pero congelación `true` con `congelacion_dias: null`, `tips_descongelacion: null` porque no hay una cifra propia respaldada para la combinación de carne/fiambre/queso/empanado. El banco ofrece la posibilidad de congelar, **sin calcular automáticamente una fecha no validada**. No confundir con cachopos industriales ultracongelados ni preparados cocinados.

**Separación del lomo adobado:** `CAR-POR-001` **Lomo de cerdo** sigue en Porcino para carne fresca natural, pieza y filetes **sin adobar**. Se retiran de sus sinónimos las búsquedas de lomo adobado. Se crea **`CAR-ELA-010` «Lomo de cerdo adobado»** en Elaborados, sin borrar ni reclasificar la ficha natural. Su plazo de 5/120 no implica mayor durabilidad por el adobo. No se crean duplicados ni se modifican los tiempos originales del lomo natural.

**Presentaciones y limitaciones:** las doce fichas de Elaborados llevan `presentacion: null`; las diez de Charcutería llevan `presentacion: "Al corte"`, excluyendo automáticamente la interpretación de piezas industriales enteras o productos cerrados de origen. Los ingredientes se consideran comprados a granel, de un establecimiento que mantiene la cadena de frío, y se toma como base compra/preparación; al vacío doméstico no añade días. Ciertos plazos son **extrapolaciones editoriales contrastadas a la familia del producto** (`fuente: "agregación"`, `id_fuente:null`), no tiempos literales de FoodKeeper. Las recomendaciones de congelación son principalmente de calidad, no certificados sanitarios. **El estado `verificado` solo indica método y tiempo editorialmente fijados**, no inocuidad absoluta. Las notas vacías en las fichas permiten usar los consejos editables del panel existentes.

**Campos y exclusiones:** Todas estas fichas ofrecen refrigeración y congelación; las conservas caseras o despensa quedan `false` con plazo/consejos `null` porque se trata de compra a granel para mantener en frío. Esto no prohíbe otros usos validados de un producto distinto. Las fichas parciales no bloquean la introducción manual de fecha. **Otras aves** y **Caza** siguen vacías y ocultas; las subcategorías **Elaborados y Charcutería** aparecen de forma automática por tener registros seleccionables. El original FoodKeeper no se modifica. El procedimiento acordado es **commit directo en `main` sin PR**, documentación y comprobación ligera, sin tocar UI, etiquetas, motor, BLE ni repositorios de producción.

## Taxonomía ampliada · Elaborados y Charcutería (08/11/2026, vigente)

**Decisión autorizada:** dentro de **Carnes y Aves** se añaden las
subcategorías **Elaborados** y **Charcutería**, junto a las siete
anteriores. Quedan **4 categorías principales y 28 subcategorías**,
con **9 subcategorías en Carnes y Aves**. No se introducen ingredientes
ficticios ni se modifica el catálogo de **23 fichas** existente.

- **Elaborados:** productos de carnicería elaborados y vendidos a granel,
  especialmente hamburguesas y salchichas frescas. **Decisión posterior:**
  el chorizo curado se registra en **Charcutería**; este pasaje
  histórico no constituye la clasificación vigente.
  El chorizo curado no es carne fresca ni debe recibir por defecto
  los plazos de refrigeración/congelación de hamburguesas o carne
  cruda. Los métodos y plazos se estudiarán **por producto y
  presentación** antes de incorporar cada ficha.
- **Charcutería:** alimentos de charcutería vendidos **al corte o a
  granel**, como jamón, fiambre de pavo, jamón York, salami, lomo
  embuchado y bacon. Los tiempos dependerán del estado del producto,
  salazón/curación/cocción, manipulación y condiciones del mostrador;
  no extrapolar sin contrastar la fuente. Se mantiene el criterio
  de excluir las **fichas de productos comerciales preenvasados**
  por marca, pero sí se contempla la charcutería a granel
  autorizada expresamente.
- **Otras aves** y **Caza** permanecen vacías, sin registros ni
  fechas previstas. **Elaborados** y **Charcutería** también nacen
  vacías hasta la selección expresa de fichas por la usuaria.

**Visibilidad:** el filtro existente de subcategorías se construye
únicamente a partir de fichas seleccionables en el catálogo.
Por tanto, ninguna de estas **cuatro subcategorías vacías** se muestra
en el selector hasta que tenga ingredientes aprobados. La categoría
principal **Carnes y Aves** permanece visible por sus otras fichas;
no se crean chips para subcategorías sin registros. **No se cambia
`banco-ui.js`, ni HTML, CSS, diseños o impresión.**

**Procedimiento de laboratorio:** modificación de esquema,
documentación y aserción básica de taxonomía por **commit directo
en `main`**; sin PR ni gestión manual de Actions. El
[archivo FoodKeeper original](fuentes/foodkeeper-es-original.json)
continúa intacto. Las decisiones históricas anteriores de
«26 subcategorías» quedan **sustituidas por 28**, sin borrar
el historial de adopción de la taxonomía inicial.

## Clasificación vigente: cuatro categorías (08/11/2026)

La tabla que figura más arriba con 14 categorías es únicamente **FoodKeeper original**. MiruRecetas ha sustituido su clasificación previa de 11 categorías por **cuatro categorías y 28 subcategorías aprobadas**:

| Categoría | Subcategorías aprobadas |
|---|---|
| **Carnes y Aves** | Vacuno; Porcino; Ovino; Pollo; Pavo; Otras aves; Caza; Elaborados; Charcutería |
| **Pescados y Mariscos** | Pescado blanco; Pescado azul; Crustáceos y moluscos; Cefalópodos |
| **Frutas y Verduras** | Frutas; Hortalizas; Verduras de hoja; Tubérculos; Hongos; Algas |
| **Despensa** | Arroz; Pasta; Cereales; Legumbres; Harinas; Frutos secos; Semillas; Especias y hierbas; Conservas |

**Panel de selección:** **los chips de categorías sin ningún ingrediente registrado seleccionable no aparecen**, aun cuando esas categorías existan en la taxonomía. No crear alimentos de relleno; presentar solo chips con contenido.

Aves quedan dentro de Carnes y Aves; pulpo dentro de Cefalópodos; hongos y algas dentro de Frutas y Verduras. Se **elimina Lácteos y huevos** del banco, por no utilizarse con ingredientes a granel para etiquetar. La antigua clasificación de Cereales y Legumbres, Frutos secos y semillas, Condimentos y Conservas queda sustituida por **Despensa**, con **nueve subcategorías aprobadas**. La denominación visible será simplemente **«Conservas»**; su contenido se limitará exclusivamente a conservas caseras en una fase futura, no a conservas comerciales. No incorporar productos comerciales envasados (incluidos sal, vinagre, grasas/aceites o proteínas vegetales comerciales); las masas/preparaciones de otros formatos tampoco pertenecen aquí. Aún no se ha creado el JSON derivado ni implementado la UI.

## Uso doméstico: el banco solo ayuda a rellenar etiquetas (08/11/2026)

**No añadir restricciones funcionales que la usuaria no haya pedido.** El etiquetado libre de Pequeña sigue disponible siempre; seleccionar un ingrediente del banco **solo precarga campos editables**. El banco es una colección sencilla de datos para evitar escribir a mano, **no un sistema de aprobación de lo que se puede etiquetar**. Los estados globales `verificado`, `parcial` y `sin_datos` son **metadatos del catálogo, no permisos de impresión**. Si falta plazo (`null`), no hay sugerencia automática de fecha, pero la usuaria puede completar los datos manualmente y utilizar la etiqueta. Las reglas sobre qué fichas se añaden al banco (como no poblarlo con productos comerciales) son solo **selección editorial del banco** y no restringen las etiquetas libres. Conservar las validaciones técnicas existentes de impresión, sin crear controles adicionales de contenido, procedencia o seguridad alimentaria.

## JSON Schema del catálogo (creado 08/11/2026)

[**`catalogo.schema.json`**](catalogo.schema.json) define el almacenamiento mínimo en **JSON Schema Draft 2020-12**. El catálogo que se creará después tiene raíz `{"ingredientes":[]}` y puede empezar vacío. **Crear el esquema no significa que exista ya un catálogo poblado ni que el panel esté implementado.**

- Contiene las **4 categorías y 28 subcategorías aprobadas** y el ID tipo `CAR-VAC-001` (siglas de categoría, siglas de subcategoría y número).
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
