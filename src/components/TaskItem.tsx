import { FC, useState } from 'react';
import type { Task } from '../services/taskServiceType';
import Modal from './ui/Modal';
import TaskDetails from './TaskDetails';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, updates: { is_complete: boolean }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  
  const formattedDate = new Date(task.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return (
    <li className="group border border-secondary-200 hover:border-secondary-300 rounded-lg mb-3 overflow-hidden bg-white shadow-sm hover:shadow transition-all duration-200">
      <div className="flex items-center p-4">
        <div className="mr-3">
          {task.is_complete && (
            <div className="h-5 w-5 bg-success-100 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          )}
          {!task.is_complete && <div className="h-5 w-5" />}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${task.is_complete ? 'line-through text-secondary-500' : 'text-secondary-900'}`}>
              {task.title}
            </p>
            <p className="text-xs text-secondary-500">{formattedDate}</p>
          </div>
        </div>
        
        {/* Task Action Buttons */}
        <div className="ml-4 flex space-x-2">
          {/* Details Button */}
          <button
            onClick={() => setShowDetailsModal(true)}
            className="text-info-400 hover:text-info-600 focus:outline-none transition-colors"
            aria-label="Voir détails"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          {/* Done Button */}
          <button
            onClick={() => setShowToggleModal(true)}
            className={`${task.is_complete ? 'text-success-500 hover:text-success-700' : 'text-secondary-400 hover:text-secondary-600'} focus:outline-none transition-colors`}
            aria-label={task.is_complete ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-secondary-400 hover:text-danger-600 focus:outline-none transition-colors"
            aria-label="Supprimer"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          
          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Confirmer la suppression"
            variant="danger"
            size="md"
            buttons={[
              {
                text: "Annuler",
                variant: "secondary",
                isCancel: true,
                onClick: () => setShowDeleteModal(false)
              },
              {
                text: "Supprimer",
                variant: "danger",
                onClick: () => {
                  onDelete(task.id);
                  setShowDeleteModal(false);
                }
              }
            ]}
          >
            <p className="text-sm text-secondary-600">
              Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action ne peut pas être annulée.
            </p>
          </Modal>

          {/* Toggle Status Confirmation Modal */}
          <Modal
            isOpen={showToggleModal}
            onClose={() => setShowToggleModal(false)}
            title={task.is_complete ? "Marquer comme non terminée" : "Marquer comme terminée"}
            variant={task.is_complete ? "warning" : "success"}
            size="md"
            buttons={[
              {
                text: "Annuler",
                variant: "secondary",
                isCancel: true,
                onClick: () => setShowToggleModal(false)
              },
              {
                text: "Confirmer",
                variant: task.is_complete ? "warning" : "success",
                onClick: () => {
                  onToggle(task.id, { is_complete: !task.is_complete });
                  setShowToggleModal(false);
                }
              }
            ]}
          >
            <p className="text-sm text-secondary-600">
              {task.is_complete
                ? "Voulez-vous marquer cette tâche comme non terminée ?"
                : "Voulez-vous marquer cette tâche comme terminée ?"}
            </p>
          </Modal>
          
          {/* Task Details Modal */}
          <TaskDetails
            task={task}
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            onUpdate={async (id, updates) => {
              await onToggle(id, updates as { is_complete: boolean });
              setShowDetailsModal(false);
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
