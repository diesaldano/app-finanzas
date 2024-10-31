// components/Alert.tsx

import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type, visible }) => {
  if (!visible) return null;

  const alertStyles =
    type === 'success'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300';

  return (
    <div className={`border-l-4 p-4 ${alertStyles} rounded-md my-4`}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
