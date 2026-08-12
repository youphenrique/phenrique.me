interface ImportMetaEnv {
  readonly PUBLIC_VERCEL_BLOB_STORAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
