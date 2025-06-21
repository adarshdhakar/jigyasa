import React from 'react';

export function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const base = 'rounded px-4 py-2 font-semibold focus:outline-none transition ';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-100',
    ghost: 'bg-transparent hover:bg-indigo-100 text-indigo-600',
  };
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    icon: 'p-2',
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md}`}
      {...props}
    >
      {children}
    </button>
  );
}
