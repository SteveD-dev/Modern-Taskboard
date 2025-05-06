import { FC, ReactNode } from 'react';
export type StatCardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface StatCardProps {
  title: string;
  value: ReactNode;
  variant?: StatCardVariant;
  icon?: ReactNode;
  className?: string;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  variant = 'primary',
  icon,
  className = '',
}) => {
  // const theme = useTheme();
  
  // Map variants to appropriate colors
  const variantStyles = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-100',
      titleColor: 'text-primary-800',
      valueColor: 'text-primary-900',
    },
    success: {
      bg: 'bg-success-50',
      border: 'border-success-100',
      titleColor: 'text-success-800',
      valueColor: 'text-success-900',
    },
    warning: {
      bg: 'bg-warning-50',
      border: 'border-warning-100',
      titleColor: 'text-warning-800',
      valueColor: 'text-warning-900',
    },
    danger: {
      bg: 'bg-danger-50',
      border: 'border-danger-100',
      titleColor: 'text-danger-800',
      valueColor: 'text-danger-900',
    },
    info: {
      bg: 'bg-info-50',
      border: 'border-info-100',
      titleColor: 'text-info-800',
      valueColor: 'text-info-900',
    },
  };
  
  const styles = variantStyles[variant];
  
  const cardClasses = [
    styles.bg,
    'p-4 rounded-lg border',
    styles.border,
    'flex flex-col',
    className
  ].join(' ');
  
  return (
    <div className={cardClasses}>
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-medium ${styles.titleColor}`}>{title}</h3>
        {icon && <div className="text-sm">{icon}</div>}
      </div>
      <div className={`text-2xl font-bold mt-2 ${styles.valueColor}`}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;
