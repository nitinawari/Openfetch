import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  
}

export const Input = ({ className, ...props}: InputProps) => {
  return (
    <input
      className={clsx("h-9 w-full px-3 py-1 rounded-md border border-gray-200 hover:border-gray-300 text-sm bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300",className)}
      {...props}
    />
  );
};