/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_NODE_ENV:string;
    // add more as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  