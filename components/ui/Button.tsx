import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default";
  size?: "default";
  className?: string;
}

export const Button = ({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) => {
  const baseClass = "text-center font-medium rounded-md text-white hover:opacity-80 hover:cursor-pointer";

  const variantClass = {
    default: "bg-[#704CFF]",

  };
  const sizestyle = {
    default: "w-full h-9 ",
  };

  return (
    <button className={clsx(baseClass, variantClass[variant], sizestyle[size], className)} {...props}>
      {children}
    </button>
  );
};
