'use client';

import { Toaster } from 'react-hot-toast';

const toastOptions = {
  duration: 3500,
  style: {
    borderRadius: '9999px',
    padding: '12px 16px',
  },
  className:
    'border font-bold border-black bg-white text-black dark:border-white dark:bg-black dark:text-white',
  success: {
    iconTheme: {
      primary: '#10b981',
      secondary: 'white',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: 'white',
    },
  },
};

export const ToastProvider = () => {
  return <Toaster position="bottom-right" toastOptions={toastOptions} />;
};

ToastProvider.displayName = 'ToastProvider';
