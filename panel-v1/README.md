# MiruRecetas · Panel V1 de impresión · Ragú a la boloñesa

> **VALIDACIÓN FÍSICA POSTERIOR · 31/10/2026:** panel de Ragú con **dos copias mediante PRINT 1,2** (609 fragmentos de 20 B, 12.176 B); QR de **50×30, 5 puntos por módulo y ECC M** escaneado correctamente: https://mirurecetas.github.io/#r047. Aprobación expresa de la usuaria. Adhesión/aspecto después de **2–3 días de congelador y manipulación**, satisfactorios. La opción **original de 4 puntos sigue siendo predeterminada en este panel**; elegir **5 puntos** para usar el QR aprobado hasta posterior actualización. Ver [acta](../VALIDACION-ETIQUETAS-CT230B-2026-10-31.md). Las reservas «pendiente» inferiores pertenecen a fases previas.


**Estado:** página experimental en el laboratorio público, distinta de `/index.html` histórico. **Los diseños originales y el transporte BLE siguen aprobados; la impresión de la adaptación a Ragú y la multicopia no están aún comprobadas físicamente.**

**URL de prueba:** `https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/panel-v1/`.

## Receta real empleada

**Fuente canónica:** `MiruRecetas/mirurecetas-web-source/main:datos/recetas/ragu-a-la-bolonesa.json`, contrastada con la ficha pública `/menu-anual-recetas/recetas/ragu-a-la-bolonesa/`. Se cambia la antigua muestra de Pisto únicamente en esta página nueva, **sin alterar la página de laboratorio histórica, las fichas públicas o los JSON de recetas**.

- Nombre: **Ragú a la boloñesa**; slug `ragu-a-la-bolonesa`, categoría **salsas-aderezos**, imagen oficial `imagenes/ragu-a-la-bolonesa.webp`.
- Raciones del JSON: **4**. Ingredientes: pimiento verde 75 g; pimiento rojo 75 g; cebolla 75 g; AOVE 7,5 ml; ternera picada 300 g; zanahoria 75 g; tomate triturado 300 g; vino blanco de guiso 50 ml; leche semidesnatada 50 ml; queso crema 35 g; sal y pimienta negra sin cantidad especificada.
- Nutrición **por ración**: **251,89 kcal; PR 16,65 g; HC 10,67 g; GR 15,78 g**. El anillo gráfico de la réplica se adapta a las fracciones energéticas 4/4/9 de esos tres macronutrientes.
- El contador de «Cantidad a preparar» empieza en **4**; cambia los ingredientes de la ficha, nunca altera las **cifras por ración de las etiquetas**, ni el contador de copias.
- **QR de ensayo propio:** `https://mirurecetas.github.io/#r047`. `r047` está asignado a Ragú en la rama de la **PR privada #46**, todavía no publicada. **No considerar la navegación desde QR operativa hasta fusionar y publicar #46**. La reducción de densidad sí puede ensayarse.
- Los textos impresos para descongelación/nota se han **abreviado a partir de las notas de la receta registrada**, no del ejemplo de Pisto. En los bloques pequeños: «Descongelar en nevera» / «Recalentar removiendo» y «Refrigerar pronto o» / «congelar por raciones». En horizontal se expresa la indicación ampliada, también fundamentada en las notas de origen. **No se ha generado ningún plazo nuevo de consumo preferente.** La nota canónica completa contiene más instrucciones; esta abreviación es **experimental**, pendiente de revisión por la usuaria antes de integrar en la web real.

## Panel y formatos

- Móvil: bottom sheet desde abajo, **88dvh** y anchura correcta; escritorio: panel derecho de hasta **480 px**, siguiendo el patrón de ficha diaria compacta.
- Selector de formato inicial: **50×80 vertical V0.6.2**; alternativas **50×80 horizontal V0.7.3** y **50×30 componente V0.9**. V0.8 ingrediente 30×20 se reserva a la futura pantalla «Conserva» y no se ofrece aquí.
- Fecha de envasado: **fecha local del dispositivo por defecto, modificable**. Consumo preferente: opcional, con guiones `--/--/--` si está vacío. No establecer caducidad alimentaria automática.
- Copias: **1 a 20** mediante selector −/+, con una ración por etiqueta y **un único trabajo TSPL `PRINT 1,N`**, transmitido con BLE 20 B / 75 ms. Multicopia aún pendiente de prueba física.
- Conexión manual CT230B y botón de imprimir **deshabilitado** sin fecha válida, conexión, fuentes reales y número de copias permitido. Confirmación previa sin reintentos.
- El cuadro de vista previa usa proporciones 590×945, 945×590 y 590×354 respectivamente, con QR nativo TSPL reservado; el QR real solo se ve tras imprimir.
- Registro BLE/TSPL visible bajo la ficha, en consola oscura que envuelve líneas largas, con botones **Copiar registro** y **Limpiar registro**. Sin telemetría remota.

## Precauciones y próximos ensayos

1. Verificar que Ragú aparece con fotografía real, 4 raciones, ingredientes correctos, nutrición 251,89 / 16,65 / 10,67 / 15,78 y que ningún texto de Pisto permanece en la página o etiquetas.
2. Abrir el panel y comprobar las vistas previas, especialmente título largo en 50×30 y notas para Ragú, sin solapamiento con logo, kcal o QR.
3. Probar 1 etiqueta de Ragú para comprobar que nombre, fechas, macros e instrucciones coinciden con la ficha y que el QR muestra **`#r047`**. Esta etiqueta puede guardarse para uso real **solo si sus fechas, contenido y destino del QR son adecuados**; la URL corta aún puede no resolver a su ficha.
4. Para multicopia, probar primero 2 etiquetas y confirmar dos salidas completas con un único trabajo BLE, antes de elevar el número de copias.
5. Facilitar el registro de ejecución y fotografías para cerrar validaciones sin alterar las cuatro maquetaciones originales.

**Publicación y límites:** desarrollo exclusivo en repositorio laboratorio público; ningún cambio en `mirurecetas-web-source`, web/PWA oficial, Airtable, Hero, índices QR, ni mecanismo de Actions de producción. El traslado a la fuente privada queda pendiente de aprobación.


## Ensayo físico registrado de multicopia y defecto QR

Una prueba real en CLABEL CT230B con papel **50×30 mm** confirmó:
- Impresión de una etiqueta de Ragú con \`PRINT 1,1\`: **12.176 B, 609 fragmentos BLE, 26 bandas raster**.
- Impresión de dos etiquetas iguales mediante **un único** \`PRINT 1,2\`: **12.176 B, 609 fragmentos BLE**. Las dos salidas completas se aprecian en la fotografía. Las tres etiquetas tienen nombre, fechas, macros y notas legibles.
- **El QR del enlace corto \`https://mirurecetas.github.io/#r047\` NO fue escaneable**. Aumentar el número de copias o acortar la URL en ese formato no lo solucionó.

La respuesta binaria BLE de notificación \`dd 00 05 86 00 01 14 d1 dd\` se registró durante la multicopia, pero **no se le atribuye ninguna interpretación de firmware no comprobada**. La conclusión de 2 copias correctas proviene de la foto física y del log, no de esa notificación.

### Modificación experimental aislada · QR nativo ampliado

El problema puede ser **módulo excesivamente pequeño con engrosamiento térmico**, no solo exceso de información. El código corto tiene 35 caracteres, que encajan previsiblemente en un QR de **versión 3 (29×29 módulos), ECC M**. El TSPL original de componente usa:
\`\`\`tspl
QRCODE 420,187,M,4,A,0,M2,S7,"https://mirurecetas.github.io/#r047"
\`\`\`
Matriz: 116×116 dots, módulo aproximado 0,34 mm si la impresora imprime ~300 ppp.

El panel incorpora una nueva selección **únicamente al elegir 50×30**:
- **Original (4 puntos):** exactamente el mismo trabajo TSPL anterior.
- **Ampliado (5 puntos, experimental):** solo cambia el comando de QR a
\`\`\`tspl
QRCODE 425,187,M,5,A,0,M2,S7,"https://mirurecetas.github.io/#r047"
\`\`\`
Matriz: 145×145 dots; módulo aproximado 0,42 mm. La zona blanca mínima de cuatro módulos por lado supone 20 dots. El QR y su quiet zone ocupan x=405…590 e y=167…352, dentro de la zona reservada. Se conservan **ECC M**, modo A, modelo M2, máscara S7, URL #r047, tamaño papel, raster, notas, macros y BLE 20 B/75 ms. No se añade DENSITY global ni se cambia el contraste de toda la etiqueta.

**Limitación:** el tamaño real de la matriz depende del firmware nativo. La geometría se ha estimado para un QR versión 3, y se ha verificado en simulación; la lectura y los márgenes se deberán comprobar en papel.

Se han ejecutado **16 comprobaciones simuladas** de regresión: los trabajos originales (3 formatos × 1,2,20 copias) se mantienen **byte a byte idénticos**; en 50×30 con 1,2,5,20 copias, la opción ampliada solo cambia la instrucción QRCODE; los otros dos formatos rechazan el experimento; se impide cualquier variante desconocida. Los controles nativos de fecha, confirmación y conexión no se modifican.

**Siguiente prueba física:** seleccionar 50×30, «Ampliado · 5 puntos», **1 copia**, imprimir Ragú con fechas adecuadas y escanear el nuevo QR en el teléfono. Si no lo reconoce, compartir foto y log y no aumentar copias con esa variante. No se considera aprobado el QR ampliado hasta la prueba.

Documentación técnica: [TSPL QRCODE (TSC)](https://fs.tscprinters.com/system/files/31-0000001-00_tspl_tspl2_programming_g.pdf), [DENSO WAVE: tamaño de módulo](https://www.qrcode.com/en/howto/cell.html/index.html) y [zona blanca obligatoria](https://www.qrcode.com/en/howto/code.html/index.html).
