import { Injectable, signal } from '@angular/core';

export type Language = 'es' | 'en';
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLang = signal<Language>('es');

  private readonly storageKey = 'jmj_language';

  private dictionary: Record<Language, Record<string, string>> = {
    es: {},
    en: {
      // General
      'JMJ Viajes': 'JMJ Travel',
      ViajesJMJ: 'JMJ Travel',
      Buscar: 'Search',
      'Buscar...': 'Search...',
      Volver: 'Back',
      Cancelar: 'Cancel',
      'Guardar cambios': 'Save changes',
      'Guardando...': 'Saving...',
      'Eliminando...': 'Deleting...',
      'Borrando...': 'Deleting...',
      Entendido: 'Got it',
      Cerrar: 'Close',
      Editar: 'Edit',
      Borrar: 'Delete',
      Eliminar: 'Delete',
      Nombre: 'Name',
      Email: 'Email',
      Precio: 'Price',
      Imagen: 'Image',
      Descripción: 'Description',
      País: 'Country',
      Continente: 'Continent',
      Destino: 'Destination',
      Destinos: 'Destinations',
      Desde: 'From',
      desde: 'from',
      Total: 'Total',
      Fecha: 'Date',
      Hora: 'Time',
      Pasajero: 'Passenger',
      Puerta: 'Gate',
      Asiento: 'Seat',
      'Boarding Pass': 'Boarding Pass',
      Vuelo: 'Flight',
      vuelo: 'flight',
      tren: 'train',
      barco: 'ship',
      Avión: 'Plane',
      Tren: 'Train',
      Barco: 'Ship',
      Transporte: 'Transport',
      Alojamiento: 'Accommodation',
      Huéspedes: 'Guests',
      Noches: 'Nights',
      noche: 'night',
      noches: 'nights',
      'por noche': 'per night',
      'Check-in': 'Check-in',
      'Check-out': 'Check-out',
      Entrada: 'Check-in',
      Salida: 'Check-out',
      'Confirmar Reserva': 'Confirm Booking',
      Reservar: 'Book',
      'Ver detalles': 'View details',
      'Ver hotel': 'View hotel',
      'Ver hoteles': 'View hotels',
      'Ver destinos': 'View destinations',
      Explorar: 'Explore',
      'Explorar destinos': 'Explore destinations',
      'Explorar continentes': 'Explore continents',
      'Cargando...': 'Loading...',
      'Conectando...': 'Connecting...',
      Limpiar: 'Clear',
      'Limpiar filtros': 'Clear filters',
      'Aplicar filtros': 'Apply filters',
      Filtros: 'Filters',
      'Filtrar resultados': 'Filter results',
      'Filtrar búsqueda': 'Filter search',
      Mostrando: 'Showing',
      'opciones disponibles': 'available options',

      // Navbar
      'Mis Viajes': 'My Trips',
      Viajes: 'Trips',
      'Mi Perfil': 'My Profile',
      Entrar: 'Sign in',
      Registro: 'Register',
      Salir: 'Sign out',
      'Cerrar Sesión': 'Sign out',
      'Iniciar Sesión': 'Sign in',
      'Iniciar sesión': 'Sign in',
      Registrarse: 'Register',
      'Gestionar Saldo': 'Manage Balance',
      Ingresar: 'Deposit',
      Retirar: 'Withdraw',
      Sacar: 'Withdraw',
      'Saldo actual': 'Current balance',
      'Balance actual': 'Current balance',
      'Cantidad a operar': 'Amount',
      'Saldo ingresado correctamente': 'Balance added successfully',
      'Saldo retirado correctamente': 'Balance withdrawn successfully',

      // Footer
      Privacidad: 'Privacy',
      Términos: 'Terms',
      Terminos: 'Terms',
      Contacto: 'Contact',
      'Información legal': 'Legal information',
      'Informacion legal': 'Legal information',
      'Condiciones de uso': 'Terms of use',
      Soporte: 'Support',
      'Usaremos tus datos únicamente para gestionar cuentas, reservas, reseñas y métodos de pago simulados.':
        'We will use your data only to manage accounts, bookings, reviews, and simulated payment methods.',
      'No compartimos información con terceros porque esta aplicación es demostrativa.':
        'We do not share information with third parties because this application is for demonstration purposes.',
      'Todas las reservas y pagos forman parte de un entorno de demostración.':
        'All bookings and payments are part of a demonstration environment.',
      'Los importes, tarjetas y billetes se usan solo para simular el flujo del proyecto y no representan compras reales.':
        'Amounts, cards, and tickets are used only to simulate the project flow and do not represent real purchases.',
      'Puedes contactar con el equipo del proyecto para revisar dudas sobre reservas, usuarios o funcionamiento de la aplicación.':
        'You can contact the project team to ask about bookings, users, or how the application works.',
      'En ViajesJMJ respetamos la privacidad de los usuarios. Los datos introducidos en la aplicacion se usan unicamente para gestionar cuentas, reservas, resenas y metodos de pago simulados.':
        'At ViajesJMJ we respect user privacy. The data entered in the application is used only to manage accounts, bookings, reviews, and simulated payment methods.',
      'Este proyecto forma parte de una aplicacion academica, por lo que la informacion mostrada tiene finalidad demostrativa.':
        'This project is part of an academic application, so the information shown is for demonstration purposes.',
      'ViajesJMJ permite explorar destinos, reservar alojamientos, consultar tickets y gestionar resenas dentro de un entorno de demostracion.':
        'ViajesJMJ lets users explore destinations, book accommodation, check tickets, and manage reviews in a demonstration environment.',
      'Las reservas, pagos, tickets y recibos generados en la aplicacion pertenecen al funcionamiento del proyecto y no representan compras reales.':
        'The bookings, payments, tickets, and receipts generated in the application belong to the project flow and do not represent real purchases.',

      // Pantalla carga
      Estamos: 'We are',
      'arrancando...': 'starting...',
      'Preparando los motores para generarte el viaje perfecto':
        'Preparing everything to create your perfect trip',
      'Buscando destinos, hoteles y experiencias para ti':
        'Searching destinations, hotels, and experiences for you',

      // Home
      'Descubre tu próximo': 'Discover your next',
      'Descubre tu próximo gran destino': 'Discover your next great destination',
      'Minimalismo, elegancia y experiencias inolvidables en todo el mundo.':
        'Minimalism, elegance, and unforgettable experiences around the world.',
      'Explora nuestra selección exclusiva de alojamientos y vive experiencias inolvidables en todo el mundo.':
        'Explore our exclusive selection of accommodation and enjoy unforgettable experiences around the world.',
      Categorías: 'Categories',
      'Explora por Continente': 'Explore by Continent',
      'Mejores Vuelos': 'Best Flights',
      'Conectamos con las rutas más cómodas para que tu viaje empiece desde el primer minuto.':
        'We connect you with the most comfortable routes so your trip starts from the first minute.',
      'Conexiones directas y cómodas para que tu única preocupación sea disfrutar del viaje.':
        'Direct and comfortable connections so your only concern is enjoying the trip.',
      'Hoteles Premium': 'Premium Hotels',
      'Alojamientos seleccionados por calidad, ubicación y experiencia para cada destino.':
        'Accommodation selected for quality, location, and experience in every destination.',
      'Dormirás en los mejores alojamientos, seleccionados cuidadosamente por su calidad y ubicación.':
        'You will stay in the best accommodation, carefully selected for quality and location.',
      'Seguro Total': 'Full Protection',
      'Viaja con tranquilidad gracias a reservas organizadas y detalles siempre disponibles.':
        'Travel with peace of mind thanks to organized bookings and always-available details.',
      'Viaja con la tranquilidad de estar protegido en todo momento con nuestra cobertura exclusiva.':
        'Travel with peace of mind knowing you are protected at all times with our exclusive coverage.',

      // Continents / Countries / Cities
      'Explora el Mundo': 'Explore the World',
      'Selecciona un continente para descubrir destinos increíbles':
        'Select a continent to discover incredible destinations',
      'Cargando continente...': 'Loading continent...',
      'Aún no hay destinos': 'No destinations yet',
      'Pronto añadiremos viajes increíbles a este continente.':
        'We will add incredible trips to this continent soon.',
      'Explora las ciudades disponibles': 'Explore the available cities',
      'Aún no hay ciudades': 'No cities yet',
      'Pronto añadiremos destinos increíbles en este país.':
        'We will add incredible destinations in this country soon.',
      'Destino exclusivo': 'Exclusive destination',
      'Destinos destacados en España.': 'Featured destinations in Spain.',
      'Destinos destacados en Francia.': 'Featured destinations in France.',
      'Destinos destacados en Italia.': 'Featured destinations in Italy.',
      'Destinos destacados en Reino Unido.': 'Featured destinations in the United Kingdom.',
      'Destinos destacados en Alemania.': 'Featured destinations in Germany.',
      'Destinos destacados en Grecia.': 'Featured destinations in Greece.',
      'Destinos destacados en Austria.': 'Featured destinations in Austria.',
      'Destinos destacados en Japón.': 'Featured destinations in Japan.',
      'Destinos destacados en China.': 'Featured destinations in China.',
      'Destinos destacados en Emiratos Árabes Unidos.':
        'Featured destinations in the United Arab Emirates.',
      'Destinos destacados en Tailandia.': 'Featured destinations in Thailand.',
      'Destinos destacados en India.': 'Featured destinations in India.',
      'Destinos destacados en Corea del Sur.': 'Featured destinations in South Korea.',
      'Destinos destacados en Egipto.': 'Featured destinations in Egypt.',
      'Destinos destacados en Marruecos.': 'Featured destinations in Morocco.',
      'Destinos destacados en Sudáfrica.': 'Featured destinations in South Africa.',
      'Destinos destacados en Kenia.': 'Featured destinations in Kenya.',
      'Destinos destacados en Tanzania.': 'Featured destinations in Tanzania.',
      'Destinos destacados en Estados Unidos.': 'Featured destinations in the United States.',
      'Destinos destacados en México.': 'Featured destinations in Mexico.',
      'Destinos destacados en Canadá.': 'Featured destinations in Canada.',
      'Destinos destacados en Argentina.': 'Featured destinations in Argentina.',
      'Destinos destacados en Brasil.': 'Featured destinations in Brazil.',
      'Destinos destacados en Colombia.': 'Featured destinations in Colombia.',
      'Destinos destacados en Perú.': 'Featured destinations in Peru.',
      'Destinos destacados en Chile.': 'Featured destinations in Chile.',
      'Destinos destacados en Australia.': 'Featured destinations in Australia.',
      'Destinos destacados en Nueva Zelanda.': 'Featured destinations in New Zealand.',
      'Destinos destacados en Fiyi.': 'Featured destinations in Fiji.',

      // Hotels list
      'Cargando alojamientos...': 'Loading accommodation...',
      'Volver a destinos': 'Back to destinations',
      'Precio máximo': 'Maximum price',
      'Todos los continentes': 'All continents',
      'Ordenar por': 'Sort by',
      Relevancia: 'Relevance',
      'Precio: menor a mayor': 'Price: low to high',
      'Precio: mayor a menor': 'Price: high to low',
      'Comodidades principales': 'Main amenities',
      'Wifi gratuito': 'Free Wi-Fi',
      'Desayuno incluido': 'Breakfast included',
      'Aire acondicionado': 'Air conditioning',
      'Camas King size': 'King-size beds',
      Piscina: 'Pool',
      Spa: 'Spa',
      Gimnasio: 'Gym',
      'Parking privado': 'Private parking',
      Restaurante: 'Restaurant',
      'Buenas vistas': 'Great views',
      'No hay alojamientos que coincidan con esos filtros.':
        'There are no accommodations matching those filters.',
      Wifi: 'Wi-Fi',
      Desayuno: 'Breakfast',
      'A/C': 'A/C',
      King: 'King',
      Hotel: 'Hotel',
      Apartamento: 'Apartment',
      Resort: 'Resort',
      Hostal: 'Hostel',

      // Hotel detail
      'Cargando información del alojamiento...': 'Loading accommodation information...',
      'Volver a explorar': 'Back to explore',
      'Acerca del hotel': 'About the hotel',
      Galería: 'Gallery',
      Reseñas: 'Reviews',
      'No hay reseñas todavía. ¡Sé el primero en opinar!':
        'There are no reviews yet. Be the first to leave one!',
      'Editar reseña': 'Edit review',
      'Deja tu reseña': 'Leave your review',
      '¿Cómo calificarías tu estancia?': 'How would you rate your stay?',
      Excelente: 'Excellent',
      'Muy bueno': 'Very good',
      Bueno: 'Good',
      Regular: 'Fair',
      Malo: 'Poor',
      'Tu experiencia': 'Your experience',
      '¿Qué fue lo que más te gustó?': 'What did you like the most?',
      'Publicar reseña': 'Publish review',
      'Precio por noche': 'Price per night',
      'Total a pagar': 'Total to pay',
      'Selecciona fechas válidas.': 'Select valid dates.',
      'Necesitas tener una tarjeta asociada a tu cuenta para reservar.':
        'You need to have a card linked to your account to book.',
      'Saldo insuficiente en tu cartera.': 'Insufficient balance in your wallet.',
      'Descripción del hotel': 'Hotel description',
      'Comodidades del hotel': 'Hotel amenities',
      'Habitaciones disponibles': 'Available rooms',
      'Selecciona una habitación compatible con el número de huéspedes.':
        'Select a room compatible with the number of guests.',
      'Huéspedes actuales': 'Current guests',
      'No hay habitaciones disponibles en este hotel.': 'No rooms are available at this hotel.',
      'No hay habitaciones compatibles': 'No compatible rooms',
      'Reduce el número de huéspedes o elige una habitación con más capacidad.':
        'Reduce the number of guests or choose a room with more capacity.',
      Seleccionada: 'Selected',
      'Capacidad insuficiente': 'Insufficient capacity',
      Capacidad: 'Capacity',
      Individual: 'Single',
      Doble: 'Double',
      Suite: 'Suite',
      SOLO_ALOJAMIENTO: 'Room only',
      DESAYUNO: 'Breakfast included',
      MEDIA_PENSION: 'Half board',
      PENSION_COMPLETA: 'Full board',
      TODO_INCLUIDO: 'All inclusive',
      'Solo alojamiento': 'Room only',
      'Media pensión': 'Half board',
      'Pensión completa': 'Full board',
      'Todo incluido': 'All inclusive',
      'Esta habitación no admite tantos huéspedes.': 'This room does not allow that many guests.',
      'Suite recomendada para grupos de hasta 4 personas.':
        'Suite recommended for groups of up to 4 people.',
      Elegida: 'Chosen',
      'Elegir habitación': 'Choose room',
      'Habitación seleccionada': 'Selected room',
      'No hay ninguna habitación compatible seleccionada.': 'No compatible room is selected.',
      'Las suites están pensadas para grupos de hasta 4 personas.':
        'Suites are designed for groups of up to 4 people.',
      'Reservar ahora': 'Book now',
      'Fechas incorrectas': 'Invalid dates',
      'Sin habitaciones disponibles': 'No rooms available',
      'Selecciona una habitación': 'Select a room',
      'Habitación no disponible': 'Room unavailable',
      'Tarjeta necesaria': 'Card required',
      'Saldo insuficiente': 'Insufficient balance',
      'No se pudo completar la reserva': 'The booking could not be completed',
      'Necesitas iniciar sesión para poder realizar una reserva.':
        'You need to sign in to make a booking.',
      'La fecha de salida debe ser posterior a la fecha de entrada.':
        'The check-out date must be after the check-in date.',
      'Debes seleccionar una habitación compatible antes de reservar.':
        'You must select a compatible room before booking.',
      'La habitación seleccionada no tiene capacidad suficiente para los huéspedes indicados.':
        'The selected room does not have enough capacity for the guests entered.',
      'No tienes saldo suficiente en tu cartera para completar esta reserva.':
        'You do not have enough wallet balance to complete this booking.',
      'Hubo un error al reservar. Revisa tu saldo, las fechas o la disponibilidad del hotel.':
        'There was an error booking. Check your balance, dates, or hotel availability.',
      'No tienes saldo suficiente para completar esta reserva.':
        'You do not have enough balance to complete this booking.',
      'Selecciona una habitación compatible para poder reservar.':
        'Select a compatible room to book.',
      'Hoteles similares': 'Similar hotels',
      'Borrar reseña': 'Delete review',
      '¿Seguro que quieres borrar esta reseña?': 'Are you sure you want to delete this review?',
      'No, volver': 'No, go back',
      'Sí, borrar': 'Yes, delete',
      'No se pudo borrar la reseña. Inténtalo de nuevo.':
        'The review could not be deleted. Please try again.',
      'Reserva completada': 'Booking completed',
      'Reserva exitosa!': 'Booking successful!',
      'Tu reserva se ha realizado correctamente.': 'Your booking has been completed successfully.',
      'Esta es una reserva simulada. No existen cargos reales asociados a esta cuenta.':
        'This is a simulated booking. There are no real charges associated with this account.',

      // Trips
      'Gestiona tu historial de reservas y billetes': 'Manage your booking history and tickets',
      'Aún no tienes viajes': 'You do not have any trips yet.',
      'Parece que tu pasaporte está pidiendo algo de acción.':
        'Looks like your passport is asking for some action.',
      'Viajes Próximos': 'Upcoming trips',
      'Viajes Completados': 'Completed trips',
      'Viajes Cancelados': 'Canceled trips',
      Completado: 'Completed',
      Confirmada: 'Confirmed',
      CONFIRMADA: 'CONFIRMED',
      COMPLETADA: 'COMPLETED',
      CANCELADA: 'CANCELED',
      PENDIENTE: 'PENDING',
      'Ver Ticket': 'View Ticket',
      'Ver ticket': 'View ticket',
      'Cancelar viaje': 'Cancel trip',
      'Cancelar reserva': 'Cancel booking',
      '¿Seguro que quieres cancelar este viaje?': 'Are you sure you want to cancel this trip?',
      'Cancelando...': 'Canceling...',
      'Sí, cancelar': 'Yes, cancel',
      'No se pudo cancelar la reserva. Inténtalo de nuevo.':
        'The booking could not be canceled. Please try again.',

      // Profile
      'Por favor, inicia sesión para ver tu perfil.': 'Please sign in to view your profile.',
      'Gestiona tus viajes, entradas y preferencias.':
        'Manage your trips, tickets, and preferences.',
      'Editar Opciones': 'Edit options',
      'Viajes Activos': 'Active trips',
      'Destinos Visitados': 'Visited destinations',
      'Saldo Disponible': 'Available balance',
      'No tienes viajes próximos.': 'You do not have any upcoming trips.',
      '¡Explorar destinos!': 'Explore destinations!',
      'Ver recibo': 'View receipt',
      'Mis Reseñas': 'My Reviews',
      'Aún no has escrito ninguna reseña.': "You haven't written any reviews yet.",
      Puntuación: 'Rating',

      // Receipt
      'Recibo no encontrado': 'Receipt not found',
      'No hemos podido encontrar esta reserva.': 'We could not find this booking.',
      'Abriendo PDF...': 'Opening PDF...',
      'Generando PDF...': 'Generating PDF...',
      'Descargar PDF': 'Download PDF',
      'Reserva confirmada': 'Booking confirmed',
      'Recibo de viaje': 'Travel receipt',
      'Gracias por reservar con ViajesJMJ.': 'Thank you for booking with JMJ Travel.',
      'Código de recibo': 'Receipt code',
      Fechas: 'Dates',
      'Resumen de pago': 'Payment summary',
      Estancia: 'Stay',
      'Total cobrado': 'Total charged',
      'Pago realizado con saldo de la cartera JMJ.': 'Payment made using JMJ wallet balance.',
      '1 noche': '1 night',

      // Login / Register
      'Bienvenido de nuevo': 'Welcome back',
      'Tu próxima aventura te espera': 'Your next adventure is waiting for you',
      'Correo electrónico': 'Email',
      Contraseña: 'Password',
      'tu@email.com': 'your@email.com',
      '¿No tienes cuenta': "Don't have an account",
      'Regístrate aquí': 'Sign up here',
      'Únete a ViajesJMJ': 'Join ViajesJMJ',
      'Crea tu cuenta gratis': 'Create your free account',
      'Juan Pérez': 'John Smith',
      'Confirmar Contraseña': 'Confirm Password',
      'Creando cuenta...': 'Creating account...',
      'Crear Cuenta': 'Create Account',
      '¿Ya tienes cuenta': 'Already have an account',
      'Inicia sesión': 'Sign in',

      // Settings / Cards
      'Métodos de Pago': 'Payment Methods',
      'Tus tarjetas': 'Your cards',
      'Gestiona tus métodos de pago para cargar tu saldo':
        'Manage your payment methods to top up your balance',
      'Añadir nueva': 'Add new',
      'Cartera vacía': 'Empty wallet',
      'No tienes tarjetas vinculadas a tu cuenta.':
        'You do not have any cards linked to your account.',
      'Eliminar tarjeta': 'Delete card',
      'Si eliminas tu tarjeta, tu saldo pasará automáticamente a 0. Esta acción no se puede deshacer.':
        'If you delete your card, your balance will automatically become 0. This action cannot be undone.',
      'Volver a configuración': 'Back to settings',
      'Añadir Tarjeta': 'Add Card',
      'Guardar Tarjeta': 'Save Card',
      'Número de Tarjeta': 'Card Number',
      'Titular de la Tarjeta': 'Card Holder',
      Titular: 'Holder',
      Expiración: 'Expiration',
      Caduca: 'Expires',
      CVV: 'CVV',
      'Tu Nombre': 'Your Name',

      // Search
      'Resultados de búsqueda': 'Search results',
      Buscando: 'Searching',
      'destinos encontrados para tu próxima aventura': 'destinations found for your next adventure',
      'Buscando en el mapa...': 'Searching on the map...',
      'No hemos encontrado nada': 'We could not find anything',
      'No hay destinos que coincidan con tu búsqueda. Prueba con otros términos o explora por continentes.':
        'There are no destinations matching your search. Try other terms or explore by continent.',

      // Admin
      'Panel de Control': 'Control Panel',
      Administración: 'Administration',
      Dashboard: 'Dashboard',
      Usuarios: 'Users',
      Hoteles: 'Hotels',
      'Buscar usuario': 'Search user',
      'Buscar destino': 'Search destination',
      'Buscar hotel': 'Search hotel',
      'Total Usuarios': 'Total Users',
      'Destinos Activos': 'Active Destinations',
      'Total Reservas': 'Total Bookings',
      'Ingresos totales': 'Total revenue',
      'Reservas activas': 'Active bookings',
      'Reservas completadas': 'Completed bookings',
      'Reservas canceladas': 'Canceled bookings',
      'Usuario con más reservas': 'User with most bookings',
      'Gestión de reservas': 'Booking management',
      'Buscar reserva': 'Search booking',
      Todas: 'All',
      Completada: 'Completed',
      'Detalle de reserva': 'Booking details',
      'No hay reservas que coincidan con los filtros.': 'No bookings match the filters.',
      'Gestion de hoteles': 'Hotel management',
      'Anadir hotel': 'Add hotel',
      'Editar hotel': 'Edit hotel',
      'Ordenar por nombre': 'Sort by name',
      'Ordenar por destino': 'Sort by destination',
      'Ordenar por precio': 'Sort by price',
      'Ordenar por reservas': 'Sort by bookings',
      Ciudad: 'City',
      Tipo: 'Type',
      'Precio noche': 'Price per night',
      'No hay hoteles que coincidan con los filtros.': 'No hotels match the filters.',
      HOTEL: 'HOTEL',
      APARTAMENTO: 'APARTMENT',
      RESORT: 'RESORT',
      HOSTAL: 'HOSTEL',
      'Hotel creado': 'Hotel created',
      'Hotel actualizado': 'Hotel updated',
      'Hotel eliminado': 'Hotel deleted',
      'Los cambios del hotel se han guardado correctamente.':
        'The hotel changes have been saved successfully.',
      'El hotel se ha eliminado correctamente.': 'The hotel has been deleted successfully.',
      'Eliminar hotel': 'Delete hotel',
      'No se pudo eliminar el hotel': 'The hotel could not be deleted',
      'No se pudo eliminar el hotel.': 'The hotel could not be deleted.',
      'No se pudo guardar el hotel.': 'The hotel could not be saved.',
      'No se puede borrar un alojamiento con reservas asociadas':
        'Accommodation with associated bookings cannot be deleted',
      'El nombre y el destino son obligatorios.': 'Name and destination are required.',
      Rol: 'Role',
      Saldo: 'Balance',
      Acciones: 'Actions',
      'Lista de Destinos': 'Destination List',
      'Añadir Destino': 'Add Destination',
      'Añadir destino': 'Add destination',
      'Editar destino': 'Edit destination',
      'Editar usuario': 'Edit user',
      'Eliminar usuario': 'Delete user',
      'Eliminar destino': 'Delete destination',
      '¿Seguro que quieres eliminar este usuario? Esta acción no se puede deshacer.':
        'Are you sure you want to delete this user? This action cannot be undone.',
      '¿Seguro que quieres eliminar este destino? Si tiene reservas asociadas, puede que no se pueda borrar.':
        'Are you sure you want to delete this destination? If it has associated bookings, it may not be possible to delete it.',
      'Usuario eliminado': 'User deleted',
      'El usuario se ha eliminado correctamente.': 'The user has been deleted successfully.',
      'No se pudo eliminar el usuario': 'The user could not be deleted',
      'Ha ocurrido un error al eliminar el usuario.': 'An error occurred while deleting the user.',
      'Destino eliminado': 'Destination deleted',
      'El destino se ha eliminado correctamente.': 'The destination has been deleted successfully.',
      'No se pudo eliminar el destino': 'The destination could not be deleted',
      'No se pudo eliminar el destino.': 'The destination could not be deleted.',
      'No se puede borrar un destino con alojamientos asociados':
        'A destination with associated accommodation cannot be deleted',
      'No se puede borrar un administrador': 'An administrator cannot be deleted',
      'Usuario actualizado': 'User updated',
      'El usuario se ha actualizado correctamente.': 'The user has been updated successfully.',
      'Destino actualizado': 'Destination updated',
      'El destino se ha actualizado correctamente.':
        'The destination has been updated successfully.',
      'Destino creado': 'Destination created',
      'El destino se ha creado correctamente.': 'The destination has been created successfully.',
      'Todos los campos son obligatorios.': 'All fields are required.',
      'El precio debe ser mayor que 0.': 'The price must be greater than 0.',
      'No se pudo guardar el destino.': 'The destination could not be saved.',
      'No se pudo guardar el usuario.': 'The user could not be saved.',
      'Panel de Administración': 'Administration Panel',
      Periodo: 'Period',
      'Mes actual': 'Current month',
      'Trimestre actual': 'Current quarter',
      'Semestre actual': 'Current semester',
      'Año actual': 'Current year',
      Reservas: 'Bookings',
      reservas: 'bookings',
      Ingresos: 'Revenue',
      'vs periodo anterior': 'vs previous period',
      'Destino más reservado': 'Most booked destination',
      'Gestión de usuarios': 'User management',
      Usuario: 'User',
      Activas: 'Active',
      Canceladas: 'Canceled',
      'Total gastado': 'Total spent',
      'Sin acciones': 'No actions',
      'Viajes de': 'Trips by',
      'reservas totales': 'total bookings',
      Reserva: 'Booking',
      Estado: 'Status',
      Importe: 'Amount',
      Activa: 'Active',
      Cancelada: 'Canceled',
      USER: 'USER',
      ADMIN: 'ADMIN',
      user: 'user',
      admin: 'admin',

      // Extra footer legal text
      'En ViajesJMJ respetamos la privacidad de los usuarios. Los datos introducidos en la aplicación se usan únicamente para gestionar cuentas, reservas, reseñas y métodos de pago simulados.':
        'At ViajesJMJ we respect user privacy. Data entered in the application is used only to manage accounts, bookings, reviews, and simulated payment methods.',
      'Este proyecto forma parte de una aplicación académica, por lo que la información mostrada tiene finalidad demostrativa.':
        'This project is part of an academic application, so the information shown is for demonstration purposes.',
      'ViajesJMJ permite explorar destinos, reservar alojamientos, consultar tickets y gestionar reseñas dentro de un entorno de demostración.':
        'ViajesJMJ lets you explore destinations, book accommodation, view tickets, and manage reviews in a demonstration environment.',
      'Las reservas, pagos, tickets y recibos generados en la aplicación pertenecen al funcionamiento del proyecto y no representan compras reales.':
        'Bookings, payments, tickets, and receipts generated in the application belong to the project workflow and do not represent real purchases.',
      'Para cualquier consulta sobre el proyecto ViajesJMJ, puedes contactar con el equipo de desarrollo.':
        'For any question about the ViajesJMJ project, you can contact the development team.',

      // Continents
      Europa: 'Europe',
      Asia: 'Asia',
      África: 'Africa',
      America: 'America',
      América: 'America',
      'América del Norte': 'North America',
      'América del Sur': 'South America',
      Oceanía: 'Oceania',
      'Descubre la historia, el arte y una cultura inigualable.':
        'Discover history, art, and an unmatched culture.',
      'Explora maravillas ancestrales y ciudades vanguardistas.':
        'Explore ancient wonders and cutting-edge cities.',
      'Naturaleza salvaje y paisajes únicos en el mundo.':
        'Wild nature and unique landscapes in the world.',
      'Ciudades icónicas y una gran diversidad natural.':
        'Iconic cities and great natural diversity.',
      'Cultura vibrante, selvas y maravillas naturales.':
        'Vibrant culture, jungles, and natural wonders.',
      'Islas paradisíacas y aventuras increíbles.': 'Paradise islands and incredible adventures.',

      // Countries
      España: 'Spain',
      Francia: 'France',
      Italia: 'Italy',
      'Reino Unido': 'United Kingdom',
      Alemania: 'Germany',
      Grecia: 'Greece',
      Austria: 'Austria',
      Japón: 'Japan',
      China: 'China',
      'Emiratos Árabes Unidos': 'United Arab Emirates',
      Tailandia: 'Thailand',
      India: 'India',
      'Corea del Sur': 'South Korea',
      Egipto: 'Egypt',
      Marruecos: 'Morocco',
      Sudáfrica: 'South Africa',
      Kenia: 'Kenya',
      Tanzania: 'Tanzania',
      'Estados Unidos': 'United States',
      México: 'Mexico',
      Canadá: 'Canada',
      Argentina: 'Argentina',
      Brasil: 'Brazil',
      Colombia: 'Colombia',
      Perú: 'Peru',
      Chile: 'Chile',
      Australia: 'Australia',
      'Nueva Zelanda': 'New Zealand',
      Fiyi: 'Fiji',
      Uruguay: 'Uruguay',
      'Polinesia Francesa': 'French Polynesia',
      Portugal: 'Portugal',
      'República Checa': 'Czech Republic',
      Hungría: 'Hungary',
      'Países Bajos': 'Netherlands',
      Croacia: 'Croatia',
      Dinamarca: 'Denmark',
      Suecia: 'Sweden',
      Islandia: 'Iceland',
      Bélgica: 'Belgium',
      Taiwán: 'Taiwan',
      Taiwan: 'Taiwan',
      Malasia: 'Malaysia',
      Camboya: 'Cambodia',
      Nepal: 'Nepal',
      Catar: 'Qatar',
      Israel: 'Israel',

      // Cities
      Madrid: 'Madrid',
      Barcelona: 'Barcelona',
      Sevilla: 'Seville',
      París: 'Paris',
      Lyon: 'Lyon',
      Marsella: 'Marseille',
      Niza: 'Nice',
      Valencia: 'Valencia',
      Roma: 'Rome',
      Venecia: 'Venice',
      Milán: 'Milan',
      Milan: 'Milan',
      Florencia: 'Florence',
      Londres: 'London',
      Edimburgo: 'Edinburgh',
      Manchester: 'Manchester',
      Oxford: 'Oxford',
      Berlín: 'Berlin',
      Múnich: 'Munich',
      Atenas: 'Athens',
      Santorini: 'Santorini',
      Mykonos: 'Mykonos',
      Tesalonica: 'Thessaloniki',
      Viena: 'Vienna',
      Salzburgo: 'Salzburg',
      Innsbruck: 'Innsbruck',
      Graz: 'Graz',
      Ámsterdam: 'Amsterdam',
      Sintra: 'Sintra',
      Faro: 'Faro',
      'Cesky Krumlov': 'Cesky Krumlov',
      'Karlovy Vary': 'Karlovy Vary',
      Brno: 'Brno',
      Eger: 'Eger',
      Pecs: 'Pecs',
      Szentendre: 'Szentendre',
      Rotterdam: 'Rotterdam',
      'La Haya': 'The Hague',
      Utrecht: 'Utrecht',
      Dubrovnik: 'Dubrovnik',
      Split: 'Split',
      Zagreb: 'Zagreb',
      Hvar: 'Hvar',
      Copenhague: 'Copenhagen',
      Aarhus: 'Aarhus',
      Odense: 'Odense',
      Roskilde: 'Roskilde',
      Estocolmo: 'Stockholm',
      Gotemburgo: 'Gothenburg',
      Malmo: 'Malmo',
      Uppsala: 'Uppsala',
      Reykjavik: 'Reykjavik',
      Akureyri: 'Akureyri',
      Vik: 'Vik',
      Hofn: 'Hofn',
      Brujas: 'Bruges',
      Bruselas: 'Brussels',
      Gante: 'Ghent',
      Amberes: 'Antwerp',
      Tokio: 'Tokyo',
      Kioto: 'Kyoto',
      Osaka: 'Osaka',
      Bangkok: 'Bangkok',
      Phuket: 'Phuket',
      Dubái: 'Dubai',
      'Abu Dhabi': 'Abu Dhabi',
      'Nueva Delhi': 'New Delhi',
      Mumbai: 'Mumbai',
      Pekín: 'Beijing',
      Seúl: 'Seoul',
      'Nueva York': 'New York',
      'Los Ángeles': 'Los Angeles',
      Miami: 'Miami',
      'San Francisco': 'San Francisco',
      Chicago: 'Chicago',
      Toronto: 'Toronto',
      Vancouver: 'Vancouver',
      Cancún: 'Cancun',
      'Ciudad de México': 'Mexico City',
      'Río de Janeiro': 'Rio de Janeiro',
      'São Paulo': 'Sao Paulo',
      'Buenos Aires': 'Buenos Aires',
      'Machu Picchu': 'Machu Picchu',
      Cartagena: 'Cartagena',
      'Santiago de Chile': 'Santiago de Chile',
      Montevideo: 'Montevideo',
      'El Cairo': 'Cairo',
      Marrakech: 'Marrakech',
      Nairobi: 'Nairobi',
      Zanzibar: 'Zanzibar',
      Sahara: 'Sahara',
      'Ciudad del Cabo': 'Cape Town',
      Sídney: 'Sydney',
      Sidney: 'Sydney',
      Melbourne: 'Melbourne',
      Auckland: 'Auckland',
      'Bora Bora': 'Bora Bora',
      Perth: 'Perth',

      // Destination descriptions
      'Historia, cultura y arquitectura milenaria': 'History, culture, and ancient architecture',
      'Tradición ancestral y modernidad vibrante': 'Ancient tradition and vibrant modernity',
      'Naturaleza salvaje y ciudades cosmopolitas': 'Wild nature and cosmopolitan cities',
      'Safari, desiertos y culturas ancestrales': 'Safari, deserts, and ancestral cultures',
      'Playas paradisiacas y naturaleza única': 'Paradise beaches and unique nature',
      'La ciudad de la luz, arte y romance': 'The city of light, art, and romance',
      'Ciudad del amor, arte y moda': 'City of love, art, and fashion',
      'Perla de la Costa Azul': 'Pearl of the French Riviera',
      'Capital gastronómica de Francia': 'Gastronomic capital of France',
      'Capital gastronmica de Francia': 'Gastronomic capital of France',
      'Vibrante capital española': 'Vibrant Spanish capital',
      'Vibrante capital espaola': 'Vibrant Spanish capital',
      'Modernismo y mediterráneo': 'Modernism and Mediterranean spirit',
      'Modernismo y mediterrneo': 'Modernism and Mediterranean spirit',
      'Flamenco y tradición andaluza': 'Flamenco and Andalusian tradition',
      'Flamenco y tradicin andaluza': 'Flamenco and Andalusian tradition',
      'La ciudad eterna': 'The eternal city',
      'Historia romana y cultura italiana': 'Roman history and Italian culture',
      'Ciudad moderna con historia': 'Modern city with history',
      'Cuna de la civilización griega': 'Cradle of Greek civilization',
      'Elegancia, música y cultura imperial': 'Elegance, music, and imperial culture',
      'Tecnología avanzada, cultura tradicional y vida urbana vibrante':
        'Advanced technology, traditional culture, and vibrant urban life',
      'Cultura milenaria, gastronomía y contrastes urbanos':
        'Ancient culture, gastronomy, and urban contrasts',
      'Tecnología, cultura moderna y tradición coreana':
        'Technology, modern culture, and Korean tradition',
      'Aventura en el desierto y paisajes únicos': 'Desert adventure and unique landscapes',
      'Naturaleza, montaña y costa espectacular': 'Nature, mountains, and spectacular coast',
      'Volcanes, naturaleza y aventura': 'Volcanoes, nature, and adventure',
      'Destino romántico con aguas turquesas y lujo':
        'Romantic destination with turquoise waters and luxury',
      'Ciudad moderna con naturaleza salvaje': 'Modern city with wild nature',
      'Historia, cultura y gastronomía mexicana': 'Mexican history, culture, and gastronomy',
      'Ciudad moderna con multiculturalidad y rascacielos':
        'Modern city with multicultural life and skyscrapers',
      'Puentes icónicos, tecnología y cultura alternativa':
        'Iconic bridges, technology, and alternative culture',
      'Historia inca y maravilla del mundo en los Andes':
        'Inca history and world wonder in the Andes',
      'Ciudad costera tranquila con cultura y relax':
        'Quiet coastal city with culture and relaxation',
      'Ciudad de canales y romance': 'City of canals and romance',
      'Capital de la moda': 'Fashion capital',
      'Cosmopolita y histórica': 'Cosmopolitan and historic',
      'Cosmopolita y histrica': 'Cosmopolitan and historic',
      'Castillos y leyendas escocesas': 'Castles and Scottish legends',
      'Historia y cultura vanguardista': 'History and avant-garde culture',
      'Tradición bávara': 'Bavarian tradition',
      'Tradicin bvara': 'Bavarian tradition',
      'Alpes suizos y elegancia': 'Swiss Alps and elegance',
      'Lujo y diplomacia internacional': 'Luxury and international diplomacy',
      'Tecnología y tradición': 'Technology and tradition',
      'Tecnologa y tradicin': 'Technology and tradition',
      'Templos y jardines zen': 'Temples and zen gardens',
      'Gastronomía japonesa': 'Japanese gastronomy',
      'Gastronoma japonesa': 'Japanese gastronomy',
      'Templos dorados y mercados': 'Golden temples and markets',
      'Playas paradisiacas': 'Paradise beaches',
      'Lujo y arquitectura futurista': 'Luxury and futuristic architecture',
      'Modernidad árabe': 'Arab modernity',
      'Modernidad rabe': 'Arab modernity',
      'Jardn urbano del futuro': 'Urban garden of the future',
      'Bollywood y diversidad': 'Bollywood and diversity',
      'Historia milenaria': 'Ancient history',
      'La ciudad que nunca duerme': 'The city that never sleeps',
      'Hollywood y playas': 'Hollywood and beaches',
      'Sol, playa y vida nocturna': 'Sun, beach, and nightlife',
      'Carnaval y playas icónicas': 'Carnival and iconic beaches',
      'Carnaval y playas icnicas': 'Carnival and iconic beaches',
      'Metrópoli cultural': 'Cultural metropolis',
      'Metrpoli cultural': 'Cultural metropolis',
      'Tango y arquitectura europea': 'Tango and European architecture',
      'Historia azteca y modernidad': 'Aztec history and modernity',
      'Playas del Caribe mexicano': 'Mexican Caribbean beaches',
      'Multicultural y vibrante': 'Multicultural and vibrant',
      'Naturaleza y ciudad': 'Nature and city',
      'Zocos y palacios': 'Souks and palaces',
      'Pirámides y faraones': 'Pyramids and pharaohs',
      'Pirmides y faraones': 'Pyramids and pharaohs',
      'Montañas y océano': 'Mountains and ocean',
      'Montaas y ocano': 'Mountains and ocean',
      'Ópera icónica y playas': 'Iconic opera house and beaches',
      'pera icnica y playas': 'Iconic opera house and beaches',
      'Arte y café': 'Art and coffee',
      'Arte y caf': 'Art and coffee',
      'Puerto mediterrneo': 'Mediterranean port',
      'Ciudad de velas': 'City of sails',
      'Ópera icónica, playas y cultura urbana australiana':
        'Iconic opera house, beaches, and Australian urban culture',
      'Rascacielos, cultura urbana y la ciudad que nunca duerme':
        'Skyscrapers, urban culture, and the city that never sleeps',
      'Ciudad colonial con playas y encanto caribeño':
        'Colonial city with beaches and Caribbean charm',
      'La ciudad del amor, arte, cultura y gastronomía.':
        'The city of love, art, culture, and gastronomy.',
      'Historia romana, cultura y gastronomía italiana.':
        'Roman history, culture, and Italian gastronomy.',
      'Ciudad moderna con historia, cultura y ocio.':
        'Modern city with history, culture, and entertainment.',
      'Cultura, gastronomía y diversidad.': 'Culture, gastronomy, and diversity.',
      'Ciudad futurista con tecnología, cultura y tradición.':
        'Futuristic city with technology, culture, and tradition.',
      'Historia imperial, cultura china y monumentos icónicos.':
        'Imperial history, Chinese culture, and iconic monuments.',
      'Templos, mercados y vida nocturna exótica.': 'Temples, markets, and exotic nightlife.',
      'Lujo, rascacielos y experiencias en el desierto.':
        'Luxury, skyscrapers, and desert experiences.',
      'Historia antigua, pirámides y cultura egipcia.':
        'Ancient history, pyramids, and Egyptian culture.',
      'Playas paradisíacas y aguas cristalinas.': 'Paradise beaches and crystal-clear waters.',
      'Safari africano y naturaleza salvaje.': 'African safari and wild nature.',
      'Mercados tradicionales, cultura marroquí y arquitectura exótica.':
        'Traditional markets, Moroccan culture, and exotic architecture.',
      'Playas paradisíacas y relax total.': 'Paradise beaches and total relaxation.',
      'Arte, cultura y vida cosmopolita.': 'Art, culture, and cosmopolitan life.',
      'Playas paradisíacas y relax en el Caribe.': 'Paradise beaches and Caribbean relaxation.',
      'Arquitectura, música y ambiente urbano.': 'Architecture, music, and urban atmosphere.',
      'Playas, carnaval y paisajes icónicos como el Cristo Redentor.':
        'Beaches, carnival, and iconic landscapes such as Christ the Redeemer.',
      'Cultura, tango y gastronomía argentina.': 'Culture, tango, and Argentine gastronomy.',
      'Ciudad moderna rodeada de montañas y naturaleza.':
        'Modern city surrounded by mountains and nature.',
      'Islas volcánicas, playas tranquilas y cultura polinesia.':
        'Volcanic islands, quiet beaches, and Polynesian culture.',
      'Hollywood, playas, cultura urbana y ambiente cinematográfico.':
        'Hollywood, beaches, urban culture, and a cinematic atmosphere.',
      'Hoteles destacados en Madrid.': 'Featured hotels in Madrid.',
      'Hoteles destacados en París.': 'Featured hotels in Paris.',
      'Hoteles destacados en Londres.': 'Featured hotels in London.',
      'Hoteles destacados en Roma.': 'Featured hotels in Rome.',
      'Hoteles destacados en Tokio.': 'Featured hotels in Tokyo.',
      'Hoteles destacados en Nueva York.': 'Featured hotels in New York.',

      'Arquitectura modernista, playas urbanas y vida mediterranea.':
        'Modernist architecture, urban beaches, and Mediterranean life.',
      'Catedral, Alcazar, barrios historicos y cultura andaluza.':
        'Cathedral, Alcazar, historic neighborhoods, and Andalusian culture.',
      'Ciudad de las Artes, playas y gastronomia mediterranea.':
        'City of Arts, beaches, and Mediterranean gastronomy.',
      'Gastronomia francesa, casco historico y rios Saona y Rodano.':
        'French gastronomy, old town, and the Saone and Rhone rivers.',
      'Puerto mediterraneo, calanques y cultura provenzal.':
        'Mediterranean port, calanques, and Provençal culture.',
      'Costa Azul, paseo maritimo y ambiente mediterraneo elegante.':
        'French Riviera, seafront promenade, and elegant Mediterranean atmosphere.',
      'Arte renacentista, catedral historica y patrimonio italiano.':
        'Renaissance art, historic cathedral, and Italian heritage.',
      'Canales, gondolas, palacios y plazas iconicas.':
        'Canals, gondolas, palaces, and iconic squares.',
      'Moda, catedral gotica, diseño y vida urbana italiana.':
        'Fashion, Gothic cathedral, design, and Italian urban life.',
      'Castillo, calles medievales, cultura escocesa y festivales.':
        'Castle, medieval streets, Scottish culture, and festivals.',
      'Musica, futbol, patrimonio industrial y cultura urbana.':
        'Music, football, industrial heritage, and urban culture.',
      'Universidad historica, colegios antiguos y arquitectura inglesa.':
        'Historic university, ancient colleges, and English architecture.',
      'Casas blancas, caldera volcanica y atardeceres sobre el Egeo.':
        'White houses, volcanic caldera, and sunsets over the Aegean.',
      'Playas, molinos, casas cicladicas y vida nocturna.':
        'Beaches, windmills, Cycladic houses, and nightlife.',
      'Historia bizantina, paseo maritimo y cultura griega moderna.':
        'Byzantine history, seafront promenade, and modern Greek culture.',
      'Musica clasica, fortalezas, palacios y paisaje alpino.':
        'Classical music, fortresses, palaces, and Alpine scenery.',
      'Montañas alpinas, casco historico y deportes de invierno.':
        'Alpine mountains, old town, and winter sports.',
      'Casco historico, diseño contemporaneo y ambiente universitario.':
        'Old town, contemporary design, and university atmosphere.',
      'Palacios de cuento, bosques y miradores cerca de Lisboa.':
        'Fairytale palaces, forests, and viewpoints near Lisbon.',
      'Costa del Algarve, casco antiguo y playas del sur portugues.':
        'Algarve coast, old town, and southern Portuguese beaches.',
      'Castillo, calles medievales y encanto bohemio junto al rio.':
        'Castle, medieval streets, and Bohemian charm by the river.',
      'Balnearios, columnatas y arquitectura elegante.':
        'Spa resorts, colonnades, and elegant architecture.',
      'Arquitectura moderna, plazas historicas y ambiente universitario.':
        'Modern architecture, historic squares, and university atmosphere.',
      'Castillo, termas, vino y casco historico barroco.':
        'Castle, thermal baths, wine, and Baroque old town.',
      'Patrimonio romano, plazas coloridas y ambiente cultural.':
        'Roman heritage, colorful squares, and cultural atmosphere.',
      'Calles artisticas, museos y ribera del Danubio.':
        'Artistic streets, museums, and the Danube riverfront.',
      'Arquitectura moderna, puerto y skyline neerlandes.':
        'Modern architecture, port, and Dutch skyline.',
      'Palacios, costa, museos y centro politico neerlandes.':
        'Palaces, coast, museums, and Dutch political center.',
      'Canales historicos, torres y ambiente universitario.':
        'Historic canals, towers, and university atmosphere.',
      'Murallas historicas, mar Adriatico y casco antiguo medieval.':
        'Historic walls, Adriatic Sea, and medieval old town.',
      'Palacio de Diocleciano, costa dalmata y vida mediterranea.':
        'Diocletian Palace, Dalmatian coast, and Mediterranean life.',
      'Capital croata con plazas, museos y arquitectura centroeuropea.':
        'Croatian capital with squares, museums, and Central European architecture.',
      'Isla luminosa, puerto historico y playas del Adriatico.':
        'Bright island, historic harbor, and Adriatic beaches.',
      'Canales, diseño nordico, puerto historico y ambiente moderno.':
        'Canals, Nordic design, historic harbor, and modern atmosphere.',
      'Museos, barrios creativos y costa danesa.':
        'Museums, creative neighborhoods, and Danish coast.',
      'Ciudad de Andersen, calles historicas y ambiente familiar.':
        'Andersen city, historic streets, and family-friendly atmosphere.',
      'Catedral, barcos vikingos y patrimonio danes.':
        'Cathedral, Viking ships, and Danish heritage.',
      'Islas, casco antiguo, museos y arquitectura nordica.':
        'Islands, old town, museums, and Nordic architecture.',
      'Canales, costa oeste, gastronomia y ambiente marinero.':
        'Canals, west coast, gastronomy, and maritime atmosphere.',
      'Puente de Oresund, diseño urbano y costa escandinava.':
        'Oresund Bridge, urban design, and Scandinavian coast.',
      'Universidad historica, catedral y vida cultural sueca.':
        'Historic university, cathedral, and Swedish cultural life.',
      'Naturaleza islandesa, auroras, volcanes y aguas termales.':
        'Icelandic nature, northern lights, volcanoes, and hot springs.',
      'Fiordos del norte, naturaleza y ambiente islandes tranquilo.':
        'Northern fjords, nature, and calm Icelandic atmosphere.',
      'Playas negras, acantilados y paisajes volcanicos.':
        'Black beaches, cliffs, and volcanic landscapes.',
      'Glaciares, lagunas y paisajes del sureste islandes.':
        'Glaciers, lagoons, and southeast Icelandic landscapes.',
      'Canales, plazas medievales y arquitectura flamenca.':
        'Canals, medieval squares, and Flemish architecture.',
      'Grand Place, arte, instituciones europeas y gastronomia belga.':
        'Grand Place, art, European institutions, and Belgian gastronomy.',
      'Canales, castillo medieval y ambiente universitario.':
        'Canals, medieval castle, and university atmosphere.',
      'Moda, puerto, diamantes y arquitectura flamenca.':
        'Fashion, port, diamonds, and Flemish architecture.',

      // Common hotel descriptions
      'Hotel moderno y colorido en pleno centro de Madrid.':
        'Modern and colorful hotel in downtown Madrid.',
      'Alojamiento cómodo y bien ubicado para disfrutar de tu viaje.':
        'Comfortable and well-located accommodation to enjoy your trip.',
      'Lujo histórico en el corazón de Madrid, cerca del Museo del Prado.':
        'Historic luxury in the heart of Madrid, near the Prado Museum.',
      'Elegancia parisina en la Avenue Montaigne, con vistas a la Torre Eiffel y alta cocina francesa.':
        'Parisian elegance on Avenue Montaigne, with Eiffel Tower views and French haute cuisine.',
      'Boutique hotel moderno en el distrito 11, perfecto para viajeros urbanos.':
        'Modern boutique hotel in the 11th district, perfect for urban travelers.',
      'Hotel moderno en el corazón de Niza, cerca de la playa y el casco antiguo.':
        'Modern hotel in the heart of Nice, close to the beach and old town.',
      'Elegancia intemporal cerca de Via Veneto.': 'Timeless elegance near Via Veneto.',
      'Palacio del siglo XV en el Gran Canal con vistas excepcionales.':
        '15th-century palace on the Grand Canal with exceptional views.',
      'Diseño minimalista de Giorgio Armani en el corazón de Milán.':
        "Giorgio Armani's minimalist design in the heart of Milan.",
      'Art déco y elegancia británica en Mayfair.': 'Art Deco and British elegance in Mayfair.',
      'Hotel urbano moderno en el vibrante East London.':
        'Modern urban hotel in vibrant East London.',
      'Lujo contemporáneo con vistas al Palacio Imperial.':
        'Contemporary luxury with views of the Imperial Palace.',
      'Hotel moderno en Kabukicho con diseño artístico.':
        'Modern hotel in Kabukicho with artistic design.',
      'El hotel más icónico del mundo en forma de vela.':
        'The most iconic sail-shaped hotel in the world.',
      'Hotel moderno y asequible cerca del Burj Khalifa.':
        'Modern and affordable hotel near the Burj Khalifa.',
      'Elegancia Beaux-Arts en la Quinta Avenida.': 'Beaux-Arts elegance on Fifth Avenue.',
      'Boutique hotel bohemio en el Lower East Side.':
        'Bohemian boutique hotel in the Lower East Side.',
      'Lujo contemporáneo en The Rocks con vistas panorámicas.':
        'Contemporary luxury in The Rocks with panoramic views.',
      'Vistas incomparables de la Ópera y el Harbour Bridge.':
        'Unmatched views of the Opera House and Harbour Bridge.',
      'Iconico hotel Belle époque en la Promenade des Anglais con vistas al Mediterráneo.':
        'Iconic Belle Epoque hotel on the Promenade des Anglais with Mediterranean views.',
      'Antiguo convento convertido en hotel de lujo con vistas espectaculares de Lyon.':
        'Former convent turned luxury hotel with spectacular views of Lyon.',
      'Elegancia y confort en el centro histórico de Lyon.':
        'Elegance and comfort in the historic center of Lyon.',
      'Palacio del siglo XIX restaurado con elegancia contemporánea.':
        '19th-century palace restored with contemporary elegance.',
      'Sofisticación en Paseo de Gracia, con vistas a Gaudí.':
        'Sophistication on Passeig de Gracia, with Gaudi views.',
      'Rascacielos icónico frente al mar con arte contemporáneo.':
        'Iconic seaside skyscraper with contemporary art.',
      'Hotel boutique con panadería artesanal propia.':
        'Boutique hotel with its own artisan bakery.',
      'Palacio andalusí con patios ajardinados y azulejos tradicionales.':
        'Andalusian palace with garden courtyards and traditional tiles.',
      'Vistas directas a la Catedral desde la terraza.': 'Direct cathedral views from the terrace.',
      'Vistas panorámicas de Roma desde el Pincio.': 'Panoramic views of Rome from the Pincio.',
      'Palacio gótico con vistas a la laguna veneciana.':
        'Gothic palace with views of the Venetian lagoon.',
      'Lujo exclusivo con jardín privado en el centro de Milán.':
        'Exclusive luxury with a private garden in central Milan.',
      'Icono londinense en el Strand con historia centenaria.':
        'London icon on the Strand with a century-old history.',
      'A orillas del río Kamogawa, fusionando tradición y lujo moderno.':
        'On the banks of the Kamogawa River, blending tradition and modern luxury.',
      'Refugio tradicional en Arashiyama con onsen privado.':
        'Traditional retreat in Arashiyama with private onsen.',
      'Elegancia occidental en el centro comercial de Osaka.':
        'Western elegance in Osaka shopping district.',
      'Hotel familiar de lujo con jardín privado junto al lago.':
        'Luxury family hotel with a private garden by the lake.',
      'Resort temático con parque acuático y acuario.':
        'Themed resort with a water park and aquarium.',
      'Icono histórico de Nueva York frente a Central Park.':
        'Historic New York icon facing Central Park.',
      'Completa todos los campos para crear tu cuenta.':
        'Complete all fields to create your account.',
      'El nombre debe tener al menos 3 caracteres.': 'The name must be at least 3 characters long.',
      'Introduce un correo electrónico válido.': 'Enter a valid email address.',
      'La contraseña debe tener al menos 6 caracteres.':
        'The password must be at least 6 characters long.',
      'Las contraseñas no coinciden.': 'Passwords do not match.',
      'No se pudo conectar con el servidor. Comprueba que el backend esté abierto.':
        'Could not connect to the server. Check that the backend is running.',
      'Ya existe una cuenta con ese correo electrónico.':
        'An account with that email already exists.',
      'Revisa los datos introducidos e inténtalo de nuevo.':
        'Review the entered data and try again.',
      'No se pudo crear la cuenta. Inténtalo de nuevo más tarde.':
        'The account could not be created. Please try again later.',
      'Introduce tu correo electrónico y contraseña.': 'Enter your email and password.',
      'Correo electrónico o contraseña incorrectos.': 'Incorrect email or password.',
      'No se pudo iniciar sesión. Inténtalo de nuevo más tarde.':
        'Could not sign in. Please try again later.',
      'Introduce tu correo electrónico.': 'Enter your email address.',
      'Introduce tu contraseña.': 'Enter your password.',
      'Introduce tu nombre completo.': 'Enter your full name.',
      'Introduce una contraseña.': 'Enter a password.',
      'Ya existe una cuenta con ese nombre de usuario.':
        'An account with that username already exists.',
      'Usuario registrado correctamente.': 'User registered successfully.',

      // Final translations - profile, rooms, tickets, bookings and user detail modal
      'Editar perfil': 'Edit profile',
      Avatar: 'Avatar',
      'El nombre y el email son obligatorios.': 'Name and email are required.',
      'No se pudo actualizar el perfil.': 'The profile could not be updated.',
      'Puedes usar una URL de imagen para tu avatar.': 'You can use an image URL for your avatar.',
      'Km Recorridos': 'Distance traveled',
      'Km recorridos': 'Distance traveled',

      'Cargando hotel...': 'Loading hotel...',
      'Ubicación no disponible': 'Location not available',
      'No compatible': 'Not compatible',
      'Esta habitación no es compatible con el número de huéspedes indicado.':
        'This room is not compatible with the selected number of guests.',
      'Esta habitación no es compatible con los huéspedes indicados.':
        'This room is not compatible with the selected guests.',
      'La habitación seleccionada no es compatible con los huéspedes indicados.':
        'The selected room is not compatible with the selected guests.',
      'La habitación seleccionada no es compatible con el número de huéspedes':
        'The selected room is not compatible with the number of guests.',
      'La habitación seleccionada no es compatible con el número de huéspedes.':
        'The selected room is not compatible with the number of guests.',
      'Reduce el número de huéspedes o elige otra reserva.':
        'Reduce the number of guests or choose another booking.',

      Habitación: 'Room',
      'Habitación individual': 'Single room',
      'Habitación Individual': 'Single room',
      'Habitación doble': 'Double room',
      'Habitación Doble': 'Double room',
      'Habitación deluxe': 'Deluxe room',
      'Habitación Deluxe': 'Deluxe room',
      'Habitación estándar': 'Standard room',
      'Habitación Estándar': 'Standard room',
      'Habitacion Estandar': 'Standard room',
      'Habitación grupal': 'Group room',
      'Habitación Grupal': 'Group room',
      'Habitación familiar': 'Family room',
      'Habitacion Familiar': 'Family room',
      Grupal: 'Group',
      Familiar: 'Family',
      Estándar: 'Standard',
      Estandar: 'Standard',
      Deluxe: 'Deluxe',

      'Habitación grupal recomendada para grupos de 5 a 8 personas.':
        'Group room recommended for groups of 5 to 8 people.',
      'Suite recomendada para grupos de 3 o 4 personas.':
        'Suite recommended for groups of 3 or 4 people.',
      'Habitación recomendada para 1 o 2 personas.': 'Room recommended for 1 or 2 people.',
      'Habitación individual recomendada para 1 persona.': 'Single room recommended for 1 person.',
      'Puedes elegir cualquier habitación con capacidad suficiente.':
        'You can choose any room with enough capacity.',
      'Para 2 huéspedes puedes elegir habitación doble, suite o habitación grupal.':
        'For 2 guests you can choose a double room, suite, or group room.',
      'Para 2 huéspedes puedes elegir habitación doble, estándar/deluxe, suite o habitación grupal.':
        'For 2 guests you can choose a double, standard/deluxe, suite, or group room.',
      'Para 3 o 4 huéspedes puedes elegir suite o habitación grupal.':
        'For 3 or 4 guests you can choose a suite or group room.',
      'Para 5 a 8 huéspedes solo puedes elegir habitación grupal.':
        'For 5 to 8 guests you can only choose a group room.',
      '1 huésped: cualquier habitación compatible. 2 huéspedes: doble, suite o grupal. 3-4 huéspedes: suite o grupal. 5-8 huéspedes: solo grupal.':
        '1 guest: any compatible room. 2 guests: double, suite, or group room. 3-4 guests: suite or group room. 5-8 guests: group room only.',
      '1 huésped: cualquier habitación compatible. 2 huéspedes: doble, estándar/deluxe, suite o grupal. 3-4 huéspedes: suite o grupal. 5-8 huéspedes: solo grupal.':
        '1 guest: any compatible room. 2 guests: double, standard/deluxe, suite, or group room. 3-4 guests: suite or group room. 5-8 guests: group room only.',

      'Escribir una reseña': 'Write a review',
      'Cuenta tu experiencia en este hotel...': 'Share your experience at this hotel...',
      'Este hotel todavía no tiene reseñas.': 'This hotel does not have any reviews yet.',
      'También te puede interesar': 'You may also be interested in',
      'Necesitas iniciar sesión para escribir una reseña.':
        'You need to sign in to write a review.',

      AVION: 'PLANE',
      TREN: 'TRAIN',
      BARCO: 'SHIP',

      'Inicia sesión para poder reservar este hotel.': 'Sign in to book this hotel.',
      'Necesitas añadir una tarjeta en tu perfil antes de reservar.':
        'You need to add a card to your profile before booking.',
      'Comprobando tarjeta': 'Checking card',
      'Estamos comprobando tus métodos de pago. Inténtalo de nuevo en unos segundos.':
        'We are checking your payment methods. Try again in a few seconds.',
      'Procesando...': 'Processing...',
      'Reservando...': 'Booking...',
      'Reservar igualmente': 'Book anyway',
      'Ya tienes un viaje en esas fechas': 'You already have a trip on those dates',
      'Hemos encontrado otro viaje que coincide con las fechas que has elegido. Puedes cancelar o reservar igualmente.':
        'We found another trip that overlaps with the dates you selected. You can cancel or book anyway.',
      'Nueva reserva': 'New booking',
      'Viajes que coinciden': 'Overlapping trips',

      'Las fechas son obligatorias': 'Dates are required',
      'Transporte inválido': 'Invalid transport',
      'Usuario no encontrado': 'User not found',
      'Habitación no encontrada': 'Room not found',
      'La habitación no tiene capacidad suficiente': 'The room does not have enough capacity',
      'El máximo permitido es de 8 huéspedes': 'The maximum allowed is 8 guests',
      'Error interno al crear la reserva': 'Internal error while creating the booking',
      'Usuario no autenticado': 'User not authenticated',
      'Reserva no encontrada': 'Booking not found',
      'La reserva ya está cancelada': 'The booking is already canceled',

      'Ficha de usuario': 'User profile',
      'Detalle de usuario': 'User details',
      'Información del usuario': 'User information',
      'Datos del usuario': 'User details',
      'Reservas del usuario': 'User bookings',
      'Reseñas del usuario': 'User reviews',
      'Destinos únicos': 'Unique destinations',
      'Viajes realizados': 'Completed trips',
      'Viajes pendientes': 'Pending trips',
      'Tarjeta asociada': 'Linked card',
      'Sin tarjeta': 'No card',
      'Ver ficha': 'View details',
      'Cerrar detalle': 'Close details',
      'No hay datos disponibles.': 'No data available.',

      'usuarios encontrados': 'users found',
      'destinos encontrados': 'destinations found',
      'hoteles encontrados': 'hotels found',
      de: 'of',
      Anterior: 'Previous',
      Siguiente: 'Next',
      Página: 'Page',

      'Cargando ficha del usuario...': 'Loading user profile card...',
      Error: 'Error',
      Pendientes: 'Pending',
      Realizados: 'Completed',
      Cancelados: 'Canceled',
      'Datos de cuenta': 'Account data',
      Tarjeta: 'Card',
      Terminación: 'Ending',
      Entidad: 'Bank',
      'Este usuario no tiene tarjeta guardada.': 'This user has no saved card.',

      'Viajes cancelados': 'Canceled trips',
      'No hay viajes pendientes.': 'There are no pending trips.',
      'No hay viajes realizados.': 'There are no completed trips.',
      'No hay viajes cancelados.': 'There are no canceled trips.',
      'No hay reservas del usuario.': 'This user has no bookings.',
      'Este usuario no tiene reseñas.': 'This user has no reviews.',
      'No hay usuarios que coincidan con los filtros.': 'No users match the filters.',
      'No se pudo cargar la ficha del usuario.': 'The user profile card could not be loaded.',
      'Ver alojamientos': 'View accommodation',
      'Cargando hoteles...': 'Loading hotels...',
      Reintentar: 'Try again',
      'No se pudieron cargar los hoteles.': 'Hotels could not be loaded.',
      'No hay destinos que coincidan con los filtros.': 'No destinations match the filters.',
      'Nombre Completo': 'Full name',
      opiniones: 'reviews',
      Exp: 'Exp',
      'Error al guardar la tarjeta.': 'Error saving the card.',
      'Tarjeta eliminada': 'Card deleted',
      'La tarjeta se ha eliminado correctamente y tu saldo se ha puesto a 0.':
        'The card has been deleted successfully and your balance has been set to 0.',
      'No se pudo eliminar la tarjeta': 'The card could not be deleted',
      'Ha ocurrido un error al borrar la tarjeta. Inténtalo de nuevo.':
        'An error occurred while deleting the card. Please try again.',
      'No se ha podido generar el PDF. Inténtalo de nuevo.':
        'The PDF could not be generated. Please try again.',
      'Esta habitación no es compatible con el número de huéspedes seleccionado.':
        'This room is not compatible with the selected number of guests.',
      '¿Seguro que quieres eliminar este hotel?': 'Are you sure you want to delete this hotel?',
    },
  };

  constructor() {
    const savedLang = this.getSavedLanguage();
    this.currentLang.set(savedLang);
    this.applyDocumentLanguage(savedLang);
  }

  translate(key: string | null | undefined): string {
    if (!key) return '';

    const lang = this.currentLang();
    const dictionary = this.dictionary[lang] ?? {};

    const cleanKey = this.normalizeText(key);
    const directTranslation = dictionary[cleanKey];

    if (directTranslation) {
      return directTranslation;
    }

    const comparableKey = this.toComparableKey(cleanKey);
    const foundEntry = Object.entries(dictionary).find(
      ([entryKey]) => this.toComparableKey(entryKey) === comparableKey,
    );

    if (foundEntry?.[1]) {
      return foundEntry[1];
    }

    const dynamicTranslation = this.translateDynamicText(cleanKey);

    if (dynamicTranslation) {
      return dynamicTranslation;
    }

    if (cleanKey.includes(',')) {
      return cleanKey
        .split(',')
        .map((part) => this.translate(part.trim()))
        .join(', ');
    }

    return cleanKey;
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    this.saveLanguage(lang);
    this.applyDocumentLanguage(lang);
  }

  private getSavedLanguage(): Language {
    if (typeof localStorage === 'undefined') {
      return 'es';
    }

    const savedLang = localStorage.getItem(this.storageKey);

    return savedLang === 'en' || savedLang === 'es' ? savedLang : 'es';
  }

  private saveLanguage(lang: Language): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(this.storageKey, lang);
  }

  private applyDocumentLanguage(lang: Language): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.lang = lang;
  }

  private normalizeText(value: string): string {
    return this.fixCommonMojibake(this.fixMojibake(value)).replace(/\s+/g, ' ').trim();
  }

  private toComparableKey(value: string): string {
    return this.normalizeText(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,:;'"’`´()[\]{}_/\\|-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private fixCommonMojibake(value: string): string {
    return value
      .replaceAll('\u00c3\u00a1', '\u00e1')
      .replaceAll('\u00c3\u00a9', '\u00e9')
      .replaceAll('\u00c3\u00ad', '\u00ed')
      .replaceAll('\u00c3\u00b3', '\u00f3')
      .replaceAll('\u00c3\u00ba', '\u00fa')
      .replaceAll('\u00c3\u0081', '\u00c1')
      .replaceAll('\u00c3\u0089', '\u00c9')
      .replaceAll('\u00c3\u008d', '\u00cd')
      .replaceAll('\u00c3\u0093', '\u00d3')
      .replaceAll('\u00c3\u009a', '\u00da')
      .replaceAll('\u00c3\u00b1', '\u00f1')
      .replaceAll('\u00c3\u0091', '\u00d1')
      .replaceAll('\u00c3\u00bc', '\u00fc')
      .replaceAll('\u00c3\u009c', '\u00dc')
      .replaceAll('\u00c2\u00bf', '\u00bf')
      .replaceAll('\u00c2\u00a1', '\u00a1')
      .replaceAll('\u00c2\u00b7', '\u00b7')
      .replaceAll('\u00e2\u0082\u00ac', '\u20ac')
      .replaceAll('\u00e2\u0080\u0093', '-')
      .replaceAll('\u00e2\u0080\u0094', '-')
      .replaceAll('\u00e2\u0080\u00a6', '...')
      .replaceAll('\u00e2\u0080\u0099', "'")
      .replaceAll('\u00e2\u0080\u009c', '"')
      .replaceAll('\u00e2\u0080\u009d', '"')
      .replaceAll('\u00c2', '');
  }

  private fixMojibake(value: string): string {
    return value
      .replaceAll('Ã¡', 'á')
      .replaceAll('Ã©', 'é')
      .replaceAll('Ã­', 'í')
      .replaceAll('Ã³', 'ó')
      .replaceAll('Ãº', 'ú')
      .replaceAll('ÃÁ', 'Á')
      .replaceAll('Ã‰', 'É')
      .replaceAll('Ã�', 'Í')
      .replaceAll('Ã“', 'Ó')
      .replaceAll('Ãš', 'Ú')
      .replaceAll('Ã±', 'ñ')
      .replaceAll('Ã‘', 'Ñ')
      .replaceAll('Ã¼', 'ü')
      .replaceAll('Ãœ', 'Ü')
      .replaceAll('Â¿', '¿')
      .replaceAll('Â¡', '¡')
      .replaceAll('â‚¬', '€')
      .replaceAll('â†’', '→')
      .replaceAll('â€™', '’')
      .replaceAll('â€œ', '“')
      .replaceAll('â€', '”');
  }

  private translateDynamicText(value: string): string | null {
    if (this.currentLang() !== 'en') {
      return null;
    }

    const destinationDescription = value.match(
      /^(.+) destaca por sus (.+), una parada imprescindible para conocer (.+)\.$/i,
    );
    if (destinationDescription) {
      return `${this.translate(destinationDescription[1])} stands out for its ${this.translateDestinationTheme(destinationDescription[2])}, an essential stop to discover ${this.translate(destinationDescription[3])}.`;
    }

    const improvedDestinationDescription = this.translateImprovedDestinationDescription(value);
    if (improvedDestinationDescription) {
      return improvedDestinationDescription;
    }

    const hotelName = value.match(/^Hotel (Central|Grand Palace|Boutique|Vista) (.+)$/i);
    if (hotelName) {
      const hotelStyle = this.translateHotelStyle(hotelName[1]);
      return `${hotelStyle} Hotel ${this.translate(hotelName[2])}`;
    }

    const featuredHotels = value.match(/^Hoteles destacados en (.+)\.$/i);
    if (featuredHotels) {
      return `Featured hotels in ${this.translate(featuredHotels[1])}.`;
    }

    const featuredDestinations = value.match(/^Destinos destacados en (.+)\.$/i);
    if (featuredDestinations) {
      return `Featured destinations in ${this.translate(featuredDestinations[1])}.`;
    }

    const accommodationIn = value.match(/^Alojamiento cómodo y bien ubicado en (.+)\.$/i);
    if (accommodationIn) {
      return `Comfortable and well-located accommodation in ${this.translate(accommodationIn[1])}.`;
    }

    const cleanAccommodationIn = value.match(/^Alojamiento cómodo y bien ubicado en (.+)\.$/i);
    if (cleanAccommodationIn) {
      return `Comfortable and well-located accommodation in ${this.translate(cleanAccommodationIn[1])}.`;
    }

    const cleanHotelIn = value.match(
      /^Hotel cómodo y bien ubicado en (.+), ideal para descansar después de descubrir la ciudad\.$/i,
    );
    if (cleanHotelIn) {
      return `Comfortable and well-located hotel in ${this.translate(cleanHotelIn[1])}, ideal for resting after discovering the city.`;
    }

    const cleanShortHotelIn = value.match(/^Hotel cómodo y bien ubicado en (.+)\.$/i);
    if (cleanShortHotelIn) {
      return `Comfortable and well-located hotel in ${this.translate(cleanShortHotelIn[1])}.`;
    }

    const shortHotelIn = value.match(/^Hotel cÃ³modo y bien ubicado en (.+)\.$/i);
    if (shortHotelIn) {
      return `Comfortable and well-located hotel in ${this.translate(shortHotelIn[1])}.`;
    }

    const hotelIn = value.match(
      /^Hotel cómodo y bien ubicado en (.+), ideal para descansar después de descubrir la ciudad\.$/i,
    );
    if (hotelIn) {
      return `Comfortable and well-located hotel in ${this.translate(hotelIn[1])}, ideal for resting after discovering the city.`;
    }

    const shortHotelInClean = value.match(/^Hotel cómodo y bien ubicado en (.+)\.$/i);
    if (shortHotelInClean) {
      return `Comfortable and well-located hotel in ${this.translate(shortHotelInClean[1])}.`;
    }

    const hotelInClean = value.match(
      /^Hotel cómodo y bien ubicado en (.+), ideal para descansar después de descubrir la ciudad\.$/i,
    );
    if (hotelInClean) {
      return `Comfortable and well-located hotel in ${this.translate(hotelInClean[1])}, ideal for resting after discovering the city.`;
    }

    return null;
  }

  private translateImprovedDestinationDescription(value: string): string | null {
    const patterns: Array<[RegExp, (match: RegExpMatchArray) => string]> = [
      [
        /^(.+) ofrece patrimonio urbano, buena gastronomía y espacios culturales para descubrir (.+) con calma\.$/i,
        (match) =>
          `${this.translate(match[1])} offers urban heritage, good gastronomy, and cultural spaces to discover ${this.translate(match[2])} at an easy pace.`,
      ],
      [
        /^(.+) combina arquitectura, historia local y una vida urbana activa en uno de los destinos destacados de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} combines architecture, local history, and active city life in one of ${this.translate(match[2])}'s featured destinations.`,
      ],
      [
        /^(.+) es una opción equilibrada para disfrutar de cultura, paseos céntricos y servicios turísticos de calidad en (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} is a balanced choice for culture, central walks, and quality tourist services in ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) reúne tradición, ambiente local y una oferta cómoda para una escapada urbana por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} brings together tradition, local atmosphere, and a comfortable offer for an urban getaway in ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) combina patrimonio, mercados y contrastes urbanos para conocer una parte representativa de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} combines heritage, markets, and urban contrasts to discover a representative side of ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) destaca por su energía local, su gastronomía y sus recorridos culturales dentro de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} stands out for its local energy, gastronomy, and cultural routes within ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) ofrece historia, paisajes singulares y una cultura local muy presente en la experiencia de viaje por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} offers history, distinctive landscapes, and a strong local culture throughout a trip to ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) ofrece templos, barrios activos y experiencias urbanas pensadas para explorar (.+) con comodidad\.$/i,
        (match) =>
          `${this.translate(match[1])} offers temples, active neighborhoods, and urban experiences designed to explore ${this.translate(match[2])} comfortably.`,
      ],
      [
        /^(.+) permite acercarse a la historia, la vida cotidiana y los paisajes más reconocibles de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} offers a closer look at the history, daily life, and most recognizable landscapes of ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) combina patrimonio, naturaleza y ambiente urbano para descubrir (.+) desde una perspectiva cercana\.$/i,
        (match) =>
          `${this.translate(match[1])} combines heritage, nature, and urban atmosphere to discover ${this.translate(match[2])} from a local perspective.`,
      ],
      [
        /^(.+) destaca por sus colores, mercados y espacios culturales dentro de una ruta completa por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} stands out for its colors, markets, and cultural spaces within a complete route through ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) es una base interesante para disfrutar de tradición, gastronomía y paisajes característicos de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} is an interesting base for enjoying tradition, gastronomy, and characteristic landscapes in ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) combina barrios dinámicos, espacios culturales y servicios turísticos consolidados para visitar (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} combines dynamic neighborhoods, cultural spaces, and reliable tourist services for visiting ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) destaca por su vida urbana, sus paisajes reconocibles y una oferta variada para recorrer (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} stands out for city life, recognizable landscapes, and a varied offer for exploring ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) ofrece avenidas, ocio local y puntos de interés adecuados para una estancia cómoda en (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} offers avenues, local leisure, and points of interest for a comfortable stay in ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) reúne cultura, gastronomía y buenas conexiones para descubrir una zona destacada de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} brings together culture, gastronomy, and good connections for discovering a featured area of ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) combina patrimonio, paisajes naturales y gastronomía local para una ruta completa por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} combines heritage, natural landscapes, and local gastronomy for a complete route through ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) destaca por sus barrios con carácter, espacios históricos y ambiente cercano dentro de (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} stands out for characterful neighborhoods, historic spaces, and a welcoming atmosphere within ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) ofrece cultura urbana, naturaleza y buenas propuestas de ocio para conocer (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} offers urban culture, nature, and good leisure options for discovering ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) es un destino atractivo para disfrutar de historia, color local y recorridos panorámicos por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} is an attractive destination for history, local color, and scenic routes through ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) destaca por sus paisajes costeros, naturaleza abierta y ambiente relajado para descubrir (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} stands out for coastal landscapes, open nature, and a relaxed atmosphere for discovering ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) combina playas, cultura local y experiencias al aire libre en una ruta representativa por (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} combines beaches, local culture, and outdoor experiences on a representative route through ${this.translate(match[2])}.`,
      ],
      [
        /^(.+) ofrece lagunas, costas y un entorno tranquilo para disfrutar de (.+) sin prisas\.$/i,
        (match) =>
          `${this.translate(match[1])} offers lagoons, coastlines, and a calm setting to enjoy ${this.translate(match[2])} without rushing.`,
      ],
      [
        /^(.+) es una opción adecuada para viajeros que buscan naturaleza, mar y cultura local en (.+)\.$/i,
        (match) =>
          `${this.translate(match[1])} is a suitable option for travelers looking for nature, sea, and local culture in ${this.translate(match[2])}.`,
      ],
    ];

    for (const [pattern, translateMatch] of patterns) {
      const match = value.match(pattern);
      if (match) {
        return translateMatch(match);
      }
    }

    return null;
  }

  private translateHotelStyle(value: string): string {
    const normalized = this.toComparableKey(value);

    if (normalized === 'central') return 'Central';
    if (normalized === 'grand palace') return 'Grand Palace';
    if (normalized === 'boutique') return 'Boutique';
    if (normalized === 'vista') return 'View';

    return value;
  }

  private translateDestinationTheme(value: string): string {
    const normalized = this.toComparableKey(value);
    const themes: Record<string, string> = {
      'centros historicos plazas animadas y patrimonio europeo':
        'historic centers, lively squares, and European heritage',
      'arquitectura museos y vida urbana con mucho caracter':
        'architecture, museums, and urban life with plenty of character',
      'barrios antiguos cafes y rutas culturales': 'old neighborhoods, cafes, and cultural routes',
      'templos mercados y contrastes urbanos': 'temples, markets, and urban contrasts',
      'tradiciones locales gastronomia y grandes paisajes asiaticos':
        'local traditions, gastronomy, and great Asian landscapes',
      'historia tecnologia y vida callejera intensa':
        'history, technology, and intense street life',
      'paisajes naturales mercados y cultura local':
        'natural landscapes, markets, and local culture',
      'historia colores urbanos y experiencias africanas':
        'history, colorful cities, and African experiences',
      'patrimonio naturaleza y gastronomia regional': 'heritage, nature, and regional gastronomy',
      'playas grandes avenidas y cultura norteamericana':
        'beaches, wide avenues, and North American culture',
      'barrios vivos musica y paisajes reconocibles':
        'lively neighborhoods, music, and recognizable landscapes',
      'centros historicos costa y ocio urbano': 'historic centers, coastline, and urban leisure',
      'paisajes andinos barrios historicos y cultura sudamericana':
        'Andean landscapes, historic neighborhoods, and South American culture',
      'naturaleza plazas coloniales y gastronomia local':
        'nature, colonial squares, and local gastronomy',
      'color urbano tradicion y rutas panoramicas': 'urban color, tradition, and scenic routes',
      'playas lagunas y naturaleza del pacifico': 'beaches, lagoons, and Pacific nature',
      'paisajes oceanicos cultura local y relax': 'ocean landscapes, local culture, and relaxation',
      'islas costas y experiencias al aire libre': 'islands, coastlines, and outdoor experiences',
    };

    return themes[normalized] || value;
  }
}
