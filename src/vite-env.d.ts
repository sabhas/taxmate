/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAP_API_KEY: string
  readonly VITE_APP_EMAIL_SERVICE_ID: string
  readonly VITE_APP_EMAIL_TEMPLATE_ID: string
  readonly VITE_APP_EMAIL_ACCOUNT_ID: string
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
