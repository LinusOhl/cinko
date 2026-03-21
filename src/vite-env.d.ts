interface ImportMetaEnv {
  readonly VITE_TMDB_ACCESS_TOKEN: string;
  readonly VITE_BETTER_AUTH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
