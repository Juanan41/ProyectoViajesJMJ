const API_BASE_URL_STORAGE_KEY = 'jmj_api_base_url';

declare global {
    interface Window {
        __JMJ_API_BASE_URL__?: string;
    }
}

function normalizeBaseUrl(value: string | undefined | null): string {
    const baseUrl = (value ?? '').trim();
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

export function getPersistenceApiBaseUrl(): string {
    if (typeof window === 'undefined') return '';

    const runtimeBaseUrl = normalizeBaseUrl(window.__JMJ_API_BASE_URL__);
    if (runtimeBaseUrl) return runtimeBaseUrl;

    const localStorageBaseUrl = normalizeBaseUrl(window.localStorage.getItem(API_BASE_URL_STORAGE_KEY));
    return localStorageBaseUrl;
}

export async function fetchRemoteStore<T>(path: string): Promise<T | null> {
    const apiBaseUrl = getPersistenceApiBaseUrl();
    if (!apiBaseUrl) return null;

    try {
        const response = await fetch(`${apiBaseUrl}${path}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) return null;
        return (await response.json()) as T;
    } catch {
        return null;
    }
}

export async function putRemoteStore<T>(path: string, payload: T): Promise<boolean> {
    const apiBaseUrl = getPersistenceApiBaseUrl();
    if (!apiBaseUrl) return false;

    try {
        const response = await fetch(`${apiBaseUrl}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return response.ok;
    } catch {
        return false;
    }
}
