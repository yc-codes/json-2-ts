import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'className'> {

}

const Button: FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-gray-900 text-white rounded-md py-2"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;