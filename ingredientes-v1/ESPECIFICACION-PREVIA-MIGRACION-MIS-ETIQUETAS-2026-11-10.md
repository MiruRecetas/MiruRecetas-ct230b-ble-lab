# MiruRecetas · Especificación documental previa de migración «Mis etiquetas»
**Fecha:** 10/11/2026 · **Estado:** contrato previo técnico propuesto, pendiente de ejecución y revisión del responsable web/PWA. **Naturaleza:** documentación solamente; no equivale a implementación, fusión, publicación ni validación física adicional.

## 1. Decisión y repositorios
**Decisión de producto aprobada:** trasladar selectivamente «Mis etiquetas» desde `MiruRecetas/MiruRecetas-ct230b-ble-lab/main` a `MiruRecetas/mirurecetas-web-source` como módulo independiente integrado en la arquitectura, identidad, navegación y **única PWA** existentes. Entregarlo en **una PR técnica privada de integración**, con merge ordinario, y publicar exclusivamente desde la cadena vigente `publicar-recetas.yml` → GitHub App → `MiruRecetas/menu-anual-recetas` → Pages. El laboratorio sigue siendo referencia/entorno de ensayo; **no** crea otro publicador, otra PWA ni un origen productivo paralelo.

**Secuencia de gobierno obligatoria:** documentación previa en `main` del laboratorio (este documento, complementable antes de código) → PR técnica en `mirurecetas-web-source` y merge → validación y publicación → documentación posterior en `main` del laboratorio y manuales afectados en privado. Registrar PR, SHAs, Actions, Pages y pruebas físicas reales. Toda desviación sustantiva exige enmienda documental anterior al cambio.

## 2. Inventario selectivo de origen (comprobado en main del laboratorio)
- `ingredientes-v1/index.html`: página y formularios del prototipo; **no** migrar literalmente su cabecera, enlaces al laboratorio, parámetros relativos ni marcado de despliegue.
- `ingredientes-v1/app.js`: interacción, selección de formatos, previsualización, conexión Web Bluetooth y envío BLE UART; UUID de servicio `49535343-fe7d-4ae5-8fa9-9fafd205e455`, WRITE `49535343-8841-43f4-a8d4-ecbe34729bb3`, NOTIFY `49535343-1e4d-4bd9-ba61-23c647249616`. Proteger confirmación explícita, bloqueo mientras envía, límites, errores y ausencia de reintentos automáticos.
- `ingredientes-v1/motor-libre.js`: único motor **libre**, separado del motor productivo de recetas; raster 1 bit, TSPL, bandas dispersas y límite `MAX_BYTES=35000`, `STRIPE=12`; no mezclar con `assets/etiquetas-engine.js`.
- `ingredientes-v1/plantilla-pequena.js` (30×20), `plantilla-compacta.js` (50×30), `plantilla-amplia.js` (50×80 horizontal): portar las tres composiciones aprobadas sin cambios visuales no autorizados; las tres etiquetas libres **sin QR**.
- `ingredientes-v1/banco-ui.js`: búsqueda, subcategorías, precarga **opcional**, edición y fechas sugeridas cuando existan plazos validados. Actualmente carga `./banco/catalogo.json` con `cache:no-store`; revisar URL de despliegue.
- `ingredientes-v1/banco/catalogo.json`: banco doméstico cerrado por decisión de la usuaria (última revisión anterior: 302 fichas); tomar un **SHA de contenido** y contar/verificar de nuevo en el momento de preparar la PR, sin ampliar altas. `catalogo.schema.json` es esquema de validación **de desarrollo**. `fuentes/foodkeeper-es-original.json` es procedencia documental: no publicarlo como runtime salvo justificación y aprobación extraordinarias.
- `ingredientes-v1/style.css`, `cabecera.css`, `cabecera.js`: trasladar únicamente estilos específicos necesarios; **sustituir** la cabecera experimental por la canónica de la web (no instalar dos controladores de cabecera). Preservar disposición aprobada de los tres diseños.
- `panel-v1/`, pruebas históricas V0.x y expedientes del laboratorio: **fuera de la migración**; no copiar prototipos de recetas ni experimentos.

El catálogo de etiquetas libres es distinto del sistema de recetas, de Airtable y del banco de productos comerciales. No crear inventario, cuentas, servidor, sincronización ni fechas de seguridad alimentaria nuevas. La ficha de banco sirve para prefijar campos editables; el modo libre debe funcionar sin banco.

## 3. Contratos verificados en main privado y adaptación exigida
### 3.1 Rutas, generación, navegación y marca
- Rutas actuales: `/menu-anual-recetas/` (Hero/portada), `/planificador/`, `/recetario/`, páginas `/recetas/<slug>/`. **Ruta nueva propuesta:** `/menu-anual-recetas/mis-etiquetas/`, generada por fuente privada, con `index.html`, canonical y enlaces absolutos de Pages correctos.
- Integrar enlace real en menú **Conserva**, sin introducir destinos ficticios; conservar funcionamiento de `assets/cabecera.js`, `assets/cabecera.css`, generador `scripts/cabecera.py` y la navegación documentada en `docs/NAVEGACION-HERO-PORTADA.md`. El responsable web/PWA decide el punto exacto de modificación de fuente y lo registra antes de programar.
- Portar formulario y componentes visuales a plantilla de la web, respetar tipografías Bricolage Grotesque/Geist, tokens, responsive, contraste, teclado, estados de foco y patrones de navegación; no duplicar isotipos embebidos ni estilos globales ajenos.

### 3.2 PWA, alcance y caché
- El manifiesto vigente conserva **`id`/`start_url`/`scope` = `/menu-anual-recetas/`**. Prohibido crear segundo manifest, segundo service worker, segunda instalación o modificar ese scope para el módulo.
- `scripts/pwa.py:decorate` aplica manifest, assets y revisión por hash; solo reconoce automáticamente referencias de la forma `/assets/<archivo>.js|css` de primer nivel. **Contrato técnico:** ubicar JS/CSS ejecutables productivos en `assets/` con nombres planos compatibles o ampliar deliberadamente y probar el decorador; no copiar las rutas relativas del laboratorio sin adaptarlas. No sobrescribir revisiones históricas inmutables.
- `plantillas/sw.js` clasifica páginas offline admitidas de forma **explícita** (planificador, recetario, recetas y menús) y reconoce CSS/JS revisados bajo `assets/revisions/<sha>/`; `/mis-etiquetas/` **no está todavía** en esa lista. Revisar si se añade como página visitada con límite/TTL actuales, sin prometer funcionamiento BLE offline ni precargar el catálogo sin decisión expresa. El SW nunca debe interceptar/almacenar accesos Bluetooth.
- Una página de etiquetas debe degradarse con claridad en navegadores sin Web Bluetooth o sin HTTPS: edición/vista previa disponibles cuando corresponda, impresión deshabilitada y mensaje de compatibilidad. Android Chrome HTTPS es objetivo de pruebas; soporte universal no garantizado.
- El aviso de actualización de PWA es **consentido**; comprobar que no interrumpe un trabajo de impresión en curso. No modificar el comportamiento existente de recetas/temporizador.

### 3.3 Distribución pública de lista blanca y publicación
- `migracion/distribucion.json` tiene **`default: deny`** e inventario `paths` cerrado. Hay que añadir únicamente el HTML generado de la página, sus assets ejecutables y el JSON del banco **destinado al cliente**. Nunca añadir manuales, esquemas de desarrollo, fuente original FoodKeeper, tests, scripts, workflows o metadatos privados al TAR público.
- `scripts/empaquetar_publicacion.py:runtime_paths` usa ese inventario y añade rutas generadas; rechaza recursos inexistentes o privados. `scripts/preparar_publicacion_work.py:public_path` es un **segundo filtro independiente**, que actualmente no admite `mis-etiquetas/index.html` ni `mis-etiquetas/banco/catalogo.json`. **Modificar ambos contratos y sus tests**, sin abrir expresiones regulares que permitan rutas privadas arbitrarias. Validar rutas y tipos MIME.
- El transporte `scripts/publicador_actions.py` valida el árbol completo y aplica cambios **aditivos, sin borrar** rutas públicas, preservando revisiones PWA inmutables. No publicitar ficheros excluidos ni limpiar repositorio público. En ningún caso escribir directamente a `menu-anual-recetas`.
- `.github/workflows/publicar-recetas.yml` observa fuentes `assets/**`, plantillas y distribución. Verificar **triggers efectivos** para cualquier plantilla o ruta nueva; adaptar únicamente si hay una laguna real. El artefacto se construye en privado y se publica tras fusión mediante GitHub App.

### 3.4 Integridad de los sistemas ya productivos
- Etiquetas de **receta** existentes: `assets/etiquetas-app.js`, `assets/etiquetas-engine.js`, `assets/etiquetas.css`, `plantillas/etiquetas-panel.html`, datos desde `scripts/generar.py`. Tres diseños de receta/componentes con QR; **no** compartir su engine con el motor libre ni cambiar su contrato de una ración.
- Preservar Hero, planificador, recetas, menús, Bring!, acceso a JSON públicos, manifest, SW y revisiones ya servidas. La migración no cambia datos nutricionales ni el contrato `docs/CONSERVACION-RECETAS.md`.

## 4. Estructura productiva prevista (nombres indicativos, sujetos al responsable web/PWA)
- `plantillas/mis-etiquetas.html` — fuente de página, cabecera y área de formularios, enlazada desde Conserva.
- `assets/mis-etiquetas-*.js` — app, motor libre, tres plantillas, banco-ui, dependencias en orden determinista; aislar símbolos globales de los del motor de recetas.
- `assets/mis-etiquetas.css` — solo estilos del módulo; otros CSS globales, compartidos y PWA permanecen canónicos.
- **Runtime propuesto** `mis-etiquetas/index.html` y `mis-etiquetas/banco/catalogo.json` (o una ubicación alternativa **explícita y única** que cumpla allowlist, SW y fetch). El JSON público contiene únicamente fichas destinadas a selección; comprobar que el catálogo no incluye campos que deban permanecer privados.
- Incorporar generación a `scripts/generar.py` (o helper importado) y decorar con `scripts/pwa.py`; añadir la página y los datos al inventario `migracion/distribucion.json`, a `public_path` y a tests específicos. Preservar idempotencia y hash estable.

**No fijar nombres como cambios ejecutados:** esta distribución es la propuesta que el responsable técnico debe cerrar antes de la PR.

## 5. Criterios de aceptación y verificaciones
1. **Congelación de fuentes:** registrar commit SHA exacto del laboratorio, hashes de los módulos, conteo de ingredientes, unicidad de ID, validación contra esquema y ausencia de altas nuevas. No duplicar datos comerciales.
2. **Equivalencia:** golden tests por formato para campos, geometría, raster 1 bit, orientación de Amplia, TSPL y límite 35 KB; conservar el comportamiento BLE y copias. Las diferencias permitidas son solo integración de navegación/recursos y correcciones justificadas documentalmente.
3. **Banco:** búsqueda y filtros; precarga opcional y edición libre; fechas sugeridas solo cuando hay plazo apto; nunca inventar conservación ni imponer fecha sobre la edición del usuario. Respuesta ante JSON inválido/faltante sin inutilizar modo libre.
4. **Web/PWA:** página 200 en ruta profunda y navegable desde Conserva; enlaces, PWA única, responsive móvil/desktop, accesibilidad (teclado/lector), install/update consentido, prueba online/offline limitada a contrato real; no regresión de Hero, recetario, fichas, planificador y Bring!.
5. **Publicador:** dos builds/artefactos deterministas, policy allowlist, no salida de rutas privadas, emulación aditiva y test de rutas/MIME/SHA. CI `full` obligatoria para PR de código (el selector devuelve full para cambios no ordinarios); no fusionar con CI fallida.
6. **Impresora física:** probar en Chrome Android sobre PWA pública y CT230B: conexión, datos del banco → Pequeña → impresión, edición libre, copias, Compacta y Amplia. **Solo Pequeña está aprobada físicamente en laboratorio a fecha de este contrato**; Compacta y Amplia requieren pruebas físicas por la usuaria, no basta transmisión GATT ni screenshot.
7. **Post-merge:** comprobar Actions privado, SHA fuente, PR pública automática, Pages, HTTP/MIME/SHA del HTML, JSON, JS y CSS, manifest/SW, ruta, navegación, BLE real y ausencia de exposición de expedientes. Documentar cualquier prueba no ejecutada como pendiente y no proclamar cierre productivo total.

## 6. Coordinación requerida con responsable técnico Web/PWA
**Se solicita revisión de arquitectura antes de programar**, sin abrir PR de implementación hasta registrar su respuesta o decisión técnica:
- Confirmar punto canónico para página, enlace «Conserva» y plantilla/generador; evitar alterar navegación aprobada innecesariamente.
- Elegir ubicación final del JSON del banco y política de `fetch`/caché, verificando compatibilidad con `public_path`, inventario, SW y PWA. Resolver si los 302 registros y atributos actuales son adecuados para distribución pública.
- Acordar mecanismo de cacheado de nueva ruta (página visitada, sin promesa de funcionamiento offline de BLE), orden/carga de JS y versionado por hash.
- Concretar pruebas CI `full`, navegador y BLE; preservar el sistema de etiquetas de recetas y la exclusividad del publicador.
- Verificar que la única PR funcional puede incluir cambios coordinados de generador, assets, navegación, SW y publicador sin dividir artificialmente implementación; cierre documental posterior separado.

**Responsabilidades:** responsable de etiquetado certifica fidelidad de diseños, motor y catálogo; responsable web/PWA controla integración, navegación, CI, distribución y publicación; usuaria valida impresión física y decisiones de producto. Si hay desacuerdo contractual, **detener implementación**, documentar opciones y solicitar decisión.

## 7. Estado y bloqueo
**Realizado:** auditoría de lectura del laboratorio y del repositorio privado; decisión de arquitectura; documento previo publicado en laboratorio.
**No realizado:** importación, modificación de código, creación de PR funcional, publicación pública, pruebas físicas nuevas.
**Bloqueo de inicio técnico:** validación del responsable web/PWA sobre integración, contratos de publicación/caché y punto de navegación, incluida la confirmación de los paths de runtime. El protocolo documental previo ya queda disponible para esa revisión.

## 8. Fuentes canónicas inspeccionadas (main, 10/11/2026)
**Laboratorio:** `ingredientes-v1/README.md`, `MIS-ETIQUETAS-VISION-Y-HOJA-DE-RUTA.md`, `app.js`, `motor-libre.js`, `plantilla-pequena.js`, `plantilla-compacta.js`, `plantilla-amplia.js`, `banco-ui.js`, `banco/catalogo.schema.json`, `index.html`.

**Privado:** `README.md`, `docs/PUBLICACION-ORDINARIA.md`, `docs/PWA.md`, `docs/NAVEGACION-HERO-PORTADA.md`, `docs/MANTENIMIENTO-DISENO-WEB.md`, `docs/ETIQUETADO-CT230B-ESTADO-PRODUCCION-2026-11-03.md`, `docs/ETIQUETADO-CT230B-INTEGRACION-PLAN.md` (histórico), `scripts/generar.py`, `scripts/pwa.py`, `scripts/preparar_publicacion_work.py`, `scripts/empaquetar_publicacion.py`, `scripts/publicador_actions.py`, `scripts/ci_selector.py`, `plantillas/sw.js`, `assets/pwa.js`, `manifest.webmanifest`, `migracion/distribucion.json`, `.github/workflows/publicar-recetas.yml`.

## 9. Cierre de coordinación técnica Web/PWA · 14/11/2026

**Origen del contraste:** respuesta del responsable Web/PWA comunicada por la usuaria, contrastada con `main` del laboratorio (incluidos `ingredientes-v1/banco-ui.js` y `catalogo.json`). Este apartado prevalece sobre las formulaciones abiertas de las secciones 3, 4, 6 y 7 cuando concreta sus contratos. **Estado:** seis acuerdos técnicos definidos; pendiente la PR funcional privada y las validaciones reales. Esta decisión no autoriza cambios gráficos adicionales.

### 9.1 Isotipo y recursos de cabecera
Reutilizar en la versión integrada `assets/etiquetas-isotipo-bn.svg` del origen privado; el responsable Web/PWA comunica que su contenido coincide con `../assets/isotipo-bn.svg` referenciado en el laboratorio. No duplicar el recurso ni crear otra versión. El isotipo de etiqueta no sustituye la cabecera canónica ni el isotipo de navegación. En la PR constará comprobación de equivalencia binaria/visual según proceda.

### 9.2 Banco: elegibilidad, visibilidad y privacidad
La lectura del JSON vigente confirma **302 fichas con IDs únicos: 280 `verificado`, 21 `parcial`, 1 `sin_datos`** (blob SHA del JSON: `711ca7915997a95e35953855196e8c8dc929d7a4`).

**Contrato de selección conservado del laboratorio:** la función `allowedModes(item)` de `banco-ui.js` excluye `sin_datos`; muestra cualquier ficha `verificado` o `parcial` solo si dispone de **al menos una modalidad de conservación con indicador booleano `true`**. Las **21 parciales actuales sí tienen modalidad seleccionable**. Una ficha `parcial` no se presenta como completamente verificada; al trasladar la UI se conservará su estado y se identificará de manera clara si hay que distinguirlo visualmente, sin modificar la composición de las etiquetas aprobadas. La ficha `sin_datos` permanecerá fuera del selector. El uso de la **etiqueta libre** sigue disponible independientemente del banco.

**Fechas:** la función `daysFor` requiere modalidad habilitada y `*_dias` positivo entero. Por ello, en parcial solo se sugiere fecha para una modalidad con plazo realmente existente (entre las 21 parciales actuales, Cachopo y San Jacobo tienen días de refrigeración, Orejones tiene días de despensa; otros campos sin plazo no generan sugerencias). No inferir plazo, convertir un campo vacío en cero, proponer fechas para modalidades sin días, imponer la recomendación ni impedir la edición manual. `parcial` no constituye por sí solo validación sanitaria.

**Datos publicados en el navegador:** el catálogo es necesario para búsqueda, filtrado y precarga, pero el fichero del laboratorio no debe publicarse indiscriminadamente. Generar **proyección pública mínima y determinista** por ficha, con `id`, `categoria`, `subcategoria`, `nombre`, `presentacion`, `sinonimos`, `estado_recomendacion`, indicadores booleanos de modalidades aplicables, `*_dias` disponibles y `tips_<modalidad>` consumidos por `banco-ui.js`. No publicar por defecto `fuente`, `id_fuente`, `tips_preparacion_conservacion`, JSON originales de FoodKeeper, expedientes, fuentes documentales ni esquemas de desarrollo. Los campos del runtime serán deliberadamente públicos e inspeccionables: no incluir datos personales, secretos, credenciales ni información exclusivamente privada. La proyección conserva los **302 IDs** y sus estados, aunque la UI solo permita seleccionar los elegibles; evaluar que no es imprescindible distribuir la ficha `sin_datos` al cliente si se prefiere excluirla explícitamente con prueba de recuentos. La fuente editable completa permanece en el privado. Validar proyección, tipado, unicidad y pruebas de ausencia de filtraciones antes de publicar. Cualquier cambio del contrato de campos exige revisión documental antes de código.

**Gobierno del banco:** se mantiene cerrado a nuevas altas hasta publicación oficial y nueva autorización. La migración no podrá alterar el contenido editorial del banco para resolver problemas de runtime; corregir adaptadores o elevar incidencia.

### 9.3 Caché y conectividad
La nueva página se sirve **online**, con fallback offline de la PWA existente. **No** precachear el catálogo ni guardarlo mediante service worker; conservar `fetch` con `cache: 'no-store'` y adaptar únicamente la ruta. No prometer precarga offline ni impresión BLE offline. La página puede seguir el patrón SW de navegación controlada, pero cuando no haya red el banco debe mostrar un error recuperable y la edición libre solo funciona si sus recursos están efectivamente disponibles; el fallback offline nunca finge la interfaz funcional.

### 9.4 Diseños y validación
Preservar **exactamente** Pequeña 30×20, Compacta 50×30 y Amplia B 50×80 horizontal, geometría, raster, TSPL y recursos validados. No combinar motor de libres con motor de recetas, ni introducir QR. **Evidencia física actual: solo Pequeña validada**. Compacta y Amplia requieren ensayo real con CT230B y aprobación de la usuaria. Las pruebas unitarias, capturas y transmisión GATT no sustituyen impresión real.

### 9.5 BLE y actualización de PWA
Implementar señal **explícita de impresión en curso**, centralizada y consumible por el mecanismo compartido de actualización PWA. Activarla antes del trabajo BLE y restablecerla en `finally` tanto en éxito como en fallo/cancelación. Mientras esté activa, la acción voluntaria de actualización debe aplazarse o impedir la recarga, con mensaje accesible; no forzar `skipWaiting` ni pérdida del trabajo. No interferir con actualizaciones posteriores a la finalización ni cambiar el contrato global sin pruebas de regresión. La API precisa/nombre de evento se fijará por el responsable Web/PWA en la PR y su documentación técnica, sin crear dos coordinadores paralelos.

### 9.6 Fuente congelada y trazabilidad
**Corte de referencia de esta revisión documental:** HEAD del laboratorio previo a este cierre `c9d8268a37fea3c81c09cac8b042551911e927b5`; JSON catálogo blob `711ca7915997a95e35953855196e8c8dc929d7a4`; `banco-ui.js` blob `78cd6d518482ac27b6350414e3bcb01d33ac4ed8`; `index.html` blob `b30625294f121a88928f26f371ad3e0ba1feabb9`. Estos son **puntos de comprobación**, no afirmación de que ya exista migración.

En el encabezado técnico de la PR funcional se fijarán **un SHA exacto de origen** (commit del laboratorio inmediatamente anterior al trabajo de copia) y huellas SHA-256 de **cada uno de los módulos trasladados, isotipo y catálogo**; se cotejará que no hay nuevas altas desde el cierre selectivo. Las huellas del módulo fuente y del runtime derivado se distinguirán si cambian ruta, importaciones o proyección. Si cambia `main` del laboratorio antes de la implementación, documentar nuevo corte y revisar diferencias en lugar de asumir que este commit es el definitivo. Publicación solo tras `full` y verificación de Actions/Pages/HTTP.

### 9.7 Coordinación y responsabilidades
**Acuerdos cerrados a nivel de contrato para preparar la PR:** isotipo reutilizado, política de selección parcial y `sin_datos`, proyección pública mínima, servicio online sin catálogo cacheado, tres formatos sin alteración, bloqueo de actualización durante impresión, trazabilidad de fuente congelada. **Elección de nombres concretos de implementación y controles de CI:** responsabilidad técnica Web/PWA, con revisión del responsable de etiquetado para equivalencia funcional.

El siguiente hito es **una sola PR técnica privada con merge**, sin segunda PWA ni publicador. Después se verificará lo verdaderamente publicado y se actualizará el expediente posterior en `main` del laboratorio. No dar por físicamente validados Compacta/Amplia ni por publicada la sección antes de las pruebas respectivas.

## Enmienda de fuente de migración · 14/11/2026

Tras la coordinación técnica de este expediente, la usuaria ha autorizado una **corrección excepcional de la ficha existente DES-CON-001 · Salsa de tomate**, sin nuevas altas. El catálogo en el commit [859a862](https://github.com/MiruRecetas/MiruRecetas-ct230b-ble-lab/commit/859a8624118b27bbc1e53547d999a4c15634259a) contiene **302 fichas: 280 verificadas, 22 parciales, 0 sin datos**. Para Salsa de tomate la precarga editable es **nevera 3 días, congelación 90 días y conserva casera cerrada 180 días**. Los 180 días se atribuyen a la **preferencia doméstica expresa de la usuaria**, no a un procedimiento de conservación validado; `estado_recomendacion: parcial`. La modalidad para el tarro cerrado es `conserva`, coherente con el banco; `despensa` general no se activa.

**Obsolescencia controlada:** los recuentos 280/21/1 y el blob `711ca791...` de la sección 9 son un corte histórico de la revisión técnica, no el catálogo vigente. Para la PR funcional tomar nuevo corte y SHA exacto de laboratorio, JSON y módulos; mantener 302 IDs únicos y prueba de estados 280/22/0. No reintroducir la ficha sin datos ni sustituir el consentimiento del usuario por una recomendación sanitaria certificada. La actualización es **solo de datos y documentación**, sin cambio de diseño ni código.

