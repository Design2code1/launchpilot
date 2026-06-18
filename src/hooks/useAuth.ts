import { useAuthStore } from '@/store/authStore';
import { LoginPayload, SignupPayload } from '@/types/auth.types';

export function useAuth() {
  const {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    signup,
    logout,
    forgotPassword,
    updateUser,
    clearError,
  } = useAuthStore();

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login: (payload: LoginPayload) => login(payload),
    signup: (payload: SignupPayload) => signup(payload),
    logout,
    forgotPassword: (email: string) => forgotPassword(email),
    updateUser,
    clearError,
  };
}
