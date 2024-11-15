'use client';
import axiosClient from '@/api-client/axiosClient';
import React from 'react';
import { SWRConfig } from 'swr';

export default function SWRProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
      {children}
    </SWRConfig>
  );
}
