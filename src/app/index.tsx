import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/Loader';

export default function IndexRedirect() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    storage.get<boolean>(STORAGE_KEYS.ONBOARDED).then((v) => setOnboarded(!!v));
  }, []);

  if (isLoading || onboarded === null) return <Loader fullScreen />;
  if (!onboarded) return <Redirect href="/(onboarding)/welcome" />;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(tabs)" />;
}
