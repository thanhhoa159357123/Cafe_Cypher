interface AuthState {
  name: string;
  email: string;
  password: string;
  access_token?: string;
  token_type?: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export type { AuthState };
