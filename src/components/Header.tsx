import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './ui/Modal';
import type { User } from '@supabase/supabase-js';
import CustomButton from './ui/Button';
import HelpTutorial from './HelpTutorial';

interface HeaderProps {
  title?: string;
  user: User | null;
  onLogout?: () => void;
}

const Header: FC<HeaderProps> = ({
  title = 'TaskBoard',
  user,
  onLogout,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showHelpTutorial, setShowHelpTutorial] = useState(false);

  // const handleLogout = () => {
  //   if (onLogout) {
  //     setShowLogoutModal(true);
  //   }
  // };

  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-800 shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white">
              {title}
            </h1>
            {user && (
              <CustomButton
                variant="secondary"
                size="sm"
                onClick={() => setShowHelpTutorial(true)}
                className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-white bg-opacity-25 hover:bg-opacity-40 transition-all duration-200"
                aria-label="Aide"
              >
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </CustomButton>
            )}
          </div>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white text-opacity-90">{user.email}</span>
              <CustomButton 
                variant="light" 
                size="sm" 
                onClick={() => setShowLogoutModal(true)}
                className="bg-white bg-opacity-25 text-white border-white border-opacity-30 hover:bg-opacity-40 transition-all duration-200"
              >
                <span className="font-medium">Se déconnecter</span>
              </CustomButton>
                
              {/* Logout confirmation modal */}
              <Modal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                title="Confirmation de déconnexion"
                variant="info"
                size="sm"
                buttons={[
                  {
                    text: "Annuler",
                    variant: "secondary",
                    isCancel: true,
                    onClick: () => setShowLogoutModal(false)
                  },
                  {
                    text: "Se déconnecter",
                    variant: "danger",
                    onClick: () => {
                      onLogout?.();
                      setShowLogoutModal(false);
                    }
                  }
                ]}
              >
                <p className="text-sm text-secondary-600">
                  Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
                </p>
              </Modal>

              {/* Help Tutorial Modal */}
              {showHelpTutorial && (
                <HelpTutorial onClose={() => setShowHelpTutorial(false)} />
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <CustomButton 
                  variant="ghost" 
                  size="sm"
                  className="text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                >
                  Connexion
                </CustomButton>
              </Link>
              <Link to="/register">
                <CustomButton 
                  variant="light" 
                  size="sm"
                  className="bg-white bg-opacity-25 text-white border-white border-opacity-30 hover:bg-opacity-40 transition-all duration-200"
                >
                  S'inscrire
                </CustomButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;