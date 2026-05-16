// ProyectoViajesJMJ - data\destino-api.ts
// Responsabilidad: catalogo de destinos, navegacion geografica y busqueda.
// Nota profesional: Soporta navegacion por destinos, paises, continentes y busqueda bilingue.

/**
 * Contrato publico usado por componentes y servicios relacionados.
 */
export interface DestinoApi {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  pais: string;
  continente: string;
  imagen: string;
}
