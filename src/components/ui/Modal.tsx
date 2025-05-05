import { FC, Fragment, ReactNode, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

export type ModalVariant = 'info' | 'success' | 'warning' | 'danger';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalButton {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  onClick: () => void;
  isCancel?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: ModalVariant;
  size?: ModalSize;
  buttons?: ModalButton[];
  hideCloseButton?: boolean;
  preventBackdropClose?: boolean;
  className?: string;
  footer?: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'info',
  size = 'md',
  buttons,
  hideCloseButton = false,
  preventBackdropClose = false,
  className = '',
  footer,
}) => {
  const theme = useTheme();

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !preventBackdropClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = ''; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose, preventBackdropClose]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  // Variant classes
  const variantClasses = {
    info: {
      header: 'border-b border-info-200',
      title: 'text-info-900',
      close: 'text-info-500 hover:text-info-800',
    },
    success: {
      header: 'border-b border-success-200',
      title: 'text-success-900',
      close: 'text-success-500 hover:text-success-800',
    },
    warning: {
      header: 'border-b border-warning-200',
      title: 'text-warning-900',
      close: 'text-warning-500 hover:text-warning-800',
    },
    danger: {
      header: 'border-b border-danger-200',
      title: 'text-danger-900',
      close: 'text-danger-500 hover:text-danger-800',
    },
  };

  // Button variant classes
  const buttonVariantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white',
    secondary: 'bg-secondary-100 hover:bg-secondary-200 focus:ring-secondary-500 text-secondary-800',
    success: 'bg-success-600 hover:bg-success-700 focus:ring-success-500 text-white',
    danger: 'bg-danger-600 hover:bg-danger-700 focus:ring-danger-500 text-white',
    warning: 'bg-warning-600 hover:bg-warning-700 focus:ring-warning-500 text-white',
    info: 'bg-info-600 hover:bg-info-700 focus:ring-info-500 text-white',
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !preventBackdropClose) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 z-50 bg-secondary-900 bg-opacity-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
      >
        {/* Modal dialog */}
        <div 
          className={`${sizeClasses[size]} w-full rounded-lg shadow-xl bg-white overflow-hidden transform transition-all ${className}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`px-6 py-4 ${variantClasses[variant].header} flex justify-between items-center`}>
            <h3 className={`text-lg font-medium ${variantClasses[variant].title}`}>
              {title}
            </h3>
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={`${variantClasses[variant].close} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 rounded-full p-1`}
                aria-label="Close"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            {children}
          </div>

          {/* Footer with buttons */}
          {(buttons?.length || footer) && (
            <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200 flex justify-end space-x-2">
              {footer || (
                <>
                  {buttons?.map((button, index) => (
                    <button
                      key={index}
                      onClick={button.onClick}
                      className={`inline-flex justify-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        button.variant && buttonVariantClasses[button.variant] || 
                        (button.isCancel ? buttonVariantClasses.secondary : buttonVariantClasses.primary)
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
