import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const CustomButton: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 border border-transparent',
    secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 border border-transparent',
    success: 'bg-success-600 text-white hover:bg-success-700 border border-transparent',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 border border-transparent',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 border border-transparent',
    info: 'bg-info-500 text-white hover:bg-info-600 border border-transparent',
    ghost: 'bg-transparent hover:bg-secondary-100 text-secondary-700 border border-transparent',
    light: 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 border border-white border-opacity-20'
  }[variant];
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  }[size];
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const focusRingColor = {
    primary: 'focus:ring-primary-500',
    secondary: 'focus:ring-secondary-400',
    success: 'focus:ring-success-500',
    danger: 'focus:ring-danger-500',
    warning: 'focus:ring-warning-500',
    info: 'focus:ring-info-500',
    ghost: 'focus:ring-secondary-300',
    light: 'focus:ring-white',
  }[variant];
  
  const buttonClasses = [
    baseClasses,
    variantClasses,
    sizeClasses,
    widthClass,
    focusRingColor,
    className
  ].join(' ');
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
