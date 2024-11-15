'use client';
import { Button } from '@mui/material';
import { redirect } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error('Lỗi logout');
    }
    const data = await res.json();
    if (data.success) {
      redirect('/auth/login');
    }
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}
