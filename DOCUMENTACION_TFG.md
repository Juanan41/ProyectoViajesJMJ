Proyecto ViajesJMJ – Documentación TFG
1. Título del proyecto

ViajesJMJ: evolución de una aplicación de viajes desde una arquitectura MVC con Thymeleaf hacia un backend desacoplado con Spring Boot, JWT y API REST integrado con Angular

2. Resumen del proyecto

El presente Trabajo de Fin de Grado consiste en el desarrollo del backend de una aplicación de viajes orientada a la recomendación de destinos y a la gestión de reservas. El proyecto no se ha construido de forma lineal, sino que ha pasado por una evolución técnica real.

En una fase inicial, la aplicación seguía una arquitectura clásica basada en Spring Boot + Thymeleaf, donde el backend también renderizaba las vistas HTML. Posteriormente, y como resultado del aprendizaje obtenido durante el desarrollo, se llevó a cabo una refactorización progresiva para adoptar una arquitectura desacoplada, delegando la capa de presentación a un frontend independiente en Angular y dejando el backend exclusivamente como una API REST.

Actualmente, el sistema permite la autenticación mediante JWT, la recomendación de viajes en formato JSON, la creación y gestión de reservas asociadas al usuario autenticado, y la administración segura de una cuenta bancaria del propio usuario. Esta evolución aporta una arquitectura más moderna, mantenible, segura y alineada con prácticas reales de desarrollo profesional.

3. Justificación del proyecto

El sector turístico y las plataformas de reserva requieren aplicaciones que combinen una experiencia de usuario ágil con un backend seguro y escalable. Este proyecto nace con la intención de simular una plataforma real de recomendación y reserva de viajes, en la que el usuario pueda consultar destinos, seleccionar alojamientos y realizar reservas.

Durante el desarrollo, el proyecto ha servido también como espacio de aprendizaje y consolidación de conocimientos propios del ciclo de Desarrollo de Aplicaciones Web, especialmente en:

arquitectura de aplicaciones web,
persistencia de datos con JPA/Hibernate,
diseño de APIs REST,
seguridad con JWT,
integración entre backend y frontend desacoplado.

La transformación del proyecto desde una aplicación MVC clásica a una API REST desacoplada no solo mejora el producto final, sino que también aporta un valor académico importante, ya que permite justificar decisiones técnicas, detectar limitaciones del enfoque inicial y mostrar una refactorización real basada en necesidades del proyecto.

4. Objetivos del proyecto
   4.1 Objetivo general

Desarrollar el backend de una aplicación de viajes con arquitectura desacoplada, capaz de integrarse con un frontend Angular mediante una API REST segura, mantenible y escalable.

4.2 Objetivos específicos
Diseñar una aplicación orientada a recomendación y reserva de viajes.
Implementar persistencia con Spring Data JPA y Hibernate.
Desarrollar un recomendador de viajes basado en criterios introducidos por el usuario.
Implementar autenticación con Spring Security y JWT.
Exponer endpoints REST para recomendación, autenticación, reservas y cuenta bancaria.
Asociar las reservas al usuario autenticado sin exponer el identificador del usuario en la petición.
Utilizar DTOs para desacoplar las entidades internas de la información intercambiada con el frontend.
Incorporar control de acceso por roles ADMIN y USER.
Preparar el backend para futuras ampliaciones y despliegue en entorno productivo.
5. Tecnologías utilizadas
   5.1 Backend
   Java 21
   Spring Boot 3.2.6
   Spring Web
   Spring Data JPA
   Spring Security
   JWT (jjwt)
   Hibernate
   H2 Database
   Maven
   5.2 Frontend
   Angular
   5.3 Herramientas de desarrollo y pruebas
   IntelliJ IDEA
   Postman
   Git y GitHub
   5.4 Tecnologías de la fase inicial

En la versión inicial del proyecto también se emplearon:

Thymeleaf
HTML
CSS
JavaScript
API Unsplash
6. Fase inicial del proyecto

En una primera etapa, el proyecto fue concebido como una aplicación web completa desarrollada íntegramente con Spring Boot, en la que el backend no solo gestionaba la lógica y la persistencia, sino también la capa de presentación.

6.1 Arquitectura inicial

La arquitectura seguía el patrón MVC:

Controller: recibía las peticiones HTTP.
Service: contenía la lógica de negocio.
Repository: gestionaba el acceso a base de datos.
View: renderizada con Thymeleaf.
6.2 Flujo funcional inicial

El flujo inicial de la aplicación era el siguiente:

El usuario accedía a una página web renderizada por Spring Boot.
Introducía datos en un formulario de recomendación.
El backend procesaba esos datos mediante ViajeController y FormularioViaje.
Se generaba un destino recomendado.
Se mostraban hoteles y habitaciones en una vista Thymeleaf.
El usuario seleccionaba transporte y habitación.
El sistema calculaba el precio dinámicamente.
La reserva se guardaba en base de datos.
Se mostraba una confirmación visual al usuario.
6.3 Elementos principales de la fase inicial

Durante esta etapa existían, entre otros, los siguientes componentes:

ViajeController
FormularioViaje
vistas Thymeleaf
recursos estáticos HTML/CSS/JavaScript
lógica dinámica de interfaz en cliente
recomendación integrada con renderizado de servidor
6.4 Valor de esta fase

Aunque posteriormente se decidió evolucionar la arquitectura, esta primera fase fue importante porque permitió:

construir el modelo de negocio del sistema,
probar el flujo completo de recomendación y reserva,
validar el modelo de datos,
y detectar las limitaciones del enfoque acoplado.
7. Limitaciones detectadas en el enfoque inicial

A medida que el proyecto fue creciendo, se detectaron varios problemas en la versión MVC clásica.

7.1 Acoplamiento entre frontend y backend

La lógica de presentación dependía directamente de Spring Boot y Thymeleaf, lo que dificultaba la reutilización del backend por otros clientes.

7.2 Dificultad para integrar Angular

Al desarrollarse un frontend independiente en Angular, el enfoque inicial dejaba de ser el más adecuado, ya que el backend necesitaba exponer datos y no vistas HTML.

7.3 Mezcla de responsabilidades

Controladores como ViajeController concentraban demasiadas funciones:

recomendación,
renderizado de vistas,
obtención de habitaciones,
agrupación por hotel,
reserva,
y lógica visual.
7.4 Seguridad limitada en el flujo antiguo

El sistema inicial no estaba planteado todavía sobre un flujo completo de autenticación moderna con JWT y separación clara entre parte pública y privada.

Estas limitaciones justificaron la refactorización posterior del proyecto.

8. Refactorización hacia arquitectura desacoplada

Una de las decisiones más importantes del proyecto fue su evolución hacia una arquitectura desacoplada.

8.1 Cambio de enfoque

Se pasó de un sistema basado en vistas renderizadas por servidor a un backend especializado en exponer servicios REST en formato JSON.

8.2 Cambios realizados
Eliminación progresiva de controladores MVC antiguos.
Eliminación de vistas Thymeleaf y recursos estáticos innecesarios.
Sustitución del flujo basado en Model por controladores REST.
Creación de DTOs específicos para entrada y salida de datos.
Introducción de seguridad con Spring Security + JWT.
Separación entre parte pública y parte privada de la API.
Asociación de reservas al usuario autenticado a través del token.
8.3 Resultado de la refactorización

El proyecto quedó reorientado como backend desacoplado, preparado para integrarse con Angular y más alineado con arquitecturas actuales.

9. Arquitectura actual del sistema

La aplicación sigue una arquitectura cliente-servidor desacoplada.

9.1 Frontend

El frontend, desarrollado en Angular, se encarga de:

mostrar la interfaz,
gestionar formularios,
manejar la navegación,
enviar peticiones HTTP al backend,
y almacenar y reenviar el token JWT cuando el usuario está autenticado.
9.2 Backend

El backend, desarrollado con Spring Boot, se encarga de:

gestionar la lógica de negocio,
acceder a la base de datos,
exponer endpoints REST,
autenticar usuarios,
proteger operaciones privadas,
recomendar viajes,
gestionar reservas,
y proteger datos bancarios del usuario.
9.3 Base de datos

Durante la fase de desarrollo se utiliza H2 en memoria, con inicialización mediante data.sql, lo que permite un entorno reproducible y sencillo de ejecutar.

No obstante, esta solución implica que los datos creados dinámicamente desaparecen al reiniciar la aplicación, por lo que en fases posteriores se prevé la migración a una base de datos persistente.

10. Estructura actual del backend

El proyecto se organiza por paquetes funcionales bajo el paquete base com.viajes.app.

10.1 Paquetes principales
auth → autenticación, JWT, login y registro.
config → seguridad y configuración general.
destinos → destinos y continentes.
alojamientos → hoteles y habitaciones.
reservas → creación y gestión de reservas.
cuentas → cuenta bancaria del usuario autenticado.
users → usuarios, roles y perfil.
viajes → recomendación de viajes.
api → servicios externos como imágenes dinámicas.
exceptions → manejo de errores.
10.2 Limpieza de paquetes antiguos

Durante la refactorización se eliminaron clases y recursos que habían quedado sin uso real en la arquitectura final, como controladores MVC, vistas Thymeleaf, recursos estáticos antiguos y módulos residuales de fases anteriores.

11. Modelo de datos
    11.1 Usuario

Representa al usuario del sistema. Contiene información de autenticación y rol.

11.2 Rol

Se ha definido un enum con dos roles:

ADMIN
USER

Esto permite controlar el acceso a determinados endpoints de la API.

11.3 Continente

Permite clasificar los destinos por grandes regiones.

11.4 Destino

Representa un lugar turístico, con nombre, descripción, país, precio e imagen.

11.5 Alojamiento

Representa un hotel o establecimiento asociado a un destino.

11.6 Habitación

Representa una unidad reservable dentro de un alojamiento, con capacidad, tipo, régimen e imagen.

11.7 Reserva

Representa una reserva realizada por un usuario autenticado. Incluye:

habitación,
usuario,
transporte,
fecha de inicio,
fecha de fin,
precio total,
estado,
fecha de reserva.
11.8 Cuenta bancaria

Representa la cuenta bancaria del usuario autenticado. Incluye:

IBAN,
titular,
entidad,
SWIFT/BIC,
estado de activación,
fecha de registro,
usuario asociado.
12. Seguridad y gestión de usuarios

La seguridad constituye uno de los bloques principales del proyecto.

12.1 Login con JWT

El usuario se autentica mediante el endpoint:

POST /api/auth/login

El backend devuelve una respuesta estructurada con:

token JWT,
tipo de token,
email,
rol del usuario.
12.2 Registro de usuarios normales

Se ha añadido el endpoint:

POST /api/auth/register

Este endpoint permite registrar nuevos usuarios desde el frontend Angular.

En el registro se aplican validaciones de:

nombre de usuario obligatorio,
email obligatorio,
contraseña obligatoria,
email único,
username único.

La contraseña se almacena cifrada con BCrypt, y el rol asignado por defecto es USER.

12.3 Roles del sistema

Se han definido dos roles principales:

ADMIN
USER
ADMIN

Los usuarios administradores pueden acceder a endpoints restringidos de administración.

USER

Los usuarios normales solo pueden acceder a sus propios recursos privados, como:

sus reservas,
su cuenta bancaria,
su perfil.
12.4 Filtro JWT y authorities

Se ha ampliado el filtro JWT para que, al recibir un token válido:

extraiga el email,
extraiga el rol,
construya la autenticación con authorities de Spring Security.

Esto permite aplicar reglas como:

authenticated()
hasRole("ADMIN")
12.5 Política de seguridad

Se ha adoptado una política mixta:

Parte pública
autenticación,
registro,
recomendación,
consulta de información pública necesaria para el frontend.
Parte privada
creación de reservas,
consulta de reservas propias,
acceso a una reserva concreta,
cancelación de reservas,
gestión de cuenta bancaria,
perfil del usuario autenticado.
12.6 Endpoint de perfil del usuario autenticado

Se ha creado el endpoint:

GET /api/usuarios/me

Este endpoint devuelve la información del usuario autenticado a partir del token JWT, sin necesidad de pasar su ID desde el frontend.

12.7 Decisión de seguridad importante

El frontend no envía usuarioId en las operaciones privadas. El backend obtiene siempre la identidad del usuario a partir del JWT, lo que evita manipulaciones y mejora la seguridad del sistema.

13. DTOs y separación de responsabilidades

El proyecto utiliza DTOs para evitar exponer directamente las entidades internas.

13.1 DTOs implementados
LoginRequest
LoginResponse
RegisterRequest
RegisterResponse
RecomendacionRequest
RecomendacionResponse
ReservaRequestDto
ReservaResponseDto
CuentaBancariaRequestDto
CuentaBancariaResponseDto
UsuarioPerfilResponseDto
13.2 Ventajas del uso de DTOs
mayor control sobre los datos expuestos,
API más limpia para Angular,
separación entre modelo interno y contrato externo,
mayor mantenibilidad.
14. API REST implementada
    14.1 Autenticación
    POST /api/auth/login
    POST /api/auth/register
    14.2 Perfil de usuario
    GET /api/usuarios/me
    14.3 Recomendación de viajes
    POST /api/recomendar

Recibe criterios del viaje y devuelve:

destino recomendado,
descripción,
precio,
imagen,
hoteles,
habitaciones agrupadas por hotel.
14.4 Reservas
POST /api/reservas → crea una reserva para el usuario autenticado.
GET /api/reservas/mias → devuelve las reservas del usuario autenticado.
GET /api/reservas/{id} → devuelve una reserva concreta si pertenece al usuario autenticado.
PUT /api/reservas/{id}/cancelar → cambia el estado de la reserva a cancelada si pertenece al usuario autenticado.
14.5 Cuenta bancaria
POST /api/cuenta-bancaria → registra una cuenta bancaria para el usuario autenticado.
GET /api/cuenta-bancaria/mia → obtiene la cuenta bancaria del usuario autenticado.
PUT /api/cuenta-bancaria → actualiza los datos bancarios del usuario autenticado.
DELETE /api/cuenta-bancaria → elimina la cuenta bancaria del usuario autenticado.
14.6 Prueba de seguridad por rol
GET /api/admin/test

Este endpoint se ha utilizado para verificar que:

un ADMIN puede acceder,
un USER recibe 403 Forbidden.
15. Flujo actual de recomendación

El flujo actual del recomendador es el siguiente:

Angular envía una petición POST /api/recomendar con criterios como continente, clima, tipo de viaje, presupuesto y sugerencia.
El backend analiza los criterios.
Se decide un destino recomendado coherente con los datos reales del sistema.
Se buscan habitaciones asociadas al destino.
Las habitaciones se agrupan por hotel.
Se construye una respuesta JSON para que Angular la represente en pantalla.

Este diseño sustituye por completo al flujo antiguo basado en vistas HTML y permite mayor flexibilidad para el frontend.

16. Flujo actual de reservas

El flujo actual de reservas es el siguiente:

El usuario inicia sesión desde Angular.
El backend valida credenciales y devuelve un JWT.
Angular guarda el token.
El usuario elige habitación, fechas y transporte.
Angular envía una petición POST /api/reservas con los datos de reserva.
El backend obtiene el usuario autenticado desde el token.
Se valida la información recibida.
Se calcula el precio total en función de la habitación y las fechas.
La reserva se guarda asociada al usuario autenticado.

Esta implementación evita exponer el identificador del usuario y representa una mejora clara frente a un diseño inseguro basado en parámetros enviados por cliente.

16.1 Medidas de seguridad aplicadas a reservas

Para evitar que un usuario pueda acceder a reservas de otro, se utilizan consultas como:

findByUsuarioEmail(...)
findByIdAndUsuarioEmail(...)
16.2 Validaciones añadidas

Se han incorporado validaciones de negocio:

fechas obligatorias,
fecha de fin posterior a fecha de inicio,
transporte obligatorio,
transporte válido (AVION, TREN, BARCO),
una reserva ya cancelada no puede volver a cancelarse.

Además, las reservas del usuario se devuelven ordenadas por fecha de reserva descendente.

17. Módulo de cuenta bancaria

Con el fin de preparar el backend para el tratamiento de datos sensibles, se ha implementado un módulo específico de cuenta bancaria asociado al usuario autenticado.

17.1 Diseño adoptado

Se ha creado una entidad CuentaBancaria relacionada con Usuario mediante una relación OneToOne, de manera que cada usuario disponga de una cuenta bancaria principal.

17.2 Seguridad aplicada

Esta parte se ha considerado especialmente sensible, por lo que:

todas sus operaciones requieren autenticación con JWT,
el backend obtiene la identidad del usuario desde el token,
el frontend no envía usuarioId,
el IBAN no se devuelve completo, sino enmascarado en la respuesta.
17.3 Validaciones añadidas

Se han incorporado controles adicionales:

un usuario solo puede tener una cuenta bancaria,
el IBAN es obligatorio,
el titular es obligatorio,
la entidad es obligatoria,
el IBAN se normaliza,
no se permite registrar un IBAN duplicado,
no se permite actualizar una cuenta con el IBAN de otro usuario.
17.4 Enmascarado del IBAN

Por seguridad, el backend no devuelve el IBAN completo al frontend. En su lugar, devuelve una versión enmascarada, por ejemplo:

ES12 **** **** **** 3456

17.5 Valor añadido para el proyecto

Este módulo refuerza el carácter realista del backend y deja preparada una base para futuras integraciones relacionadas con pagos, validación de métodos de cobro o requisitos previos para confirmar determinadas operaciones.

18. Pruebas realizadas

Se ha utilizado Postman para validar el comportamiento de la API durante el desarrollo.

18.1 Autenticación y usuarios
POST /api/auth/register
POST /api/auth/login
GET /api/usuarios/me

Estas pruebas han permitido comprobar:

registro correcto de usuarios USER,
login correcto con generación de JWT,
inclusión del rol en la respuesta,
lectura correcta del perfil autenticado.
18.2 Recomendación
POST /api/recomendar

Se ha comprobado la correcta generación de respuestas JSON con destino recomendado, datos descriptivos y habitaciones agrupadas por hotel.

18.3 Reservas
POST /api/reservas
GET /api/reservas/mias
GET /api/reservas/{id}
PUT /api/reservas/{id}/cancelar

Estas pruebas han permitido comprobar:

la creación de reservas asociadas al usuario autenticado,
la consulta de reservas propias,
la consulta de una reserva concreta solo si pertenece al usuario,
la cancelación segura de reservas,
y la protección implícita frente al acceso a reservas ajenas.
18.4 Cuenta bancaria
POST /api/cuenta-bancaria
GET /api/cuenta-bancaria/mia
PUT /api/cuenta-bancaria
DELETE /api/cuenta-bancaria

Estas pruebas han permitido comprobar:

el alta de cuenta bancaria,
la consulta de cuenta propia,
la actualización de cuenta propia,
la eliminación de cuenta propia,
el enmascarado del IBAN,
y el control de duplicidad de IBAN.
18.5 Pruebas de roles

También se ha verificado la seguridad por rol mediante el endpoint:

GET /api/admin/test

Resultados obtenidos:

un ADMIN accede correctamente,
un USER recibe 403 Forbidden.
19. Problemas encontrados y soluciones
    19.1 Mezcla entre vistas y API

Problema: el proyecto mezclaba flujo MVC y flujo REST.
Solución: se eliminó la capa antigua de vistas como núcleo del sistema y se migró el recomendador y las reservas a controladores REST.

19.2 Datos inconsistentes en data.sql

Problema: algunos inserts no coincidían con el esquema generado por JPA y faltaban campos obligatorios.
Solución: se corrigió el contenido de data.sql, especialmente en alojamientos, enums y campos requeridos.

19.3 Login inicial devolviendo solo un string

Problema: el login devolvía únicamente el token como texto.
Solución: se implementó LoginResponse para devolver una respuesta estructurada con token, tipo, email y rol.

19.4 Recomendador antiguo acoplado a Thymeleaf

Problema: la lógica de recomendación estaba integrada en un controlador MVC que devolvía vistas.
Solución: se creó RecomendacionRestController con DTOs específicos y respuesta en JSON.

19.5 Seguridad en reservas

Problema: existía el riesgo de diseñar reservas enviando usuarioId desde el frontend.
Solución: el backend obtiene la identidad del usuario desde JWT y la utiliza internamente.

19.6 Persistencia temporal en H2

Problema: al utilizar H2 en memoria, los usuarios creados dinámicamente desaparecen al reiniciar la aplicación.
Solución: se asumió como solución válida para desarrollo rápido, dejando prevista una migración posterior a base de datos persistente.

19.7 Protección por rol

Problema: inicialmente el sistema autenticaba, pero no aplicaba correctamente restricciones por ADMIN y USER.
Solución: se incorporó el rol al JWT y se cargaron authorities reales en el filtro de seguridad.

20. Estado actual del proyecto

En el momento actual, el backend se encuentra operativo para:

autenticación con JWT,
registro de usuarios normales,
consulta del perfil autenticado,
recomendación de viajes por API REST,
creación de reservas protegidas,
consulta de reservas del usuario autenticado,
consulta de una reserva concreta,
cancelación de reservas,
gestión de cuenta bancaria del usuario autenticado,
control de acceso por rol,
y protección de datos sensibles mediante rutas privadas.

La estructura actual está preparada para continuar su evolución junto con el frontend Angular.

21. Mejoras futuras

El proyecto está preparado para seguir creciendo con funcionalidades como:

integración final completa con Angular,
administración avanzada de usuarios,
endpoints globales para administradores,
validación más fuerte del formato IBAN,
relación entre cuenta bancaria y determinados flujos de reserva,
validación de disponibilidad real de habitaciones,
cálculo más realista del coste total incluyendo transporte,
migración a una base de datos persistente,
despliegue en entorno productivo,
y documentación técnica complementaria con diagramas, capturas y pruebas finales.
22. Conclusión

ViajesJMJ ha evolucionado desde una aplicación MVC clásica con Thymeleaf hacia un backend desacoplado basado en API REST. Esta evolución no solo mejora la calidad técnica del sistema, sino que también refleja un proceso real de aprendizaje, refactorización y maduración del proyecto.

El resultado actual es un backend moderno y seguro que ya permite:

autenticar usuarios con JWT,
registrar usuarios normales,
recomendar viajes,
gestionar reservas asociadas al usuario autenticado,
proteger recursos privados,
y administrar una cuenta bancaria protegida.

Todo ello constituye una base sólida para la integración completa con Angular y futuras ampliaciones del sistema.

23. Guion base para la presentación oral
    Introducción

“Mi TFG consiste en el desarrollo del backend de una aplicación de viajes llamada ViajesJMJ. El objetivo ha sido construir una API REST segura y desacoplada, preparada para integrarse con un frontend Angular.”

Evolución del proyecto

“El proyecto comenzó con una arquitectura MVC en la que Spring Boot también generaba vistas HTML con Thymeleaf. Más adelante, el sistema se refactorizó para dejar el backend exclusivamente como API REST.”

Arquitectura actual

“El backend está organizado por dominios y utiliza entidades, repositorios, servicios, DTOs y controladores REST. La seguridad se implementa con Spring Security y JWT.”

Funcionalidades principales

“He implementado autenticación con JWT, registro de usuarios, recomendación de viajes basada en criterios, creación de reservas asociadas al usuario autenticado, consulta de reservas, cancelación y gestión de cuenta bancaria propia.”

Seguridad

“Una decisión importante fue no enviar nunca el identificador del usuario en las operaciones privadas. El backend obtiene la identidad desde el token, lo que mejora la seguridad y evita manipulaciones.”

Cierre

“En conclusión, el proyecto ha evolucionado hacia una arquitectura desacoplada, moderna y mantenible, alineada con prácticas reales de desarrollo web.”