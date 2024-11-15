import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import SWRProvider from '@/provider/SWRProvider';
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SWRProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </SWRProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
