import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from '@/context/UserContext';
import { PictureProvider } from '@/context/PictureContext';
import { DialogProvider } from '@/context/DialogContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/utils/theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <PictureProvider>
          <DialogProvider>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </DialogProvider>
        </PictureProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
