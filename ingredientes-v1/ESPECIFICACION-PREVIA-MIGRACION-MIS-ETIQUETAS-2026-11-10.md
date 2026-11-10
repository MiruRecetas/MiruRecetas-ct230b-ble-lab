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
