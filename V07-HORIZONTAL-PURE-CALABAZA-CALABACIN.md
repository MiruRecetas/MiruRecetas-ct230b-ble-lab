# V0.7 · Ensayo horizontal 50×80 · Puré de calabaza y calabacín

**Fecha:** 30 de octubre de 2026.  
**Estado:** implementado en rama y pendiente de validación física (Chrome Android + CT230B). No afirmar que se ha impreso ni que el QR ya se ha escaneado en V0.7.

## 1. Diseño aprobado y limitación de alcance

La usuaria aportó el SVG Canva **`MiruRecetas · Etiqueta 50x80 · v1_20261030_200122_0000.svg`**, con el contenido girado 90° antihorario. V0.7 **no introduce una nueva dirección de diseño**: usa la geometría horizontal de `label-p15-horizontal-svg.js`, existente en el laboratorio, que reconstruye editorialmente la referencia SVG. Es una implementación de la composición, no un enlace automático al proyecto Canva ni la transferencia literal de cada path vectorial.

* Formato físico: 50 × 80 mm, ancho de cabezal 50 mm, composición horizontal girada 90° antihorario.
* Nombre, nutrición, fechas, título de descongelación, instrucciones, nota, QR y marca, sin bloques adicionales. **El SVG horizontal no lleva anillo nutricional**; no añadirlo.
* Fuentes web oficiales: Bricolage Grotesque y Geist; isotipo oficial BN del laboratorio. Si no se cargan, se bloquea la impresión; sin fuentes de sustitución.
* Dos únicos separadores conforme a geometría ya establecida: `BAR 109,0,21,945` y `BAR 251,427,7,518`. No rasterizar esas líneas.
* QR nativo: `QRCODE 345,58,M,5,A,0,M2,S7`. El arte **no incluye** QR rasterizado ni copia el QR original de Canva.

## 2. Fuente de la receta y datos inalterables del ensayo

Fuente canónica: `MiruRecetas/mirurecetas-web-source/main:datos/recetas/pure-de-calabaza-y-calabacin.json`.

| Campo por ración | Valor |
| --- | ---: |
| Nombre | Puré de calabaza y calabacín |
| kcal oficiales | 215,56 |
| PR | 4,44 g |
| HC | 22,31 g |
| GR | 12,92 g |

Instrucción literal aportada por la usuaria: **«Descongelar en nevera y remover mientras se calienta enérgicamente o volver a batir»**. Puede envolverse en hasta cuatro líneas **dentro del mismo bloque**; no se trunca ni se sustituye por el texto anterior del laboratorio. Nota descriptiva para la maqueta: «La textura puede variar al descongelar». Esta nota no es un dato oficial de conservación y se podrá revisar editorialmente.

URL canónica completa del QR, sin URL corta, repositorio extra ni redirecciones intencionadas:
`https://mirurecetas.github.io/menu-anual-recetas/recetas/pure-de-calabaza-y-calabacin/`.

Las fechas de envasado y consumo preferente se introducen a mano. No generar un plazo predeterminado: **la ficha oficial no contiene una validación de conservación congelada**.

## 3. Implementación técnica aislada

* Nueva sección de interfaz: **6E · V0.7**, nueva etiqueta y botón independiente.
* Nuevo módulo `label-v07.js` con datos constantes oficiales, fechas dinámicas, vista previa, comprobaciones y un único envío por pulsación.
* Reutilización de `p15hRender(d,4)` y `p15hBuild(d,4)`: la modificación en el módulo existente **solo parametriza** el máximo de líneas de instrucción (por defecto sigue siendo 2 en las pruebas previas), para poder imprimir la frase completa del puré sin tocar geometría ni otros textos.
* `v62SparseRegion`: bandas de un máximo de 12 filas con eliminación de blanco para reducir bytes transmitidos.
* `SIZE 50 mm,80 mm`; `GAP 2 mm,0 mm`; `DIRECTION 0`; `CLS`; `BITMAP` disperso; **2 BAR**; **1 QRCODE nativo**; **1 PRINT 1,1**.
* Se conserva `transmitDiagnostic` del laboratorio: fragmentos BLE de **20 bytes**, pausas de **75 ms**, sin reintentos automáticos, sin comandos persistentes y con límite preventivo de **35.000 bytes**.
* El botón exige CT230B conectada, fechas válidas, aceptación de papel 50×80 y confirmación modal. El registro presenta bytes, bandas y fragmentos previstos.

**Pruebas de código:** parseo de JavaScript del módulo nuevo y del reutilizado; se verificaron los controles, referencias, configuración de línea/QR y que las pruebas previas conservan el máximo de 2 líneas. **Pendiente:** ejecución real en Chrome Android, cálculo de bytes con sus fuentes rasterizadas, impresión física, lectura QR y comparación visual contra SVG aprobado.

**Ámbito:** únicamente laboratorio BLE CT230B. No se modifica Canva, web principal, Airtable, receta oficial, publicación canónica ni PWA.