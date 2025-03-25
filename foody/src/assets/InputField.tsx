// InputField.tsx
import React from 'react';

type FieldProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  type: 'text' | 'number' | 'date' | 'email' | 'password';
  customLabel?: string;
  readOnly?: boolean;
};

const InputField: React.FC<FieldProps> = ({ label, value, onChange, type, customLabel, readOnly = false }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {customLabel || label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 cursor-default text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        required
        readOnly={readOnly}
      />
    </div>
  );
};

export default InputField;
