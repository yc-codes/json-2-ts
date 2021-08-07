import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'className'> {

}

const Button: FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-gray-800 outline-none active:bg-gray-900 hover:bg-gray-700 focus:ring-2 focus:ring-blue-600 text-white rounded-md py-2 px-4 transition-all"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;