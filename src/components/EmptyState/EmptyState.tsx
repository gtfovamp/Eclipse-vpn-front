import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-[#1A1A1A] p-4 rounded-full mb-4">
        {icon || <AlertTriangle className="h-8 w-8 text-[#007AFF]" />}
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md mb-6">{description}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[#007AFF] text-white rounded-lg hover:bg-[#0066CC] transition-colors duration-300"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;