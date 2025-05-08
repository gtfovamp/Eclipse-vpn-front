import React, { useEffect } from 'react';
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  const getToastIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getToastClasses = () => {
    const baseClasses = "fixed bottom-4 right-4 flex items-center space-x-2 rounded-lg px-4 py-3 shadow-lg backdrop-blur-lg border transition-all duration-300 transform";
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-500/10 border-green-500/20 text-green-500`;
      case 'error':
        return `${baseClasses} bg-red-500/10 border-red-500/20 text-red-500`;
      case 'warning':
        return `${baseClasses} bg-yellow-500/10 border-yellow-500/20 text-yellow-500`;
      case 'info':
        return `${baseClasses} bg-blue-500/10 border-blue-500/20 text-blue-500`;
      default:
        return `${baseClasses} bg-gray-500/10 border-gray-500/20 text-gray-500`;
    }
  };

  return (
    <div className={getToastClasses()} role="alert">
      <div className="flex items-center space-x-2">
        {getToastIcon()}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-200 transition-colors duration-200"
        aria-label="Close notification"
      >
        <XCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;