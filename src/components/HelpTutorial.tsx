import { FC, useState } from 'react';
import Modal from './ui/Modal';
import CustomButton from './ui/Button';

interface HelpTutorialProps {
  onClose: () => void;
}

const HelpTutorial: FC<HelpTutorialProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  // const theme = useTheme();

  const tutorials = [
    {
      title: "Bienvenue sur TaskBoard",
      content: (
        <div className="space-y-3">
          <p className="text-secondary-600">
            TaskBoard est votre outil de gestion de tâches personnel. Voici un bref aperçu des fonctionnalités principales.
          </p>
          <div className="flex justify-center my-6">
            <img 
              src="/assets/tutorial-welcome.svg" 
              alt="TaskBoard Welcome" 
              className="h-32 w-auto"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: "Ajouter des tâches",
      content: (
        <div className="space-y-3">
          <p className="text-secondary-600">
            Ajoutez facilement de nouvelles tâches en utilisant le formulaire en haut de votre tableau de bord.
          </p>
          <ol className="list-decimal pl-5 text-secondary-600 space-y-2">
            <li>Saisissez le titre de votre tâche</li>
            <li>Cliquez sur le bouton "Ajouter"</li>
            <li>Votre nouvelle tâche apparaîtra dans la liste</li>
          </ol>
        </div>
      )
    },
    {
      title: "Gérer vos tâches",
      content: (
        <div className="space-y-3">
          <p className="text-secondary-600">
            Vous pouvez facilement gérer vos tâches avec les actions suivantes :
          </p>
          <ul className="space-y-2">
            <li className="flex items-center text-secondary-600">
              <svg className="h-5 w-5 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Marquer comme terminée en cochant la case</span>
            </li>
            <li className="flex items-center text-secondary-600">
              <svg className="h-5 w-5 text-info-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span>Voir et modifier les détails d'une tâche</span>
            </li>
            <li className="flex items-center text-secondary-600">
              <svg className="h-5 w-5 text-danger-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span>Supprimer une tâche que vous ne souhaitez plus suivre</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Filtrer vos tâches",
      content: (
        <div className="space-y-3">
          <p className="text-secondary-600">
            Utilisez les options de filtrage pour trouver rapidement ce que vous cherchez :
          </p>
          <ul className="space-y-2 text-secondary-600">
            <li>Recherchez des tâches par mot-clé</li>
            <li>Filtrez par statut (terminées ou en cours)</li>
            <li>Triez par date de création ou par titre</li>
          </ul>
        </div>
      )
    },
    {
      title: "Vous êtes prêt !",
      content: (
        <div className="space-y-3 text-center">
          <p className="text-secondary-600">
            Vous connaissez maintenant les bases de TaskBoard. Commencez à organiser vos tâches dès maintenant !
          </p>
          <div className="flex justify-center my-6">
            <svg className="h-20 w-20 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-primary-600 font-medium">
            Besoin d'aide ? Cliquez sur le bouton d'aide dans le coin supérieur gauche à tout moment.
          </p>
        </div>
      )
    }
  ];

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={tutorials[currentStep].title}
      variant="info"
      size="lg"
      className="tutorial-modal"
      footer={
        <div className="flex justify-between w-full">
          <CustomButton
            variant="secondary"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Précédent
          </CustomButton>
          <div className="flex space-x-1 items-center">
            {tutorials.map((_, index) => (
              <span 
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? 'bg-primary-600' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
          <CustomButton
            variant="primary"
            size="sm"
            onClick={handleNext}
          >
            {currentStep < tutorials.length - 1 ? 'Suivant' : 'Terminer'}
          </CustomButton>
        </div>
      }
    >
      {tutorials[currentStep].content}
    </Modal>
  );
};

export default HelpTutorial;
