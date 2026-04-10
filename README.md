# 🌍 ProyectoViajesJMJ — DOCUMENTACIÓN COMPLETA (Nivel TFG)

---

# 📌 1. INTRODUCCIÓN

Proyecto web desarrollado con **Spring Boot** cuyo objetivo es simular una plataforma real de recomendación y reserva de viajes.

El sistema permite al usuario:

* Obtener un destino recomendado
* Elegir hotel y habitación
* Seleccionar transporte
* Calcular precio dinámicamente
* Confirmar y guardar la reserva

---

# 🎯 2. OBJETIVO DEL PROYECTO

Desarrollar una aplicación completa aplicando:

* Arquitectura MVC
* Persistencia con JPA/Hibernate
* Integración frontend + backend
* Lógica de negocio real

---

# 🧱 3. TECNOLOGÍAS

* Java 17+
* Spring Boot 3
* Spring Web
* Spring Data JPA
* Thymeleaf
* H2 Database
* HTML + CSS + JavaScript
* API Unsplash

---

# 🏗️ 4. ARQUITECTURA

## MVC

* Controller → gestiona peticiones
* Service → lógica
* Repository → acceso BD
* View → Thymeleaf

---

# 🗄️ 5. MODELO DE DATOS

## Habitacion

* id
* tipo
* capacidad
* precioPorNoche
* imagenUrl
* regimen
* alojamiento (FK)

## Alojamiento

* id
* nombre
* ciudad
* pais
* tipo

## Reserva

* id
* habitacion
* transporte

---

# 🔄 6. FLUJO COMPLETO

## 1. Entrada usuario

El usuario accede a la web.

## 2. Recomendación

El sistema genera destino dinámico.

## 3. Selección hotel

* Agrupación por hoteles
* Desplegables dinámicos

## 4. Selección habitación

* Radio buttons
* Datos dinámicos

## 5. Selección transporte

* Avión / Tren / Barco
* Presupuesto

## 6. Cálculo dinámico

```js
precio = noches * precioHabitacion + transporte
```

## 7. Envío formulario

Se envían:

* destino
* hotel
* habitacionId
* transporte
* noches

## 8. Backend

--- java
* reserva.setHabitacion(habitacion);
* reserva.setTransporte(...);


## 9. Confirmación

Se muestra resumen completo.

---

# 🧠 7. PROBLEMAS REALES Y SOLUCIONES

## ❌ Error JavaScript

* Variable duplicada
* Solución: limpiar código

## ❌ Desplegables no funcionaban

* JS roto
* Solución: corregir eventos

## ❌ No se enviaban datos

* Falta input hidden
* Solución: añadir hidden + JS

## ❌ Precio no calculado en backend

* Solución: enviar noches

---

# 🚀 8. FUNCIONALIDADES

* Recomendador de viajes
* Selección hotel/habitación
* Precio dinámico
* Guardado en BD
* Confirmación visual

---

# 📸 9. MEJORAS FUTURAS

* Login usuarios
* Historial reservas
* PDF
* Panel admin

---

# 📦 10. INSTALACIÓN

```bash
git clone ...
mvn spring-boot:run
```

---

## 🗄️ Configuración de Base de Datos (H2 + data.sql)

Para el entorno de desarrollo se utiliza **H2 en memoria**, lo que permite ejecutar el proyecto sin instalar un gestor externo.

### 🔹 Inicialización automática

El archivo:

```
src/main/resources/data.sql
```

contiene los datos iniciales del sistema (destinos, alojamientos, habitaciones, etc.).

Spring Boot ejecuta automáticamente este script al arrancar la aplicación.

### 🔹 Ventajas de esta decisión

* No requiere configuración externa (MySQL/Workbench)
* Entorno reproducible en cualquier equipo
* Arranque rápido del proyecto
* Facilita pruebas y demostraciones

### 🔹 Configuración típica

En `application.properties`:

```
spring.datasource.url=jdbc:h2:mem:viajesdb
spring.jpa.hibernate.ddl-auto=create
spring.h2.console.enabled=true
```

Esto permite acceder también a la consola H2 en:

```
http://localhost:8080/h2-console
```

---

```bash
git clone ...
mvn spring-boot:run
```

---

# 🧾 MEMORIA DEL PROYECTO (DIARIO DE DESARROLLO)

---

# 🧩 0. ESTRUCTURA DEL PROYECTO Y JUSTIFICACIÓN

La aplicación sigue una **arquitectura modular por dominios**, organizada bajo el paquete base:

```
com.viajes.app
```

## 📁 Estructura principal

```
src/main/java/com/viajes/app
 ├── alojamientos
 ├── api
 ├── auth
 ├── destinos
 ├── exceptions
 ├── home
 ├── reservas
 ├── transporte
 ├── users
 ├── viajes
 │    ├── FormularioViaje
 │    ├── ViajeController
 │    └── ViajesApplication
```

## 📁 Recursos

```
src/main/resources
 ├── static        → CSS, JS, imágenes
 ├── templates     → vistas Thymeleaf
 ├── application.properties
 └── data.sql      → datos iniciales
```

---

## 🧠 JUSTIFICACIÓN DE LA ARQUITECTURA

Se ha optado por una **organización por funcionalidades (feature-based)** en lugar de separar únicamente por capas.

### 🔹 Ventajas

* Facilita el mantenimiento
* Escalable
* Código más limpio
* Cada módulo contiene su propia lógica

---

## 🧱 DESCRIPCIÓN DE PAQUETES

### 📦 viajes

Contiene el núcleo de la aplicación:

* `ViajesApplication` → clase principal (Spring Boot)
* `ViajeController` → flujo principal de recomendación
* `FormularioViaje` → DTO para capturar datos del usuario

---

### 📦 alojamientos

Gestiona hoteles y alojamientos:

* Entidad Alojamiento
* Relación con habitaciones

---

### 📦 destinos

Contiene los destinos turísticos:

* Entidad Destino
* Relación con continentes

---

### 📦 reservas

Gestión de reservas:

* Entidad Reserva
* Persistencia en base de datos

---

### 📦 transporte

Enum y lógica de transporte:

* AVION
* TREN
* BARCO

---

### 📦 users / auth

Preparado para sistema de usuarios:

* Registro / login
* Seguridad (ampliación futura)

---

### 📦 api

Integraciones externas:

* Servicio Unsplash (imágenes dinámicas)

---

### 📦 exceptions

Gestión de errores personalizada

---

### 📦 home

Controlador de la página principal

---

## 🧩 RECURSOS

### 📁 templates

Contiene las vistas Thymeleaf:

* index
* recomendación
* confirmación

### 📁 static

Archivos estáticos:

* CSS
* JS
* imágenes

---

## 💡 DECISIONES TÉCNICAS CLAVE

* Uso de Thymeleaf para integración directa con backend
* Uso de JPA para persistencia automática
* Uso de H2 para entorno de desarrollo rápido
* Separación por dominios para escalabilidad

---

## 🗓️ Fase 1 — Creación del proyecto

* Inicialización Spring Boot
* Dependencias: Web, JPA, Thymeleaf

## 🗓️ Fase 2 — Modelo de datos

* Creación entidades
* Relaciones @ManyToOne

## 🗓️ Fase 3 — Backend

* Repositories
* Services
* Controllers

## 🗓️ Fase 4 — Frontend

* Formularios Thymeleaf
* Estilos básicos

## 🗓️ Fase 5 — Lógica JS

* Desplegables
* Precio dinámico

## 🗓️ Fase 6 — Integración completa

* Envío datos
* Guardado en BD

## 🗓️ Fase 7 — Debug

* Errores JS
* Errores backend
* Ajustes finales

---

---

# 🧩 1. MODELO DE DATOS Y ENTIDADES

En esta sección se describe el diseño del modelo de datos, así como las relaciones entre entidades. Se ha utilizado **JPA (Java Persistence API)** con Hibernate para mapear objetos Java a tablas relacionales.

---

## 🏨 Entidad Alojamiento

La entidad `Alojamiento` representa los hoteles o lugares donde el usuario puede hospedarse.

### 🔹 Características principales

* Identificador único autogenerado (`@Id`, `@GeneratedValue`)
* Validaciones mediante anotaciones (`@NotBlank`, `@Positive`)
* Relación con destino
* Relación con habitaciones

### 🔹 Decisiones de diseño

* Se utiliza `@ManyToOne` con `Destino` → varios alojamientos pertenecen a un destino
* Se utiliza `@OneToMany` con `Habitacion` → un alojamiento tiene múltiples habitaciones
* Uso de `cascade = ALL` para propagar operaciones (guardar/borrar habitaciones automáticamente)

---

## 🛏️ Entidad Habitacion

La entidad `Habitacion` representa cada unidad reservable dentro de un alojamiento.

### 🔹 Características

* Tipo de habitación (individual, doble, suite)
* Capacidad de personas
* Precio por noche
* Imagen asociada
* Régimen (enum)

### 🔹 Relaciones

* `@ManyToOne` con `Alojamiento`

👉 Esto significa:

* Muchas habitaciones pertenecen a un alojamiento
* Cada habitación tiene una FK (`alojamiento_id`)

### 🔹 Decisiones técnicas

* Uso de `@Enumerated(EnumType.STRING)` para guardar el régimen como texto
* Uso de `@JsonIgnore` para evitar bucles infinitos en serialización

---

## ✈️ Entidad Reserva

La entidad `Reserva` representa la acción final del usuario.

### 🔹 Características

* Relación con habitación
* Relación con usuario
* Tipo de transporte

### 🔹 Relaciones

* `@ManyToOne` con `Habitacion`
* `@ManyToOne` con `Usuario`

👉 Esto permite:

* Un usuario puede tener múltiples reservas
* Una habitación puede estar en múltiples reservas (histórico)

### 🔹 Decisiones técnicas

* Uso de Enum `TransporteTipo` para controlar valores válidos
* Separación de usuario para futura implementación de autenticación

---

## 🔗 RELACIONES ENTRE ENTIDADES

El modelo sigue una estructura jerárquica:

```
Destino
   ↓
Alojamiento
   ↓
Habitacion
   ↓
Reserva
```

---

## 💡 JUSTIFICACIÓN DEL MODELO

Se ha diseñado un modelo escalable y realista basado en sistemas de reservas reales:

* Separación clara de responsabilidades
* Relaciones normalizadas
* Preparado para ampliaciones (usuarios, pagos, etc.)

---

---

# 🧩 2. CAPA BACKEND (CONTROLLER + SERVICE + REPOSITORY)

En esta sección se describe cómo se gestiona el flujo de datos en el backend siguiendo el patrón **MVC (Model-View-Controller)**.

---

## 🧠 Arquitectura aplicada

El backend se organiza en tres capas principales:

* **Controller** → recibe peticiones HTTP
* **Service** → contiene la lógica de negocio
* **Repository** → acceso a base de datos mediante JPA

---

## 🔧 Servicio: ReservaService

El servicio `ReservaService` actúa como intermediario entre el controlador y la base de datos.

### 🔹 Funciones principales

* Guardar reservas (`save`)
* Obtener todas las reservas (`findAll`)

### 🔹 Justificación

* Se separa la lógica de negocio del controlador
* Facilita mantenimiento y escalabilidad
* Permite añadir lógica futura (validaciones, reglas, etc.)

---

## 🌐 Controlador: ViajeController

El controlador `ViajeController` gestiona todo el flujo principal del sistema.

---

### 🔹 Endpoint: /recomendar (POST)

Responsable de:

* Procesar el formulario del usuario
* Aplicar lógica de recomendación
* Generar destino dinámico
* Obtener habitaciones desde la BD
* Agrupar habitaciones por hotel
* Enviar datos a la vista

### 🔹 Lógica destacada

* Uso de múltiples condicionales para generar recomendaciones
* Uso de `Map<String, List<Habitacion>>` para agrupar por hotel
* Integración con API Unsplash para imágenes dinámicas

---

### 🔹 Endpoint: /reservar (POST)

Responsable de:

* Recibir datos del formulario final
* Calcular precio total
* Obtener habitación seleccionada
* Crear objeto `Reserva`
* Persistir en base de datos

### 🔹 Flujo interno

1. Se reciben parámetros (`destino`, `hotel`, `habitacionId`, etc.)
2. Se obtiene la habitación desde el service
3. Se calcula el precio total
4. Se crea la reserva
5. Se guarda en BD
6. Se devuelve vista de confirmación

---

### 🔹 Endpoint: /api/habitaciones/{hotelNombre}

* Devuelve habitaciones en formato JSON
* Permite interacción dinámica frontend-backend

---

## 🔄 FLUJO COMPLETO MVC

```
Usuario → Controller → Service → Repository → BD
                                 ↓
                              Respuesta
                                 ↓
                             Thymeleaf
```

---

## 💡 DECISIONES TÉCNICAS

* Uso de `@Controller` para renderizar vistas
* Uso de `@ResponseBody` para endpoints API
* Uso de inyección de dependencias por constructor
* Separación clara de responsabilidades

---

---

# 🧩 3. CAPA FRONTEND (THYMELEAF + JAVASCRIPT)

El frontend se implementa utilizando **Thymeleaf** como motor de plantillas, permitiendo integrar datos del backend directamente en las vistas HTML.

---

## 🧱 Estructura de vistas

```
templates/
 ├── alojamientos/
 ├── destinos/
 ├── fragments/
 ├── reservas/
 ├── usuarios/
 ├── viajes/
 │    ├── resultado.html
 │    └── confirmacion.html
 └── index.html
```

---

## 🌐 Thymeleaf (integración backend-frontend)

Thymeleaf permite:

* Insertar datos dinámicos (`th:text`)
* Iterar listas (`th:each`)
* Asignar valores (`th:value`)
* Enviar formularios (`th:action`)

### 🔹 Ejemplo de uso

* Mostrar datos del modelo
* Iterar habitaciones por hotel

---

## 🏨 Vista clave: resultado.html

Responsable de:

* Mostrar destino recomendado
* Listar hoteles
* Desplegar habitaciones dinámicamente
* Permitir selección del usuario

### 🔹 Funcionalidades

* Agrupación por hotel
* Desplegables dinámicos
* Selección mediante radio buttons

---

## 🧠 JavaScript (lógica cliente)

Se implementa lógica dinámica en el cliente para mejorar la experiencia de usuario.

### 🔹 Funcionalidades principales

* Cálculo de precio en tiempo real
* Actualización de imagen de habitación
* Auto-selección inicial
* Control de fechas

### 🔹 Cálculo dinámico

```
precioTotal = (noches * precioHabitacion) + transporte
```

---


Sistema de reservas dinámico por destino

Se ha implementado un sistema de reservas que permite acceder directamente a los alojamientos disponibles desde cada continente sin necesidad de pasar por el recomendador.

🚀 Nueva funcionalidad
Acceso directo a reservas desde las páginas de continentes:
/reservar/{destino}
Ejemplos:
/reservar/El Cairo
/reservar/Marrakech
/reservar/Zanzibar
Integración completa entre frontend (Thymeleaf) y backend (Spring Boot)
🏨 Datos dinámicos desde base de datos

Se ha eliminado el uso de datos estáticos en el controlador.

Antes:

Hoteles definidos manualmente en el código

Ahora:

Los datos se obtienen directamente de la base de datos mediante JPA

Relación de entidades:

Habitacion → Alojamiento → Destino → Continente

Esto permite una estructura escalable y realista.

📊 Agrupación automática por hotel

Las habitaciones se agrupan dinámicamente en el backend:

Map<String, List<Habitacion>> habitacionesPorHotel

En el frontend se muestran como desplegables por hotel, mejorando la organización visual.

🖼️ Sistema de imágenes dinámicas

Se han integrado imágenes dinámicas mediante:

API de Unsplash para:
Destinos
Hoteles
Transporte
Imágenes específicas por tipo de habitación:
Suite
Individual
Doble

Esto aporta una experiencia visual más realista similar a plataformas como Booking.

🎯 Experiencia de usuario (UX)
Selección dinámica de habitaciones
Vista previa de imagen en tiempo real
Cálculo automático de precio:
Número de noches
Tipo de transporte
Auto-selección de primera habitación disponible
🧠 Arquitectura utilizada
Patrón MVC:
Controller
Service
Repository
Persistencia con Spring Data JPA:
Relaciones @ManyToOne y @OneToMany
Renderizado dinámico con Thymeleaf
📌 Resultado final

El sistema permite:

✔ Navegar por continentes
✔ Acceder directamente a reservas
✔ Mostrar hoteles reales desde base de datos
✔ Seleccionar habitaciones dinámicamente
✔ Calcular precios automáticamente
✔ Disfrutar de una experiencia visual moderna

## 🔄 Flujo frontend → backend

1. Usuario selecciona datos
2. Formulario HTML recoge valores
3. Se envía mediante POST
4. Controller procesa
5. Se devuelve nueva vista

---

## 💡 DECISIONES TÉCNICAS

* Uso de Thymeleaf frente a frontend separado (mayor simplicidad)
* JavaScript puro para control dinámico
* Uso de inputs hidden para enviar datos no visibles
* Diseño orientado a interacción fluida

---

# 🏁 CONCLUSIÓN

Proyecto completo que simula un sistema real de reservas.

