> **Corrección de superposición de gramos (posterior a PR #69):**
> Pages desplegó PR #69, pero «500 g» seguía invadiendo el isotipo porque
> `motor-libre.js::fit` restablecía la alineación izquierda. La plantilla
> Pequeña ahora pide alineación central **solo para la cantidad**, con zona
> horizontal 8…248 y 20 puntos de separación del isotipo. Se actualiza
> el query de versión del script para Chrome Android. La revisión visual
> con navegador real y la impresión física siguen siendo comprobaciones
> independientes. Detalle en
> [hoja de ruta](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
>
> **Corrección de «Mis etiquetas» 08/11/2026:** restitución del diseño original
> Pequeña, restauración de notas de refrigeración/descongelación, conservaciones
> del banco limitadas a los métodos aplicables, y supresión del enlace al JSON
> bruto no aprobado. Los borradores sin datos siguen en el catálogo, pero no
> se ofrecen en el selector. Modo libre completo, independiente. Validación
> visual y física pendientes. Detalle en
> [hoja de ruta](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
>
> **Mis etiquetas · FoodKeeper ES original preservado 08/11/2026:** [JSON original sin alterar](ingredientes-v1/banco/fuentes/foodkeeper-es-original.json), **716.677 bytes** y SHA-256 `2a25209edc1d578f1f0002a0a896c54c26611a4d986c46ebcdc156554190687b`; fuente recibida con **662 productos, 25 grupos, 14 categorías principales**. [Inventario y contrato de uso](ingredientes-v1/banco/README.md). El catálogo de etiquetas será **un JSON distinto**, con categorías/subcategorías propias y nombres es-ES. El banco se limita a **ingredientes a granel y futuras conservas caseras; nunca productos comerciales**. En nuestro JSON mínimo, para **refrigeración se toma el máximo** del rango FoodKeeper y para **congelación el mínimo**. Los tiempos se guardan **solo en días** (semana=7; mes=30), con fuente breve; envasado=compra/preparación y el vacío no añade plazo. **Metadatos aprobados:** `estado_recomendacion`, `fuente` e `id_fuente` son **GLOBALES de la ficha**, nunca por método. Estados: `verificado` (información completa fijada/aprobada), `parcial` (fuente externa cubre solo algunos métodos) y `sin_datos` (ficha nueva, `fuente: null`). En `parcial`, los métodos no documentados usan **booleano `true`, plazo y tips `null`**, sin fecha sugerida. Al completar: `fuente: usuario` si aporta la usuaria, `agregación` si mezcla fuentes. `id_fuente` único como texto (p. ej. `"59"` para FoodKeeper), `null` para usuario/agregación/sin_datos global o literal `"sin_datos"` para una fuente única sin ID original. Refrigeración/congelación/despensa/conserva conservan sus booleanos y tiempos/tips independientes. Se incluyen `sinonimos` como lista y `tips_preparacion_conservacion` opcional para futura web; sin duplicar FoodKeeper ni ampliar el panel. **Clasificación editorial vigente: 4 categorías** — Carnes y Aves (7 subcategorías aprobadas), Pescados y Mariscos (4), Frutas y Verduras (6), Despensa (**9 subcategorías aprobadas: Arroz, Pasta, Cereales, Legumbres, Harinas, Frutos secos, Semillas, Especias y hierbas, Conservas**); **Total: 26 subcategorías aprobadas**; «Conservas» es la denominación visible sin el calificativo «caseras», aunque solo se admitirán conservas caseras. Se excluye Lácteos y huevos, hongos/algas pasan a Frutas y Verduras y pulpo a Cefalópodos. **Ocultar chips de categorías vacías** en el panel; no crear ni etiquetar productos comerciales. [Detalle](ingredientes-v1/banco/README.md). AESAN se usará de contraste. **Original archivado; derivado e interfaz todavía pendientes.**
> **Mis etiquetas · simplificación doméstica aprobada 08/11/2026:** el banco de ingredientes es una **precarga opcional** para evitar escribir etiquetas a mano, no un sistema de permisos. El modo libre permanece disponible y **todos los campos precargados pueden modificarse** antes de imprimir. `verificado`/`parcial`/`sin_datos` son metadatos de ficha, no bloqueos de impresión; un plazo `null` no sugiere fecha, que puede indicarse manualmente. Los criterios editoriales del banco no limitan qué puede etiquetarse en modo libre. **No añadir controles o restricciones no solicitados**; mantener solo las validaciones técnicas ya necesarias para imprimir.
> **Mis etiquetas · JSON Schema creado 08/11/2026:** [`ingredientes-v1/banco/catalogo.schema.json`](ingredientes-v1/banco/catalogo.schema.json), Draft 2020-12: `{"ingredientes":[]}`, 4 categorías, 26 subcategorías, tres estados globales y 22 campos por ficha. En `sin_datos` pueden omitirse modos aún desconocidos; en `parcial`, `true` + días/tips `null` para métodos sin plazo. Solo valida el catálogo, no las etiquetas libres ni campos modificados. **Catálogo experimental de 6 fichas creado:** [`catalogo.json`](ingredientes-v1/banco/catalogo.json). **Panel y chips implementados en laboratorio**, pendientes de revisión visual; catálogo completo pendiente.
> **Mis etiquetas · UX del banco JSON implementada en laboratorio 08/11/2026, pendiente de revisión visual:** únicamente Pequeña tendrá chips «Ingrediente libre» / «Cargar del banco» debajo del preview. Banco en panel inferior vertical o lateral horizontal, con búsqueda, categorías, presentación, selección y botón «Aplicar a etiqueta». Explorar no escribe; aplicar precarga y abre paso 1; estados manual y banco separados, campos editables y panel independiente del acordeón. Con recomendación verificada, consumo preferente se calculará desde envasado y se recalculará al cambiarlo salvo edición manual; nota breve bajo las fechas «Tiempo recomendado: N días» sin imprimir. Plazos sin fuente nunca se inventan. **Código de laboratorio implementado, no validación visual/física**; selector de Pequeña incluye también Despensa/Conserva, sin alterar Compacta/Amplia ni el motor de impresión. [Contrato completo](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
> **Mis etiquetas · optimización raster autorizada 08/11/2026:** `ingredientes-v1/motor-libre.js` incorpora parcelación dispersa automática basada en la estrategia de la V0.6.2 para **Pequeña, Compacta y Amplia**; no se importan motores antiguos. Raster idéntico bit a bit, coste TSPL por región incluido, hasta seis por banda y mantenimiento del máximo **35.000 B**. Se compara el tamaño **anterior vs. optimizado sobre el mismo raster** en el diagnóstico técnico. **Mediciones reales Android 08/11/2026:** Pequeña **4.048→3.226 B (−20,3 %)**; Compacta **14.176→9.476 B (−33,2 %)**; Amplia **44.334→27.505 B (−38,0 %)**, ya por debajo del máximo de 35.000 B. Se registran como resultados del diagnóstico de navegador, no pruebas físicas ni tiempos medidos. Impresión física aplazada a la fase final; sin cambios de diseños, producción, inventarios, Airtable ni PWA.
> **LABORATORIO HISTÓRICO · RELEVO A PRODUCCIÓN CERRADO (03/11/2026).** La versión oficial CT230B ya opera en `MiruRecetas/mirurecetas-web-source/main`: [contrato #67](https://github.com/MiruRecetas/mirurecetas-web-source/pull/67), [piloto #68](https://github.com/MiruRecetas/mirurecetas-web-source/pull/68), [integración #66](https://github.com/MiruRecetas/mirurecetas-web-source/pull/66), [UI final #69](https://github.com/MiruRecetas/mirurecetas-web-source/pull/69) y [estado operativo](https://github.com/MiruRecetas/mirurecetas-web-source/blob/main/docs/ETIQUETADO-CT230B-ESTADO-PRODUCCION-2026-11-03.md). Este repositorio se conserva **como evidencia experimental**, no se despliega ni importa como dependencia de la PWA. El Codespace temporal empleado para pruebas fue eliminado por la usuaria. Las afirmaciones antiguas de «pendiente de integrar» quedan superadas; conservar sin reescribir código/ensayos. Persisten controles no cerrados sobre series >2 y grandes masas negras.
> **Mis etiquetas · ajuste editorial 08/11/2026:** añadidos «Conserva» (ceja Geist, color/espaciado/tamaño iguales a «Todas tus recetas» del recetario oficial) y subtítulo «Crea e imprime tus etiquetas de conservación.». Además se **documenta** que la cabecera interior aparece anormalmente alta tanto en la web oficial como en laboratorio (captura aportada por la usuaria). Se deja al agente Web/PWA la revisión del archivo canónico, sin modificar ahora cabeceras, PWA, producción, motores ni etiquetas.
> **Mis etiquetas · UX de página aprobada 08/11/2026:** selector y vista previa comparten tarjeta fija «Elige un formato», subtítulo «Selecciona el diseño que quieres imprimir», sin anotaciones; datos e impresión son los únicos dos pasos, desplegables de forma excluyente. Móvil vertical: formato/preview → datos → impresión; horizontal: formato/preview derecha y pasos izquierda. Se limpian notas de formulario y se desplazan las casillas opcionales bajo sus campos, sin cambiar diseño térmico, BLE ni inventarios. Documentación: [hoja de ruta](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).
> **Mis etiquetas · validación 08/11/2026:** la Compacta libre 50 × 30 mantiene el selector aprobado y motor único. La [PR #46](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/46) corrige la versión inicial #45: cabecera (título, isotipo oficial BN y banda) idéntica a la etiqueta V0.9, sin wordmark nuevo; fechas alineadas y sin separadores innecesarios, columnas centradas al ocultar macros, caja de kcal redondeada y nutrición más aireada. El selector de conservación replica los rótulos y presets de Pequeña, sin calcular fechas ni registrar existencias. «CONSERVACIÓN Y CONSUMO» y «NOTA» siempre visibles. La usuaria ha **aprobado y validado visualmente** el raster publicado tras PR #46; sin evidencia comunicada de ensayo físico CT230B de la variante libre. Siguiente fase después de Compacta: **Amplia horizontal 50 × 80** según V0.7.3, ahora ya implementada y aprobada visualmente. La dirección de exploración está aprobada (sin QR, cabecera de referencia, aprovechar espacio libre para instrucciones/nota y redistribuir fechas sin macros); la **propuesta B seleccionada** y concretada para implementar: rótulos inversos redondeados conectados, kcal inversa y macros debajo, fechas en cuatro filas con nutrición y dos columnas sin ella. `plantilla-amplia.js` incorpora esta composición al motor libre con vista previa raster real; la usuaria **aprobó el diseño visual de Amplia B** y autorizó corregir los textarea y la reproducción de saltos de línea en conservación/nota, sin alterar su geometría. La usuaria confirmó **«Perfecto, validada y aprobada»** después de revisar el raster corregido publicado mediante [PR #50](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/pull/50): **Amplia B queda cerrada y validada visualmente**. La autorización posterior del 08/11/2026 habilita **la impresión BLE de Amplia en el laboratorio** con los mismos controles del motor libre (papel 50 × 80, confirmación, CT230B y `PRINT 1,n`); **las pruebas físicas se aplazan por decisión expresa de la usuaria a la fase final**. Un envío correcto no acredita impresión física ni registra existencias. Sin cambios históricos ni en producción. [Hoja de ruta canónica](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md).


# MiruRecetas · Laboratorio BLE CT230B


> **NUEVO MÓDULO EXPERIMENTAL «MIS ETIQUETAS» (06/11/2026).** Además de
> los ensayos históricos, este repositorio contiene una **página autónoma
> publicada en laboratorio**: [Mis etiquetas](https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/ingredientes-v1/).
> La usuaria ha aprobado expresamente el selector de cuatro formatos y sus
> iconos actuales (PR #40). **Pequeña 30 × 20** y **Compacta libre
> 50 × 30** comparten ahora un **motor único** de etiquetas libres, con
> composiciones independientes. Compacta es un formato libre **aprobado y validado visualmente** el 08/11/2026;
> la salida física específica de esta variante no está acreditada. **Amplia
> horizontal 50 × 80** permanece pendiente de desarrollo.
> Consulta el [contrato de producto y hoja de ruta](ingredientes-v1/MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md)
> y el [README técnico del módulo](ingredientes-v1/README.md).
> El módulo es experimental, **no está integrado en la web privada de
> producción y no crea inventario ni datos personales**. Las referencias
> históricas del laboratorio contenidas más abajo no describen el estado
> actual de este nuevo módulo.


> **ACTA VIGENTE · 31/10/2026:** las cuatro familias de etiqueta están **aprobadas físicamente**. QR de **50×30: módulo 5 puntos + ECC M**, escaneado correctamente; QR de las dos 50×80, escaneables sin modificación; V0.8 ingrediente sin QR. **PRINT 1,2** validado con dos etiquetas en una transmisión; etiquetas en congelador 2–3 días y manipulación en buen estado. Ver [acta consolidada](VALIDACION-ETIQUETAS-CT230B-2026-10-31.md). Los estados «pendiente» de ensayos anteriores se conservan como historia.


## V0.7 · Nueva prueba horizontal (30/10/2026)

El laboratorio incluye **6E · V0.7**, un botón específico de impresión experimental **50 × 80 mm**, lectura horizontal girada 90° antihorario para «Puré de calabaza y calabacín». Usa como referencia aprobada el SVG Canva suministrado por la usuaria, sin añadir anillo ni rediseñar bloques. Reutiliza bandas raster dispersas de V0.6.2, **dos líneas TSPL `BAR` nativas** y un **QR TSPL nativo** con la URL canónica de la receta. Los valores oficiales son 215,56 kcal, 4,44 g PR, 22,31 g HC, 12,92 g GR (por ración). La instrucción exacta de descongelación de esta prueba procede de la usuaria.

**Incidencia y reparación (30/10/2026):** la V0.7 inicial no mostraba vista previa por colisión global de `now`; se corrigió el módulo anterior y se reescribió la V0.7 de forma independiente, a partir del SVG adjuntado (sin dependencia de `p15h*`). Se comprobaron compilación conjunta y ejecución simulada de la vista previa. **Pendiente:** selección manual de fechas, impresión física, escaneo de QR y cotejo visual contra el SVG. La impresión no se activa sin autorización de papel y confirmación; no modifica recetas, Canva ni PWA. Documento técnico: [V07-HORIZONTAL-PURE-CALABAZA-CALABACIN.md](V07-HORIZONTAL-PURE-CALABAZA-CALABACIN.md). Las versiones anteriores siguen disponibles para comparación.


**Laboratorio experimental público** para explorar impresión térmica directa desde Chrome Android hacia una **CLABEL CT230B** por Bluetooth Low Energy. **No es la web oficial de MiruRecetas ni un controlador validado.**

## Acceder

**Dirección prevista cuando GitHub Pages esté activo:** https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/

Este repositorio es independiente de la PWA MiruRecetas, Airtable y sus publicadores. Está compuesto exclusivamente por `index.html` y este `README.md`. No solicita inicio de sesión, no utiliza SDK externos, no envía datos a servicios de terceros ni contiene credenciales.

## Publicar con GitHub Pages

En el repositorio **`MiruRecetas/MiruRecetas-ct230b-ble-lab`**:

1. Entrar en **Settings → Pages**.
2. En **Build and deployment**, elegir **Deploy from a branch**.
3. Seleccionar la rama **`main`**, carpeta **`/ (root)`** y pulsar **Save**.
4. Comprobar la URL HTTPS indicada arriba. Si Pages sigue sin estar activo, repetir la consulta tras comprobar que el `index.html` está fusionado en `main`.

No hacen falta workflows ni tokens personalizados para este laboratorio estático.

## Evidencias aportadas por pruebas físicas (29/10/2026)

- Impresora CT230B, hardware V2.0, firmware V2.1-20250218, 300 dpi, modo de etiqueta con detección de separación (*Gap Paper*).
- Autodiagnóstico impreso y trabajo de texto/gráficos impreso correctamente **desde Clabel trade** en Android. Una versión compacta del diseño de «Cebollas rellenas» se imprimió físicamente desde una imagen importada. Eso **no es aún impresión directa** desde el navegador.
- Emparejamiento Bluetooth desde Android completado con PIN habitual.
- El selector Chrome **Web Serial** no detectó puertos compatibles; eso no descarta completamente RFCOMM personalizado.
- Chrome **Web Bluetooth** reconoció la CT230B, conectó por GATT y enumeró el servicio UART personalizado y sus características.

| Canal BLE observado | UUID | Propiedades |
| --- | --- | --- |
| Servicio UART | `49535343-fe7d-4ae5-8fa9-9fafd205e455` | Servicio primario |
| Característica candidata para enviar bytes | `49535343-8841-43f4-a8d4-ecbe34729bb3` | `WRITE`, `WRITE WITHOUT RESPONSE` |
| Característica candidata para recibir datos | `49535343-1e4d-4bd9-ba61-23c647249616` | `NOTIFY` |

Una característica adicional terminada en `0318` se ha descubierto pero **no debe utilizarse**: su función real no está verificada. Las direcciones únicas, números de serie y capturas identificativas de la unidad no se publican aquí.

**Importante:** la característica de escritura ha permitido **una impresión TSPL mínima** en esta unidad; todavía se desconoce el comportamiento con imágenes y trabajos grandes. El protocolo y la fragmentación permanecen sin verificar.

## Cómo realizar la prueba

1. Instalar un **rollo estándar de 50 × 30 mm**. No usar los rollos específicos para congelación.
2. Encender la impresora y cerrar completamente Clabel trade y nRF Connect.
3. Abrir la URL de Pages desde **Chrome Android** bajo HTTPS.
4. Pulsar **Conectar impresora** y seleccionar la CT230B en el diálogo del navegador.
5. Comprobar en el registro que se ha accedido al servicio y característica de escritura. La conexión no imprime nada.
6. Cuando quieras intentar el primer envío TSPL, marcar la casilla de confirmación, pulsar **Enviar etiqueta de prueba** y aceptar el diálogo. Se envía **una única etiqueta de texto**.
7. Revisar si físicamente salió una etiqueta, su posición y cualquier indicación de error. Copiar el registro si necesitas compartirlo; no compartir direcciones ni identificadores privados.

El prototipo v0.3 conserva instrucciones de texto TSPL `SIZE 50 mm,30 mm`, `GAP 2 mm,0 mm`, `DIRECTION 1`, `CLS`, `TEXT` y `PRINT 1,1`, transmitidas en bloques de hasta **20 bytes**, con una pequeña pausa. **Son parámetros de ensayo**, no calibración validada del firmware o adhesivo. La pantalla permite seleccionar **`DIRECTION 0`** (propuesta correctiva) o **`DIRECTION 1`** (valor de la prueba real anterior). **Se ha verificado en la unidad CT230B que `DIRECTION 0` imprime el texto en la orientación de lectura deseada**, mientras que `DIRECTION 1` lo imprime invertido. Cambiar este parámetro TSPL puede persistir en la configuración de la impresora; comprueba la orientación tras la prueba. La aceptación por la API BLE no confirma la impresión física.

## Seguridad y límites

- El dispositivo Bluetooth se solicita solo tras pulsar un control.
- No hay acceso a datos nutricionales, usuarios, recetas privadas ni inventarios personales.
- No se envían comandos hasta la confirmación de impresión ni se actualiza el firmware. **Precaución:** el comando TSPL `DIRECTION` puede quedar almacenado como ajuste de impresión; si cambia la orientación al usar otras aplicaciones, revisarla allí.
- No probar escritura en otras características sin estudiar su función. Si un trabajo falla, revisar la impresora antes de reenviarlo.
- La web funciona en el origen de GitHub Pages y no cambia la configuración de la aplicación principal.
- La fuente externa [CT320B-G28T](https://github.com/klks/CT320B-G28T) estudia **otro modelo**. Su código no se copia ni se reutiliza sin permiso o licencia clara.

La **bitácora técnica completa y las decisiones de arquitectura** siguen en el repositorio privado `MiruRecetas/mirurecetas-arquitectura`, expediente P15. Este README público contiene solo instrucciones reproducibles, sin datos domésticos o información interna del proyecto.

## Estado del proyecto

- **Verificado:** impresión oficial desde Clabel trade; BLE GATT conectado y servicios descubiertos desde Chrome Android.
- **Verificado el 29/10/2026:** **primera impresión física directa desde Chrome Android por BLE sin Clabel trade**. La usuaria aportó registro con conexión al servicio UART, notificaciones activadas, `134 bytes` en `7 fragmentos` y fotografía de salida física con textos `MIRURECETAS` / `PRUEBA BLE`. **DIRECTION 1 produjo orientación girada 180°** frente a la deseada. **DIRECTION 0 (segunda prueba física) imprime correctamente:** captura de registro de **134 bytes/7 fragmentos** y fotografía con ambos textos legibles. El registro de bytes enviado no implica prueba genérica del control de flujo, pero la impresión física confirma aceptación de un trabajo mínimo TSPL en esta CT230B.
- **Verificado el 29/10/2026:** v0.2 con **`DIRECTION 0`** produjo una segunda etiqueta real con «MIRURECETAS / PRUEBA BLE» en orientación legible. Registro de la usuaria: conexión y notificaciones, **134 bytes/7 fragmentos** recibidos por la API BLE, fotografía física.
- **Pendiente:** robustez de buffers y trabajos grandes, primera prueba de QR nativo, primera prueba de bitmap binario, fuentes oficiales, plantillas 50 × 80 / 50 × 30 / 30 × 20 y futura integración privada de «Conserva».

## Ensayos gráficos v0.3 · resultados físicos verificados

La pantalla tiene dos botones de **impresión separada**, ambos sobre papel estándar **50 × 30 mm**, con casilla de autorización y confirmación individual antes de imprimir:

1. **Prueba QR nativo (una etiqueta):** utiliza comandos TSPL `TEXT`, `BAR` y `QRCODE`, con un QR que apunta a la portada pública `https://mirurecetas.github.io/`. Permite confirmar si el firmware admite su propio generador QR.
2. **Prueba BITMAP (una etiqueta):** utiliza `BITMAP 35,152,12,72,0,<bytes>` con una imagen de 96 × 72 puntos, **864 bytes de raster monocromo**, para probar transporte binario real. La prueba presenta tres patrones geométricos. Bajo TSPL estándar clásico se envían píxeles negros como bit 0 y blancos como bit 1; la polaridad también **debe verificarse físicamente** con este modelo.

Las dos pruebas mantienen `DIRECTION 0`, `PRINT 1,1`, transmisión BLE en paquetes de 20 bytes y pausa entre paquetes. **Ambas se han ejecutado físicamente** en la CT230B. El QR de la prueba completa **se imprime pero no se puede leer** (también falló el generado desde Clabel trade); varios módulos aparecen unidos en fotos de detalle. El bitmap de 96×72 (864 bytes) **se imprimió con sus tres tramas bien diferenciadas**, notablemente nítido. Esto confirma el transporte de datos binarios de 1 KB en este firmware, no todavía trabajos grandes. Si aparece alimentación anómala de papel, impresión ilegible o desconexión, detener y compartir el registro; no reiterar hasta estudiar el fallo.

### Secuencia recomendada

Primero la prueba de **QR nativo**; observar si se imprime y si la cámara lo lee. Si funciona, volver a confirmar la casilla y ejecutar **BITMAP** por separado. Enviar fotografía y registro de cada una. La impresión gráfica completa de «Cebollas rellenas», que deberá cargar las **fuentes oficiales reales** y usar valores nutricionales canónicos, será una fase posterior. Ahora se prioriza la legibilidad comprobable del QR.

## Pruebas de QR v0.4 · ambas superadas en impresora real

La usuaria ha aportado fotografía de ambas etiquetas y confirmó que **los dos QR se leen**: QR nativo arriba, QR bitmap abajo. Registro BLE: **QR nativo 170 bytes/9 fragmentos**, **QR bitmap 3.983 bytes/200 fragmentos**. Ambos contenían `MR-QR-01`. Estas pruebas acreditan QR corto escaneable en CT230B, pero **no la URL canónica larga de la v0.5**.


En la primera prueba v0.3 el código TSPL `QRCODE 335,65,M,4,A,0,M2,S7,"https://mirurecetas.github.io/"` imprimió un QR demasiado compacto o con blancos internos insuficientes para que la cámara lo leyera, incluso usando una foto macro. Este diagnóstico de impresión se considera **confirmado como ilegible**, pero **no está identificada la causa exacta** (tamaño de módulo, longitud del contenido, densidad, variación de firmware, proceso térmico).

A partir de la documentación de TSPL de TSC y recomendaciones de tamaño de módulos QR de DENSO WAVE, la versión 0.4 aporta un nuevo bloque de ensayos **separados y con confirmación explícita**, sin modificar la densidad de impresión:

1. **QR nativo corto:** `QRCODE 340,55,M,6,A,0,M2,S7,"MR-QR-01"`, un único trabajo de texto + QR con módulo de seis puntos de 300 dpi y contenido muy corto. El móvil debe devolver el **texto** `MR-QR-01` (no un enlace).
2. **QR bitmap:** matriz QR **versión 1 ECC M**, texto `MR-QR-01`, 21×21 módulos más zona de silencio de cuatro módulos en cada lado (29×29 módulos); raster 174×174 píxeles a seis píxeles por módulo, 22 bytes por fila × 174 filas = **3.828 bytes**. La matriz se generó con un codificador estándar y se validó mediante decodificación informática antes de incorporarla al código. Este ensayo reutiliza el comando `BITMAP` y la polaridad negro=bit 0/ blanco=bit 1 que produjo correctamente las tramas anteriores. Sigue pendiente la prueba física.

**Secuencia histórica ejecutada:** la usuaria probó y escaneó correctamente el QR nativo y el QR bitmap. Las dos etiquetas demostraron la viabilidad de ambos transportes. No modificar otros parámetros ni repetir automáticamente ante fallos. Ambos botones vuelven a exigir casilla y diálogo de confirmación. En ambos casos `DIRECTION 0` y `PRINT 1,1`.

Estos QR **son diagnósticos**, no contienen URL de receta ni lote privado. Cuando funcionen, se probará una URL pública corta y estable y su lectura tras congelación real; si vuelve a fallar por longitud, usar un identificador corto que dirija a una ruta o servidor apropiado, sin exponer datos personales.

### Estado de validación

- **Confirmado en hardware:** conexión GATT desde Chrome, TSPL texto, `DIRECTION 0`, QRCODE renderizado (ilegible) y BITMAP 864 bytes (patrones legibles).
- **Pendiente en hardware:** QR corto de seis puntos y QR raster de 3.828 bytes; robustez con trabajos mayores; tipografías reales, logotipo y anillo completo.
- **Sin cambios en producción:** ningún dato de Airtable ni de usuario, ni PWA, ni cambios de configuración del publicador.


## v0.5 · Primera etiqueta real «Cebollas rellenas» (50 × 30 mm)

**Estado:** implementada en el laboratorio, **pendiente de primera impresión y lectura física** en la CT230B. Se preservan todas las pruebas v0.1–v0.4.

### Datos canónicos y URL sin abreviadores

- **Fuente de receta:** \`MiruRecetas/mirurecetas-web-source/main:datos/recetas/cebollas-rellenas.json\`; verificación adicional en la [ficha pública existente](https://mirurecetas.github.io/menu-anual-recetas/recetas/cebollas-rellenas/) y en \`menu-anual-recetas/main:indice-recetas.json\`.
- **URL exacta de ambos QR:** \`https://mirurecetas.github.io/menu-anual-recetas/recetas/cebollas-rellenas/\`. **No se crean redirecciones ni repositorios adicionales**. La impresión QR aislada y la etiqueta completa comparten exactamente la cadena y el mismo comando \`QRCODE 356,84,M,5,A,0,M2,S7\` (solo cambia la presencia del bitmap izquierdo).
- **Valores oficiales publicados por ración:** 338,68 kcal; proteínas 15,92 g; hidratos 27,50 g; grasas 17,67 g. **1 ración por bolsa**. No inventar kcal a partir de 4/4/9: esos factores solo distribuyen el anillo.
- **Anillo energético monocromo:** proteínas 19,13979 %, hidratos 33,06183 %, grasas 47,79838 % de la energía derivada de macronutrientes. Un único segmento por macro, con negro/diagonal/punteado. El centro presenta las kcal oficiales.
- **Identidad:** \`assets/isotipo-bn.svg\`, adaptación estrictamente monocroma de los seis trazados de \`assets/marca/isotipo.svg\` publicados en \`mirurecetas-web-source\`, la misma geometría aprobada. Tipografía en pantalla y en el raster térmico: **Bricolage Grotesque 600** (marca/título) y **Geist** (textos). Se cargan las **mismas familias y URL de Google Fonts** usadas por la ficha pública; **no se incluyen archivos de fuentes** y se bloquea la impresión completa si fallan.
- **Icono de categoría** \`guisos-legumbres\`: Lucide \`cooking-pot\`, la misma designación que aparece en el HTML de la receta. El trazado es el original Lucide (licencia ISC).
- **Fechas:** dos controles editables «Envasado y congelación» y «Consumo preferente». Primera fecha sugerida por el navegador como fecha local actual; la segunda deliberadamente **sin fecha automática**: quien imprime decide la conservación. No asignamos lotes imaginarios. En la etiqueta compacta la fecha aparece \`dd/mm/aa\`; la fecha vacía bloquea el botón completo.
- **Instrucción compacta:** «Nevera · recalentar tapado», coherente con las instrucciones de la receta. La ficha original advierte de posible pérdida de textura por el huevo cocido si se congela: el etiquetado no anula esa advertencia.

### Qué envía cada botón

1. **«Imprimir QR de la receta (solo QR)»:** una etiqueta completa 50 × 30 con únicamente **QR nativo TSPL** situado en \`x356,y84\`, \`M\` y **5 dots por módulo**, que apunta a la URL larga real. Prueba deliberadamente más exigente que los QR cortos de v0.4. **Antes de declararlo válido, escanearlo**.
2. **«Imprimir etiqueta real completa»:** una única etiqueta 50 × 30. Un **bitmap 1-bit** de 304 × 330 puntos ocupa la banda izquierda; se imprime mediante \`BITMAP 12,12,38,330,0\` (12.540 bytes de imagen), y después se compone **el mismo comando QR nativo** y \`PRINT 1,1\`. El bitmap se rasteriza en el navegador a 300 dpi con un umbral conservador de negro; **no se exporta ni importa PNG**. Evita una imagen con texto aproximado: el propio navegador dibuja con las fuentes oficiales reales.
3. **Vista previa:** representa fielmente la banda izquierda rasterizada; la zona del QR se indica expresamente como **reserva**, no se pinta una matriz ficticia. En la impresión real, el QR lo genera la impresora por TSPL.

El bitmap completo supera con mucho los **3.828 bytes de QR bitmap** ya probados en v0.4; con fragmentos BLE de 20 bytes y pausas de 75 ms, puede requerir cientos de transmisiones y fallar por buffers, desconexiones o limitaciones del firmware. **No probado físicamente todavía**. No cambiar simultáneamente densidad, tamaño de módulo y orientación. Detener y compartir el registro si hay fallos. Cada botón requiere conexión BLE, casilla de autorización y confirmación del navegador; la impresión completa requiere además activos correctos y ambas fechas válidas.

### Próxima validación física

- Abrir GitHub Pages, verificar que se lee **«Versión 0.5 experimental»**. Cerrar Clabel trade/nRF Connect.
- Usar el **rollo estándar 50 × 30**, conectar desde Chrome Android.
- Pulsar **solo QR real**, escanear y verificar la URL exacta de la ficha pública. La lectura del QR anterior \`MR-QR-01\` no garantiza la lectura de esta URL de 75 caracteres con módulo de 5 puntos.
- Completar fechas, imprimir **una etiqueta real completa**, observar alineación, contraste, tramas, tipografías, icono y que **el mismo QR** sea legible integrado.
- Registrar capturas, fotografía física y log **en la bitácora privada de arquitectura**, no en repositorio público.

No se ha modificado la PWA de producción, su repositorio público, el índice de recetas, Airtable, nutrición, publicación Actions ni el futuro espacio personal Conserva. El laboratorio no almacena inventario ni lotes; **v0.5 es una prueba, no la función productiva**.


Todo el laboratorio se considera **experimental**, no aprobado para la web principal.


## V0.6 · Etiqueta editorial vertical 50 × 80 mm basada en Canva · Cebollas rellenas

**Alcance:** prueba aislada de laboratorio, añadida como sección 6 sin eliminar ni cambiar los botones v0.1–v0.5. El Canva de la usuaria no se modifica. Documento de referencia: \`01 · Ración completa · propuesta v1 MiruRecetas (editable)\`, diseño \`DAHZbhgmFc0\` de **189 × 302 unidades Canva** (equivalentes a 50 × 80 mm). La composición reproduce su jerarquía: título grande arriba, anillo B/N y macros a la derecha, fecha en bloque horizontal, instrucciones+nota a izquierda, QR abajo a derecha, firma MiruRecetas al pie. Se **elimina** el donut coloreado superpuesto que aparece en la captura porque no coincide con los datos y tapa las fechas.

**Nutrición oficial usada por 1 ración:** 338,68 kcal; PR 15,92 g; HC 27,50 g; GR 17,67 g. El anillo se traza matemáticamente de **63,68 / 110,00 / 159,03 kcal = 19,14 % / 33,06 % / 47,80 %**, normalizando el total energético derivado de macros (**332,71 kcal**). Se mantienen intactas las **338,68 kcal oficiales en el centro**, sin recalcularlas ni inventar equivalencias. Patrones impresos: **negro sólido proteínas, diagonal hidratos, puntos grasas**; sus símbolos de leyenda llevan el mismo patrón. Una diferencia entre 332,71 y 338,68 puede tener causas nutricionales distintas que no determinamos aquí.

**Marca:** isotipo real BN \`assets/isotipo-bn.svg\` procedente del canónico, Bricolage Grotesque 700/600 para título y firma, Geist 500/700 para cuerpos y cifras, desde el CSS web oficial. Se bloquea la etiqueta si faltan los pesos esenciales. Blanco puro, tinta negra, reglas de tres píxeles para legibilidad. El texto «NOTA: El huevo puede variar de textura al congelar» reproduce el alcance de la advertencia culinaria existente y no es una indicación genérica de seguridad.

**Tecnología y geometría:**
- \`SIZE 50 mm,80 mm\`, \`GAP 2 mm,0 mm\`, \`DIRECTION 0\`, **1** \`PRINT 1,1\`.
- Lienzo 590 × 945 puntos a 300 dpi y cinco bandas BITMAP 1-bit, para no enviar la gran zona QR en blanco. Bandas \`x,y,w,h\` en puntos: \`0,0,576,115\`, \`0,130,576,275\`, \`0,430,576,92\`, \`0,546,344,300\`, \`0,873,576,72\`. Total **52.788 bytes reales de píxeles**, con 4 reglas de barra nativa.
- **Un QR nativo** \`QRCODE 352,638,M,5,A,0,M2,S7\`, URL **exacta y pública** \`https://mirurecetas.github.io/menu-anual-recetas/recetas/cebollas-rellenas/\`, sin redirecciones ni nuevo repositorio. La URL ha sido impresa y escaneada en v0.5, **pero el tamaño físico/posicionamiento v0.6 queda pendiente**.
- **Trabajo simulado**: **53.146 bytes, 2.658 fragmentos BLE de 20 bytes**; salida única y tamaño inferior a barrera preventiva 75 KB. Transportador BLE v0.5 sin cambios: \`WRITE\` con 75 ms entre fragmentos. Puede tardar **varios minutos**, potencialmente >3 min. **No hay reintentos automáticos.**
- Dos fechas editables; envasado sugerido como día local, consumo preferente vacío y obligatorio, sin plazo predeterminado. Validación de formato, día real y orden cronológico. La vista previa dibuja todos los elementos salvo **matriz QR** (cuadro reservado claramente rotulado); el QR se genera nativamente en la impresora y no está falseado en el preview.

**Pendiente antes de aprobar:** una prueba física real **en el rollo 50 × 80 mm**, comprobar salida completa, márgenes, posición y lectura QR, tramas, tamaño de Geist, contraste de reglas, ubicación del logo, posible corte entre bloques y tiempos BLE; copiar el registro y fotografiar etiqueta. **Éxito de v0.5 no acredita la v0.6.** No se modifica la PWA principal, Airtable, receta, nutrición, publicación habitual ni las fuentes canónicas.

**Uso:**
1. Abrir el laboratorio HTTPS en Chrome Android y confirmar que existe la sección **«V0.6 · Etiqueta editorial 50 × 80 mm»**.
2. Cambiar físicamente el rollo, cerrar Clabel trade/nRF Connect, conectar CT230B.
3. Introducir ambas fechas (no usar vencimientos ficticios como si fueran normas alimentarias).
4. Marcar la casilla de autorización e imprimir **una sola etiqueta V0.6**. Esperar a completar el registro y observar la salida; no reiniciar si parece lento.
5. Revisar la salida física y escanear el QR. Si algo falla, **no repetir**: copiar el registro y aportar foto.


### V0.6.1 · Control diagnóstico de filas y QR sin bitmap (después de la prueba física inicial)

**Observación real (fotos y registro del 30/10/2026):** impresión del trabajo completo V0.6 50×80 finalizada tras ~4 min 58 s (00:46:20 → 00:51:18). Se imprimieron nombre, macros, anillo, fechas, texto, marca y un QR nativo. Se aprecian líneas de caracteres comprimidas o parcialmente ausentes (especialmente «Y CONSUMO» y «tapado») y anomalías de trazos en QR nativo; no consta aún prueba de lectura física del QR. En el anillo hay una zona con tinta irregular cerca de la transición entre sólido y rayado. El panel BLE confirmó envío, **no integridad física ni escaneabilidad**.

**Inferencia, aún no diagnóstico confirmado:** el texto dañado está en el centro de la **cuarta banda BITMAP** \`y=546..846\`, no sobre un límite de recorte de bandas. El QR fue creado por un **comando nativo separado**; si sus módulos también pierden líneas, el fallo puede afectar al transporte de papel, alimentación térmica, procesamiento interno o stock, no solo a las fuentes en canvas. No atribuirlo a paquetes BLE perdidos sin una prueba controlada: el hecho de ver un QR emitido después de 52 KB de raster no valida ni descarta todos los problemas de firmware o buffer.

**Nueva prueba aislada:** aparece debajo del botón V0.6 completo el botón **«Diagnóstico rápido · Texto nativo + QR (1 etiqueta)»**. Mantiene **50×80 mm, \`DIRECTION 0\`, \`GAP 2\`, el QR original exactamente en \`(352,638)\`, error M, módulo 5 y URL real**, pero usa exclusivamente texto TSPL incorporado a la impresora, líneas \`BAR\` y el QR nativo; **no incluye BITMAP**. Solo ASCII para la fuente TSPL interna. Es una etiqueta de prueba de tamaño completo, sin uso alimentario; exige casilla y doble confirmación. No cambia parámetros persistentes.

**Interpretación del control:** si texto nativo y QR salen bien y se pueden escanear, investigar primero la carga de cinco bitmaps, memoria/firmware y los parámetros de envío; no tocar aún motor o etiquetas. Si también aparece compresión de líneas en el control nativo, comprobar en primer lugar rollo correctamente guiado y asentado, suciedad/agarre del rodillo, cabezal y nivel de batería/carga; hacer solo comprobaciones seguras según manual. Una simple foto en ángulo puede falsear el escaneo del QR; escanear directamente en mano con teléfono. Mantener un único cambio por ensayo. **No repetir la V0.6 de 53 KB antes del diagnóstico**.

**Estado:** ensayo 0.6.1 solo implementado/validado informáticamente, **todavía no impreso**. La prueba v0.6 sigue siendo un resultado parcial, no una plantilla aprobada.

### V0.6.1 físicamente validada; V0.6.2 preparada para aislar carga raster (30/10/2026)

**Nueva evidencia del usuario:** fotografía de una etiqueta diagnóstica real V0.6.1, log **01:10:07–01:10:10**: 626 bytes, 32 fragmentos, cero BITMAP. Textos nativos y cuatro líneas BAR **sin compresión ni pérdida de altura**. **QR con misma URL, módulo y coordenadas que V0.6, escaneado a la primera**. La usuaria ha confirmado expresamente que el QR de la V0.6 original **no es legible**. La reproducción defectuosa no es inherente al largo de la URL, al formato 50x80 ni a la posición del QR, aunque todavía falta distinguir carga raster, buffer de dispositivo y transmisión BLE.

**V0.6.2, nuevo botón 6B:** alternativa experimental de la **misma etiqueta completa**, misma fecha y fuentes/elementos de Canva, que dibuja con \`v6Render\` sin cambiar un solo píxel y transforma las cinco bandas BITMAP anteriores en siete regiones no solapadas (dividiendo las de anillo/macros y fecha/fecha); cada región se recorta en sub-bandas de hasta 12 filas y solo se transmiten columnas de 8 píxeles y filas que contienen negro. Se conserva la posición absoluta del origen de cada píxel, los mismos 4 comandos BAR y el mismo QR nativo de V0.6 en x352 y638, módulo 5, misma URL. Color y tipografías **inalterados**. Evita enviar blancos innecesarios, pero incrementa el número de comandos BITMAP. El tamaño en bytes **se calcula al abrir el laboratorio** con fechas reales; hasta conocerlo, no afirmar una reducción concreta. No se envía si el trabajo supera **35.000 bytes**. Se mantiene el límite de una etiqueta, confirmación explícita y fragmentos BLE con pausa conservadora de 75 ms.

**Verificación de software:** JS y HTML parsables; comprobación sintética de los tiles prueba la reconstrucción **idéntica bit a bit** en coordenadas absolutas al original, incluidos trazos finos y tinta al final de una banda. Pendiente: escaneo QR + fotos sobre papel real y tiempos de transmisión V0.6.2. Si sale perfecta, el tamaño/raster grande fue factor asociado al problema; **aún no prueba un mecanismo concreto de fallo**. Si persiste, considerar trabajo mixto, memoria de la impresora y transporte BLE como hipótesis a comprobar sin alterar variables simultáneamente.

**No se modifica** la prueba V0.6 anterior, la V0.6.1 que funcionó, Canva, la aplicación principal, identidad, recetas ni almacenamiento nutricional.
