// components/QueryProvider.tsx
"use client"; // This marks the file as a client component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

// Create the QueryProvider component
const QueryProvider = ({ children }: { children: ReactNode }) => {
  // Initialize the QueryClient only on the client side
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
