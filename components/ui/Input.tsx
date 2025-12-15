"use client"
import clsx from "clsx"
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement , InputProps>(
  ({ className,  ...props}, ref) => {
  return (
    <input
    ref = {ref}
      className={clsx("h-9 w-full px-3 py-1 rounded-md border border-gray-200 hover:border-gray-300 text-sm bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 mt-1",className)}
      {...props}
    />
  ); 
});