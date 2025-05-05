import { FC, HTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../ThemeProvider';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat';
  hover?: boolean;
  children: ReactNode;
}

const Card: FC<CardProps> = ({
  variant = 'default',
  hover = false,
  children,
  className = '',
  ...props
}) => {
  const theme = useTheme();
  
  const variantClasses = theme.components.card[variant];
  const hoverClass = hover ? theme.components.card.hover : '';
  
  const cardClasses = [
    variantClasses,
    hoverClass,
    className
  ].join(' ');
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
