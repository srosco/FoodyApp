import React from 'react';
import '../app/globals.css';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onSubmit, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="w-screen flex fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Close button */}
          <button
            type="button"
            className="absolute left-2 top-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onCancel}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Content */}
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{message}</p>

            {/* Action Buttons */}
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-700 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={onSubmit}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
