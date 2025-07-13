import { Provider as StoreProvider } from 'react-redux';
import store from '~/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '~/theme';
import AppRoutes from '~/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
