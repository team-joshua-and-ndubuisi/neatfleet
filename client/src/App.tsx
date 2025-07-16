import { Provider as StoreProvider } from 'react-redux';
import store from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from '@/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
