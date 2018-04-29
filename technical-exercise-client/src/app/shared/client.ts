export interface Client {
  client_id: string;
  signing_keys: SigningKey[];
  app_type: string;
  token_endpoint_auth_method: string;
  addons: null;
  allowed_clients: null;
  allowed_logout_urls: null;
  allowed_origins: null;
  web_origins: null;
  callbacks: null;
  client_aliases: null;
  client_metadata: null;
  client_secret: string;
  custom_login_page_on: boolean;
  is_first_party: boolean;
  custom_login_page: null;
  custom_login_page_preview: null;
  encryption_key: null;
  form_template: null;
  grant_types: string[];
  jwt_configuration: JwtConfiguration;
  mobile: null;
  name: string;
  description: null;
  logo_uri: null;
  oidc_conformant: boolean;
  resource_servers: null;
  sso: null;
}

export interface JwtConfiguration {
  secret_encoded: boolean;
  lifetime_in_seconds: number;
  scopes: null;
  alg: string;
}

export interface SigningKey {
  cert: string;
  key: null;
  pkcs7: string;
}
