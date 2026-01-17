'use client';

interface MessageProps {
  type: 'warning' | 'error' | 'success' | 'info';
  message: string;
}

export const Message = ({ type, message }: MessageProps) => {
  const colors = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    warning: '⚠️',
    error: '❌',
    success: '✅',
    info: 'ℹ️',
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[type]}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{icons[type]}</span>
        <p>{message}</p>
      </div>
    </div>
  );
};
