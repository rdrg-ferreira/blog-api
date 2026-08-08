const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export default async function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    const headers = new Headers(options.headers || {});

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const fullUrl = url.startsWith("http") ? url : `${API_BASE}${url}`;

    return fetch(fullUrl, {
        ...options,
        headers,
    });
}