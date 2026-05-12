# Proyecto ViajesJMJ – Documentación TFG

## 1. Título del proyecto

**ViajesJMJ: evolución de una aplicación de viajes desde una arquitectura MVC con Thymeleaf hacia una solución desacoplada con backend Spring Boot, seguridad JWT, base de datos PostgreSQL en Render y frontend independiente en Angular publicado mediante FileZilla**

---

## 2. Resumen del proyecto

El presente Trabajo de Fin de Grado consiste en el desarrollo de una aplicación de viajes construida a partir de una evolución técnica real. El proyecto comenzó como una aplicación web tradicional basada en Spring Boot y Thymeleaf, donde el backend asumía tanto la lógica de negocio como el renderizado de vistas. A medida que el sistema creció y surgió la necesidad de integrarlo con un frontend moderno, se llevó a cabo una refactorización progresiva hacia una arquitectura desacoplada.

En su estado actual, el sistema se compone de un backend desarrollado con Spring Boot que expone una API REST segura, y un frontend independiente desarrollado en Angular que consume dicha API mediante peticiones HTTP. La aplicación permite autenticación con JWT, registro de usuarios, recomendación de viajes, consulta de destinos, creación y gestión de reservas, administración de cuenta bancaria propia y gestión de saldo simulado para operaciones internas.

El backend se encuentra preparado para trabajar con PostgreSQL y ha sido desplegado en Render, utilizando una base de datos PostgreSQL remota. El frontend Angular ha sido compilado en modo producción y publicado en un servidor web mediante FileZilla, quedando accesible públicamente desde el dominio del proyecto.

Durante la fase final se ha sincronizado el catálogo del frontend con los datos reales existentes en Spring Boot y PostgreSQL, evitando diferencias entre continentes, países, ciudades, destinos y alojamientos. Esta sincronización ha permitido cerrar correctamente la integración entre la web publicada, el backend remoto y la base de datos en producción.

---

## 3. Justificación del proyecto

El sector turístico y las plataformas de reserva requieren sistemas capaces de combinar una experiencia de usuario fluida con una arquitectura backend segura, mantenible y preparada para evolucionar. El objetivo de este proyecto es simular una plataforma real de recomendación y reserva de viajes donde el usuario pueda consultar destinos, autenticarse, registrar una cuenta, gestionar sus reservas y operar con saldo interno asociado a su perfil.

El proyecto ha servido como espacio de aprendizaje y consolidación de competencias propias del ciclo de Desarrollo de Aplicaciones Web, especialmente en:

* arquitectura de aplicaciones web modernas,
* desarrollo de APIs REST,
* persistencia de datos con JPA/Hibernate,
* seguridad con Spring Security y JWT,
* integración backend–frontend desacoplada,
* ejecución en contenedores Docker,
* uso de base de datos PostgreSQL,
* despliegue de backend en Render,
* publicación de frontend Angular mediante FileZilla,
* gestión de ramas y versionado con GitHub.

La transformación del proyecto desde una aplicación MVC clásica a una arquitectura desacoplada aporta también valor académico, ya que permite justificar decisiones técnicas reales, identificar limitaciones del enfoque inicial y mostrar una refactorización coherente en función de nuevas necesidades funcionales y tecnológicas.

---

## 4. Objetivos del proyecto

### 4.1 Objetivo general

Desarrollar una aplicación de viajes con arquitectura desacoplada, compuesta por un backend Spring Boot y un frontend Angular, capaz de ofrecer autenticación segura, recomendación de viajes, gestión de reservas, gestión de cuenta bancaria propia, operaciones de saldo simulado y despliegue real mediante backend remoto y frontend publicado.

### 4.2 Objetivos específicos

* Diseñar una aplicación orientada a recomendación y reserva de viajes.
* Implementar persistencia de datos con Spring Data JPA y Hibernate.
* Desarrollar una API REST para comunicación con el frontend Angular.
* Implementar autenticación segura mediante JWT.
* Permitir el registro de usuarios normales desde el frontend.
* Asociar reservas y cuenta bancaria al usuario autenticado sin exponer su identificador en las peticiones.
* Utilizar DTOs para desacoplar entidades y datos intercambiados.
* Incorporar control de acceso por roles ADMIN y USER.
* Implementar un módulo de saldo simulado para operaciones internas de recarga, gasto y cálculo.
* Integrar frontend y backend mediante peticiones HTTP reales.
* Preparar el sistema para futuras ampliaciones.
* Desplegar el backend en Render.
* Conectar el backend desplegado a PostgreSQL remoto.
* Publicar el frontend Angular mediante FileZilla.
* Sincronizar los datos visibles del frontend con los datos reales almacenados en PostgreSQL.

---

## 5. Tecnologías utilizadas

### 5.1 Backend

* Java 21
* Spring Boot 3.2.6
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* Hibernate
* Maven

### 5.2 Frontend

* Angular
* TypeScript
* HTML
* CSS
* Tailwind CSS
* DaisyUI
* Servicios HTTP con `HttpClient`
* Interceptor JWT para envío automático del token en rutas privadas

### 5.3 Base de datos y despliegue

* PostgreSQL local
* PostgreSQL remoto en Render
* Docker
* Docker Compose
* Render para despliegue del backend
* FileZilla para publicación del frontend Angular
* Servidor web externo para servir los archivos estáticos compilados de Angular

### 5.4 Herramientas de desarrollo y pruebas

* IntelliJ IDEA
* Visual Studio Code
* Postman
* Git y GitHub
* PowerShell
* Navegador con herramientas de desarrollo: Console, Network, Storage
* FileZilla
* Render Dashboard

### 5.5 Tecnologías de la fase inicial

En la fase inicial del proyecto también se utilizaron:

* Thymeleaf
* HTML
* CSS
* JavaScript
* API Unsplash

---

## 6. Fase inicial del proyecto

En una primera etapa, el proyecto fue concebido como una aplicación web completa desarrollada íntegramente con Spring Boot, donde el backend no solo gestionaba la lógica y la persistencia, sino también la presentación mediante vistas renderizadas por servidor.

### 6.1 Arquitectura inicial

La arquitectura seguía el patrón MVC:

* **Controller**: recibía las peticiones HTTP.
* **Service**: contenía la lógica de negocio.
* **Repository**: gestionaba el acceso a base de datos.
* **View**: se renderizaba con Thymeleaf.

### 6.2 Flujo funcional inicial

El flujo inicial de la aplicación era el siguiente:

1. El usuario accedía a una web renderizada por Spring Boot.
2. Introducía datos en un formulario de recomendación.
3. El backend procesaba esos datos.
4. Se generaba un destino recomendado.
5. Se mostraban hoteles y habitaciones en vistas Thymeleaf.
6. El usuario seleccionaba transporte y habitación.
7. El sistema calculaba el precio dinámicamente.
8. La reserva se guardaba en base de datos.
9. Se mostraba una confirmación visual al usuario.

### 6.3 Valor de esta fase

Aunque el proyecto fue refactorizado posteriormente, esta primera fase fue esencial para:

* construir el modelo de negocio,
* validar entidades y relaciones,
* probar el flujo completo de recomendación y reserva,
* detectar limitaciones del acoplamiento entre frontend y backend,
* sentar la base funcional sobre la que después se desarrolló la API REST.

---

## 7. Limitaciones detectadas en el enfoque inicial

A medida que el proyecto creció, se detectaron varias limitaciones en la versión MVC clásica.

### 7.1 Acoplamiento entre presentación y backend

La lógica visual dependía directamente de Spring Boot y Thymeleaf, lo que dificultaba la reutilización del backend por otros clientes.

### 7.2 Dificultad para integrar Angular

Con la aparición de un frontend independiente desarrollado en Angular, el backend necesitaba dejar de devolver vistas HTML y comenzar a devolver datos en formato JSON.

### 7.3 Mezcla de responsabilidades

Determinados controladores acumulaban demasiada lógica: recomendación, renderizado de vistas, agrupación de habitaciones, cálculo de precios, selección de transporte y gestión de reservas.

### 7.4 Seguridad limitada en el flujo antiguo

El sistema inicial no estaba planteado todavía sobre una arquitectura moderna basada en JWT, separación entre parte pública y privada y protección clara de recursos por rol y por usuario autenticado.

Estas limitaciones justificaron plenamente la refactorización posterior.

---

## 8. Refactorización hacia arquitectura desacoplada

Una de las decisiones más importantes del proyecto fue su evolución hacia una arquitectura cliente-servidor desacoplada.

### 8.1 Cambio de enfoque

Se pasó de una aplicación en la que Spring Boot renderizaba vistas a un backend especializado en exponer servicios REST en formato JSON y a un frontend Angular encargado de la interfaz y la navegación.

### 8.2 Cambios realizados

* Eliminación progresiva del flujo MVC como núcleo del proyecto.
* Sustitución de controladores orientados a vistas por controladores REST.
* Creación de DTOs de entrada y salida.
* Introducción de autenticación con JWT.
* Separación entre endpoints públicos y privados.
* Asociación de reservas, perfil y cuenta bancaria al usuario autenticado a través del token.
* Conexión del frontend Angular con el backend mediante `HttpClient`.
* Adopción de PostgreSQL y Docker para un entorno más realista.
* Preparación del backend para despliegue en Render.
* Publicación del frontend Angular compilado mediante FileZilla.

### 8.3 Resultado de la refactorización

El proyecto quedó convertido en una solución desacoplada y más profesional, con un backend reutilizable y un frontend independiente capaz de consumir sus datos de forma segura.

---

## 9. Arquitectura actual del sistema

La aplicación sigue una arquitectura cliente-servidor desacoplada.

### 9.1 Frontend Angular

El frontend Angular se encarga de:

* mostrar la interfaz,
* gestionar formularios,
* manejar la navegación,
* autenticarse contra el backend,
* almacenar el token JWT,
* consumir endpoints públicos y privados,
* representar datos como destinos, perfil, reservas, cuenta bancaria y saldo,
* mostrar catálogo de continentes, países, ciudades y hoteles,
* ofrecer una experiencia de usuario publicada en un dominio accesible desde navegador.

Además, el frontend utiliza interceptores HTTP para adjuntar automáticamente el token en las peticiones protegidas.

### 9.2 Backend Spring Boot

El backend se encarga de:

* exponer la API REST,
* implementar la lógica de negocio,
* acceder a PostgreSQL,
* autenticar usuarios,
* emitir JWT,
* proteger recursos privados,
* recomendar viajes,
* gestionar reservas,
* gestionar la cuenta bancaria asociada al usuario,
* gestionar el saldo simulado del usuario,
* servir datos reales al frontend publicado.

### 9.3 Base de datos

En la versión actual se utiliza PostgreSQL como base de datos principal. Durante fases anteriores del proyecto se realizaron pruebas con H2, pero el desarrollo final se orientó a PostgreSQL, lo que aporta persistencia más realista y mejor alineación con un entorno profesional.

Además, se ha configurado una base de datos PostgreSQL remota en Render. Esta base de datos contiene los datos principales del sistema: continentes, destinos, alojamientos, habitaciones y usuarios administradores iniciales. La carga inicial se realiza mediante un archivo `data.sql`, adaptado a PostgreSQL y ordenado según las relaciones entre tablas.

El orden de carga utilizado es:

1. usuarios administradores,
2. continentes,
3. destinos,
4. alojamientos,
5. habitaciones.

Esta estructura permite que las claves foráneas se respeten correctamente durante la inicialización.

### 9.4 Contenerización, despliegue y publicación

El backend y la base de datos se han preparado para ejecutarse mediante Docker y Docker Compose en entorno local, permitiendo levantar el sistema de manera reproducible.

En la fase final, además del entorno local, el backend ha sido desplegado en Render y conectado a una base de datos PostgreSQL remota. El frontend Angular se ha compilado en modo producción mediante `npm run build` y los archivos generados en `dist/jmj-frontend` se han publicado en el servidor web usando FileZilla.

La arquitectura final queda dividida en:

* frontend Angular publicado como aplicación estática,
* backend Spring Boot desplegado como API REST en Render,
* base de datos PostgreSQL remota en Render,
* comunicación entre frontend y backend mediante peticiones HTTP reales.

---

## 10. Estructura actual del backend

El proyecto se organiza por dominios bajo el paquete base `com.viajes.app`.

### 10.1 Paquetes principales

* `auth` → autenticación, login, registro, JWT.
* `config` → configuración de seguridad y CORS.
* `destinos` → destinos y continentes.
* `alojamientos` → hoteles y habitaciones.
* `reservas` → creación y gestión de reservas.
* `cuentas` → cuenta bancaria del usuario autenticado.
* `users` → usuarios, roles, perfil y saldo simulado.
* `viajes` → recomendación de viajes.
* `api` → posibles integraciones externas.
* `exceptions` → manejo de errores, si procede.

### 10.2 Limpieza de componentes antiguos

Durante la evolución del proyecto se eliminaron componentes que pertenecían a la fase MVC inicial y que ya no formaban parte del núcleo de la solución final.

---

## 11. Modelo de datos

### 11.1 Usuario

Representa a un usuario del sistema. Incluye información de autenticación, email, username, rol y saldo interno simulado.

### 11.2 Rol

Se ha definido un enum con dos roles:

* `ADMIN`
* `USER`

### 11.3 Continente

Permite clasificar destinos por grandes regiones geográficas.

### 11.4 Destino

Representa un destino turístico con nombre, descripción, país, precio e imagen. Los destinos se agrupan por continente.

### 11.5 Alojamiento

Representa un hotel o establecimiento asociado a un destino. Incluye nombre, ciudad, país, tipo y precio por noche.

### 11.6 Habitación

Representa una unidad reservable dentro de un alojamiento, con tipo, capacidad, precio por noche, régimen, alojamiento asociado e imagen.

### 11.7 Reserva

Representa una reserva realizada por un usuario autenticado. Incluye:

* habitación,
* usuario,
* transporte,
* fecha de inicio,
* fecha de fin,
* precio total,
* estado,
* fecha de reserva.

### 11.8 Cuenta bancaria

Representa la cuenta bancaria principal del usuario autenticado. Incluye:

* IBAN,
* titular,
* entidad,
* SWIFT/BIC,
* estado de activación,
* fecha de registro,
* usuario asociado.

La relación adoptada con el usuario es `OneToOne`.

### 11.9 Saldo simulado

El usuario dispone de un campo `saldo` que representa dinero interno o virtual dentro de la aplicación. Este saldo puede recargarse, gastarse y utilizarse en cálculos internos, sin representar una operación bancaria real.

---

## 12. Seguridad y gestión de usuarios

La seguridad es uno de los bloques principales del proyecto.

### 12.1 Login con JWT

El usuario se autentica mediante:

`POST /api/auth/login`

La respuesta contiene:

* token JWT,
* tipo de token,
* email,
* rol.

### 12.2 Registro de usuarios

Se ha añadido el endpoint:

`POST /api/auth/register`

Permite registrar nuevos usuarios normales desde el frontend Angular.

Se validan:

* nombre de usuario obligatorio,
* email obligatorio,
* contraseña obligatoria,
* email único,
* username único.

La contraseña se almacena cifrada con BCrypt y el rol asignado por defecto es `USER`.

### 12.3 Usuarios administradores iniciales

El archivo `data.sql` incluye usuarios administradores iniciales para pruebas y gestión del sistema. Estos usuarios se insertan con contraseña cifrada mediante BCrypt y rol `ADMIN`.

Se emplea control de conflicto sobre el email para evitar duplicidades al ejecutar el script más de una vez.

### 12.4 Roles del sistema

* **ADMIN**: puede acceder a endpoints restringidos de administración.
* **USER**: puede acceder a sus recursos privados, como perfil, reservas, cuenta bancaria y saldo.

### 12.5 Filtro JWT y authorities

El filtro JWT extrae el email y el rol del token y construye la autenticación de Spring Security con sus authorities correspondientes.

### 12.6 Política de seguridad

#### Parte pública

* login,
* registro,
* consulta de destinos,
* recomendación,
* operaciones necesarias para la navegación pública.

#### Parte privada

* perfil autenticado,
* reservas,
* cuenta bancaria,
* saldo simulado,
* operaciones privadas del usuario.

### 12.7 Perfil autenticado

Se ha incorporado el endpoint:

`GET /api/usuarios/me`

Este endpoint devuelve información del usuario autenticado sin necesidad de enviar su identificador desde el frontend.

### 12.8 Decisión de seguridad importante

El frontend no envía `usuarioId` en las operaciones privadas. El backend obtiene siempre la identidad del usuario a partir del JWT.

---

## 13. DTOs y separación de responsabilidades

El proyecto utiliza DTOs para no exponer directamente las entidades internas.

### 13.1 DTOs implementados

* `LoginRequest`
* `LoginResponse`
* `RegisterRequest`
* `RegisterResponse`
* `RecomendacionRequest`
* `RecomendacionResponse`
* `ReservaRequestDto`
* `ReservaResponseDto`
* `CuentaBancariaRequestDto`
* `CuentaBancariaResponseDto`
* `UsuarioPerfilResponseDto`
* `OperacionSaldoRequest`
* `CalculoRequest`

### 13.2 Ventajas del uso de DTOs

* mayor control sobre la información expuesta,
* desacoplamiento entre modelo interno y contrato REST,
* API más clara para Angular,
* mayor mantenibilidad,
* reducción de exposición innecesaria de entidades JPA.

---

## 14. API REST implementada

### 14.1 Autenticación

* `POST /api/auth/login`
* `POST /api/auth/register`

### 14.2 Perfil de usuario

* `GET /api/usuarios/me`

### 14.3 Recomendación de viajes

* `POST /api/recomendar`

Devuelve un destino recomendado con información asociada, hoteles y habitaciones agrupadas.

### 14.4 Destinos

* `GET /api/destinos`
* `GET /api/destinos/{id}` o rutas equivalentes si existen en la implementación

### 14.5 Reservas

* `POST /api/reservas`
* `GET /api/reservas/mias`
* `GET /api/reservas/{id}`
* `PUT /api/reservas/{id}/cancelar`

### 14.6 Cuenta bancaria

* `POST /api/cuentas`
* `GET /api/cuentas/me`
* `PUT /api/cuentas/me`
* `DELETE /api/cuentas/me`

### 14.7 Saldo simulado

* `GET /api/saldo`
* `POST /api/saldo/recargar`
* `POST /api/saldo/gastar`
* `POST /api/saldo/calcular`

### 14.8 Prueba de rol

* `GET /api/admin/test`

Este endpoint se ha usado para verificar la seguridad por rol.

---

## 15. Integración actual con Angular

La integración con Angular constituye uno de los hitos clave del estado final del proyecto.

### 15.1 Conexión frontend–backend

El frontend Angular consume el backend mediante peticiones HTTP reales. En desarrollo local, Angular puede conectarse al backend ejecutado en local. En la versión publicada, el frontend consume la API REST desplegada en Render.

La URL base de producción del frontend apunta al backend remoto, permitiendo que la web publicada consulte datos reales desde PostgreSQL a través de Spring Boot.

Durante las pruebas finales se ha verificado correctamente la comunicación con endpoints como:

* login,
* perfil,
* destinos,
* reservas,
* cuenta bancaria,
* saldo.

### 15.2 Gestión del token

Tras el login, Angular almacena el JWT y lo reenvía en las peticiones protegidas mediante un interceptor HTTP. Esto permite acceder a rutas privadas sin enviar manualmente el identificador del usuario.

### 15.3 Sincronización de datos entre Angular y Spring

Durante la fase final se detectó una diferencia entre los datos usados por Angular y los datos reales existentes en Spring Boot y PostgreSQL. El frontend mantenía listas internas de continentes, países, ciudades y hoteles que no coincidían completamente con los datos cargados en la base de datos.

Para resolverlo, se adaptó el catálogo Angular a los nombres reales definidos en el `data.sql` del backend. Se sincronizaron:

* continentes,
* países,
* ciudades,
* destinos,
* alojamientos,
* nombres visibles,
* identificadores internos usados por Angular para filtrar hoteles.

Esta corrección permitió que la web publicada mostrara correctamente la información y evitó que Angular recibiera datos del backend pero los filtrara incorrectamente por diferencias de nombres.

### 15.4 Flujo validado

Se ha comprobado correctamente el siguiente flujo:

1. despliegue del backend en Render,
2. conexión del backend con PostgreSQL remoto,
3. carga de datos iniciales mediante `data.sql`,
4. compilación del frontend Angular con `npm run build`,
5. publicación del frontend mediante FileZilla,
6. acceso público a la web publicada,
7. llamada real desde Angular al endpoint `/api/destinos`,
8. visualización correcta de destinos, países, ciudades y hoteles,
9. navegación funcional en el frontend publicado.

---

## 16. Flujo actual de recomendación

El flujo actual es el siguiente:

1. Angular envía una petición `POST /api/recomendar` con los criterios del viaje.
2. El backend analiza los datos recibidos.
3. Se determina un destino recomendado.
4. Se buscan habitaciones asociadas al destino.
5. Las habitaciones se agrupan por hotel.
6. Se devuelve una respuesta JSON para que Angular la represente.

---

## 17. Flujo actual de reservas

El flujo actual es el siguiente:

1. El usuario inicia sesión en Angular.
2. El backend devuelve un JWT.
3. Angular guarda el token.
4. El usuario elige habitación, fechas y transporte.
5. Angular envía una petición `POST /api/reservas`.
6. El backend obtiene el usuario desde el JWT.
7. Se validan fechas y transporte.
8. Se calcula el precio total.
9. La reserva se guarda asociada al usuario autenticado.

### 17.1 Medidas de seguridad aplicadas

Para evitar acceso a reservas ajenas se emplean consultas y lógica basadas en el email del usuario autenticado, como por ejemplo búsquedas por `usuario.email` y búsquedas por `id + usuario.email`.

### 17.2 Validaciones añadidas

* fechas obligatorias,
* fecha de fin posterior a fecha de inicio,
* transporte válido,
* cancelación solo si la reserva pertenece al usuario,
* ordenación de reservas por fecha de reserva descendente.

---

## 18. Módulo de cuenta bancaria

Con el objetivo de tratar datos sensibles de forma protegida, se ha implementado un módulo específico para la cuenta bancaria propia del usuario.

### 18.1 Diseño adoptado

Se ha creado la entidad `CuentaBancaria`, relacionada con `Usuario` mediante una relación `OneToOne`.

### 18.2 Seguridad aplicada

* todas las operaciones requieren autenticación,
* el backend obtiene el email desde el JWT,
* el frontend no envía el usuario,
* el IBAN se devuelve enmascarado.

### 18.3 Validaciones añadidas

* un usuario solo puede tener una cuenta,
* el IBAN es obligatorio,
* el titular es obligatorio,
* la entidad es obligatoria,
* el IBAN se normaliza,
* no se permite registrar un IBAN duplicado,
* no se permite actualizar una cuenta con el IBAN de otro usuario.

### 18.4 Enmascarado del IBAN

El backend no devuelve el IBAN completo, sino una versión parcial y protegida.

---

## 19. Módulo de saldo simulado

Se ha incorporado un módulo específico para operaciones internas de saldo.

### 19.1 Finalidad

Este módulo no representa una operativa bancaria real, sino un monedero interno o saldo simulado del usuario dentro de la aplicación.

### 19.2 Operaciones implementadas

* consulta de saldo actual,
* recarga de saldo,
* gasto de saldo,
* cálculo matemático auxiliar.

### 19.3 Operaciones de cálculo

El endpoint de cálculo permite realizar operaciones como:

* sumar,
* restar,
* multiplicar,
* dividir.

Esto aporta valor funcional al proyecto y puede utilizarse para cálculos de reservas, reparto de costes o pruebas de lógica interna.

### 19.4 Seguridad y diseño

El saldo se asocia al usuario autenticado y el backend identifica al usuario mediante el JWT, sin recibir identificadores desde el cliente.

---

## 20. Pruebas realizadas

Durante el desarrollo se han realizado pruebas desde Postman, PowerShell, navegador, Angular, Render y la web publicada.

### 20.1 Autenticación y usuarios

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/usuarios/me`

### 20.2 Destinos y recomendación

* `GET /api/destinos`
* `POST /api/recomendar`

### 20.3 Reservas

* `POST /api/reservas`
* `GET /api/reservas/mias`
* `GET /api/reservas/{id}`
* `PUT /api/reservas/{id}/cancelar`

### 20.4 Cuenta bancaria

* `POST /api/cuentas`
* `GET /api/cuentas/me`
* `PUT /api/cuentas/me`
* `DELETE /api/cuentas/me`

### 20.5 Saldo

* `GET /api/saldo`
* `POST /api/saldo/recargar`
* `POST /api/saldo/gastar`
* `POST /api/saldo/calcular`

### 20.6 Integración Angular

Se ha comprobado desde el frontend:

* login correcto,
* almacenamiento del token,
* llamada real a `/api/destinos`,
* consulta de perfil autenticado,
* consumo de rutas protegidas,
* comunicación correcta entre Angular y backend,
* conexión del frontend publicado con el backend desplegado en Render,
* carga correcta de destinos desde PostgreSQL remoto,
* sincronización entre los datos del frontend y los datos reales del backend,
* compilación correcta de Angular mediante `npm run build`,
* publicación correcta del contenido generado en `dist/jmj-frontend` mediante FileZilla.

### 20.7 Pruebas de despliegue

Se han realizado comprobaciones específicas de despliegue:

* verificación del backend en Render,
* revisión de logs de Render,
* comprobación de arranque correcto de Spring Boot,
* prueba directa del endpoint `/api/destinos`,
* comprobación de carga de datos en PostgreSQL remoto,
* verificación del frontend publicado,
* comprobación de caché del navegador mediante recarga forzada,
* comprobación del nuevo bundle generado por Angular.

---

## 21. Problemas encontrados y soluciones

### 21.1 Mezcla entre vistas y API

**Problema:** el proyecto combinaba flujo MVC y REST.

**Solución:** refactorización hacia backend desacoplado y frontend Angular.

### 21.2 Recomendador acoplado a Thymeleaf

**Problema:** la recomendación dependía de vistas HTML.

**Solución:** se creó un flujo REST que devuelve JSON.

### 21.3 Login inicial poco estructurado

**Problema:** el login devolvía solo un string o una respuesta limitada.

**Solución:** se implementó `LoginResponse` con token, tipo, email y rol.

### 21.4 Seguridad en reservas

**Problema:** existía el riesgo de diseñar operaciones enviando `usuarioId` desde el frontend.

**Solución:** el backend obtiene siempre la identidad desde el JWT.

### 21.5 Protección por rol

**Problema:** inicialmente la autenticación existía, pero el control por roles no estaba cerrado.

**Solución:** se incorporaron roles reales en JWT y authorities en Spring Security.

### 21.6 Gestión de cuenta bancaria

**Problema:** era necesario impedir duplicidades y accesos cruzados entre usuarios.

**Solución:** se incorporó relación `OneToOne`, búsqueda por usuario autenticado, normalización de IBAN y validación de duplicidad.

### 21.7 Integración frontend–backend

**Problema:** al pasar a Angular, fue necesario adaptar URLs, CORS y JWT.

**Solución:** se ajustó el backend para permitir origen local de Angular y se validó la comunicación real entre ambos.

### 21.8 Persistencia y entorno realista

**Problema:** una base temporal resultaba limitada.

**Solución:** se trabaja actualmente con PostgreSQL y Docker para un entorno más cercano a producción.

### 21.9 Carga inicial de datos en PostgreSQL Render

**Problema:** al desplegar el backend en Render, la API respondía correctamente pero el endpoint de destinos devolvía una lista vacía.

**Solución:** se revisó el despliegue en Render, el commit utilizado y la carga del archivo `data.sql`. Se corrigió el archivo de datos iniciales, se desplegó el commit correcto y se verificó que PostgreSQL remoto recibía los datos necesarios.

### 21.10 Diferencia entre datos del backend y datos del frontend

**Problema:** Angular tenía datos internos de países, ciudades y hoteles que no coincidían con los nombres reales existentes en Spring Boot y PostgreSQL. Esto provocaba que el backend devolviera datos, pero el frontend los filtrara o representara incorrectamente.

**Solución:** se sincronizó el catálogo Angular con el `data.sql` del backend, utilizando los mismos nombres de continentes, países, ciudades, destinos y alojamientos. Tras esta adaptación, la web publicada comenzó a mostrar correctamente la información.

### 21.11 Publicación del frontend compilado

**Problema:** después de corregir Angular, era necesario publicar la versión final generada por el build.

**Solución:** se ejecutó `npm run build`, se generó la carpeta `dist/jmj-frontend` y se subió su contenido al servidor mediante FileZilla, sustituyendo los archivos anteriores de la web publicada.

### 21.12 Caché y comprobación de versión publicada

**Problema:** al publicar una nueva versión del frontend, el navegador podía seguir cargando archivos JavaScript antiguos.

**Solución:** se comprobó el nombre del nuevo bundle generado por Angular, se subieron los archivos correctos al servidor y se recargó la página con limpieza de caché mediante `Ctrl + F5`.

---

## 22. Estado actual del proyecto

En el momento actual, el sistema se encuentra operativo para:

* autenticación con JWT,
* registro de usuarios normales,
* consulta del perfil autenticado,
* consulta de destinos desde PostgreSQL,
* recomendación de viajes,
* creación y gestión segura de reservas,
* gestión de cuenta bancaria propia,
* recarga y gasto de saldo simulado,
* cálculo auxiliar mediante operaciones matemáticas,
* control de acceso por rol,
* integración funcional con frontend Angular,
* ejecución local mediante Docker,
* despliegue del backend en Render,
* uso de PostgreSQL remoto en Render,
* carga inicial de datos mediante `data.sql`,
* publicación del frontend Angular mediante FileZilla,
* funcionamiento de la web publicada conectada al backend remoto.

El proyecto ya no se limita a una ejecución local, sino que cuenta con una versión publicada del frontend y un backend remoto desplegado, lo que permite demostrar un flujo más cercano a un entorno real.

---

## 23. Mejoras futuras

El proyecto queda preparado para continuar creciendo con funcionalidades como:

* panel de administración más completo,
* módulo de estadísticas de ventas,
* estadísticas por periodo mensual, trimestral, semestral y anual,
* gestión avanzada de usuarios,
* validación más fuerte del formato IBAN,
* flujos de pago simulados más complejos,
* relación directa entre saldo y reserva final,
* disponibilidad real de habitaciones,
* cálculo más completo del coste incluyendo transporte,
* mejora del sistema de imágenes,
* despliegue automatizado del frontend,
* documentación complementaria con diagramas, capturas y pruebas finales,
* pipeline de despliegue continuo para backend y frontend.

---

## 24. Conclusión

ViajesJMJ ha evolucionado desde una aplicación MVC clásica con Thymeleaf hacia una solución desacoplada compuesta por un backend Spring Boot y un frontend Angular. Esta evolución ha permitido construir un sistema más moderno, seguro y mantenible, alineado con prácticas reales de desarrollo profesional.

El resultado actual permite:

* autenticar usuarios con JWT,
* registrar usuarios normales,
* consultar destinos reales desde PostgreSQL,
* recomendar viajes,
* gestionar reservas propias,
* administrar una cuenta bancaria propia,
* operar con saldo simulado,
* conectar el frontend Angular con el backend de forma real,
* ejecutar el backend con PostgreSQL,
* desplegar el backend en Render,
* publicar el frontend Angular mediante FileZilla,
* y mostrar una versión web funcional accesible desde navegador.

La fase final del proyecto ha permitido resolver problemas propios de un despliegue real, como la conexión entre dominios, la carga de datos en PostgreSQL remoto, la adaptación de URLs de producción y la sincronización entre los datos del backend y del frontend.

Todo ello constituye una base sólida y coherente para la defensa del proyecto y para futuras ampliaciones.

---

## 25. Guion base para la presentación oral

### Introducción

“Mi TFG consiste en el desarrollo de una aplicación de viajes que ha evolucionado desde una arquitectura clásica con Thymeleaf hacia una solución desacoplada con backend Spring Boot y frontend Angular.”

### Evolución del proyecto

“El proyecto comenzó con una arquitectura MVC, pero posteriormente fue refactorizado para que el backend dejara de renderizar vistas y pasara a exponer una API REST consumida por Angular.”

### Arquitectura actual

“El sistema actual se basa en un backend seguro con JWT, una base de datos PostgreSQL, ejecución con Docker, despliegue en Render y un frontend Angular publicado que consume la API mediante peticiones HTTP.”

### Funcionalidades principales

“He implementado autenticación, registro, perfil, recomendación de viajes, gestión de destinos, reservas asociadas al usuario autenticado, cuenta bancaria propia y un módulo de saldo simulado.”

### Seguridad

“Una decisión importante fue que el frontend nunca envía el identificador del usuario en las operaciones privadas. El backend obtiene la identidad del token JWT, mejorando así la seguridad.”

### Despliegue final

“En la fase final he desplegado el backend en Render conectado a PostgreSQL remoto, he cargado los datos iniciales mediante un `data.sql` adaptado a PostgreSQL y he publicado el frontend Angular compilado mediante FileZilla. También he corregido una incidencia real de integración: los datos internos de Angular no coincidían con los datos de Spring, por lo que sincronizamos continentes, países, ciudades y hoteles para que la web publicada funcionara correctamente.”

### Cierre

“En conclusión, el proyecto ha evolucionado hacia una arquitectura desacoplada, moderna y mantenible, con una integración funcional entre Angular, Spring Boot, PostgreSQL, Render y un frontend publicado.”

---

## 26. Anexo técnico del frontend Angular

Con el fin de unificar la documentación del proyecto, se incorpora a continuación un anexo específico dedicado al frontend Angular. Este bloque complementa la documentación del backend y permite explicar con mayor detalle cómo se organiza la capa cliente, cómo navega por el catálogo de viajes y cómo interactúa con la API REST del sistema.

### 26.1 Visión general del frontend

El frontend del proyecto ViajesJMJ está desarrollado con Angular y actúa como cliente principal de la aplicación. Su finalidad es ofrecer una experiencia de usuario moderna para la consulta de destinos, navegación por continentes, países, ciudades y hoteles, autenticación, acceso al perfil, gestión de reservas, gestión de cuenta bancaria y operación con saldo.

Durante su evolución, el frontend pasó de apoyarse en parte en datos simulados y persistencia local a integrarse progresivamente con el backend real mediante peticiones HTTP. Esta transición ha permitido conservar una estructura visual rica y flexible, pero orientándola hacia una arquitectura desacoplada coherente con la API REST desarrollada en Spring Boot.

### 26.2 Funciones principales del frontend

El cliente Angular permite actualmente:

* navegar por continentes, países, ciudades y hoteles,
* autenticarse contra el backend,
* almacenar el token JWT en cliente,
* consumir endpoints protegidos mediante interceptor,
* mostrar destinos obtenidos desde la API,
* gestionar el perfil del usuario,
* visualizar reservas y recibos,
* gestionar cuenta bancaria propia,
* acceder al módulo de saldo simulado,
* mantener soporte de traducción entre español e inglés,
* funcionar como aplicación publicada en un servidor web.

### 26.3 Organización general del frontend

La aplicación puede dividirse en cuatro bloques principales:

* **Configuración raíz**: compilación, scripts, Tailwind, TypeScript y configuración del workspace Angular.
* **Núcleo Angular**: punto de entrada, rutas, configuración global y layout principal.
* **Dominio y servicios**: autenticación, traducción, catálogo de destinos, lógica de reservas y comunicación con backend.
* **Interfaz de usuario**: componentes reutilizables y páginas completas.

### 26.4 Archivos principales de la raíz del frontend

Entre los archivos principales del proyecto Angular se encuentran:

* `package.json`: define dependencias, scripts y herramientas del proyecto.
* `angular.json`: configura el workspace Angular, assets, estilos y build.
* `tsconfig.json`, `tsconfig.app.json` y `tsconfig.spec.json`: gestionan la compilación TypeScript y pruebas.
* `postcss.config.js` y `tailwind.config.js`: configuran Tailwind CSS y utilidades visuales.
* scripts auxiliares como `extract-dest.js`, `fix-names.js` y `translate-script.js`, utilizados para limpieza de contenido y apoyo a la internacionalización.

### 26.5 Arranque global de Angular

El arranque del frontend se basa en:

* `src/main.ts`: punto de entrada de la aplicación.
* `src/index.html`: documento HTML base.
* `src/styles.css`: estilos globales con directivas Tailwind.
* `src/app/app.config.ts`: configuración global, proveedores e integración HTTP.
* `src/app/app.routes.ts`: mapa central de rutas.

### 26.6 Núcleo de la aplicación Angular

El núcleo del frontend está formado por:

* `app.ts`: componente raíz.
* `app.html`: plantilla base con `router-outlet`.
* `app.routes.ts`: define rutas de inicio, login, registro, perfil, ajustes, tarjetas, continentes, países, ciudades, hoteles, reservas, recibos y otras vistas funcionales.
* `main-layout`: estructura base con barra de navegación superior, contenido central y pie de página.

### 26.7 Servicios principales del frontend

#### a) Servicio de autenticación

El frontend dispone de un servicio de autenticación encargado de:

* iniciar sesión,
* cerrar sesión,
* guardar el token,
* reconstruir el estado del usuario,
* interactuar con la lógica de perfil y sesión.

En la evolución del proyecto, este servicio pasó de apoyarse en simulaciones locales a conectarse con el backend real para login y obtención de perfil.

#### b) Servicio de traducción

Se implementó un servicio específico de traducción para permitir cambiar entre español e inglés. Este servicio:

* mantiene el idioma activo,
* traduce claves visibles de la interfaz,
* corrige textos con problemas de codificación,
* sincroniza el atributo `lang` del documento.

#### c) Servicios HTTP y consumo de API

El frontend utiliza `HttpClient` para consumir la API REST. Además, se ha incorporado un interceptor JWT que añade automáticamente el token a las peticiones privadas.

#### d) Servicio de destinos

El frontend cuenta con un servicio específico para consumir los destinos del backend mediante el endpoint:

`GET /api/destinos`

Este servicio ha permitido verificar la conexión real entre la web publicada, el backend desplegado en Render y la base de datos PostgreSQL remota.

### 26.8 Datos, dominio y catálogo del frontend

Uno de los módulos más extensos del frontend es el catálogo de destinos, donde se modelan entidades como:

* continentes,
* países,
* ciudades,
* hoteles,
* reseñas,
* reservas,
* utilidades de búsqueda y filtrado.

Este bloque ha servido como base funcional del catálogo visual y de la navegación por jerarquía geográfica. En la fase final se ha sincronizado este catálogo con los datos reales existentes en Spring Boot y PostgreSQL, evitando diferencias entre los nombres usados por el frontend y los almacenados en backend.

### 26.9 Pipe de traducción

Se utiliza un pipe `translate` que permite aplicar traducciones directamente desde los templates, facilitando que la interfaz cambie de idioma sin duplicar plantillas ni hardcodear textos.

### 26.10 Componentes reutilizables

Entre los componentes más importantes del frontend se encuentran:

* **Navbar**: búsqueda global, navegación principal, idioma, sesión y acceso a usuario.
* **Footer**: pie de página de la aplicación.
* **DestinoCarousel**: carrusel de destinos destacados.
* **MainLayout**: estructura principal visible en gran parte del sitio.

Estos componentes permiten mantener una experiencia coherente y reutilizable en toda la aplicación.

### 26.11 Páginas principales del frontend

El frontend incluye páginas especializadas para:

* inicio,
* login,
* registro,
* perfil,
* ajustes,
* añadir tarjeta,
* detalle de hotel,
* resultados de búsqueda,
* continentes,
* países,
* ciudades,
* hoteles,
* recibo,
* viajes del usuario.

Esta organización facilita separar la navegación pública de la experiencia privada del usuario autenticado.

### 26.12 Flujo funcional del frontend

El flujo general del cliente Angular es el siguiente:

1. la aplicación arranca desde `main.ts`,
2. el router decide qué página mostrar,
3. el layout principal mantiene navbar y footer,
4. los componentes consultan servicios de autenticación, traducción y datos,
5. las páginas envían peticiones HTTP al backend cuando el flujo ya está integrado,
6. el token JWT se adjunta automáticamente a las peticiones protegidas,
7. la respuesta del backend se representa en la interfaz.

### 26.13 Internacionalización y experiencia de usuario

Uno de los aspectos trabajados en el frontend ha sido la internacionalización básica. Se han corregido problemas de codificación de caracteres, se ha unificado el uso del sistema de traducciones y se ha mejorado la presentación de fechas y mensajes para respetar el idioma activo del usuario.

### 26.14 Relación entre frontend Angular y backend Spring Boot

La unificación actual del proyecto se basa en la siguiente idea:

* Angular se encarga de la presentación, interacción y navegación.
* Spring Boot se encarga de la lógica de negocio, persistencia, seguridad y exposición de datos.
* PostgreSQL almacena la información persistente del sistema.
* Docker permite levantar backend y base de datos de forma reproducible.
* Render permite desplegar el backend como servicio remoto.
* FileZilla permite publicar el frontend compilado en el servidor web.

En la práctica, el frontend ya ha sido validado consumiendo endpoints reales como login, perfil y destinos, y queda preparado para integrarse progresivamente con reservas, cuenta bancaria y saldo.

### 26.15 Mejoras aplicadas en el frontend

Entre las mejoras relevantes realizadas durante el desarrollo destacan:

* corrección de textos con errores de codificación,
* capa de traducción simple ES/EN,
* mejora del tratamiento de fechas y mensajes en función del idioma,
* organización modular por páginas y componentes,
* introducción del uso de JWT en cliente,
* consumo real del backend desde Angular,
* validación del flujo completo frontend–backend en entorno local,
* publicación del frontend en servidor externo,
* sincronización del catálogo Angular con los datos reales de Spring Boot.

### 26.16 Valor del frontend dentro del TFG

La inclusión del frontend Angular no solo aporta una capa visual moderna, sino que refuerza el carácter desacoplado del proyecto. Gracias a esta separación, el backend se convierte en una API reutilizable y el frontend puede evolucionar de forma independiente, manteniendo una arquitectura alineada con entornos profesionales reales.

En consecuencia, la documentación del TFG no debe entender Angular como un añadido menor, sino como la pieza que completa la transición desde una aplicación acoplada con vistas de servidor hacia una solución cliente-servidor moderna, mantenible y escalable.

---

## 27. Despliegue, publicación y entorno real

Además del desarrollo funcional, el proyecto se ha orientado a un escenario de ejecución y publicación más cercano a un entorno real. Para ello se ha trabajado tanto la contenerización del backend como la publicación del frontend en un servidor accesible desde Internet.

### 27.1 PostgreSQL como base de datos del proyecto

Aunque en fases tempranas del desarrollo se realizaron pruebas con H2 y otras configuraciones de apoyo, la solución actual se ha orientado a PostgreSQL como base de datos principal del sistema.

La elección de PostgreSQL aporta varias ventajas:

* persistencia real de la información,
* mejor aproximación a un entorno profesional,
* compatibilidad adecuada con Spring Data JPA e Hibernate,
* facilidad de despliegue en contenedores y servicios cloud.

En la fase final se ha utilizado PostgreSQL remoto en Render. La base de datos contiene la información principal del sistema, incluyendo continentes, destinos, alojamientos, habitaciones y usuarios administradores iniciales.

### 27.2 Carga de datos iniciales en PostgreSQL

Para inicializar la base de datos se ha utilizado un archivo `data.sql` adaptado a PostgreSQL. Este archivo incluye:

* limpieza previa de tablas relacionadas,
* reinicio de identidades,
* inserción de usuarios administradores,
* inserción de continentes,
* inserción de destinos,
* inserción de alojamientos,
* inserción de habitaciones.

El orden de inserción respeta las relaciones entre tablas. Primero se cargan las tablas base, como `continente`, y después las tablas dependientes, como `destinos`, `alojamientos` y `habitacion`.

Además, los usuarios administradores se insertan usando control de conflicto sobre el email para evitar duplicidades en caso de ejecución repetida del script.

### 27.3 Docker y Docker Compose en backend

El backend de Spring Boot y la base de datos PostgreSQL se han preparado para ejecutarse de forma desacoplada mediante contenedores Docker.

Esta decisión permite:

* aislar la aplicación del entorno del sistema operativo,
* simplificar el arranque del proyecto,
* reproducir el entorno de ejecución en diferentes máquinas,
* acercar el proyecto a una estrategia real de despliegue.

El uso de Docker Compose facilita el levantamiento conjunto de:

* contenedor del backend,
* contenedor de PostgreSQL,
* variables de entorno necesarias para la conexión entre servicios.

### 27.4 Preparación del backend para Render

El backend ha sido adaptado para funcionar como API REST desacoplada, lo que facilita su publicación en Render. Esta preparación incluye:

* configuración mediante variables de entorno,
* conexión a PostgreSQL remoto,
* uso de `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`,
* adaptación del puerto de ejecución,
* separación entre frontend y backend,
* compatibilidad con PostgreSQL,
* control de seguridad basado en JWT.

El despliegue del backend en Render permite disponer de una API REST accesible públicamente y conectada a una base de datos remota.

### 27.5 Publicación del frontend Angular

El frontend Angular ha sido preparado para compilarse y generar una versión estática lista para publicación. Para ello se ha ejecutado el comando:

```bash
npm run build

```

Este comando genera la carpeta:

dist/jmj-frontend

Dentro de esta carpeta se encuentran los archivos finales de producción, como:

index.html,
bundles JavaScript,
hoja de estilos compilada,
assets necesarios para la aplicación.

Estos archivos son los que se publican en el servidor web.

27.6 Uso de FileZilla en la publicación

FileZilla ha sido empleado como herramienta de transferencia para publicar el frontend en el servidor. Su uso dentro del proyecto resulta útil para:

subir la carpeta compilada del frontend,
sustituir versiones anteriores del sitio,
organizar la estructura de archivos del dominio,
validar visualmente la publicación del cliente Angular.

En la fase final se subió el contenido de dist/jmj-frontend al directorio web correspondiente del servidor. Tras la subida, se verificó que la página publicada cargaba correctamente la nueva versión del frontend.

27.7 Publicación web del proyecto

El proyecto cuenta con una versión publicada del frontend en un dominio accesible públicamente. Esto aporta valor añadido al TFG, ya que no se limita a una ejecución local, sino que muestra una aproximación real a la puesta en producción de una aplicación web.

La publicación del frontend demuestra:

capacidad de compilar y servir una aplicación Angular fuera del entorno de desarrollo,
separación efectiva entre cliente y servidor,
conexión real con un backend remoto,
preparación del proyecto para una arquitectura web real.
27.8 Conexión entre frontend publicado y backend desplegado

Una vez desplegado el backend en Render y publicada la aplicación Angular, se configuró el frontend para consumir la API remota.

El frontend publicado realiza peticiones HTTP al backend desplegado en Render. Entre las pruebas realizadas se verificó la llamada al endpoint:

/api/destinos

Inicialmente se detectaron diferencias entre los datos internos del frontend y los datos existentes en PostgreSQL. Esto provocaba que algunos filtros o vistas no coincidieran con la información real del backend.

Para solucionarlo, se sincronizó el catálogo Angular con el contenido real del data.sql de Spring Boot, incluyendo nombres de continentes, países, ciudades y alojamientos.

27.9 Incidencias detectadas en despliegue

Durante la fase de publicación se detectaron incidencias relacionadas con las llamadas entre frontend y backend, especialmente en aspectos típicos de una arquitectura desacoplada desplegada:

configuración de rutas,
diferencias entre entorno local y entorno publicado,
llamadas HTTP a la API,
políticas de seguridad o CORS,
ajuste de URLs base del frontend,
carga inicial de datos en PostgreSQL remoto,
diferencias entre nombres del frontend y nombres del backend,
caché del navegador tras publicar nuevos bundles de Angular.

Estas incidencias forman parte natural del proceso de despliegue y resultan relevantes dentro de la memoria del TFG, ya que muestran que no solo se ha trabajado el desarrollo, sino también la transición hacia un entorno real de publicación.

27.10 Soluciones aplicadas en la fase final

Durante la fase final se aplicaron las siguientes soluciones:

actualización del data.sql para cargar datos reales en PostgreSQL Render,
despliegue del commit correcto en Render,
verificación del endpoint /api/destinos,
sincronización del catálogo Angular con los datos de Spring,
compilación del frontend mediante npm run build,
publicación de los archivos generados mediante FileZilla,
recarga de la web publicada y comprobación funcional desde navegador.
27.11 Valor académico del despliegue

La incorporación de PostgreSQL, Docker, Render y la publicación del frontend mediante FileZilla refuerza el carácter profesional del proyecto. No se trata únicamente de una aplicación funcional en local, sino de una solución publicada y conectada a servicios remotos.

Desde el punto de vista académico, este bloque permite justificar competencias relacionadas con:

despliegue de aplicaciones web,
configuración de entornos,
separación de responsabilidades entre cliente y servidor,
uso de bases de datos reales,
publicación de aplicaciones frontend en servidor,
resolución de incidencias de integración,
trabajo con entornos de producción o preproducción.
27.12 Estado final del despliegue

El estado final del despliegue es el siguiente:

backend Spring Boot desplegado en Render,
base de datos PostgreSQL remota en Render,
datos iniciales cargados mediante data.sql,
frontend Angular compilado correctamente,
frontend publicado mediante FileZilla,
web accesible desde navegador,
comunicación funcional entre frontend publicado y backend remoto,
catálogo Angular sincronizado con los datos reales de Spring Boot.

Este resultado permite presentar el proyecto como una aplicación web desacoplada y funcional, no limitada a entorno local.

28. Control de versiones y ramas de GitHub

El proyecto se gestiona mediante Git y GitHub, utilizando diferentes ramas para separar fases y partes del desarrollo.

28.1 Rama backend-actual

La rama backend-actual contiene el estado final del backend Spring Boot, incluyendo:

API REST,
seguridad JWT,
configuración de PostgreSQL,
configuración para Render,
archivo data.sql,
entidades y servicios principales,
documentación final del TFG.
28.2 Rama frontend-angular

La rama frontend-angular contiene el estado final del frontend Angular, incluyendo:

adaptación visual del frontend,
servicios HTTP,
configuración de entorno,
integración con backend,
catálogo sincronizado con los datos reales de Spring,
build final validado.
28.3 Valor del uso de ramas

El uso de ramas permite:

separar backend y frontend,
conservar versiones antiguas,
evitar mezclar cambios inestables con la versión final,
facilitar la entrega y revisión del proyecto,
documentar la evolución técnica del desarrollo.
29. Checklist final de comprobación

Antes de la defensa o entrega, se propone revisar los siguientes puntos:

Backend
El backend arranca correctamente en local.
El backend está desplegado en Render.
Render muestra el servicio como activo.
El endpoint /api/destinos devuelve datos reales.
PostgreSQL remoto contiene los datos iniciales.
El login funciona correctamente.
Los endpoints protegidos requieren JWT.
Frontend
Angular compila correctamente con npm run build.
El frontend publicado carga correctamente.
La web publicada muestra destinos.
La búsqueda funciona con países, ciudades y hoteles reales.
La navegación no muestra errores graves en consola.
El frontend consume el backend remoto.
El catálogo Angular coincide con el catálogo del backend.
GitHub
Rama backend-actual actualizada.
Rama frontend-angular actualizada.
Documentación actualizada en la rama correspondiente.
No quedan cambios pendientes en git status.
Despliegue
Backend operativo en Render.
PostgreSQL operativo en Render.
Frontend publicado mediante FileZilla.
Caché del navegador comprobada con Ctrl + F5.
Web final accesible desde navegador.
30. Cierre final

El proyecto ViajesJMJ representa una evolución completa desde una aplicación web clásica renderizada en servidor hacia una arquitectura moderna, desacoplada y desplegada parcialmente en entorno real.

La solución final integra:

Spring Boot como backend,
Angular como frontend,
PostgreSQL como base de datos,
JWT como sistema de autenticación,
Docker como herramienta de contenerización,
Render como plataforma de despliegue backend,
FileZilla como herramienta de publicación frontend,
GitHub como sistema de control de versiones.

El trabajo realizado no solo demuestra funcionalidades de una aplicación de viajes, sino también el proceso real de evolución, integración, depuración, despliegue y documentación de una aplicación web completa.