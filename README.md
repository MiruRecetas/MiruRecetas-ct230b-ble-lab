# MiruRecetas · Laboratorio BLE CT230B

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

**Importante:** encontrar una característica de escritura no implica que acepte TSPL ni que una etiqueta impresa desde navegador funcione. El protocolo y la fragmentación permanecen sin verificar.

## Cómo realizar la prueba

1. Instalar un **rollo estándar de 50 × 30 mm**. No usar los rollos específicos para congelación.
2. Encender la impresora y cerrar completamente Clabel trade y nRF Connect.
3. Abrir la URL de Pages desde **Chrome Android** bajo HTTPS.
4. Pulsar **Conectar impresora** y seleccionar la CT230B en el diálogo del navegador.
5. Comprobar en el registro que se ha accedido al servicio y característica de escritura. La conexión no imprime nada.
6. Cuando quieras intentar el primer envío TSPL, marcar la casilla de confirmación, pulsar **Enviar etiqueta de prueba** y aceptar el diálogo. Se envía **una única etiqueta de texto**.
7. Revisar si físicamente salió una etiqueta, su posición y cualquier indicación de error. Copiar el registro si necesitas compartirlo; no compartir direcciones ni identificadores privados.

El prototipo v0.1 prepara instrucciones de texto TSPL `SIZE 50 mm,30 mm`, `GAP 2 mm,0 mm`, `DIRECTION 1`, `CLS`, `TEXT` y `PRINT 1,1`, transmitidas en bloques de hasta **20 bytes**, con una pequeña pausa. **Son parámetros de ensayo**, no calibración validada del firmware o adhesivo. La aceptación por la API BLE no confirma la impresión física.

## Seguridad y límites

- El dispositivo Bluetooth se solicita solo tras pulsar un control.
- No hay acceso a datos nutricionales, usuarios, recetas privadas ni inventarios personales.
- No se envían comandos hasta la confirmación de impresión; ninguna operación actualiza firmware o ajusta parámetros permanentes.
- No probar escritura en otras características sin estudiar su función. Si un trabajo falla, revisar la impresora antes de reenviarlo.
- La web funciona en el origen de GitHub Pages y no cambia la configuración de la aplicación principal.
- La fuente externa [CT320B-G28T](https://github.com/klks/CT320B-G28T) estudia **otro modelo**. Su código no se copia ni se reutiliza sin permiso o licencia clara.

La **bitácora técnica completa y las decisiones de arquitectura** siguen en el repositorio privado `MiruRecetas/mirurecetas-arquitectura`, expediente P15. Este README público contiene solo instrucciones reproducibles, sin datos domésticos o información interna del proyecto.

## Estado del proyecto

- **Verificado:** impresión oficial desde Clabel trade; BLE GATT conectado y servicios descubiertos desde Chrome Android.
- **Pendiente:** primera escritura TSPL, impresión física desde el navegador, control de buffer/fragmentación, QR, fuentes oficiales, plantillas 50 × 80 / 50 × 30 / 30 × 20 y futura integración privada de «Conserva».

Todo el laboratorio se considera **experimental**, no aprobado para la web principal.
