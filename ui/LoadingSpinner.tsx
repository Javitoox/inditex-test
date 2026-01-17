'use client';

import { CircularProgress } from '@heroui/react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
}

export const LoadingSpinner = ({
  label = 'Cargando...',
  size = 'lg',
  color = 'primary',
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <CircularProgress
          isIndeterminate
          label={label}
          size={size}
          color={color}
          aria-label="Cargando"
        />
      </div>
    </div>
  );
};
