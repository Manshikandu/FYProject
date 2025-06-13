// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false }) => {
  const base = "px-4 py-2 rounded text-white font-semibold transition duration-200";
  const variants = {
    primary: "bg-[#1da1f2] hover:bg-[#3ee6e6]",
    secondary: "bg-gray-600 hover:bg-gray-500",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};
