# Acta P15 · Aprobación física de etiquetas, QR y multicopia · 31/10/2026

**Estado vigente y fuente:** validaciones físicas expresamente comunicadas por la usuaria, con fotografías de etiquetas, captura de lectura QR y registros BLE de Chrome Android. Esta acta **prevalece** sobre estados históricos de los ensayos anteriores; no constituye una autorización para modificar el código de producción.

## 1. Cuatro diseños aprobados

| Formato | Versión gráfica | QR | Estado |
|---|---|---|---|
| 50 × 80 mm vertical · receta | V0.6.2 | QR real escaneado correctamente | **Aprobada** |
| 50 × 80 mm horizontal · receta | V0.7.3 | QR real escaneado correctamente | **Aprobada** |
| 50 × 30 mm componente | V0.9 (diseño Pisto, PR #20) | **5 puntos/módulo, ECC M**, probado en panel V1 con Ragú | **Diseño y nuevo QR aprobados** |
| 30 × 20 mm ingrediente | V0.8 | Sin QR, impresión probada | **Aprobada** |

Cada etiqueta de receta/componente representa **una ración por bolsa** y no imprime gramos ni número de raciones. La de ingrediente permite cantidades en gramos. No alterar la geometría, tipografías oficiales ni QR de 50×80: **ya funcionan**.

**No confundir archivos:** la página histórica y el módulo de Pisto label-v09-component.js continúan **sin cambios**, con su QR anterior de 4 puntos y URL larga. La configuración de **5 puntos/M aprobada para 50×30** se probó en el módulo panel-v1/engine.js para Ragú. El panel conserva el selector original de 4 puntos como valor inicial **hasta otra actualización del código**: para imprimir con la configuración aprobada en las pruebas actuales, elegir expresamente la opción ampliada de **5 puntos**.

## 2. Qué solucionó la legibilidad del QR compacto

- **Antecedente Pisto, módulo 4 y URL larga:** diseño físico V0.9 aprobado, QR difícil de leer.
- **Ragú, enlace corto con 4 puntos:** el QR seguía sin leerse. Acortar la cadena sin aumentar el tamaño de módulo no bastó.
- **Ragú, enlace corto con 5 puntos y ECC M:** QR **leído y validado**; la captura de la usuaria devuelve exactamente https://mirurecetas.github.io/#r047. Se aprueba **5 puntos/módulo con corrección M** para la etiqueta **50×30**. No disminuir a L: perdería tolerancia a defectos sin reducir necesariamente esta matriz.

Comandos TSPL de diagnóstico (el original se conserva como control histórico):

~~~tspl
QRCODE 420,187,M,4,A,0,M2,S7,"https://mirurecetas.github.io/#r047"
QRCODE 425,187,M,5,A,0,M2,S7,"https://mirurecetas.github.io/#r047"
~~~

Se mantienen el QR TSPL nativo, modelo M2, máscara S7, corrección M y zona blanca despejada. La ampliación no altera textos, nutrición, raster, fechas ni transmisión BLE.

**Log del escaneo aprobado (31/10/2026):** 13:28:53 selección de CT230B; 13:29:00 conexión UART/GATT y notificaciones; 13:29:03 trabajo de componente, **12.176 bytes, 609 fragmentos BLE, 26 bandas raster**, 1 copia; 13:29:05 inicio de envío; 13:30:17 fin. La aprobación de **lectura** proviene de la captura del escáner y de la declaración de la usuaria, **no** únicamente del log de bytes enviados.

**Límite de destino:** el ID r047 está asignado a Ragú en la PR privada #46, pero su resolvedor aún no se había publicado en el momento de la prueba (cuota de Actions). **QR decodificable no implica todavía redirección pública funcionando**: habrá que verificar la URL tras desplegar #46.

## 3. Multicopia con una sola transmisión

Una primera prueba Ragú 50×30 produjo 1 etiqueta, y una segunda produjo **2 etiquetas completas** con un único trabajo final PRINT 1,2. La fotografía y el registro acreditan dos ejemplares, sin repetir el formulario ni transportar bitmap/QR por separado.

- **PRINT 1,1:** 12.176 bytes, 609 fragmentos BLE, 26 bandas raster; inicio 13:10:26; envío completo 13:11:38.
- **PRINT 1,2:** 12.176 bytes, 609 fragmentos BLE, 26 bandas raster; inicio 13:12:00; envío completo 13:13:12. Foto de **dos etiquetas** impresas.
- Transporte conservado: **20 bytes por fragmento BLE, pausa 75 ms**, mismo GATT UART autorizado, **sin reintentos automáticos**.
- **Aprobado físicamente para 1 y 2 copias.** La interfaz y la simulación admiten 1–20, pero **3–20 no están físicamente comprobadas**. No extrapolar.
- La notificación de 9 bytes recibida durante la segunda transmisión no tiene significado de firmware verificado.

## 4. Prueba de conservación en congelador

La usuaria confirma que etiquetas colocadas en sus bolsas permanecen **perfectas tras 2–3 días de congelador y manipulación**. Es una prueba real positiva y favorable de aspecto, fijación y legibilidad en ese uso. **No certifica meses de conservación, resistencia universal del adhesivo, ciclos repetidos ni seguridad alimentaria.** No se documenta temperatura ni número de ciclos no comunicados.

## 5. Panel de receta y contrato para integrar

La página independiente de laboratorio https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/panel-v1/ reproduce la ficha real **Ragú a la boloñesa**, con **4 raciones de cocina** y nutrición oficial **por ración**: 251,89 kcal; PR 16,65 g; HC 10,67 g; GR 15,78 g. Ficha y panel no modifican web/PWA oficial.

- Botón de imprimir en ficha; bottom sheet móvil inspirado en ficha diaria compacta y panel lateral escritorio; previsualizaciones en proporción real; consola de diagnóstico con **Copiar** y **Limpiar**.
- Un solo motor para receta completa 50×80 vertical (predeterminada), horizontal y componente 50×30; el 30×20 de ingrediente **se reserva a futura pantalla Conserva**.
- Envasado precargado con **fecha local de hoy** y editable; consumo preferente opcional, impreso --/--/-- si se omite. **No se infiere fecha de consumo ni se asume vida útil.**
- Contador de **1–20 copias** con botones menos/más, independiente del selector de raciones de cocina.
- Conexión manual CT230B y habilitación de impresión solo con fecha válida, recursos listos y conexión. Confirmación de trabajo; BLE sin reintentos.
- Los textos de Ragú del panel son abreviaciones **experimentales** de notas de la receta; la parametrización canónica por receta, incluida su lectura desde los datos de receta sin mostrarlos en la ficha, **sigue pendiente** de definir.
- El motor de ingredientes 30×20 podrá tratarse por separado en Conserva. La aplicación web debe mantener código generador y fuentes en **mirurecetas-web-source privado**; solo publicar el JavaScript/HTML/CSS que necesite ejecutar Chrome. La salida pública ejecutable no es secreta.
- Integrar por rama/PR privada y único publicador GitHub Actions/GitHub App después de validar URL corta e índice de recetas; **sin cambiar repositorio raíz Hero/fotogramas, ni publicar manualmente en el repositorio público**.

## Referencias de trazabilidad

- Página histórica y versiones anteriores: README.md, V09-COMPONENTE-50x30-PISTO-SVG-PRUEBA.md, P15-PRUEBAS-CUATRO-ETIQUETAS.md y V08-INGREDIENTE-30x20-CANVA-ENSAYO.md.
- Panel aprobado para seguir los ensayos: panel-v1/README.md.
- PR #23 (panel), #24/#25 (ajustes responsive y control copias), #26 (Ragú), **#27 (QR ampliado)** en este repositorio.
- Fotografías, pantalla de escaneo y logs aportados en conversación, **no incorporados ni expuestos como archivos públicos**.
