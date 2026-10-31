# P15 · Cuatro etiquetas Canva para prueba física — 30/10/2026

> **ESTADO VIGENTE · 31/10/2026:** este documento describe el primer lote P15 histórico. Las **cuatro plantillas** están aprobadas, ambas **50×80 tienen QR legible**, y la solución de QR para **50×30 (5 puntos + corrección M)** ha sido probada y aprobada en el panel V1 con Ragú. Multicopia 1/2 y observación de uso tras 2–3 días en congelador: favorables. Fuente de estado actual: [acta de validación](VALIDACION-ETIQUETAS-CT230B-2026-10-31.md). No editar los motores históricos para corregir esta bitácora.


**Estado: implementadas para ensayo en laboratorio aislado, NO impresas ni aprobadas físicamente.**  
La versión **V0.6.2** (50 × 80 vertical, diseño anterior) **ya fue impresa correctamente** desde Chrome Android por BLE/TSPL con QR escaneable; su transportador se conserva. La presente serie P15 no reemplaza la V0.6.2 ni la portará a la PWA oficial.

## Propuestas y fuentes

| Botón | Papel físico | Contenido piloto | Canva de referencia | QR |
| --- | --- | --- | --- | --- |
| 01 · Completa vertical | 50 × 80 mm | Cebollas rellenas | `DAHZbhgmFc0` | URL canónica Cebollas |
| 01bis · Completa horizontal | **50 × 80 mm (alimentación 80 mm)** | Cebollas rellenas | `DAHZgFaJ6oM` | URL canónica Cebollas |
| 02 · Componente | 50 × 30 mm | Pisto | `DAHZfv_-Y-g` | URL canónica Pisto |
| 03 · Ingrediente | 30 × 20 mm | Carne picada · gramos editables | `DAHZfxOJgfA` | Sin QR |

**Aviso de fidelidad:** son **recreaciones programáticas Canvas de los diseños de Canva**, no un exportador Canva ni un raster del propio Canva. Usan activos y fuentes oficiales ya existentes; tamaños y disposición pueden requerir ajuste tras observar la muestra impresa. La vista previa dibuja una reserva para QR; en el papel lo genera el comando TSPL nativo (no debe capturarse la reserva como QR impreso).

Las etiquetas de **receta completa y componente cocinado** corresponden a recetas existentes y contienen **exactamente una ración por bolsa, sin mostrar gramaje ni el texto «1 ración»**. El ingrediente puede tener un peso variable. Datos oficiales por ración para los pilotos: Cebollas rellenas **338,68 kcal; P 15,92 g; HC 27,50 g; GR 17,67 g**; Pisto **164,35 kcal; P 5,69 g; HC 18,58 g; GR 7,84 g**, cotejados con `mirurecetas-web-source/main:datos/recetas/pisto.json` y la ficha pública. No calcular kcal mediante 4/4/9 para sustituir valores oficiales. Las fechas de consumo preferente se indican manualmente y no constituyen plazos certificados.

## Transporte: parámetros conservados de V0.6.2

- Misma característica de escritura UART BLE autorizada; sin nuevos UUID, servicios o características.
- **20 bytes por fragmento BLE** y **75 ms de pausa tras cada escritura**, exactamente la rutina `transmitDiagnostic` ya existente.
- Prioridad `writeValueWithResponse`; fallback al método `writeValueWithoutResponse` ya disponible, nunca un mecanismo nuevo.
- `SIZE 50 mm,80 mm`, `50 mm,30 mm` o `30 mm,20 mm` según papel. Siempre `GAP 2 mm,0 mm`, `DIRECTION 0`, `CLS`, un único `PRINT 1,1`.
- **Para la versión horizontal 50×80, se mantiene `SIZE 50 mm,80 mm`: se rota el ARTE 90° dentro del ancho físico de 50 mm, sin intentar imprimir un ancho de 80 mm.** Su lectura tras despegar la etiqueta será apaisada.
- Raster 1 bpp TSPL por `v5ToTsplBitmap`, parcelado **mediante `v62SparseRegion`**, con filas de **máximo 12** y eliminación de filas/columnas totalmente blancas. Se preserva la polaridad 0=negro / 1=blanco previamente probada.
- QR real como **`QRCODE ... M,5,A,0,M2,S7`**, sin PNG, acortadores ni identificadores privados; reserva blanca sin elementos raster superpuestos. La ficha de **Pisto usa su URL auténtica**, no la de Cebollas.
- Límite preventivo **35.000 bytes** por trabajo; bloqueo antes de transmitir si se excede, tamaño mostrado en pantalla. El límite es una medida prudente, **no garantía** de que toda etiqueta inferior a ese valor imprimirá.
- Una copia por botón, casilla de rollo concreto y confirmación modal; **sin reintentos automáticos**. Un envío completo a la API BLE no demuestra impresión correcta.

## Prueba humana

1. Entrar desde Chrome Android en el [laboratorio HTTPS](https://mirurecetas.github.io/MiruRecetas-ct230b-ble-lab/) después de que se fusione la PR y Pages sirva la nueva versión. Conectar CLABEL CT230B, cerrar app del fabricante y herramientas BLE que estén usando el dispositivo.
2. Seleccionar fechas reales de muestra, con consumo preferente elegido conscientemente (sin autocalcular). Para ingrediente, introducir gramos.
3. Instalar **el rollo que corresponda**, marcar SOLO la confirmación del diseño elegido, pulsar su botón e inspeccionar inmediatamente la vista previa y el tamaño reportado.
4. Confirmar un único envío. Al terminar, examinar etiqueta, orientación, líneas, QR real en los formatos con QR, fuentes, márgenes y recortes. Copiar el log BLE y fotografía de una etiqueta por variante.
5. Si falla un formato, **no repetir hasta analizar**; no confundir `datos enviados` con impresión buena. No dar por validada adhesión al film PA/PE o conservación a −18 °C.

## Alcance y reproducibilidad

Solo se modifican los archivos del **laboratorio público** (`index.html`, nuevo `label-p15.js` y este documento). El código histórico de V0.6, V0.6.1 y V0.6.2 permanece intacto. No se modifica `mirurecetas-web-source`, `menu-anual-recetas`, Airtable, nutrición oficial, identidad, acciones de publicación ni inventario privado.

**QA informática:** sintaxis JavaScript del archivo nuevo y del inline existente; presencia de cuatro botones y cuatro casillas; construcción mock de cada TSPL con `SIZE` físico correcto, **un `PRINT 1,1`**, QR canónico donde procede y ningún QR en ingrediente. **No hay QA real de hardware hasta la ejecución por la usuaria.**
