'use client';

import { Button } from '@heroui/react';

interface ActionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel?: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  fullWidth?: boolean;
  variant?: 'solid' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'light';
  className?: string;
}

export const ActionButton = ({
  onClick,
  isLoading = false,
  disabled = false,
  label,
  loadingLabel,
  color = 'default',
  fullWidth = true,
  variant = 'solid',
  className,
}: ActionButtonProps) => {
  return (
    <Button
      onPress={onClick}
      disabled={disabled || isLoading}
      isLoading={isLoading}
      fullWidth={fullWidth}
      size="lg"
      color={color}
      variant={variant}
      className={className}
    >
      {isLoading && loadingLabel ? loadingLabel : label}
    </Button>
  );
};
