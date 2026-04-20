# Proyecto ViajesJMJ – Documentación TFG

## 1. Título del proyecto

**ViajesJMJ: evolución de una aplicación de viajes desde una arquitectura MVC con Thymeleaf hacia una solución desacoplada con backend Spring Boot, seguridad JWT, base de datos PostgreSQL y frontend independiente en Angular**

## 2. Resumen del proyecto

El presente Trabajo de Fin de Grado consiste en el desarrollo de una aplicación de viajes construida a partir de una evolución técnica real. El proyecto comenzó como una aplicación web tradicional basada en Spring Boot y Thymeleaf, donde el backend asumía tanto la lógica de negocio como el renderizado de vistas. A medida que el sistema creció y surgió la necesidad de integrarlo con un frontend moderno, se llevó a cabo una refactorización progresiva hacia una arquitectura desacoplada.

En su estado actual, el sistema se compone de un backend desarrollado con Spring Boot que expone una API REST segura, y un frontend independiente desarrollado en Angular que consume dicha API mediante peticiones HTTP. La aplicación permite autenticación con JWT, registro de usuarios, recomendación de viajes, consulta de destinos, creación y gestión de reservas, administración de cuenta bancaria propia y gestión de saldo simulado para operaciones internas.

Además, el proyecto se ejecuta actualmente sobre PostgreSQL y Docker, lo que acerca su estructura a un entorno profesional real de desarrollo y despliegue.

## 3. Justificación del proyecto

El sector turístico y las plataformas de reserva requieren sistemas capaces de combinar una experiencia de usuario fluida con una arquitectura backend segura, mantenible y preparada para evolucionar. El objetivo de este proyecto es simular una plataforma real de recomendación y reserva de viajes donde el usuario pueda consultar destinos, autenticarse, registrar una cuenta, gestionar sus reservas y operar con saldo interno asociado a su perfil.

El proyecto ha servido como espacio de aprendizaje y consolidación de competencias propias del ciclo de Desarrollo de Aplicaciones Web, especialmente en:

* arquitectura de aplicaciones web modernas,
* desarrollo de APIs REST,
* persistencia de datos con JPA/Hibernate,
* seguridad con Spring Security y JWT,
* integración backend–frontend desacoplada,
* ejecución en contenedores Docker,
* uso de base de datos PostgreSQL.

La transformación del proyecto desde una aplicación MVC clásica a una arquitectura desacoplada aporta también valor académico, ya que permite justificar decisiones técnicas reales, identificar limitaciones del enfoque inicial y mostrar una refactorización coherente en función de nuevas necesidades funcionales y tecnológicas.

## 4. Objetivos del proyecto

### 4.1 Objetivo general

Desarrollar una aplicación de viajes con arquitectura desacoplada, compuesta por un backend Spring Boot y un frontend Angular, capaz de ofrecer autenticación segura, recomendación de viajes, gestión de reservas, gestión de cuenta bancaria propia y operaciones de saldo simulado.

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
* Preparar el sistema para futuras ampliaciones y despliegue en entorno productivo.

## 5. Tecnologías utilizadas

### 5.1 Backend

* Java 21
* Spring Boot 3.2.6
* Spring Web
* Spring Data JPA
* Spring Security
* JWT (jjwt)
* Hibernate
* Maven

### 5.2 Frontend

* Angular
* TypeScript
* HTML
* CSS
* Servicios HTTP con `HttpClient`
* Interceptor JWT para envío automático del token en rutas privadas

### 5.3 Base de datos y despliegue

* PostgreSQL
* Docker
* Docker Compose

### 5.4 Herramientas de desarrollo y pruebas

* IntelliJ IDEA
* Visual Studio Code
* Postman
* Git y GitHub
* Navegador con herramientas de desarrollo (Network, Console, Storage)

### 5.5 Tecnologías de la fase inicial

En la fase inicial del proyecto también se utilizaron:

* Thymeleaf
* HTML
* CSS
* JavaScript
* API Unsplash

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
* detectar limitaciones del acoplamiento entre frontend y backend.

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

### 8.3 Resultado de la refactorización

El proyecto quedó convertido en una solución desacoplada y más profesional, con un backend reutilizable y un frontend independiente capaz de consumir sus datos de forma segura.

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
* representar datos como destinos, perfil, reservas, cuenta bancaria y saldo.

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
* gestionar el saldo simulado del usuario.

### 9.3 Base de datos

En la versión actual se utiliza PostgreSQL como base de datos principal. Durante fases anteriores del proyecto se realizaron pruebas con H2, pero el desarrollo actual está orientado a PostgreSQL, lo que aporta persistencia más realista y mejor alineación con un entorno profesional.

### 9.4 Contenerización y ejecución

El backend y la base de datos se ejecutan mediante Docker y Docker Compose, permitiendo levantar el sistema de manera reproducible. El frontend Angular se ejecuta de forma independiente en local y consume la API del backend mediante `http://localhost:8081`.

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

Representa un destino turístico con nombre, descripción, país, precio e imagen.

### 11.5 Alojamiento

Representa un hotel o establecimiento asociado a un destino.

### 11.6 Habitación

Representa una unidad reservable dentro de un alojamiento, con tipo y precio por noche.

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

### 12.3 Roles del sistema

* **ADMIN**: puede acceder a endpoints restringidos de administración.
* **USER**: puede acceder a sus recursos privados, como perfil, reservas, cuenta bancaria y saldo.

### 12.4 Filtro JWT y authorities

El filtro JWT extrae el email y el rol del token y construye la autenticación de Spring Security con sus authorities correspondientes.

### 12.5 Política de seguridad

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

### 12.6 Perfil autenticado

Se ha incorporado el endpoint:

`GET /api/usuarios/me`

Este endpoint devuelve información del usuario autenticado sin necesidad de enviar su identificador desde el frontend.

### 12.7 Decisión de seguridad importante

El frontend no envía `usuarioId` en las operaciones privadas. El backend obtiene siempre la identidad del usuario a partir del JWT.

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
* mayor mantenibilidad.

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

## 15. Integración actual con Angular

La integración con Angular constituye uno de los hitos clave del estado actual del proyecto.

### 15.1 Conexión frontend–backend

El frontend Angular consume el backend mediante peticiones HTTP reales a `http://localhost:8081`. Durante las pruebas se ha verificado correctamente la comunicación con endpoints como:

* login,
* perfil,
* destinos,
* cuenta bancaria,
* saldo.

### 15.2 Gestión del token

Tras el login, Angular almacena el JWT y lo reenvía en las peticiones protegidas mediante un interceptor.

### 15.3 Flujo validado

Se ha comprobado correctamente el siguiente flujo:

1. arranque del backend en Docker,
2. arranque del frontend Angular,
3. login desde Angular,
4. obtención de JWT,
5. consumo de endpoints protegidos,
6. visualización de datos reales desde el backend.

## 16. Flujo actual de recomendación

El flujo actual es el siguiente:

1. Angular envía una petición `POST /api/recomendar` con los criterios del viaje.
2. El backend analiza los datos recibidos.
3. Se determina un destino recomendado.
4. Se buscan habitaciones asociadas al destino.
5. Las habitaciones se agrupan por hotel.
6. Se devuelve una respuesta JSON para que Angular la represente.

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

## 20. Pruebas realizadas

Durante el desarrollo se han realizado pruebas desde Postman, PowerShell, navegador y Angular.

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
* comunicación correcta entre Angular y backend ejecutado en Docker.

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

## 22. Estado actual del proyecto

En el momento actual, el sistema se encuentra operativo para:

* autenticación con JWT,
* registro de usuarios normales,
* consulta del perfil autenticado,
* consulta de destinos,
* recomendación de viajes,
* creación y gestión segura de reservas,
* gestión de cuenta bancaria propia,
* recarga y gasto de saldo simulado,
* cálculo auxiliar mediante operaciones matemáticas,
* control de acceso por rol,
* integración funcional con frontend Angular,
* ejecución del backend y base de datos mediante Docker.

## 23. Mejoras futuras

El proyecto queda preparado para continuar creciendo con funcionalidades como:

* panel de administración más completo,
* gestión avanzada de usuarios,
* validación más fuerte del formato IBAN,
* flujos de pago simulados más complejos,
* relación directa entre saldo y reserva final,
* disponibilidad real de habitaciones,
* cálculo más completo del coste incluyendo transporte,
* despliegue completo del frontend en contenedor o hosting,
* documentación complementaria con diagramas, capturas y pruebas finales.

## 24. Conclusión

ViajesJMJ ha evolucionado desde una aplicación MVC clásica con Thymeleaf hacia una solución desacoplada compuesta por un backend Spring Boot y un frontend Angular. Esta evolución ha permitido construir un sistema más moderno, seguro y mantenible, alineado con prácticas reales de desarrollo profesional.

El resultado actual permite:

* autenticar usuarios con JWT,
* registrar usuarios normales,
* consultar destinos,
* recomendar viajes,
* gestionar reservas propias,
* administrar una cuenta bancaria propia,
* operar con saldo simulado,
* y conectar el frontend Angular con el backend de forma real.

Todo ello constituye una base sólida y coherente para la defensa del proyecto y para futuras ampliaciones.

## 25. Guion base para la presentación oral

### Introducción

“Mi TFG consiste en el desarrollo de una aplicación de viajes que ha evolucionado desde una arquitectura clásica con Thymeleaf hacia una solución desacoplada con backend Spring Boot y frontend Angular.”

### Evolución del proyecto

“El proyecto comenzó con una arquitectura MVC, pero posteriormente fue refactorizado para que el backend dejara de renderizar vistas y pasara a exponer una API REST consumida por Angular.”

### Arquitectura actual

“El sistema actual se basa en un backend seguro con JWT, una base de datos PostgreSQL, ejecución con Docker y un frontend Angular que consume la API mediante peticiones HTTP.”

### Funcionalidades principales

“He implementado autenticación, registro, perfil, recomendación de viajes, gestión de destinos, reservas asociadas al usuario autenticado, cuenta bancaria propia y un módulo de saldo simulado.”

### Seguridad

“Una decisión importante fue que el frontend nunca envía el identificador del usuario en las operaciones privadas. El backend obtiene la identidad del token JWT, mejorando así la seguridad.”

### Cierre

“En conclusión, el proyecto ha evolucionado hacia una arquitectura desacoplada, moderna y mantenible, con una integración funcional entre Angular, Spring Boot, PostgreSQL y Docker.”

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
* mantener soporte de traducción entre español e inglés.

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

### 26.8 Datos, dominio y catálogo del frontend

Uno de los módulos más extensos del frontend es el catálogo de destinos, donde se modelan entidades como:

* continentes,
* países,
* ciudades,
* hoteles,
* reseñas,
* reservas,
* utilidades de búsqueda y filtrado.

Este bloque ha servido como base funcional del catálogo visual y de la navegación por jerarquía geográfica. En la fase actual, parte de esta lógica sigue siendo útil como estructura de presentación, mientras que determinados datos clave ya se obtienen desde la API REST del backend.

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

En la práctica, el frontend ya ha sido validado consumiendo endpoints reales como login, perfil y destinos, y queda preparado para integrarse progresivamente con reservas, cuenta bancaria y saldo.

### 26.15 Mejoras aplicadas en el frontend

Entre las mejoras relevantes realizadas durante el desarrollo destacan:

* corrección de textos con errores de codificación,
* capa de traducción simple ES/EN,
* mejora del tratamiento de fechas y mensajes en función del idioma,
* organización modular por páginas y componentes,
* introducción del uso de JWT en cliente,
* consumo real del backend desde Angular,
* validación del flujo completo frontend–backend en entorno local.

### 26.16 Valor del frontend dentro del TFG

La inclusión del frontend Angular no solo aporta una capa visual moderna,
sino que refuerza el carácter desacoplado del proyecto.
Gracias a esta separación, el backend se convierte en una API reutilizable y el frontend
puede evolucionar de forma independiente, manteniendo una arquitectura alineada 
con entornos profesionales reales.

En consecuencia, la documentación del TFG no debe entender Angular como un añadido menor,
sino como la pieza que completa la transición desde una aplicación acoplada con vistas de servidor
hacia una solución cliente-servidor moderna, mantenible y escalable.
