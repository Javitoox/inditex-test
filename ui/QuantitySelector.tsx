'use client';

import { Button, Input } from '@heroui/react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 999,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  return (
    <div className="flex items-center gap-2 [&_input:focus]:border-0 [&_input:focus]:border-transparent [&_input:focus]:bg-transparent [&_input:focus]:shadow-none [&_input:focus]:outline-none [&_input:focus]:ring-0 [&_input]:border-0 [&_input]:border-transparent [&_input]:bg-transparent">
      <Button
        isIconOnly
        variant="bordered"
        size="lg"
        onPress={handleDecrement}
        disabled={value <= min}
      >
        −
      </Button>
      <div className="w-20">
        <Input
          type="number"
          value={String(value)}
          onChange={handleInputChange}
          size="lg"
          min={min}
          max={max}
          variant="bordered"
          classNames={{
            input: 'text-center',
          }}
        />
      </div>
      <Button
        isIconOnly
        variant="bordered"
        size="lg"
        onPress={handleIncrement}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  );
};
