# Conserva · Etiquetas de ingredientes (candidato de interfaz V1)

**Estado: desarrollo experimental exclusivamente en la rama de laboratorio.**
Este directorio es una página autónoma y el punto de partida previsto para la
futura sección **Conserva** de la web MiruRecetas. No se ha integrado ni migrado
ningún archivo a \`MiruRecetas/mirurecetas-web-source\`; no está publicado como
página productiva ni registra existencias.

## Qué contiene

- \`index.html\`: página completa, responsive y revisable editorialmente. No es
  el \`index.html\` histórico de experimentos CT230B.
- \`style.css\`: presentación separada del motor, con crema/salvia/terracota,
  Bricolage Grotesque para titulares y Geist para texto.
- \`engine.js\`: motor **independiente**, que valida cuatro campos, reproduce la
  geometría de la **V0.8 aprobada** en 354 × 236 puntos y compone TSPL.
- \`app.js\`: interacción, carga estricta de tipografías/isotipo oficial,
  previsualización, conexión voluntaria, confirmación, transporte BLE, barra de
  progreso y registro local.

La fuente de referencia experimental aprobada está en
\`../label-v08-ingredient.js\` y
\`../V08-INGREDIENTE-30x20-CANVA-ENSAYO.md\`. **No modificarla.** La V0.8
fue impresa y aprobada en cinco ensayos (30/10/2026), pero la implementación
separada de este directorio **aún no ha sido reimpresa ni comparada físicamente**
con esos ejemplares. No convertir el éxito del transporte en una prueba física.

## Contrato congelado de la etiqueta

- Papel **30 × 20 mm**, lienzo **354 × 236 puntos**; lectura horizontal.
- Nombre editable, gramos enteros entre **1 y 9999**, fecha de envasado y
  congelación, fecha manual de consumo preferente no anterior al envasado.
- Tipografía Bricolage Grotesque / Geist, separadores raster, isotipo oficial
  monocromo y pie «Descongelar en nevera», como la V0.8.
- **Sin QR**, sin valores nutricionales, sin inventario ni lote.
- TSPL \`SIZE 30 mm,20 mm\`, \`GAP 2 mm,0 mm\`, \`DIRECTION 0\`, \`CLS\`,
  \`BITMAP\` disperso de bandas ≤12 filas y **un solo \`PRINT 1,1\`**.
- Máximo 35.000 bytes, BLE UART CT230B, fragmentos de 20 bytes con pausa
  de 75 ms y sin reintentos automáticos. Los controles bloquean envíos
  incompletos o con datos inválidos.

## Límites de la pantalla

La página es un **candidato de producto** y evita lenguaje o controles de
experimentos históricos. Durante su estancia en el laboratorio conserva un
aviso de alcance en el pie. No contiene selector de los tres formatos
de recetas. El nombre y los gramos son introducidos manualmente: todavía
no hay un contrato de catálogo canónico de ingredientes para esta sección.
Las fechas no se deducen de pautas generales de conservación.

Se utiliza la ruta relativa \`../assets/isotipo-bn.svg\`, disponible
en el laboratorio. Cualquier futura migración deberá revisar rutas y
dependencias **tras autorización expresa**, sin copiar código experimental
innecesario ni crear transportistas de publicación alternativos.

## QA antes de cualquier fusión

1. Ejecutar \`node --test tests/ingredientes-v1.test.cjs\` en una copia del
   laboratorio y revisar validaciones, límites, bitmap, TSPL y enlaces.
2. Comprobar visualmente en Chromium Android o equivalente los anchos 360,
   390, 768 y 1280 px, el orden móvil **datos → vista previa → impresión**,
   el teclado, los calendarios, el texto largo y los estados de error.
3. Conectar voluntariamente CT230B en Chrome Android HTTPS y verificar
   que conectar no imprime nada; con campos inválidos o sin aceptar papel
   no debe poder imprimirse.
4. Cuando se acuerde probar el nuevo motor, imprimir primero **una** etiqueta
   en papel estándar 30 × 20, comparar con la V0.8 aprobada (texto, isotipo,
   posiciones y márgenes), guardar fotografía y registro; no repetir ante
   anomalías. La aprobación física histórica no sustituye esta regresión.
5. Nunca fusionar ni integrar en \`mirurecetas-web-source\`, ni privatizar
   el laboratorio, sin autorización específica.

El laboratorio actual es **público**. Las ramas y PR también pueden ser
visibles. No introducir credenciales, lotes reales o información privada.
