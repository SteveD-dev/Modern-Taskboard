import { FC, useState, useEffect } from 'react';
import Modal from './ui/Modal';
import { Task } from '../services/taskServiceType';
import { useTheme } from './ThemeProvider';
import CustomButton from './ui/Button';
import { useAuth } from '../hook/useAuth';

interface TaskDetailsProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Pick<Task, 'title' | 'is_complete'>>) => Promise<void>;
}

const TaskDetails: FC<TaskDetailsProps> = ({ 
  task, 
  isOpen, 
  onClose, 
  onUpdate 
}) => {
  const{user} = useAuth();
  const [title, setTitle] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setIsComplete(task.is_complete);
      setIsEditing(false);
    }
  }, [task]);

  const handleSave = async () => {
    if (!task) return;
    
    try {
      await onUpdate(task.id, { 
        title: title.trim(),
        is_complete: isComplete
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task) return null;

  const formattedDate = new Date(task.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const renderReadOnlyContent = () => (
    <div className="space-y-4">
      <div>
        <h4 className={`${theme.components.text.h4} text-secondary-700`}>Statut</h4>
        <div className="mt-1 flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isComplete 
              ? 'bg-success-100 text-success-800' 
              : 'bg-warning-100 text-warning-800'
          }`}>
            {isComplete ? 'Terminée' : 'En cours'}
          </span>
        </div>
      </div>
      
      <div>
        <h4 className={`${theme.components.text.h4} text-secondary-700`}>Description</h4>
        <p className="mt-1 text-secondary-900">{title}</p>
      </div>
      
      <div>
        <h4 className={`${theme.components.text.h4} text-secondary-700`}>Créée le</h4>
        <p className="mt-1 text-secondary-600">{formattedDate}</p>
        <p className="mt-1 text-secondary-600">email: {user?.email} </p>
      </div>

      <div className="pt-4">
        <CustomButton 
          onClick={() => setIsEditing(true)} 
          variant="primary"
          size="sm"
          className="w-full"
        >
          Modifier la tâche
        </CustomButton>
      </div>
    </div>
  );

  const renderEditForm = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="task-title" className={`block text-sm font-medium text-secondary-700`}>
          Description
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="task-status"
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
        />
        <label htmlFor="task-status" className="ml-2 block text-sm text-secondary-900">
          Marquer comme terminée
        </label>
      </div>

      <div className="pt-4 flex space-x-2">
        <CustomButton 
          onClick={() => {
            if (task) {
              setTitle(task.title);
              setIsComplete(task.is_complete);
            }
            setIsEditing(false);
          }} 
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          Annuler
        </CustomButton>
        <CustomButton 
          onClick={handleSave} 
          variant="primary"
          size="sm"
          className="flex-1"
          disabled={!title.trim()}
        >
          Enregistrer
        </CustomButton>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (isEditing) {
          if (window.confirm('Annuler les modifications ?')) {
            setIsEditing(false);
            onClose();
          }
        } else {
          onClose();
        }
      }}
      title={isEditing ? "Modifier la tâche" : "Détails de la tâche"}
      variant="info"
      size="md"
      hideCloseButton={false}
    >
      {isEditing ? renderEditForm() : renderReadOnlyContent()}
    </Modal>
  );
};

export default TaskDetails;
