export const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!BACKEND_BASE_URL)
  throw new Error("BACKEND_BASE_URL is not set as environment variable");

export const BACKEND_API_KEY = process.env.BACKEND_API_KEY;
