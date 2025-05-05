import { FC, InputHTMLAttributes } from 'react';
import { useTheme } from '../ThemeProvider';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const theme = useTheme();
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const inputClasses = [
    error ? theme.components.input.error : theme.components.input.default,
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-secondary-700 mb-1"
        >
          {label}
        </label>
      )}
      <input id={inputId} className={inputClasses} {...props} />
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
