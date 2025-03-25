import React, { useState } from 'react';
import axios from "axios";

interface EditModalProps {
  initialValues: FormData; // Add initialValues to props
  isOpen: boolean;
  submitLabel: string;
  title: string;
  selectedProductId: number;
  onCancel: () => void;
  onSubmit: (updatedProduct: FormData) => void;
}

interface FormData {
  id: number;
  name: string;
  category: string;
  calories: number;
  proteins: number;
  fibers: number;
  carbohydrates: number;
}

const EditForm: React.FC<EditModalProps> = ({ isOpen, title, onSubmit, onCancel, initialValues, submitLabel }) => {
  const [formData, setFormData] = useState<FormData>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit function passed from parent
  };

  if (!isOpen) return null;
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="w-screen flex fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 max-h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

          {/* Modal Content */}
          <div className="p-4 md:p-5">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {Object.keys(formData).map((key) => {
                const field = key as keyof FormData; // Type assertion to match FormData keys
                return (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)} {/* Capitalize field name */}
                    </label>
                    <input
                      type={typeof formData[field] === 'number' ? 'number' : 'text'}
                      name={field}
                      id={field}
                      className="bg-gray-50 border border-gray-300 cursor-default text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={formData[field]}
                      onChange={(e) => handleInputChange(e, field)}
                      required
                    />
                  </div>
                );
              })}
            </form>
          </div>
          <div className="flex justify-center p-5">
            {/* Action Buttons */}
            <button
              type="submit"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              onClick={handleFormSubmit}
            >
              {submitLabel}
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
    // 
  );
};

export default EditForm;
