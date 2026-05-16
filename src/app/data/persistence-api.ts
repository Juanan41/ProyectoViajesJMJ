// ProyectoViajesJMJ - data\persistence-api.ts
// Responsabilidad: integracion entre capas de API, persistencia y logica de negocio.
// Nota profesional: Modulo de soporte del proyecto; revisar dependencias antes de cambiar su contrato publico.

const API_BASE_URL_STORAGE_KEY = 'jmj_api_base_url';

declare global {
  interface Window {
    __JMJ_API_BASE_URL__: string;
  }
}

function normalizeBaseUrl(value: string | undefined | null): string {
  const baseUrl = (value ?? 'http://localhost:8080/api').trim();
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function getPersistenceApiBaseUrl(): string {
  if (typeof window === 'undefined') return '';
  const runtimeBaseUrl = normalizeBaseUrl(window.__JMJ_API_BASE_URL__);
  if (runtimeBaseUrl) return runtimeBaseUrl;
  const localStorageBaseUrl = normalizeBaseUrl(
    window.localStorage.getItem(API_BASE_URL_STORAGE_KEY),
  );
  return localStorageBaseUrl;
}

function getAuthHeaders(): Record<string, string> {
  const token = window.localStorage.getItem('jmj_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchRemoteStore<T>(path: string): Promise<T | null> {
  const apiBaseUrl = getPersistenceApiBaseUrl();
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...getAuthHeaders(),
      },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function postRemoteStore<T, R = any>(path: string, payload: T): Promise<R | null> {
  const apiBaseUrl = getPersistenceApiBaseUrl();
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    return (await response.json()) as R;
  } catch {
    return null;
  }
}

export async function putRemoteStore<T>(path: string, payload: T): Promise<boolean> {
  const apiBaseUrl = getPersistenceApiBaseUrl();
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function deleteRemoteStore(path: string): Promise<boolean> {
  const apiBaseUrl = getPersistenceApiBaseUrl();
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
