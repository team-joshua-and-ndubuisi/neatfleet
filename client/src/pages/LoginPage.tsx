import { LoginForm } from '@/features/auth';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/stores/';

export default function LoginPage() {
  const { login } = useAuth();
  const token = useAuthStore(state => state.token);
  const user = useAuthStore(state => state.user);
  const { mutateAsync: loginMutate, isError, isPending, isSuccess } = login;

  let displayComponent: React.ReactNode = <LoginForm apiCall={loginMutate} />;

  if (isError) {
    console.error('Login failed');
  }

  if (isSuccess) {
    console.log('Login successful', { token, user });
  }

  if (isPending) {
    displayComponent = <div>Loading...</div>;
  }

  return <div className='w-full flex justify-center h-screen'>{displayComponent}</div>;
}
