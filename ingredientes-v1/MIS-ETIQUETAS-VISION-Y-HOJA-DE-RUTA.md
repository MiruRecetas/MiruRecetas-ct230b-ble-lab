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

- Una **tarjeta entre la introducción y el paso 1** con **cuatro opciones en una sola fila también en Android**, sin matriz 2 × 2. Cuatro tarjetas de igual altura con diseño compacto, adaptadas a móvil.
- Las tres primeras son **radios de selección única**, no enlaces. La cuarta es futura, no seleccionable.
- SVGs modulares, sencillos, verde/salvia, sin miniaturas fotográficas; mantener **exactamente los iconos actuales aprobados**:
  - **Amplia, 50 × 80 mm:** composición horizontal de barra superior y bloques inferiores; **sin fondo de icono**.
  - **Compacta, 50 × 30 mm:** barra horizontal superior y dos bloques simétricos debajo.
  - **Pequeña, 30 × 20 mm:** bloque vertical principal y dos bloques pequeños apilados; **no modificar el icono aprobado**.
  - **Más formatos, Próximamente:** icono de formatos superpuestos y signo +, tarjeta de borde discontinuo no seleccionable.
- **No mostrar** «receta horizontal», «componente», «ingrediente», «Disponible», «En desarrollo», chips de estado ni una banda «formato seleccionado». La disponibilidad se comunica visualmente, y solo «Más formatos» muestra «Próximamente».
- Mantener la selección con **borde verde y fondo salvia**, sin necesidad de check circular; no introducir fondos diferentes detrás de SVG individuales.
- El selector gobierna **los tres pasos**: 1) datos/formulario, 2) vista previa real, 3) impresión. **Pequeña (30 × 20) y Compacta libre (50 × 30)** están conectadas al **motor único** mediante plantillas independientes (PR #43); **Amplia (50 × 80)** sigue pendiente y muestra su estado dentro de los pasos, sin vista previa ficticia ni impresión habilitada. La composición libre de Compacta sin QR aún requiere revisión visual y prueba física: su implementación no equivale a aprobación del diseño.
- **Detalle técnico pendiente:** durante un trabajo BLE bloquear también los radios a nivel DOM para evitar una selección visual incongruente; la lógica actual ya impide cambiar el formato efectivo mientras está ocupado.
- Esta aprobación del **selector** no equivale a aprobación de las composiciones *libres* de 50 × 30 / 50 × 80 ni de sus futuros ensayos físicos.

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

## 4 bis. Compacta libre 50 × 30 — DESARROLLO EXPERIMENTAL (07/11/2026)

Nueva plantilla **`ingredientes-v1/plantilla-compacta.js`**, registrada en el motor común e independiente de
`label-v09-component.js` (ensayo histórico) y del motor productivo de
`mirurecetas-web-source`. Se ha transcrito la geometría V0.9 como referencia
**sin importar ningún módulo ni mantener enlace operativo** entre ambas
versiones. Una modificación posterior del diseño libre **no podrá alterar**
la etiqueta existente de recetas. La V0.9 original con QR permanece aprobada
e inmutable. La nueva versión **sin QR** ha recibido una decisión de diseño explícita el 08/11/2026 (PR [#45](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/45)); **la impresión física sigue sin validar**.

- Lienzo 590 × 354; título grande y firma superior compuesta por **isotipo BN oficial**
  y «MiruRecetas» en Bricolage Grotesque. Barra superior a y=69; panel de
  fechas/nutrición a y≈90–174 y separador a y=180. Con macros activos, fechas
  en dos filas a la izquierda y nutrición a la derecha; con macros ocultos,
  fechas en dos columnas de ancho equilibrado. Los encabezados negros de
  conservación y nota a y≈191 y y≈274, con textos opcionales extendidos a todo
  el ancho y espacio reservado que no se contrae al vaciar los campos.
- El espacio inferior derecho antes ocupado por el QR se aprovecha en el
  diseño aprobado: las secciones inferiores ocupan el ancho disponible. No
  copiar QR, URL de receta, raciones ni gramaje.
- Formulario propio editable: título, tipo de conservación, fecha primaria
  obligatoria, consumo preferente opcional, kcal y tres macros independientes
  (todos opcionales), instrucciones y nota manuales.
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
está implementado en [PR #45](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/45), pendiente de
revisión del raster publicado en Android y validación física CT230B; no se
considera una etiqueta probada hasta entonces.

## 5. Motor único de etiquetas libres — IMPLEMENTADO EN LABORATORIO (07/11/2026)
La arquitectura **ya está unificada**: `ingredientes-v1/motor-libre.js` centraliza carga de isotipo, fechas y validaciones comunes, ajuste progresivo de texto, composición Canvas, raster 1 bit por bandas, ensamblado TSPL y multicopia. `plantilla-pequena.js` (30 × 20) y `plantilla-compacta.js` (50 × 30) registran únicamente reglas de campos y coordenadas visuales; **no existen motores TSPL completos separados**. `app.js` mantiene un único transporte BLE compartido y la vista por formato, con seguimiento de fragmentos. El contrato interno es formato + datos + visibilidad; Amplia futura se añadirá como una tercera plantilla sin replicar motor. No se importa, enlaza ni modifica código de V0.9 histórica, V0.8 histórica o etiquetas de producción.

La refactorización reemplaza los archivos `engine.js` y `compacta-engine.js` (retirados de esta página). Las **19 pruebas de contrato** y la comparación de cuatro casos equivalentes de render y TSPL respaldan la ausencia de cambios intencionados en los diseños actuales; no equivalen a ensayo físico con CT230B. La geometría libre de Compacta recoge la decisión de diseño del 08/11/2026;
la vista previa publicada sigue sujeta a aceptación final y a prueba física.
Los cambios de composición pertenecen **exclusivamente a su plantilla**.

### Desarrollo posterior de Amplia y ajustes visuales

Para 50 × 30 y 50 × 80 horizontal:
- Formularios adaptativos al formato para nombre, kcal, proteínas, hidratos, grasas, fechas, instrucciones y notas disponibles en la composición original.
- Bloques opcionales de nutrición/instrucciones/notas según capacidad; **fechas siempre visibles**; no introducir gramos.
- Ocultar nutrición = redistribuir las fechas en dos columnas; no imprimir sus valores ni ceros de relleno. Ocultar instrucciones/nota = preservar títulos y huecos sin imprimir texto. Mantener geometría aprobada, reglas de nombres largos, ajuste progresivo y tamaños mínimos.
- Valor incompleto de macro: no inventar, no usar `0` salvo que se haya indicado expresamente; kcal independientes de reparto macro manual. **Sin anillo y sin QR** para las etiquetas libres.
- Vista previa debe reflejar exactamente el raster que se va a enviar; impedir imprimir formatos en desarrollo hasta motor, pruebas automatizadas y comprobación física CT230B.

**Orden de trabajo acordado:** 1) selector/interfaz global (hecho); 2) Pequeña y Compacta integradas en motor común (hecho, pendiente de pruebas físicas nuevas); 3) ajustar el diseño libre Compacta tras revisión de la usuaria; 4) añadir Amplia horizontal 50 × 80; 5) banco de ingredientes JSON; 6) ampliar funcionalidades. No demorar la interfaz general hasta completar el banco.

## 6. Banco de ingredientes — PROPUESTA APROBADA EN PRINCIPIO; CATÁLOGO PENDIENTE
Propuesta de **JSON versionado autónomo**, con selección **Categoría → Ingrediente** (p. ej. carne/pescado/verduras → ternera/salmón/pimiento) y **presentación** adicional solo si cambia la orientación de conservación (p. ej. ternera picada frente a filete). Admitir **«Otro / Escribir manualmente»** y alias para buscar. Los selectores precargan el **nombre**; no deben impedir etiquetas libres.

Un registro puede incluir: identificador estable, categoría, nombre, sinónimos, variantes/presentación, fuente consultable, contexto (crudo/cocido, congelación a −18 °C, etc.), recomendación orientativa **solo si está verificada** y notas de envasado/descongelación. **No inventar** tiempos para cubrir el catálogo ni inferir seguridad solo del título. La fecha sugerida es **orientativa, jamás automática sin confirmación**; distinguir plazo de calidad de caducidad o garantía de seguridad. Las fichas informativas por alimento (escaldado de verduras, preparación, envases y descongelación) pueden crecer fuera de la superficie impresa.

El banco no es ni sustituye el catálogo canónico de ingredientes/productos nutricionales de Airtable; evitar duplicar fuentes de verdad o introducir datos comerciales falsamente verificados.

## 7. Otras capacidades consideradas — FUTURAS, SIN IMPLEMENTACIÓN
- **Etiquetado por lotes/sesiones**: cola de etiquetas distintas de una sesión de compras o batch cooking, compartir primera fecha de la sesión sin forzar consumos preferentes iguales, envío secuencial controlado y confirmación; distinto de multicopia `PRINT 1,n` de *una misma* etiqueta. Sin reenvío automático al fallar BLE.
- **Reimpresión** de un trabajo reciente; diagnóstico y prueba de alineación/papel con advertencias de transmisión frente a impresión real.
- **Favoritos / plantillas reutilizables** y **etiquetas recientes**: diseños y campos repetibles sin arrastrar fechas obsoletas; decidir persistencia con P10 para sincronización real, evitar vender `localStorage` como solución definitiva.
- **Modo de conservación** más amplio (congelación / refrigeración / despensa), notas y referencias contextuales; ya existe elección de tipo en Pequeña, pero no un clasificador completo para todos los formatos.
- **Identificación doméstica de lotes o porciones**, instrucciones según envase (bolsa, recipiente rígido, tarro, vacío) y ayuda informativa; nunca inferir por sí solo duración a partir de usar vacío o tarro.
- **Cuarta plantilla futura para tarros/conservas** (quizá redonda o adaptada al cristal), con nombre, elaboración, consumo preferente y condiciones. Distinguir elaboración refrigerada de conserva estable en despensa; **no atribuir seguridad o fecha sin proceso y receta validados**. Ensayar papel térmico/adhesivo para humedad y tarros fríos; no aplicar una etiqueta antes de un tratamiento térmico si el material no está autorizado.
- **Desde MiruRecetas** como posible entrada alternativa futura al modo libre: aprovechar datos oficiales de fichas sin convertir entradas manuales en datos oficiales; no sustituir impresión QR actual desde las recetas.
- **Relación opcional con «Mis reservas»**, solo tras P10 y un contrato de lotes y consumos. **No inventar «Mi congelador» como sección aparte**: ese nombre se usó como ejemplo y se descartó al aclarar que el inventario previsto es «Mis reservas».

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
| 08/11/2026 | Compacta libre: diseño de la imagen aportada; isotipo oficial BN y Bricolage Grotesque/Geist; macros activos = fechas izquierda/nutrición derecha; macros ocultos = fechas a dos columnas; títulos inferiores siempre, contenidos opcionales y huecos preservados | Diseño autorizado; implementación PR #45, pendiente de prueba física y aceptación del raster publicado |
| Futuro | Etiquetas de tarros, sesiones, favoritos, reimpresión, datos de cuenta | Propuestas por concretar |

**Este documento debe actualizarse en la misma PR que cambie el alcance o acepte nuevas decisiones; no esperar a recordar el contexto conversacional.**
