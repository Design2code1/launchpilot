export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  plan: 'free' | 'pro' | 'team';
  created_at: string;
  updated_at: string;
  email_verified: boolean;
  push_token?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms?: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirm_password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  bio?: string;
  avatar_url?: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}
