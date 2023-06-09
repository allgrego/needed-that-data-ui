export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!BACKEND_BASE_URL) throw new Error("Backend URL is not defined");

export const BACKEND_API_KEY = process.env.BACKEND_API_KEY;
