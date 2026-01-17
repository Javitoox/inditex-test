'use client';

interface SelectOption {
  code: string | number;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
}: CustomSelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        value={value ?? ''}
        onChange={(e) => {
          onChange(e.target.value || undefined);
        }}
        className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={String(option.code)} value={String(option.code)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
