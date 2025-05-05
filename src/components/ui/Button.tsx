import { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../ThemeProvider';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';
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
  const theme = useTheme();
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variantClasses = theme.components.button[variant];
  
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
