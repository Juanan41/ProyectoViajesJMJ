# 📄 Documentación del Diagrama Estructural: Proceso de Reserva

Este documento explica el flujo de trabajo representado en la imagen del diagrama de flujo (`DiagramEstructural.jpg`), el cual detalla los pasos que un usuario y el sistema siguen para completar una reserva de alojamiento y/o viaje en la aplicación.

## 🧭 Leyenda del Diagrama

| Forma | Descripción |
| :--- | :--- |
| **Rectángulo azul claro** | Pantalla / Vista (Interfaz de usuario) |
| **Rectángulo punteado (amarillo)** | Acción Usuario (Clic, selección, etc.) |
| **Rombo (naranja)** | Decisión (Punto de bifurcación Sí/No) |
| **Hexágono (morado)** | Proceso Sistema (Operación interna) |

## 🗺️ Flujo de Trabajo Detallado

### 1. Búsqueda y Selección de Alojamiento

* **PÁGINA PRINCIPAL:** El usuario inicia.
* **Acción:** Usa el buscador o hace Clic Destacado.
* **CATÁLOGO HOTELES:** Se muestran resultados (con filtros y valoración).
* **Acción:** Clic en Hotel.
* **DETALLE HOTEL:** Muestra información y el Botón Reservar.

### 2. Inicio de Reserva y Autenticación

* **Acción:** Clic "RESERVAR AHORA".
* **Decisión: ¿Usuario Registrado?**
    * **NO:** Pasa a Clic Login/Registro. Si el Login OK, continúa.
    * **SÍ:** Continúa directamente.
* **PANTALLA SELECCIONAR ALOJAMIENTO:** El usuario elige opciones de su estancia.

### 3. Personalización y Extras

* **Decisión: ¿AÑADIR TRANSPORTE?**
    * **SI, busca viaje:** Pasa a **PASO 2: SELECCIÓN** (Vuelo, tren) y **PASO 3: MAPA DE ASIENTOS**.
    * **NO, solo hotel:** Salta a la Pasarela de Pago.
* **PASO 4: VISTA PREVIA TICKET:** Resumen final de la reserva.

### 4. Pago y Confirmación

* **PASARELA DE PAGO:** Resumen de Costes.
* **Proceso Sistema:** Procesar Pago (Transacción).
* **CONFIRMACIÓN:** Muestra resumen final y se envía Email.