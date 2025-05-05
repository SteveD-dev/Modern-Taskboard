import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface FooterProps {
  companyName?: string;
  tagline?: string;
  showYear?: boolean;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

const Footer: FC<FooterProps> = ({
  companyName = 'TaskBoard',
  tagline = 'Votre gestionnaire de tâches personnel',
  showYear = true,
  links = [],
}) => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-secondary-200 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className={`${theme.components.text.small} text-secondary-500`}>
              {companyName} {showYear && `© ${year}`} {tagline && `- ${tagline}`}
            </p>
          </div>
          
          {links.length > 0 && (
            <div className="flex justify-center md:justify-end space-x-6">
              {links.map((link, index) => (
                <Link 
                  key={index}
                  to={link.url}
                  className={`${theme.components.text.small} text-secondary-500 hover:text-primary-600 transition-colors`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
