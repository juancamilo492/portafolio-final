---
titulo: "Industrial: menú digital y sistema de gestión para un bar"
slug: "industrial"
cliente: "Bar Industrial"
sitio_url: "https://industrial-lovat.vercel.app/"
año: "2026"
rol: "Diseño de interacción y del sistema, de la investigación a la operación diaria"
categoria: ["Producto digital", "UX/UI"]
herramientas: ["Next.js", "Supabase", "Desarrollo asistido por IA"]
destacado: true
orden: 2
resumen: "Sistema de menú por QR y panel de gestión para un bar real: los clientes consultan, los meseros ordenan, y las administradoras ven métricas del negocio en tiempo real."
imagen_portada: "../../../assets/proyectos/industrial-portada.png"
imagen_alt: "Logotipo del bar Industrial sobre fondo hueso: la palabra «INDUSTRIAL» en mayúsculas negras condensadas, con la D alargada que también encabeza la palabra «DRINK’S» de abajo, y franjas horizontales amarillas, naranjas y rojas que cruzan la imagen."
---

## El contexto

Industrial es un bar en Medellín cuyos dueños querían digitalizar la operación:
un menú que los clientes pudieran consultar desde la mesa, una forma ágil de
tomar pedidos y visibilidad sobre las ventas del negocio. El proyecto nació por
recomendación directa y se definió en reuniones con las administradoras del bar,
quienes plantearon sus necesidades reales de operación.

## La decisión de diseño clave

La petición más interesante del proyecto: **los clientes no deben poder ordenar
desde el QR**. En un bar, un cliente con tragos encima puede pedir por accidente
(o pedir de más), generando disputas al momento de pagar la cuenta.

La solución fue diseñar un solo sistema con dos caras:

- **El cliente** escanea el QR de su mesa y consulta el menú, los precios, las
  promociones del día y el estado de su cuenta. Nada más.
- **El mesero** usa ese mismo flujo para entrar al panel de administración,
  seleccionar la mesa y registrar la orden él mismo, confirmando en persona.

:::figura{ancho ampliar}
![Pantalla de bienvenida del menú por código QR en móvil con botón para ver menú y accesos directos a promociones](../../../assets/proyectos/industrial/inicio-qr.png)

Vista de bienvenida para el cliente al escanear el código QR de la mesa, enfocada exclusivamente en la consulta de información y promociones sin opción de envío accidental de pedidos.
:::

El pedido queda asociado a la mesa correcta, el cliente mantiene el control de
lo que consume, y el bar elimina los pedidos accidentales. Diseñar para el
contexto real de uso, un bar de noche y no una app ideal, definió todo el
producto.

## El sistema

:::galeria{ampliar}
![Listado del menú digital en móvil con tarjetas de fotos reales y precios de licores y cervezas](../../../assets/proyectos/industrial/menu-digital.png)

![Módulo de administración de promociones con tarjetas de ofertas activas y filtros por estado](../../../assets/proyectos/industrial/gestion-descuentos.png)

El menú digital del cliente permite explorar más de 170 productos con fotos reales, mientras que el panel del equipo permite crear y administrar las promociones y descuentos activos del día.
:::

**Para el cliente (vía QR):**
- Menú digital con más de 170 productos, categorías y buscador
- Promociones activas del día (2x1, descuentos, rifas semanales)
- Próximos eventos del bar (partidos, fechas especiales) en la página principal
- Consulta de la cuenta de la mesa con total acumulado
- Acceso directo para dejar reseña en Google

:::figura{ancho ampliar}
![Panel de administración del bar con la grilla de 26 mesas organizadas por estado en tiempo real](../../../assets/proyectos/industrial/panel-mesas.png)

Panel de control para el personal del bar con la gestión visual de 26 mesas codificadas por estado (libre u ocupada) y contadores de tiempo y pedidos activos.
:::

**Para el equipo del bar:**
- Gestión visual de 26 mesas con estado en tiempo real
- Toma de pedidos por mesa desde el panel de administración
- Pedidos sincronizados en tiempo real, con notificación sonora al llegar uno nuevo
- Gestión de productos (crear, editar, categorizar, fotos y variantes)
- Creación y administración de promociones y eventos
- Informes: ingresos, pedidos entregados, ticket promedio, ventas por día y hora
- Auditoría completa de pedidos (incluyendo anulados) y exportación a Excel

## El proceso

La primera versión seguía el patrón estándar de los menús QR: el cliente
armaba un carrito y enviaba su pedido desde la mesa. Al confrontar ese flujo
con la realidad del bar en las reuniones con las administradoras, el modelo
se invirtió por completo: el cliente consulta, el mesero ordena. La mejor
decisión del proyecto no estaba en el plan inicial: salió de iterar con
quienes viven la operación.

El proyecto avanzó en ciclos cortos: avances compartidos por WhatsApp y
reuniones presenciales en el bar, de las que salían listas concretas de
ajustes: ver el menú con precios desde el QR, modificar un pedido ya
enviado, enlazar los eventos con WhatsApp para reservar.

La iteración continuó después del lanzamiento: el sistema evoluciona con el
uso real. Las administradoras reportan necesidades por WhatsApp, como las
fotos de productos que se cortaban, el total de la cuenta en el QR, un
historial para verificar contra facturación o la exportación de datos a
Excel. Cada uno de esos ajustes entra en producción el mismo día o al
siguiente. Ese ciclo corto de retroalimentación es posible porque el sistema
fue diseñado para modificarse sin fricción.

## El resultado

:::figura{ancho ampliar}
![Panel de informes y estadísticas con tarjetas de métricas del negocio e indicadores visuales de ventas](../../../assets/proyectos/industrial/informes-estadisticas.png)

Panel de analítica para la administración que consolida pedidos entregados, ticket promedio y comportamiento de ventas por día y hora (con cifras confidenciales resguardadas).
:::

El sistema está en producción y en uso diario. Las administradoras validaron
que los informes coinciden con la facturación y el inventario del bar, lo que
les permitió pasar de revisar pedidos uno por uno a ver el resumen del día en
segundos.

El resto del resultado se ve en la operación de la noche: las 26 mesas y los
más de 170 productos se administran desde un solo panel, los pedidos
accidentales desaparecieron porque el flujo ya no los permite, y cada ajuste
que pide el bar entra en producción el mismo día o el siguiente. El sistema
dejó de ser un entregable y pasó a ser parte de cómo trabaja el negocio.

## Lo que aprendí

Este proyecto me confirmó que el diseño centrado en el usuario puede mejorar
drásticamente la operación de un negocio, sin importar su tamaño. Y me dejó
una convicción simple: un sistema que se entiende es un sistema que se
disfruta, tanto para el cliente que escanea el QR como para el mesero que
lo usa toda la noche.
