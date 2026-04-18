# Proyecto ViajesJMJ – Documentación TFG

## 1. Título del proyecto

**ViajesJMJ: Evolución de una aplicación de viajes desde una arquitectura MVC con Thymeleaf hacia un backend desacoplado con Spring Boot, JWT y API REST integrado con Angular**

---

## 2. Resumen del proyecto

El presente Trabajo de Fin de Grado consiste en el desarrollo del backend de una aplicación de viajes orientada a la recomendación de destinos y a la gestión de reservas. El proyecto no se ha construido de forma lineal, sino que ha pasado por una evolución técnica real.

En una fase inicial, la aplicación seguía una arquitectura clásica basada en **Spring Boot + Thymeleaf**, donde el backend también renderizaba las vistas HTML. Posteriormente, y como resultado del aprendizaje obtenido durante el desarrollo, se llevó a cabo una refactorización progresiva para adoptar una arquitectura **desacoplada**, delegando la capa de presentación a un frontend independiente en **Angular** y dejando el backend exclusivamente como una **API REST**.

Actualmente, el sistema permite la autenticación mediante **JWT**, la recomendación de viajes en formato JSON y la creación y gestión de reservas asociadas al usuario autenticado. Esta evolución aporta una arquitectura más moderna, mantenible, segura y alineada con prácticas reales de desarrollo profesional.

---

## 3. Justificación del proyecto

El sector turístico y las plataformas de reserva requieren aplicaciones que combinen una experiencia de usuario ágil con un backend seguro y escalable. Este proyecto nace con la intención de simular una plataforma real de recomendación y reserva de viajes, en la que el usuario pueda consultar destinos, seleccionar alojamientos y realizar reservas.

Durante el desarrollo, el proyecto sirvió también como espacio de aprendizaje y consolidación de conocimientos de Desarrollo de Aplicaciones Web, especialmente en:

* Arquitectura de aplicaciones web.
* Persistencia de datos con JPA/Hibernate.
* Diseño de APIs REST.
* Seguridad con JWT.
* Integración entre backend y frontend desacoplado.

La transformación del proyecto desde una aplicación MVC clásica a una API REST desacoplada no solo mejora el producto final, sino que también aporta un valor académico importante, ya que permite justificar decisiones técnicas, detectar limitaciones del enfoque inicial y mostrar una refactorización real basada en necesidades del proyecto.

---

## 4. Objetivos del proyecto

### 4.1 Objetivo general

Desarrollar el backend de una aplicación de viajes con arquitectura desacoplada, capaz de integrarse con un frontend Angular mediante una API REST segura y escalable.

### 4.2 Objetivos específicos

* Diseñar una aplicación orientada a recomendación y reserva de viajes.
* Implementar persistencia con Spring Data JPA y Hibernate.
* Desarrollar un recomendador de viajes basado en criterios introducidos por el usuario.
* Implementar autenticación con Spring Security y JWT.
* Exponer endpoints REST para recomendación, autenticación y reservas.
* Asociar las reservas al usuario autenticado sin exponer el identificador del usuario en la petición.
* Utilizar DTOs para desacoplar las entidades internas de la información intercambiada con el frontend.
* Preparar el backend para futuras ampliaciones, como el tratamiento seguro de datos bancarios e IBAN.

---

## 5. Tecnologías utilizadas

### 5.1 Backend

* Java 21
* Spring Boot 3.2.6
* Spring Web
* Spring Data JPA
* Spring Security
* JWT (jjwt)
* Hibernate
* H2 Database
* Maven

### 5.2 Frontend

* Angular

### 5.3 Herramientas de desarrollo y pruebas

* IntelliJ IDEA
* Postman
* Git y GitHub

### 5.4 Tecnologías de la fase inicial

En la versión inicial del proyecto también se emplearon:

* Thymeleaf
* HTML
* CSS
* JavaScript
* API Unsplash

---

## 6. Fase inicial del proyecto

En una primera etapa, el proyecto fue concebido como una aplicación web completa desarrollada íntegramente con Spring Boot, en la que el backend no solo gestionaba la lógica y la persistencia, sino también la capa de presentación.

### 6.1 Arquitectura inicial

La arquitectura seguía el patrón **MVC**:

* **Controller** → recibía las peticiones HTTP.
* **Service** → contenía la lógica de negocio.
* **Repository** → gestionaba el acceso a base de datos.
* **View** → renderizada con Thymeleaf.

### 6.2 Flujo funcional inicial

El flujo inicial de la aplicación era el siguiente:

1. El usuario accedía a una página web renderizada por Spring Boot.
2. Introducía datos en un formulario de recomendación.
3. El backend procesaba esos datos mediante `ViajeController` y `FormularioViaje`.
4. Se generaba un destino recomendado.
5. Se mostraban hoteles y habitaciones en una vista Thymeleaf.
6. El usuario seleccionaba transporte y habitación.
7. El sistema calculaba el precio dinámicamente.
8. La reserva se guardaba en base de datos.
9. Se mostraba una confirmación visual al usuario.

### 6.3 Elementos principales de la fase inicial

Durante esta etapa existían, entre otros, los siguientes componentes:

* `ViajeController`
* `FormularioViaje`
* Vistas Thymeleaf
* Recursos estáticos HTML/CSS/JavaScript
* Lógica dinámica de interfaz en cliente
* Recomendación integrada con renderizado de servidor

### 6.4 Valor de esta fase

Aunque posteriormente se decidió evolucionar la arquitectura, esta primera fase fue importante porque permitió:

* construir el modelo de negocio del sistema,
* probar el flujo completo de recomendación y reserva,
* validar el modelo de datos,
* y detectar las limitaciones del enfoque acoplado.

---

## 7. Limitaciones detectadas en el enfoque inicial

A medida que el proyecto fue creciendo, se detectaron varios problemas en la versión MVC clásica:

### 7.1 Acoplamiento entre frontend y backend

La lógica de presentación dependía directamente de Spring Boot y Thymeleaf, lo que dificultaba la reutilización del backend por otros clientes.

### 7.2 Dificultad para integrar Angular

Al desarrollarse un frontend independiente en Angular, el enfoque inicial dejaba de ser el más adecuado, ya que el backend necesitaba exponer datos y no vistas HTML.

### 7.3 Mezcla de responsabilidades

Controladores como `ViajeController` concentraban demasiadas funciones:

* recomendación,
* renderizado de vistas,
* obtención de habitaciones,
* agrupación por hotel,
* reserva,
* y lógica visual.

### 7.4 Seguridad limitada en el flujo antiguo

El sistema inicial no estaba planteado todavía sobre un flujo completo de autenticación moderna con JWT y separación clara entre parte pública y privada.

Estas limitaciones justificaron la refactorización posterior del proyecto.

---

## 8. Refactorización hacia arquitectura desacoplada

Una de las decisiones más importantes del proyecto fue su evolución hacia una arquitectura desacoplada.

### 8.1 Cambio de enfoque

Se pasó de un sistema basado en vistas renderizadas por servidor a un backend especializado en exponer servicios REST en formato JSON.

### 8.2 Cambios realizados

* Eliminación progresiva de controladores MVC antiguos.
* Eliminación de vistas Thymeleaf y recursos estáticos innecesarios.
* Sustitución del flujo basado en `Model` por controladores REST.
* Creación de DTOs específicos para entrada y salida de datos.
* Introducción de seguridad con Spring Security + JWT.
* Separación entre parte pública y parte privada de la API.
* Asociación de reservas al usuario autenticado a través del token.

### 8.3 Resultado de la refactorización

El proyecto quedó reorientado como backend desacoplado, preparado para integrarse con Angular y más alineado con arquitecturas actuales.

---

## 9. Arquitectura actual del sistema

La aplicación sigue una arquitectura cliente-servidor desacoplada.

### 9.1 Frontend

El frontend, desarrollado en Angular, se encarga de:

* mostrar la interfaz,
* gestionar formularios,
* manejar la navegación,
* enviar peticiones HTTP al backend,
* y almacenar y reenviar el token JWT cuando el usuario está autenticado.

### 9.2 Backend

El backend, desarrollado con Spring Boot, se encarga de:

* gestionar la lógica de negocio,
* acceder a la base de datos,
* exponer endpoints REST,
* autenticar usuarios,
* proteger operaciones privadas,
* recomendar viajes,
* y gestionar reservas.

### 9.3 Base de datos

Durante la fase de desarrollo se utiliza **H2 en memoria**, con inicialización mediante `data.sql`, lo que permite un entorno reproducible y sencillo de ejecutar.

---

## 10. Estructura actual del backend

El proyecto se organiza por paquetes funcionales bajo el paquete base `com.viajes.app`.

### 10.1 Paquetes principales

* `auth` → autenticación, JWT, login.
* `config` → seguridad y CORS.
* `destinos` → destinos y continentes.
* `alojamientos` → hoteles y habitaciones.
* `reservas` → creación y gestión de reservas.
* `users` → usuarios.
* `viajes` → recomendación de viajes.
* `api` → servicios externos como imágenes dinámicas.
* `exceptions` → manejo de errores.

### 10.2 Limpieza de paquetes antiguos

Durante la refactorización se eliminaron paquetes o clases que habían quedado sin uso real en la arquitectura final, como determinados controladores MVC, utilidades auxiliares, recursos estáticos antiguos y módulos residuales de fases anteriores.

---

## 11. Modelo de datos

### 11.1 Usuario

Representa al usuario del sistema. Contiene información de autenticación y rol.

### 11.2 Continente

Permite clasificar los destinos por grandes regiones.

### 11.3 Destino

Representa un lugar turístico, con nombre, descripción, país, precio e imagen.

### 11.4 Alojamiento

Representa un hotel o establecimiento asociado a un destino.

### 11.5 Habitación

Representa una unidad reservable dentro de un alojamiento, con capacidad, tipo, régimen e imagen.

### 11.6 Reserva

Representa una reserva realizada por un usuario autenticado. Incluye:

* habitación,
* usuario,
* transporte,
* fecha de inicio,
* fecha de fin,
* precio total,
* estado,
* fecha de reserva.

---

## 12. Seguridad y autenticación

La seguridad es uno de los bloques principales del proyecto.

### 12.1 Login con JWT

El usuario se autentica mediante el endpoint:

* `POST /api/auth/login`

El backend devuelve:

* token JWT,
* tipo de token,
* email,
* rol del usuario.

### 12.2 Política de seguridad

Se adoptó una política mixta:

#### Parte pública

* autenticación,
* recomendación,
* consulta de información general necesaria para el frontend.

#### Parte privada

* creación de reservas,
* consulta de reservas propias,
* acceso a una reserva concreta,
* cancelación de reservas,
* futuras operaciones sensibles relacionadas con datos bancarios.

### 12.3 Decisión de seguridad importante

El frontend **no envía `usuarioId`** en el cuerpo de las reservas. El backend obtiene la identidad del usuario autenticado a partir del JWT, lo que evita manipulaciones y mejora la seguridad.

---

## 13. DTOs y separación de responsabilidades

El proyecto utiliza DTOs para evitar exponer directamente las entidades internas.

### 13.1 DTOs implementados

* `LoginRequest`
* `LoginResponse`
* `RecomendacionRequest`
* `RecomendacionResponse`
* `ReservaRequestDto`
* `ReservaResponseDto`

### 13.2 Ventajas del uso de DTOs

* mayor control sobre los datos expuestos,
* API más limpia para Angular,
* separación entre modelo interno y contrato externo,
* mayor mantenibilidad.

---

## 14. API REST implementada

### 14.1 Autenticación

* `POST /api/auth/login`

### 14.2 Recomendación de viajes

* `POST /api/recomendar`

Recibe criterios del viaje y devuelve:

* destino recomendado,
* descripción,
* precio,
* imagen,
* hoteles,
* habitaciones agrupadas por hotel.

### 14.3 Reservas

* `POST /api/reservas` → crea una reserva para el usuario autenticado.
* `GET /api/reservas/mias` → devuelve las reservas del usuario autenticado.
* `GET /api/reservas/{id}` → devuelve una reserva concreta si pertenece al usuario autenticado.
* `PUT /api/reservas/{id}/cancelar` → cambia el estado de la reserva a cancelada.

---

## 15. Flujo actual de recomendación

El flujo actual del recomendador es el siguiente:

1. Angular envía una petición `POST /api/recomendar` con criterios como continente, clima, tipo de viaje, presupuesto y sugerencia.
2. El backend analiza los criterios.
3. Se decide un destino recomendado coherente con los datos reales del sistema.
4. Se buscan habitaciones asociadas al destino.
5. Las habitaciones se agrupan por hotel.
6. Se construye una respuesta JSON para que Angular la represente en pantalla.

Este diseño sustituye por completo al flujo antiguo basado en vistas HTML y permite mayor flexibilidad para el frontend.

---

## 16. Flujo actual de reservas

El flujo actual de reservas es el siguiente:

1. El usuario inicia sesión desde Angular.
2. El backend valida credenciales y devuelve un JWT.
3. Angular guarda el token.
4. El usuario elige habitación y transporte.
5. Angular envía una petición `POST /api/reservas` con los datos de reserva.
6. El backend obtiene el usuario autenticado desde el token.
7. Se calcula el precio total en función de la habitación y las fechas.
8. La reserva se guarda asociada al usuario autenticado.

Esta implementación evita exponer el identificador del usuario y representa una mejora clara frente a un diseño inseguro basado en parámetros enviados por cliente.

---

## 17. Problemas encontrados y soluciones

### 17.1 Mezcla entre vistas y API

**Problema:** el proyecto mezclaba flujo MVC y flujo REST.

**Solución:** se eliminó la capa antigua de vistas como núcleo del sistema y se migró el recomendador y las reservas a controladores REST.

### 17.2 Datos inconsistentes en `data.sql`

**Problema:** algunos inserts no coincidían con el esquema generado por JPA y faltaban campos obligatorios.

**Solución:** se corrigió el contenido de `data.sql`, especialmente en alojamientos, enums y campos requeridos.

### 17.3 Login inicial devolviendo solo un string

**Problema:** el login devolvía únicamente el token como texto.

**Solución:** se implementó `LoginResponse` para devolver una respuesta estructurada con token, tipo, email y rol.

### 17.4 Recomendador antiguo acoplado a Thymeleaf

**Problema:** la lógica de recomendación estaba integrada en un controlador MVC que devolvía vistas.

**Solución:** se creó `RecomendacionRestController` con DTOs específicos y respuesta en JSON.

### 17.5 Seguridad en reservas

**Problema:** riesgo de diseñar reservas enviando `usuarioId` desde el frontend.

**Solución:** el backend obtiene la identidad del usuario desde JWT y la utiliza internamente.

### 17.6 Errores funcionales y de pruebas

Durante el desarrollo también se resolvieron errores de:

* rutas mal definidas,
* configuración de Postman,
* problemas de inicialización de base de datos,
* inconsistencias entre nombres de destinos y datos reales de la BD,
* y ajustes necesarios en endpoints y DTOs.

---

## 18. Módulo de cuenta bancaria

Con el fin de preparar el backend para el tratamiento de datos sensibles, se ha implementado un módulo específico de **cuenta bancaria** asociado al usuario autenticado.

### 18.1 Diseño adoptado

Se ha creado una entidad `CuentaBancaria` relacionada con `Usuario` mediante una relación **OneToOne**, de manera que cada usuario disponga de una cuenta bancaria principal.

### 18.2 Información gestionada

La cuenta bancaria almacena:

* IBAN
* titular
* entidad
* código SWIFT/BIC
* estado de activación
* fecha de registro
* usuario asociado

### 18.3 Seguridad aplicada

Esta parte se ha considerado especialmente sensible, por lo que:

* todas sus operaciones requieren autenticación con JWT,
* el backend obtiene la identidad del usuario desde el token,
* el frontend no envía `usuarioId`,
* el IBAN no se devuelve completo, sino enmascarado en la respuesta.

### 18.4 Endpoints implementados

* `POST /api/cuenta-bancaria` → registra una cuenta bancaria para el usuario autenticado.
* `GET /api/cuenta-bancaria/mia` → obtiene la cuenta bancaria del usuario autenticado.
* `PUT /api/cuenta-bancaria` → actualiza los datos bancarios del usuario autenticado.
* `DELETE /api/cuenta-bancaria` → elimina la cuenta bancaria del usuario autenticado.

### 18.5 Valor añadido para el proyecto

Este módulo refuerza el carácter realista del backend y deja preparada una base para futuras integraciones relacionadas con pagos, validación de métodos de cobro o requisitos previos para confirmar determinadas operaciones.

---

## 19. Pruebas realizadas

Se ha utilizado **Postman** para validar el comportamiento de la API.

### 18.1 Endpoints probados correctamente

* `POST /api/auth/login`
* `POST /api/recomendar`
* `POST /api/reservas`
* `GET /api/reservas/mias`
* `GET /api/reservas/{id}`
* `PUT /api/reservas/{id}/cancelar`

### 18.2 Validaciones obtenidas

Estas pruebas han permitido comprobar:

* el correcto login con JWT,
* la protección de endpoints privados,
* la recomendación dinámica de viajes,
* la creación de reservas,
* la consulta de reservas asociadas al usuario,
* y la cancelación segura de reservas.

---

### 19.1 Endpoints probados correctamente

Se ha utilizado **Postman** para validar el comportamiento de la API.

#### Autenticación

* `POST /api/auth/login`

#### Recomendación

* `POST /api/recomendar`

#### Reservas

* `POST /api/reservas`
* `GET /api/reservas/mias`
* `GET /api/reservas/{id}`
* `PUT /api/reservas/{id}/cancelar`

#### Cuenta bancaria

* `POST /api/cuenta-bancaria`
* `GET /api/cuenta-bancaria/mia`
* `PUT /api/cuenta-bancaria`
* `DELETE /api/cuenta-bancaria`

### 19.2 Validaciones obtenidas

Estas pruebas han permitido comprobar:

* el correcto login con JWT,
* la protección de endpoints privados,
* la recomendación dinámica de viajes,
* la creación de reservas,
* la consulta y cancelación de reservas,
* el alta, consulta, actualización y eliminación de cuenta bancaria,
* y el enmascarado del IBAN en las respuestas.

---

## 20. Estado actual del proyecto

En el momento actual, el backend se encuentra operativo para:

* autenticación con JWT,
* recomendación de viajes por API REST,
* creación de reservas protegidas,
* consulta de reservas del usuario autenticado,
* consulta de una reserva concreta,
* cancelación de reservas.

La estructura actual está preparada para continuar su evolución junto con el frontend Angular.

---

Actualmente el backend se encuentra operativo para:

* autenticación con JWT,
* recomendación de viajes por API REST,
* creación de reservas protegidas,
* consulta de reservas del usuario autenticado,
* consulta de una reserva concreta,
* cancelación de reservas,
* gestión de cuenta bancaria del usuario autenticado,
* y protección de datos sensibles mediante rutas privadas.

La estructura actual está preparada para continuar su evolución junto con el frontend Angular.

---

## 21. Mejoras futuras

El proyecto está preparado para seguir creciendo con funcionalidades como:

* registro de usuarios,
* integración final completa con Angular,
* tratamiento seguro de datos bancarios e IBAN,
* validación de disponibilidad de habitaciones,
* cálculo más realista del coste total incluyendo transporte,
* roles más avanzados,
* despliegue en entorno productivo,
* migración a una base de datos más orientada a producción.

---

El proyecto está preparado para seguir creciendo con funcionalidades como:

* registro de usuarios,
* perfil del usuario autenticado,
* integración final completa con Angular,
* validación más fuerte del formato IBAN,
* relación entre cuenta bancaria y determinados flujos de reserva,
* validación de disponibilidad de habitaciones,
* cálculo más realista del coste total incluyendo transporte,
* roles más avanzados,
* despliegue en entorno productivo,
* migración a una base de datos más orientada a producción.

---

## 22. Conclusión

ViajesJMJ ha evolucionado desde una aplicación MVC clásica con Thymeleaf hacia un backend desacoplado basado en API REST. Esta evolución no solo mejora la calidad técnica del sistema, sino que también refleja un proceso real de aprendizaje, refactorización y maduración del proyecto.

El resultado actual es un backend moderno y seguro que ya permite autenticar usuarios con JWT, recomendar viajes y gestionar reservas asociadas al usuario autenticado, constituyendo una base sólida para la integración completa con Angular y futuras ampliaciones.

---

ViajesJMJ ha evolucionado desde una aplicación MVC clásica con Thymeleaf hacia un backend desacoplado basado en API REST. Esta evolución no solo mejora la calidad técnica del sistema, sino que también refleja un proceso real de aprendizaje, refactorización y maduración del proyecto.

El resultado actual es un backend moderno y seguro que ya permite autenticar usuarios con JWT, recomendar viajes, gestionar reservas asociadas al usuario autenticado y administrar una cuenta bancaria protegida, constituyendo una base sólida para la integración completa con Angular y futuras ampliaciones.

---

## 23. Guion base para la presentación oral

### Introducción

“Mi TFG consiste en el desarrollo del backend de una aplicación de viajes llamada ViajesJMJ. El objetivo ha sido construir una API REST segura y desacoplada, preparada para integrarse con un frontend Angular.”

### Evolución del proyecto

“El proyecto comenzó con una arquitectura MVC en la que Spring Boot también generaba vistas HTML con Thymeleaf. Más adelante, el sistema se refactorizó para dejar el backend exclusivamente como API REST.”

### Arquitectura actual

“El backend está organizado por dominios y utiliza entidades, repositorios, servicios, DTOs y controladores REST. La seguridad se implementa con Spring Security y JWT.”

### Funcionalidades principales

“He implementado autenticación con JWT, recomendación de viajes basada en criterios, creación de reservas asociadas al usuario autenticado, consulta de reservas y cancelación.”

### Seguridad

“Una decisión importante fue no enviar nunca el identificador del usuario en la reserva. El backend obtiene la identidad desde el token, lo que mejora la seguridad.”

### Cierre

“En conclusión, el proyecto ha evolucionado hacia una arquitectura desacoplada, moderna y mantenible, alineada con prácticas reales de desarrollo web.”
