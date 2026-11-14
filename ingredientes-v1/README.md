> **Migración a producción completada · 14/11/2026.** La [PR privada #113](https://github.com/MiruRecetas/mirurecetas-web-source/pull/113) fusionó «Mis etiquetas» en la única web/PWA. [Publicación automática #43584394847](https://github.com/MiruRecetas/mirurecetas-web-source/actions/runs/43584394847), [PR pública #203](https://github.com/MiruRecetas/menu-anual-recetas/pull/203) y [Pages #43584749102](https://github.com/MiruRecetas/menu-anual-recetas/actions/runs/43584749102) correctos. Catálogo 302 fichas (301 seleccionables); origen y SHA documentados. **Compacta y Amplia B siguen pendientes de aprobación física CT230B.** El laboratorio sigue siendo un entorno de referencia, no la fuente productiva. [Cierre y trazabilidad](ESPECIFICACION-PREVIA-MIGRACION-MIS-ETIQUETAS-2026-11-10.md#10-cierre-documental-posterior--migración-publicada--14112026).

## Norma obligatoria de cambios · 10/11/2026

**Secuencia vinculante para cualquier modificación de diseño, desarrollo o código del etiquetado y del laboratorio:**

1. **Documentación previa en el laboratorio:** antes de implementar, registrar el alcance concreto, diseño previsto, archivos afectados, decisiones, límites y pruebas previstas mediante **PR documental o commit documental directo a `main` del laboratorio**. Esta evidencia debe existir en `main` antes de empezar la modificación técnica.
2. **Implementación mediante PR:** realizar los cambios de diseño, desarrollo o código en una rama y abrir **PR de implementación**, revisarla y fusionarla con **merge**. No utilizar un commit directo a `main` como sustituto de esta PR de implementación.
3. **Documentación posterior:** una vez fusionada y comprobada la implementación, registrar lo realmente realizado, la PR y commit de merge, validaciones, pruebas físicas (solo si ocurrieron), diferencias respecto al plan y pendientes, mediante **PR documental o commit documental directo a `main` del laboratorio**.

**Orden obligatorio:** documentación previa integrada → PR técnica fusionada → documentación posterior integrada. La autorización general para implementar no omite ninguna etapa. Si cambia el alcance durante el trabajo, actualizar previamente el registro documental correspondiente antes de materializar el cambio. Distinguir expresamente implementación, validación informática, validación física y publicación productiva; no dar por cerrada una fase sin evidencia. Esta regla es aplicable también a cambios destinados a trasladarse al repositorio privado: documentar antes y después en el laboratorio, y respetar además la política de PR/CI/publicación del repositorio privado.

**Decisión de catálogo:** la población selectiva del banco doméstico se considera finalizada por la usuaria. No incorporar ni proponer nuevas fichas hasta después del traspaso al repositorio privado y la publicación oficial de «Mis etiquetas» en web/PWA, y solo tras una nueva decisión expresa.

# Conserva · «Mis etiquetas» (laboratorio · interfaz experimental)

## Validación física de Pequeña desde el banco doméstico — 10/11/2026

**Estado: APROBADA FÍSICAMENTE POR LA USUARIA.** La usuaria confirma expresamente: «Están todas perfectas impresas, todas han salido de los datos precargados del banco». Se trata de una prueba real de **Pequeña** con impresora térmica **Clabel** conectada mediante BLE/UART, **sin QR**, usando los datos precargados del **banco doméstico de ingredientes**, aplicados a las etiquetas. La fotografía compartida muestra la tira impresa con **Puerro** (50 g), **Pechuga de pavo – Tiras** (170 g, repetida), **Pechuga de pavo – Dados** (170 g), **Pechuga de pavo – Filetes** (170 g) y **Pulpo – cocido** (125 g parcialmente visible). No se deduce un inventario de la tira ni se presupone que represente todas las etiquetas emitidas.

**Evidencia aportada:** fotografía de impresión física y registro de consola del 10/11/2026, aproximadamente 22:32–22:39 (Europe/Madrid). El registro indica cinco trabajos de envío BLE concluidos con fragmentos **198/198**, **241/241** (trabajo TSPL de dos copias), **239/239**, **238/238** y **223/223**. Se registra «Notificaciones GATT habilitadas», conexión UART y transmisión completa. La optimización de raster Pequeña presenta en las muestras informadas ahorros de aproximadamente **18,8–23,5 %**, con partición en más sub-bandas. **La transmisión completa no basta por sí misma para acreditar la impresión: la confirmación expresa de la usuaria es la validación física definitiva.** Las fotografías y los logs proceden de la conversación; **no se incorporan al repositorio público**.

**Alcance de la aprobación:** queda validado el recorrido **selección de ficha del banco → precarga editable → raster Pequeña → transporte BLE → impresión física**, con legibilidad y alineación aceptadas por la usuaria. No constituye ensayo ni aprobación física de **Compacta** o **Amplia B**; la prueba física de Amplia sigue pendiente según el registro facilitado. No implica inventarios, cambios de formatos, ni nuevos requisitos de seguridad alimentaria. No se modifica el motor, la interfaz, la impresión, las fichas, ni la fuente original FoodKeeper; solo documentación del resultado de pruebas.

> **Tubérculos y Hongos · lote 09/11/2026:**
> Se actualiza Patata existente como «Pieza entera cruda»
> (nevera 14 d, despensa 60 d) y se añaden Patata
> (Asada, Cocida), Boniato (crudo entero, Asado, Cocido),
> Yuca, Apionabo, Zanahoria (entera cruda, Dados),
> Remolacha (Cruda, Cocida), más Champiñón,
> Portobello, Shiitake, Seta de ostra, Boletus y
> Níscalos frescos. **17 nuevas, 101 fichas totales**.
> Algas queda vacía y oculta. Cambios de datos
> por commit directo en main, sin PR ni pruebas
> integrales ni retoques de interfaz o impresión.
> [Detalle](banco/README.md).
>
> **Pescados y mariscos · lote 09/11/2026:**
> 14 nuevas fichas en **Crustáceos y moluscos**:
> almejas y mejillones (sin duplicar vivo/fresco);
> gambas, langostinos y gambón crudos, cocidos
> y pelados (pelados en crudo); zamburiñas;
> bogavante entero y colas. En **Cefalópodos**:
> Calamar, Chipirón y Sepia nuevos y Pulpo
> existente completado. Referencias FoodKeeper
> 150/151/152/157/160/162 y OCU/USDA.
> **84 fichas**; commit directo en main, sin cambios
> de interfaz ni impresión.
> [Expediente](banco/README.md).
>
> **Banco · Pescado azul (09/11/2026, vigente):**
> 10 fichas: Boquerón (Pieza entera); Atún (Lomos);
> Bonito (Lomos y Rodajas); Caballa (Pieza entera);
> Jurel (Lomos y Pieza entera); Pez espada (Rodajas);
> Salmón (Lomos); Sardina (Pieza entera).
> **2 días refrigeración / 60 días congelación**,
> desde el grupo FoodKeeper 146. Bonito y Jurel
> se desdoblan por presentación. **67 fichas totales**.
> Sin cambios de interfaz ni impresión.
> [Expediente](banco/README.md).
>
> **Pescado blanco · 09/11/2026 (vigente):**
> 7 fichas: Bacalao (Lomos desalados / En salazón),
> Abadejo (Lomos), Dorada/Lubina (Pieza entera),
> Merluza/Corvina (Lomos). Nevera 2 días en pescado
> fresco; congelador 180 días (abadejo 120);
> Bacalao seco-salado apto para despensa solo
> Despensa 180 días. Fuente agrupada FoodKeeper
> 144/145 y OCU, con lubina española no confundida
> con «rockfish». Total **57 fichas**.
> [Detalle](banco/README.md).
>
> **Charcutería · decisión doméstica vigente (08/11/2026):**
> Las fichas «Al corte» de jamón serrano/ibérico, salami,
> lomo embuchado, salchichón, chorizo curado y cecina
> **NO ofrecen congelación**, según las capturas y
> preferencias de la usuaria. Tampoco Jamón cocido y
> Pechuga de pavo (fiambre), por calidad/textura.
> Sus campos de congelación son `false/null`.
> Los curados al corte con despensa mantienen 60 días
> con nota «Envasado al vacío»; las cinco piezas enteras
> ofrecen solo despensa 180 días. Bacon no cambia.
> Banco = precarga de etiquetas caseras, **no fábrica**:
> cambios de datos directos en main, sin PR ni ensayos
> de impresión ni controles añadidos. 50 fichas.
> [Protocolo](banco/README.md).
>
> **Charcutería curada · dos presentaciones (08/11/2026, histórico):**
> Para Jamón serrano, Jamón ibérico, Lomo embuchado, Salchichón
> y Chorizo curado, las fichas «Al corte» conservan frío
> y congelación y añaden **Despensa 60 días** con nota
> «Envasado al vacío». Otras cinco fichas «Pieza entera»
> usan únicamente **Despensa 180 días** sin empezar.
> Plazos editoriales condicionados a que el curado sea
> realmente estable a temperatura ambiente según vendedor
> o fabricante. El vacío por sí solo no lo garantiza.
> Total **50 fichas** (15 de Charcutería), sin cambiar la UI.
> [Expediente](banco/README.md).
>
> **Morcillas y curados · revisión 08/11/2026 (histórico):**
> Morcilla de Burgos y Matachana: **frío obligatorio 2–4 °C**,
> **5 días nevera / 30 días congelación** en compra doméstica
> a granel, sin despensa. Su nota editable indica la temperatura.
> Los curados secos pueden ser estables a temperatura ambiente
> según sus características; **no asignar 60 días en vacío ni
> 180 días a piezas enteras universalmente**.
> Las fichas actuales «Al corte» siguen sin despensa hasta
> comprobar presentación y vida útil; el vacío casero
> no convierte un producto perecedero en estable.
> [Expediente y fuentes](banco/README.md).
>
> **Banco · Elaborados y Charcutería, 08/11/2026 (vigente):**
> Registrados 12 elaborados de carnicería y 10 productos
> de charcutería al corte. **45 fichas totales**,
> 28 subcategorías taxonómicas. Chorizo curado se ubica
> en Charcutería según la selección más reciente.
> Lomo de cerdo natural permanece en Porcino; el
> **lomo de cerdo adobado** tiene ficha nueva en Elaborados.
> Los platos rellenos Cachopo y San Jacobo tienen
> congelación disponible sin fecha automática, al faltar
> un plazo específico fiable. Se documentan referencias
> FoodKeeper, FoodSafety.gov, OCU y fuentes regionales.
> Sin cambios del panel ni la impresión.
> [Expediente](banco/README.md).
>
> **Taxonomía Carnes y Aves · 08/11/2026 (vigente, estructura):**
> 9 subcategorías: Vacuno, Porcino, Ovino, Pollo, Pavo,
> Otras aves, Caza, **Elaborados** y **Charcutería**.
> Elaborados: hamburguesas y salchichas frescas de carnicería
> y chorizo curado; este último sin extrapolar plazos de
> carne cruda. Charcutería: jamón, fiambres, salami, lomo
> embuchado y bacon vendidos al corte/a granel.
> Otras aves, Caza, Elaborados y Charcutería siguen vacías y
> ocultas hasta contar con fichas seleccionables.
> **28 subcategorías totales, 23 fichas sin cambios**.
> [Decisión canónica](banco/README.md).
>
> **Banco de aves · incorporación 08/11/2026:** seis fichas autorizadas:
> Pollo entero, Pechuga de pollo (Pieza entera / Filetes),
> Muslo de pollo, Carne picada de pollo y Pechuga de pavo.
> Nevera 2 días; congelador 360 / 270 / 90 días según tipo.
> Pechuga fileteada deriva de FoodKeeper 117 y contraste oficial;
> fuente global «agregación». Catálogo actual: **23 fichas**.
> Solo datos y documentación, sin modificar interfaz ni motor.
> [Expediente](banco/README.md).
>
> **Normalización del banco · lechazo/cerdo (08/11/2026, vigente):**
> Paletilla de lechazo (Pieza entera), Chuletillas de lechazo (null),
> Lomo de cerdo (null, incluye pieza y filetes crudos adobados en
> casa o sin adobar), Solomillo de cerdo (null), Costillas de cerdo
> (null), Carne picada de cerdo ("Picada"), Cerdo para guisar
> ("Dados"). Sin variar plazos: 5/120 días o 2/90 para picada
> y dados; 17 fichas, mismos IDs. Adobar no alarga el plazo;
> los productos comerciales adobados siguen su propio etiquetado.
> FoodKeeper no distingue específicamente lechazo.
> Datos de laboratorio: commit directo a main, Pages automático,
> comprobaciones ligeras, sin PR por lote.
> [Expediente](banco/README.md).
>
> **Banco ovino y porcino · ampliación 08/11/2026 (histórico):**
> 8 registros FoodKeeper elegidos (48, 51, 61, 67, 69, 72, 73 y 75)
> se incorporan como **7 fichas**: 2 Ovino, 5 Porcino. Solomillo
> entero y medallones de cerdo (67/69) comparten una ficha,
> `presentacion: null`, con ID 67 y trazabilidad del 69.
> Cortes enteros/chuletas/costillas **5/120 días**; carne picada
> y lomo en dados **2/90 días** (dados FoodKeeper 75 vs. fuentes
> especializadas, registrados como agregación). Solo frío/congelación;
> notas editoriales habituales. **Catálogo actual: 17 fichas.**
> No se ha modificado ningún diseño, modal, motor ni BLE.
> [Expediente de fuentes](banco/README.md).
>
> **Banco · cierre visual 08/11/2026:** el selector conserva todas sus
> funciones y adopta el patrón oficial «Preparar etiqueta»: fondo
> `#fffcf7`, barra móvil gris `46 × 5 px` (`#c1c9bf`) y cierre
> circular blanco `44 × 44 px` con solo «×», sin texto «Cerrar».
> Referencia: `mirurecetas-web-source/main/assets/etiquetas.css` y
> `assets/estilo.css`. Pendiente comprobación visual final en Android;
> fase siguiente: poblar las fichas del banco sin cambiar la interfaz.
>
> **Ampliación de banco · Vacuno (08/11/2026):**
> incorporadas cuatro fichas FoodKeeper 36, 37, 40 y 41, con IDs
> CAR-VAC-002…005. **Redondo de ternera**, **Solomillo de ternera**,
> **Filetes de ternera** y **Ternera para guisar** (presentaciones:
> Pieza entera, null, Filetes y Dados respectivamente). Solomillo
> cubre pieza entera y medallones crudos de 3–4 cm con los mismos
> plazos; el original FoodKeeper distingue beef/veal y mantiene sus IDs.
> **Redondo, solomillo y filetes:** refrigeración
> **5 días** y congelación **120 días**. **Carne para guisar en dados:**
> refrigeración **2 días** y congelación **90 días**, por el contraste
> específico con otras fuentes de conservación doméstica frente al
> FoodKeeper ES original ID 41 (registrado como `agregación`).
> Solo se ofrecen frío y congelación; despensa/conserva no se ofrecen.
> Notas editoriales de nevera/descongelación existentes y sin cambios
> de diseño ni impresión. Catálogo: **10 fichas**, cinco de Vacuno.
> [Expediente y discrepancia documentados](banco/README.md).
>
> **Actualización correctiva 08/11/2026 (prevalece sobre pasajes históricos):**
> restaurada la plantilla Pequeña previa a #68; el banco ofrece solo métodos
> aplicables y notas editoriales, conserva el modo libre independiente, oculta
> borradores sin modalidad validada y retira el enlace al JSON fuente de la UI.
> Carne picada: frío/congelación; lechuga: solo frío; patata: frío/despensa
> (plazo de despensa aún pendiente); orejones: despensa. Es una corrección en
> laboratorio pendiente de revisión visual y ensayos físicos. Ver
> [decisión canónica](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md#corrección-del-banco-y-preservación-del-diseño-08112026).
>

**Corrección adicional de nota · Pequeña:** la nota mantiene sin
cambios su posición vertical `y=227`, se centra horizontalmente en
`x=128` con ancho máximo `240`, en la misma zona que la cantidad,
y deja 20 puntos hasta el isotipo. No cambia la posición vertical ni
se modifica el resto del diseño. Referencia detallada en
[hoja de ruta](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).

**Incidencia posterior a PR #69, corregida en rama de laboratorio:**
la restauración de la plantilla histórica no evitaba el solapamiento de
«500 g» con el isotipo. `M.fit` anulaba el centrado previo. El
valor en gramos ahora se centra explícitamente en `x=128`, se limita
a 240 puntos de ancho y reserva 20 puntos hasta el isotipo. No cambia
el motor común ni los demás elementos. Refrescar el recurso versionado
en navegador y comprobarlo visualmente. Registro en
[hoja de ruta](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).

**Estado: desarrollo experimental exclusivamente en la rama de laboratorio.**
Este directorio contiene la página autónoma **«Mis etiquetas»**, con
selector de formatos aprobado y con **Pequeña 30 × 20** operativa en laboratorio.
**Compacta libre 50 × 30** está implementada con las correcciones visuales
de la [PR #46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46),
a raíz de la revisión de la PR #45. **Aprobada y validada visualmente por la usuaria
el 08/11/2026 en la página publicada**; no consta todavía ensayo físico CT230B
para esta variante libre. **Amplia 50 × 80 horizontal** se desarrolló después de Compacta. El 08/11/2026 se
aprobó **explorar diseños** basados en V0.7.3, sin QR y con espacio
redistribuido para instrucciones y nota; se presentaron dos maquetas
conceptuales A (bloques apilados) y B (secciones paralelas), cada una
con y sin macros. La **propuesta B fue elegida** y sus ajustes concretos
aprobados el 08/11/2026. Se ha incorporado `plantilla-amplia.js`, tercera
plantilla independiente en el mismo motor, con vista previa raster real,
**aprobada y validada visualmente tras PR #50 el 08/11/2026**. La usuaria autorizó expresamente **habilitar el envío BLE de Amplia ahora** y aplazar las pruebas físicas hasta la fase final. Se utiliza el mismo flujo de impresión compartido con confirmación y papel 50 × 80 mm. Ningún ensayo físico nuevo se afirma realizado. No se ha integrado ni migrado
ningún archivo a `MiruRecetas/mirurecetas-web-source`; no está publicado como
página productiva ni registra existencias.

## Fuente original FoodKeeper archivada (08/11/2026)

Se conserva **sin modificación de bytes** el JSON español original aportado por la
usuaria: [`banco/fuentes/foodkeeper-es-original.json`](banco/fuentes/foodkeeper-es-original.json)
(716.677 bytes; SHA-256 `2a25209edc1d578f1f0002a0a896c54c26611a4d986c46ebcdc156554190687b`).
Contiene **662 productos**, **25 grupos con ID** y **14 categorías
principales**, no confundibles con las futuras categorías editoriales
de MiruRecetas. Su [inventario y contrato de derivación](banco/README.md)
explican la estructura y las reglas de tratamiento. La propia fuente
indica `FMA-Data-v128.xlsx` (versión 128 fechada en 2018), sin asumir
vigencia actual respecto a posibles revisiones externas.

**Decisión expresa:** nuestro banco será un **segundo JSON propio**,
con categorías/subcategorías/elementos elegidos por MiruRecetas y
nombres es-ES; el original se conserva para consulta y trazabilidad.
El catálogo propio **solo tendrá ingredientes adquiridos a granel y,
más adelante, conservas caseras; nunca productos comerciales envasados**.
Mantendrá categorías, subcategorías, nombres en español de España y
una sola **presentación** opcional (sin duplicar «preparación»).
El flujo canónico usa **fecha de envasado = fecha de compra o preparación**.
El selector existente elegirá el plazo aplicable de refrigeración o
congelación. Para refrigeración se usa el **máximo** del rango FoodKeeper;
para congelación el **mínimo**. Al importar se convierte a **días enteros**:
semana = 7 días; mes = 30 días. El vacío no añade días. No duplicar
los campos originales: solo referencia breve a la fuente, estado,
tiempo operativo y tip corto por modo, además de identidad editorial.
AESAN queda como fuente de contraste. **`estado_recomendacion`, `fuente` e `id_fuente` son metadatos GLOBALES**, nunca de una conservación individual. `estado_recomendacion` admite tres estados: `verificado` (datos de los métodos fijados/aprobados), `parcial` (fuente externa con datos de solo algunos métodos), `sin_datos` (ingrediente nuevo sin datos aprobados). La fuente es obligatoria para verificado/parcial y **`null` si `sin_datos`**. Al completar por la usuaria una ficha parcial, `fuente: "usuario"`; si combina varias fuentes, `fuente: "agregación"`. `id_fuente` es texto único: p. ej. `"59"` para FoodKeeper, `null` para usuario/agregación/sin_datos, o `"sin_datos"` si la fuente externa única no asigna IDs (no confundir este literal con el estado de ficha). En `parcial`, los métodos sin datos se establecen con **booleano `true`, tiempo y notas `null`**, son seleccionables pero no calculan consumo preferente. Los métodos de refrigeración, congelación, despensa y conserva tienen sus booleanos independientes y plazos/tips breves. Desde el principio se incluyen `sinonimos` como array (vacío `[]`) y `tips_preparacion_conservacion` (texto opcional o `null`) para una futura sección de la web, **sin mostrarse ni imprimirse ahora**. No hay fichas explicativas extensas en el panel. El [catálogo experimental de seis fichas](banco/catalogo.json) y su panel **ya están implementados en laboratorio; pendientes de revisión visual**.

**Uso doméstico del banco (08/11/2026):** es una ayuda opcional para evitar escribir etiquetas a mano. Siempre se puede usar **Ingrediente libre** y **editar cualquier campo precargado** desde el banco antes de imprimir. Los estados `verificado`, `parcial`, `sin_datos` describen fichas, **no bloquean la creación o impresión**; si no hay plazo, no se propone fecha, pero la usuaria puede introducirla. Los criterios editoriales del catálogo (solo incorporar las fichas que interesan) **no restringen las etiquetas libres**. No añadir validaciones o controles alimentarios no solicitados; mantener únicamente las reglas técnicas del motor de impresión ya existentes.

## Taxonomía vigente del banco de ingredientes (10/11/2026)

Por decisión aprobada, las anteriores **Cereales** y **Harinas** se unifican en **Cereales y harinas** dentro de Despensa. La taxonomía vigente tiene **4 categorías y 27 subcategorías**. No se renombra ninguna categoría principal ni se crean fichas; las 7 existentes de Cereales pasan a esta subcategoría. El cuscús sigue en Pasta. El esquema del catálogo y el filtro dinámico del banco emplean exclusivamente la denominación nueva. Las menciones de 28 subcategorías en los apartados históricos corresponden a etapas anteriores.

## Taxonomía aprobada para el banco de ingredientes (08/11/2026) (histórico)

**4 categorías principales:** **Carnes y Aves** (Vacuno, Porcino, Ovino, Pollo, Pavo, Otras aves, Caza, Elaborados, Charcutería); **Pescados y Mariscos** (Pescado blanco, Pescado azul, Crustáceos y moluscos, Cefalópodos); **Frutas y Verduras** (Frutas, Hortalizas, Verduras de hoja, Tubérculos, Hongos, Algas); **Despensa** (Arroz, Pasta, Cereales, Legumbres, Harinas, Frutos secos, Semillas, Especias y hierbas, Conservas).

Esta clasificación reúne **4 categorías y 28 subcategorías aprobadas** y sustituye las once categorías editoriales anteriores, excluyendo «Lácteos y huevos». La última subcategoría de Despensa se denomina simplemente **«Conservas»** en el panel, aunque se reservará a conservas caseras; nunca a productos comerciales. Los **chips de categorías vacías no aparecerán en el panel**: para mostrarse, una categoría debe contener al menos un ingrediente seleccionable. Nunca crear registros ficticios ni incluir productos comerciales envasados. El [JSON Schema del banco](banco/catalogo.schema.json) **ya está creado** (4 categorías, 28 subcategorías y metadatos aprobados), y el **catálogo mínimo y el panel ya están implementados en laboratorio**, aún pendientes de validación visual; no es el catálogo definitivo. [Contrato del banco](banco/README.md).

## Banco JSON de Pequeña · patrón D con ciento una fichas (09/11/2026)

**Estado actual del banco:** ver [ciento una fichas y fuentes](banco/README.md), su [JSON](banco/catalogo.json) y el controlador [banco-ui.js](banco-ui.js). Los chips, el sheet y la precarga editable están en laboratorio; la usuaria **aún no ha validado visualmente** esta nueva interacción. La opción libre, Compacta y Amplia mantienen su uso. El selector de Pequeña incorpora Despensa y Conserva como modos adicionales, sin cambiar el arte aprobado de los modos anteriores.

La usuaria ha aprobado **dos chips bajo la vista previa de Pequeña**:
**«Ingrediente libre»** (por defecto) y **«Cargar del banco»**. Este último
abre un selector modal **inferior en vertical** y **lateral en horizontal**,
basado en el patrón de paneles de vista diaria y de impresión de la web
MiruRecetas, sin depender directamente de su código. El panel ofrecerá
búsqueda por nombre/alias, categorías, presentaciones, chips de filtrado,
fuentes consultables y **«Aplicar a etiqueta»**, deshabilitado hasta
selección concreta. Abrir/filtrar/seleccionar no modificará el formulario;
solo «Aplicar» precarga y abre el paso 1. El acordeón de pasos permanece
independiente. Deben conservarse el borrador **libre** y el del **banco**,
con selección recuperable, y todos los campos precargados seguirán
**editables**. En Compacta y Amplia no existirán chips ni banco.

En Pequeña con ingrediente del banco y **plazo aplicable numérico**,
al aplicar se propondrá el consumo preferente calculado desde el envasado
introducido por el usuario. Cambiar el envasado recalcula esa fecha
mientras siga en modo sugerencia; al editar el consumo preferente de
forma manual se respeta el valor y se detiene el recálculo, con
posibilidad de **«Restablecer recomendación»**. Se mostrará una sola nota pequeña bajo las fechas:
**«Tiempo recomendado: N días»**; no se imprimirá. Sin plazo aplicable
ni fuente/indicación expresa no habrá cálculo automático. El derivado
guardará solo **días**, recomendación y fuente breve; todo el detalle
de FoodKeeper está en el original inalterado. La refrigeración correcta
sigue siendo imprescindible; la recomendación de calidad no es garantía
de seguridad.

**Estado: aprobado el diseño y el comportamiento, no implementados.**
Fuentes y estructura de almacenamiento documentadas en el [esquema aprobado para desarrollo](banco/catalogo.schema.json). Pendiente crear el catálogo inicial y conectar el panel; las etiquetas libres siguen plenamente editables.
No hay modificaciones en plantillas, motor, BLE, impresión, producción
ni Airtable. Consultar la [hoja de ruta](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md)
para las decisiones y casos de validación.

## Contrato de producto y diseño aprobado (06/11/2026)

**Documento rector:** [MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
Contiene las decisiones de la usuaria y diferencia entre diseños aprobados,
motor actual, formatos futuros, banco JSON, «Mis reservas» y requisitos P10.

El **selector visual de cuatro tarjetas en una sola fila** fue aprobado
expresamente por la usuaria, con iconos SVG actuales de **Amplia 50 × 80**,
**Compacta 50 × 30**, **Pequeña 30 × 20** y **Más formatos · Próximamente**.
No añadir textos de disponibilidad a las tres primeras ni alterar sus iconos
sin nueva aprobación; registro final en [PR #40](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/40).
Sus radios actualizan el formulario y la vista previa de la tarjeta fija; **solo hay dos pasos desplegables y mutuamente excluyentes** (Datos e Impresión). **Pequeña, Compacta y Amplia** generan y pueden enviar etiquetas libres a CT230B desde el laboratorio, usando un único flujo de impresión y confirmaciones. Compacta y Amplia están **aprobadas visualmente**; su aceptación física específica y multicopia permanece como comprobación posterior.

El término «receta/componente/ingrediente» se reserva para documentación y
formulario específico, no como subtítulo del selector de formatos.

## Compacta libre 50 × 30 · variante experimental independiente (07/11/2026)

La geometría de la **V0.9** se conserva en `plantilla-compacta.js` como
**plantilla de composición**, sin QR. Se registra en el motor único
`motor-libre.js`, completamente independiente de `label-v09-component.js`,
del motor web privado y de las etiquetas productivas. **No modificar la V0.9
original**: la plantilla libre tiene ciclo de vida y futuras revisiones propias.

El formulario compacto admite nutrición manual opcional, instrucciones y
nota libre con casillas que controlan **solo el texto** inferior, nombre y ambas
fechas (primera obligatoria; segunda opcional con `--/--/--`). La composición
aprobada el 08/11/2026 conserva ambos encabezados inferiores y su espacio,
aunque el texto esté vacío u oculto. Con nutrientes presentes, fechas y
rótulos comparten línea a la izquierda sin separadores verticales;
la nutrición ocupa la derecha con kcal en caja negra redondeada y macros
separados. Con nutrición apagada, fechas y rótulos se centran en
**dos columnas de igual anchura**, sin separador y sin hueco de macros.
Se retira la raya horizontal adicional antes del encabezado de conservación.
El título, el isotipo BN y la banda negra superiores conservan exactamente
las coordenadas y tamaños V0.9, sin texto añadido bajo el isotipo. El preview usa el raster de 590 × 354
que genera el mismo motor de TSPL; la impresión CT230B usa los controles BLE
ya existentes y multicopia `PRINT 1,n`. El espacio del antiguo QR se ha aprovechado para extender las secciones de
texto a todo el ancho según el diseño elegido. La geometría sin QR **está aprobada visualmente por la usuaria**;
las variantes sin texto y las series multicopia **no adquieren aprobación física
por herencia** de la V0.9 original. Ver
[MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md](MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).

Al cambiar el tipo de conservación de Compacta se reutiliza la regla de
Pequeña: congelación → rótulo «Envasado y congelación» e instrucción editable
«Descongelar en nevera»; refrigeración → «Envasado» y «Conservar en nevera»;
otro → «Conservación» e instrucción vacía. La nota personal anterior se
limpia para evitar mensajes contradictorios; puede volver a editarse.
«Consumo preferente» permanece siempre visible con ese nombre. Ningún modo
calcula automáticamente la fecha ni un plazo.

**Arquitectura unificada (07/11/2026):** `motor-libre.js` contiene una única
implementación de fechas y utilidades de validación, carga del isotipo, ajuste
tipográfico, salto de líneas, renderización Canvas, raster 1 bit en bandas,
construcción TSPL y validación de multicopia. `plantilla-pequena.js` y
`plantilla-compacta.js` **solo** registran reglas particulares de datos y
coordenadas gráficas. `app.js` gestiona una única conexión/transporte BLE.
No importar ni modificar los motores históricos o productivos. La unificación
no constituye aprobación física de las nuevas variantes.

## Optimización común de impresión · parcelación V0.6.2 (08/11/2026)

Los tres formatos libres utilizan desde esta actualización un único algoritmo de
raster disperso derivado **conceptualmente** de `label-v062.js` sin importar
ese archivo. Cada banda de 12 filas se divide **solo cuando compensa** en
hasta seis regiones horizontales no solapadas, recortadas a filas y columnas
con tinta en unidades de 8 px. El coste incluye cabecera y terminación
de cada `BITMAP` y una penalización por comandos adicionales. El raster de
1 bpp, el posicionamiento absoluto y los diseños aprobados **son idénticos**
antes y después. Se mantienen **35.000 B** de límite, 20 B/fragmento BLE,
confirmaciones, `PRINT 1,n` y el mismo UART; no se modifican plantillas.

El diagnóstico técnico existente muestra, por formato y para el **mismo
raster**, los bytes anteriores, los actuales, el ahorro en bytes/porcentaje
y las sub-bandas antes/después. `build()` expone `baselineBytes`,
`baselineTiles`, `bytes`, `tiles` y `savedBytes`; esos datos también están
en el dataset del canvas para comprobación. **Resultados reales del navegador Android (08/11/2026, PR #55 publicada):**
- **Pequeña:** 4.048 → 3.226 B; ahorro 822 B (20,3 %); 16 → 23 sub-bandas.
- **Compacta:** 14.176 → 9.476 B; ahorro 4.700 B (33,2 %); 27 → 56 sub-bandas.
- **Amplia (Pisto casero):** 44.334 → 27.505 B; ahorro 16.829 B (38,0 %); 79 → 280 sub-bandas.

El resultado de Amplia queda **por debajo de 35.000 B sin modificar el límite**.
Son mediciones comunicadas por la usuaria desde el diagnóstico del navegador,
**no** resultados de patrones sintéticos ni verificación de impresión física;
la reducción de bytes no demuestra un tiempo de impresión real. Si un trabajo
posterior sigue superando 35 KB se bloquea y se muestran ambas medidas.

La equivalencia 1 bpp se prueba reconstruyendo cada TSPL enviado sobre el
lienzo físico de los tres tamaños, junto con casos de bandas llenas, blancas,
límites de 8 píxeles, cortes de banda, dos columnas y datos aleatorios. Una
prueba sintética comprueba que un trabajo anteriormente bloqueado puede
quedar por debajo del umbral. **No constituye prueba física CT230B**;
se mantiene para el cierre final autorizado.

## Amplia libre 50 × 80 horizontal · propuesta B (08/11/2026)

Arte 945×590 girado −90° para el raster físico 590×945 del rollo 50×80;
la vista previa lo rota para facilitar su lectura sin dibujar una etiqueta
alternativa. `plantilla-amplia.js` es autónoma del motor V0.7.3 histórico:
conserva su cabecera, isotipo oficial y banda, pero **no QR, anillo, gramos,
raciones ni URL de receta**. Títulos negros redondeados «CONSERVACIÓN Y CONSUMO»
y «NOTA» en columnas paralelas, con líneas conectadas hasta los bordes;
kcal invertida en caja redondeada y PR/HC/GR debajo. Con macros, fechas en
**cuatro filas**; sin macros, **dos columnas centradas**. Títulos inferiores
fijos aunque los textos estén ocultos o vacíos. Formulario con campos
manuales y rótulos adaptados al tipo de conservación; primera fecha obligatoria
y segunda opcional. Mismo motor `motor-libre.js` y raster TSPL común.

**Revisión de formulario y textos (08/11/2026):** la usuaria ha aprobado visualmente la composición Amplia B y ha solicitado corregir dos comportamientos: los textarea de conservación y nota usan ahora **el mismo Geist, peso y estilo de Compacta**, y la plantilla libre de Amplia preserva los Enter (LF/CRLF y líneas internas vacías) a la hora de imprimir texto. Se conserva el ajuste automático de cada línea a la anchura de su caja, hasta 5 líneas de conservación o 6 de nota; si no cabe, se bloquea sin truncar. El **motor común y las plantillas Pequeña y Compacta no se modifican**. La usuaria ha **confirmado la aprobación y validación visual de la versión corregida** el 08/11/2026; el diseño queda cerrado. No consta prueba física CT230B de la nueva etiqueta.

**Estado vigente (08/11/2026):** **botón de impresión de Amplia habilitado** por autorización expresa de la usuaria, sin alterar el diseño visual aprobado. El formulario y la vista previa utilizan el mismo raster físico 590 × 945 que se entrega a `motor-libre.js`. Los pasos obligatorios son datos válidos, raster construible, CT230B conectada, confirmación de papel **50 × 80 mm**, aprobación explícita del trabajo y envío BLE UART de 20 bytes con pausa; 1–20 copias en `PRINT 1,n`. No hay reintentos automáticos, registros de inventario ni cambios a otros motores. **La revisión física se hará al final:** el envío de bytes no demuestra alimentación, orientación, alineación o legibilidad. Compacta, Pequeña y los ensayos históricos no cambian.

## Cabecera aprobada · variante interior

La cabecera provisional del primer prototipo ha sido reemplazada por el
**componente oficial de interiores** de MiruRecetas, reutilizando el marcado
de `mirurecetas-web-source/main:plantillas/cabecera.html`, el isotipo
vectorial de `assets/marca/isotipo.svg` (seis piezas, recorte oficial) y copias
idénticas de `assets/cabecera.css` y `assets/cabecera.js` en este directorio.

Se conserva exactamente la navegación vigente: Cocina → recetario;
Disfruta → planificador; Conserva → listas de la compra del planificador.
Los apartados futuros no tienen enlaces inventados. El botón «Instalar»
permanece oculto en el laboratorio porque aquí no está habilitado el
controlador PWA productivo. **No se ha modificado ni re-publicado**
`mirurecetas-web-source`, ni se ha añadido aún un enlace nuevo de
«Etiquetas de ingredientes» al menú oficial.

Para futuras actualizaciones debe contrastarse la cabecera del laboratorio
con los tres archivos canónicos de `main` y conservar el modo
`miru-header--interior`; nunca usar la variante Hero.

## Qué contiene

- `index.html`: página completa, responsive y revisable editorialmente. No es
  el `index.html` histórico de experimentos CT230B.
- `style.css`: presentación separada del motor, con crema/salvia/terracota,
  Bricolage Grotesque para titulares y Geist para texto.
- `motor-libre.js`: **motor único de etiquetas libres** (raster, TSPL, tipografía,
  fechas, ajuste de textos y carga del isotipo).
- `plantilla-pequena.js`: composición y reglas de datos de 30 × 20, sin motor
  TSPL propio y sin modificar el diseño de referencia V0.8.
- `plantilla-compacta.js`: composición y reglas de datos de 50 × 30, sin QR,
  aislada de la V0.9 original, con diseño libre todavía experimental.
- `app.js`: interacción, carga estricta de tipografías/isotipo oficial,
  previsualización, conexión voluntaria, confirmación, transporte BLE, barra de
  progreso y registro local.

La fuente de referencia experimental aprobada está en
`../label-v08-ingredient.js` y
`../V08-INGREDIENTE-30x20-CANVA-ENSAYO.md`. **No modificarla.** La V0.8
fue impresa y aprobada en cinco ensayos (30/10/2026). La usuaria ha
utilizado posteriormente este panel V1 para seis transmisiones BLE consecutivas
de 5919 B / 296 fragmentos cada una (05/11/2026), pero la evidencia de consola
**no acredita por sí sola la salida ni alineación física**. Las variantes
nuevas con gramos o pie vacíos y multicopia no han sido contrastadas físicamente
con la V0.8; no dar por validada esta modificación sin pruebas específicas.

## Contrato congelado de la etiqueta

- Papel **30 × 20 mm**, lienzo **354 × 236 puntos**; lectura horizontal.
- Nombre editable; gramos **opcionales** enteros entre **1 y 9999** si se indican.
- Fecha de envasado **obligatoria y visible siempre**, con rótulo adaptado al
  tipo de conservación elegido (congelación o envasado genérico).
- Consumo preferente **opcional y visible siempre**: en blanco se imprime
  `--/--/--`; si se fija no puede ser anterior al envasado.
- Tipografía Bricolage Grotesque / Geist, separadores raster, isotipo oficial
  monocromo y pie editable de hasta 32 caracteres (sujeto además a la anchura
  física del pie: 285 puntos, tipografía Geist itálica 16–12 px).
  «Refrigeración» precarga «Conservar en nevera»; «Congelación» precarga
  «Descongelar en nevera»; «Otro tipo» cambia el rótulo de la fecha a «Conservación» y deja el texto de la nota vacío y editable, sin bloquear la vista previa ni la impresión.
  «Mostrar nota» permite ocultar el pie sin perder lo escrito mientras se edita.
  Cambiar el tipo de conservación sustituye la nota por el texto predeterminado.
  Las variantes sin peso/pie o con texto personalizado necesitan verificación
  física; no alteran la V0.8 histórica.
- **Sin QR**, sin valores nutricionales, sin inventario ni lote.
- TSPL `SIZE 30 mm,20 mm`, `GAP 2 mm,0 mm`, `DIRECTION 0`, `CLS`,
  `BITMAP` disperso de bandas ≤12 filas y **un solo `PRINT 1,n`**,
  con selector de **1–20 copias**. No se generan múltiples trabajos BLE.
- Máximo 35.000 bytes, BLE UART CT230B, fragmentos de 20 bytes con pausa
  de 75 ms y sin reintentos automáticos. Los controles bloquean envíos
  incompletos o con datos inválidos. Barra terracota con fragmentos
  enviados/restantes y porcentaje de transporte (no certifica impresión física).
- Antes de enviar varias copias, verificar alineación en papel real;
  una transmisión correcta no garantiza el número de copias impresas.

## Encabezado editorial e incidencia anotada (08/11/2026)

La página «Mis etiquetas» muestra la sección **«Conserva»** sobre su título,
con la misma ceja editorial que **«Todas tus recetas»** del recetario oficial:
Geist, mayúsculas, tamaño `0.7rem`, peso 700, `0.16em` y terracota `#b96c4a`.
Bajo el título figura el subtítulo breve **«Crea e imprime tus etiquetas de
conservación.»**, con Geist 16 px y color `#67756b`. Las tarjetas, formularios y
vistas previas no cambian.

**Incidencia fuera del alcance actual:** la usuaria informa de una cabecera
interior aparentemente duplicada en altura, tanto en el recetario publicado
como en este laboratorio (captura Android del 08/11/2026). Se remite al
**responsable técnico Web/PWA** para una revisión posterior del componente
canónico de la web oficial. Sin diagnóstico confirmado, sin corrección
inmediata y **sin tocar** `cabecera.css`, `cabecera.js`, PWA ni producción.
Esta observación no afecta al raster ni equivale a validación física CT230B.

## Página compacta y responsive · decisión de 08/11/2026

El selector aprobado de cuatro tarjetas y la vista previa comparten **una única tarjeta no plegable**, titulada exactamente «Elige un formato», con subtítulo «Selecciona el diseño que quieres imprimir»; los raster monocromos son los mismos que se transmitirán. No se muestran anotaciones, cifras de transporte ni títulos adicionales bajo el selector; solo se permite mostrar un error cuando la vista previa falle. La página contiene **dos tarjetas** adicionales con títulos fijos: **1. Datos de la etiqueta** (abierta de inicio) y **2. Imprime tu etiqueta** (cerrada). Son desplegables de forma excluyente, sin duplicar ni alterar el formulario por formato.

Se retiran textos auxiliares, paréntesis de los títulos de campo, notas de desarrollo y leyendas bajo multicopia/impresión. Las casillas de visibilidad de campos opcionales aparecen después de sus campos, sin cambiar el significado o valor de ninguna opción. El panel de impresión conserva conexión CT230B, confirmaciones, número de copias, progreso y diagnóstico colapsado.

**Vertical:** selector+preview → Datos → Impresión. **Horizontal con anchura suficiente:** derecha selector+preview e izquierda Datos e Impresión, distribuidos en dos columnas. Diseño y gráficos térmicos de Pequeña, Compacta y Amplia no cambian. Las impresiones físicas siguen previstas para la fase final acordada.

## Límites de la pantalla

La página es un **candidato de producto** y evita lenguaje o controles de
experimentos históricos. La nueva página presenta los **tres formatos libres previstos** (no incorpora
50 × 80 vertical con anillo) y una tarjeta futura. Los tres formatos muestran su **raster real** y comparten formulario adaptado, confirmación de papel y transporte CT230B. Amplia utiliza el raster 590 × 945 y papel 50 × 80 mm; Compacta, raster 590 × 354. Ambos diseños libres están aprobados visualmente, sin que eso acredite una prueba física de su variante. El nombre y, cuando se indique, el peso en
Pequeña son introducidos manualmente; todavía no hay un catálogo de ingredientes
para esta sección. El peso no forma parte de Compacta ni Amplia.
Las fechas no se deducen de pautas generales de conservación.

Se utiliza la ruta relativa `../assets/isotipo-bn.svg`, disponible
en el laboratorio. Cualquier futura migración deberá revisar rutas y
dependencias **tras autorización expresa**, sin copiar código experimental
innecesario ni crear transportistas de publicación alternativos.

## QA antes de cualquier fusión

1. Ejecutar `node --test tests/ingredientes-v1.test.cjs` en una copia del
   laboratorio y revisar validaciones, límites, bitmap, TSPL y enlaces.
2. Comprobar visualmente en Chromium Android o equivalente anchos 360, 390,
   768 y 1280 px tanto en vertical como horizontal: **selector + vista previa → datos → impresión** en vertical; en horizontal, **derecha formato/vista previa e izquierda Datos + Impresión**. Comprobar apertura inicial solo de Datos, exclusión de paneles, teclado, calendarios, texto largo y estados de error.
3. Conectar voluntariamente CT230B en Chrome Android HTTPS y verificar
   que conectar no imprime nada; con campos inválidos o sin aceptar papel
   no debe poder imprimirse.
4. Cuando se acuerde probar el nuevo motor, imprimir primero **una** etiqueta
   en papel estándar 30 × 20, comparar con la V0.8 aprobada (texto, isotipo,
   posiciones y márgenes), guardar fotografía y registro; no repetir ante
   anomalías. La aprobación física histórica no sustituye esta regresión.
5. Nunca fusionar ni integrar en `mirurecetas-web-source`, ni privatizar
   el laboratorio, sin autorización específica.

El tipo de conservación (refrigeración, congelación u otro) determina
el rótulo de envasado y el texto inicial de la nota, pero la nota es siempre
editable. La casilla «Mostrar nota» es independiente. Estas opciones
no infieren caducidades ni seguridad de conservación. La fecha del fabricante se introduce sin alterar su validez.

El laboratorio actual es **público**. Las ramas y PR también pueden ser
visibles. No introducir credenciales, lotes reales o información privada.
