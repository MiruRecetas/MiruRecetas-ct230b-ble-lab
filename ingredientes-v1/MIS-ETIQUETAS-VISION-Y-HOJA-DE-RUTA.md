# MiruRecetas · «Mis etiquetas» · visión, decisiones y hoja de ruta
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

**Alcance estricto: solo Pequeña 30 × 20.** El banco será un **JSON autónomo, versionado y verificable**, distinto del catálogo nutricional/comercial de Airtable. No afecta a Compacta ni Amplia; las tres plantillas, el raster, el motor de impresión y el flujo BLE conservan sus contratos.

### Selección aprobada: alternativa D · dos chips y panel reutilizando el patrón de MiruRecetas

- Inmediatamente **debajo de la vista previa** de Pequeña, antes del paso **1. Datos de la etiqueta**, presentar dos chips: **«Ingrediente libre»** (estado inicial) y **«Cargar del banco»**. No añadir una tarjeta ni un «paso 0» numerado; no mostrar chips en Compacta/Amplia.
- «Ingrediente libre» mantiene el formulario manual actual, sin buscar ni aplicar datos del banco. «Cargar del banco» abre un **panel modal temporal**: **inferior tipo bottom sheet en vertical** y **lateral en horizontal**; seguir el patrón visual/accesible existente de vista diaria compacta y del panel de impresión en las fichas de recetas de la web oficial, **adaptado dentro del laboratorio** (sin importar código productivo como dependencia).
- El panel contiene buscador de nombre/alias, exploración por categorías, variantes/presentaciones y **chips de filtrado** cuando aporten valor, además de información de conservación y **fuentes consultables**. El botón final **«Aplicar a etiqueta»** permanece deshabilitado hasta seleccionar un ingrediente concreto y, cuando corresponda, su presentación. Admitir alternativa de escribir libremente sin contaminar los resultados del banco.
- **Separar explorar de aplicar**: abrir, filtrar, comparar y seleccionar dentro del panel **no cambia** los campos del paso 1. Solo «Aplicar a etiqueta» confirma la elección, precarga sus datos, cierra el panel y abre el paso **1. Datos de la etiqueta** para revisión. Al volver a pulsar «Cargar del banco», se reabre el panel con selección/filtros previos para revisar o cambiar y aplicar de nuevo.
- **Conservar dos estados diferenciados**: formulario libre y formulario con datos aplicados del banco. Al pulsar «Ingrediente libre», recuperar sus valores escritos, sin sobrescribirlos ni borrar la última selección del banco. Cambiar de formato a Compacta/Amplia no debe cargar datos del banco en esos formatos.
- **Permitir editar lo precargado**: el paso 1 sigue siendo editable (nombre, cantidad, fechas, conservación y nota, según el contrato vigente de Pequeña). La cantidad y la fecha real de envasado son datos del usuario, no se inventan ni se reemplazan al elegir ingrediente. La selección del banco no crea ni modifica inventario, receta, Airtable ni datos comerciales.
- El panel se gestiona **independientemente del acordeón** de los pasos 1 y 2. Se conservarán cierre explícito/Escape/fondo, devolución del foco, bloqueo de scroll del documento y comportamiento con teclado; en pantalla estrecha se controla el espacio de resultados y se mantiene accesible el botón de aplicar.

### Fechas derivadas · decisión posterior aprobada el 08/11/2026

- Si el registro seleccionado ofrece un **plazo orientativo verificado y aplicable** al tipo de conservación y a la presentación concreta, el banco puede **calcular automáticamente** la fecha de consumo preferente usando la **fecha de envasado que realmente introdujo el usuario**. Este comportamiento es una actualización expresa de la propuesta anterior «jamás automática sin confirmación»: el usuario confirma la propuesta al pulsar **«Aplicar a etiqueta»**, el campo resultante queda visible y **siempre editable**; no hay impresión ni aplicación silenciosa de una etiqueta.
- **Mientras la fecha de consumo preferente permanezca calculada automáticamente**, modificar la fecha de envasado recalcula la primera. Si el usuario **edita directamente** la fecha de consumo preferente, esa edición se respeta y **se detiene el recálculo automático** para evitar sobrescribir decisiones propias. Se puede ofrecer una acción discreta **«Restablecer recomendación»** que recupere explícitamente el cálculo. Nunca alterar una fecha manual sin aviso ni consentimiento.
- Mostrar **una única nota breve bajo el conjunto de las fechas**, exclusivamente cuando exista un plazo verificado: **«Tiempo recomendado: XX meses»** si la fuente expresa meses (o unidad fiel a la fuente si expresa días/semanas). La nota es informativa, **no se imprime** en la etiqueta ni añade párrafos o advertencias visibles al formulario. Fuente y condiciones completas permanecen consultables en el panel/ficha del banco.
- **Sin plazo verificado o si falta información crítica del contexto**, no sugerir fecha ni fabricar meses; consumo preferente permanece editable sin autocompletar. No inferir fechas a partir del nombre del ingrediente ni de la categoría. Distinguir claramente plazos de calidad de seguridad/caducidad; nunca prometer inocuidad.
- En cálculo por **meses naturales**, conservar el día cuando exista en el mes de destino y ajustar al último día válido si no existe (p. ej., 31 enero + 1 mes → último día de febrero), sin depender de cambios UTC/DST. Si la fuente publica días o semanas, usar esa unidad y mantener su trazabilidad; el esquema JSON debe declarar **unidad, valor, condición de conservación y fuente**. Las pruebas incluirán fin de mes, años bisiestos, fechas manuales y cambios repetidos.
- Cualquier cambio de ingrediente/presentación/condición que altere el plazo debe actualizar la sugerencia **al aplicar** el nuevo registro, sin destruir los valores del formulario libre; mantener visible la recomendación que se está aplicando.

### Datos del banco y siguiente fase

Categoría → ingrediente, alias y **presentación** solo cuando cambie su recomendación (ej.: ternera picada frente a filete). Registro candidato: ID estable, nombre, categoría, alias, presentación, fuentes consultables, contexto (crudo/cocido; congelación a −18 °C, etc.), posibles notas verificadas de envasado/descongelación y plazo de calidad **solo si está respaldado por fuente**. Las fichas informativas pueden ampliarse dentro del panel sin recargar la etiqueta impresa. No inventar tiempos para completar el catálogo ni duplicar la fuente canónica de nutrición/Airtable.

**Estado:** esta aprobación cierra el **patrón de visualización y las reglas de cálculo/editabilidad**, no incorpora aún el banco JSON ni cambia la interfaz o los formularios existentes. Antes de implementarlo, definir/validar el esquema JSON, fuentes y catálogo inicial; después desarrollar la UI y QA mediante PR privadas, sin tocar producción. Las pruebas físicas de impresión continúan aplazadas al cierre.

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
| 08/11/2026 | Fecha de consumo preferente dependiente de fecha de envasado, y nota «Tiempo recomendado: XX meses» | **Aprobado cálculo automático tras aplicar ingrediente con plazo verificado**, recálculo hasta edición manual del campo, restablecimiento explícito y nota breve sin imprimir. No inferir plazos sin fuentes. |
| Futuro | Etiquetas de tarros, sesiones, favoritos, reimpresión, datos de cuenta | Propuestas por concretar |

**Este documento debe actualizarse en la misma PR que cambie el alcance o acepte nuevas decisiones; no esperar a recordar el contexto conversacional.**
