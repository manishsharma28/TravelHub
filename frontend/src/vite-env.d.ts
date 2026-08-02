/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Leave empty to call the same origin (the Amplify rewrite handles /api/*). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
